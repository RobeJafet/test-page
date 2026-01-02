import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { locales } from "@/config/i18n/i18nConfig";
import { fetchProjectsPageMetadata } from "@/sanity/services/fetchPage";
import { generatePageMetadata } from "@/lib/generateMetadata";
import { fetchProjects } from "@/sanity/services/fetchProjects";
import ThumbnailProject from "@/components/ThumbnailProject";

export async function generateStaticParams() {
    return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({params} : {params: Promise<{ lang: LocalePage, slug: string }> }): Promise<Metadata> {
   const { lang } = await params;
       const metadata = await fetchProjectsPageMetadata(lang);
       if (metadata){
           return generatePageMetadata({
               metadata: metadata,
               slug: 'projects',
               title: metadata.metaTitle || 'Projects',
           });
       }
       return {
           title: 'Title Undefined',
       };
}

export default async function ProjectsPage({params} : {params: Promise<{ lang: LocalePage, slug: string }>}) {
    const { lang } = await params;
    const projects = await fetchProjects(lang, 'date desc', 0, 10);
    return (
        <main>
            <section>
                <div className="container pt-yellow ">
                    <div className="relative pb-8">
                        {projects?.map((project, index) => (
                            <ThumbnailProject key={project._id} project={project} index={index} projectsLength={projects.length} />
                        ))}
                        <div className="absolute top-0 left-0 w-full hidden md:block">
                            <div className="row">
                                <div className="lg:w-4/12 ml-auto">
                                    <div className="flex justify-end lg:justify-between">
                                        <img
                                            className="w-8 h-8 rotate-90 "
                                            src="/threeDots.svg"
                                            alt="Three decorative dots"
                                        />
                                        <img
                                            className="w-8 h-8 hidden lg:block rotate-90"
                                            src="/threeDots.svg"
                                            alt="Three decorative dots"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full -translate-y-full md:translate-y-0">
                            {projects?.length % 2 !== 0 ? (
                                <div className="row">
                                    <div className="w-full md:w-auto lg:w-4/12 ml-auto">
                                        <div className="flex justify-between md:justify-end lg:justify-between">
                                            <img
                                                className="w-8 h-8 rotate-180 hidden lg:block"
                                                src="/threeDots.svg"
                                                alt="Three decorative dots"
                                            />
                                            <img
                                                className="w-8 h-8 rotate-270 md:hidden"
                                                src="/threeDots.svg"
                                                alt="Three decorative dots"
                                            />
                                            <img
                                                className="w-8 h-8  rotate-180"
                                                src="/threeDots.svg"
                                                alt="Three decorative dots"
                                            />
                                            
                                        </div>
                                    </div>
                                </div>  
                            ) : (
                                <div className="row">
                                    <div className="w-4/12">
                                        <div className="flex justify-between">
                                            <img
                                                className="w-8 h-8 rotate-270 hidden lg:block"
                                                src="/threeDots.svg"
                                                alt="Three decorative dots"
                                            />

                                            <img
                                                className="w-8 h-8 rotate-270 "
                                                src="/threeDots.svg"
                                                alt="Three decorative dots"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}