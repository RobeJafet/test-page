import { fetchProject } from "@/sanity/services/fetchPage";
import { fetchProjectSlugs } from "@/sanity/services/fetchPage";
import { notFound } from 'next/navigation';
import { generatePageMetadata } from "@/lib/generateMetadata";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import LinkComponent from "@/components/LinkComponent";
import GalleryItem from "@/components/GalleryItem";
import { getDictionary } from "@/config/i18n/dictionaries";
import Button from "@/components/Button";

export async function generateStaticParams() {
    const slugs = await fetchProjectSlugs();
    return slugs;
}

export async function generateMetadata({params} : {params: Promise<{ lang: LocalePage, slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const projectData = await fetchProject(slug, lang);
    if (projectData.metadata){
        return generatePageMetadata({
            metadata: projectData.metadata,
            slug: slug,
            title: projectData.title
        });
    }
    return {
        title: 'Title Undefined',
    };
}

export default async function Project({params} : {params: Promise<{ lang: LocalePage, slug: string }>}) {
    const { lang, slug } = await params;
    const projectData = await fetchProject(slug, lang);

    if (!projectData) {
        notFound();
    }

    const dict = await getDictionary(lang);

    return (
        <main>
            <div className="container">
                <div className="row justify-center mt-yellow">
                    <div className="w-full md:w-10/12 lg:w-7/12 text-center">
                        <div className="px-8 md:px-0">
                            <h1 className="detail">{projectData.title}</h1>
                            {projectData.excerpt && (
                                <p className="h1">{projectData.excerpt}</p>
                            )}

                            {projectData.linkProject && !projectData.wip && (
                                <div className="flex pt-green justify-center">
                                    <Button {...projectData.linkProject}
                                        whiteOrGray="gray"
                                        dotOrArrow="dot"
                                    />
                                </div>
                            )} 
                            {
                                projectData.wip && (
                                    <div className="flex pt-green justify-center">
                                        <div className="bg-gray py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]">
                                            <p className="detail opacity-50">
                                                {dict.project.wip}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                {projectData.galleryItems &&
                    projectData.galleryItems.length > 0 && (
                    <div className="row justify-center pt-blue pb-8 ">
                        <div className="w-full lg:w-10/12">
                            <div className="flex flex-col md:grid grid-cols-12 lg:grid-cols-10 gap-8">
                                {projectData.galleryItems &&
                                    projectData.galleryItems[0] && (
                                        <div className="col-span-12 lg:col-span-10 relative ">
                                            <div className="px-8 pt-8">
                                                <GalleryItem
                                                    key={
                                                        projectData
                                                            .galleryItems[0]
                                                            ._key
                                                    }
                                                    item={
                                                        projectData
                                                            .galleryItems[0]
                                                            .images
                                                    }
                                                    sizes="90vw"
                                                    priority={true}
                                                />
                                            </div>
                                            <img
                                                className="absolute top-0 left-0 w-8 h-8"
                                                src="/threeDots.svg"
                                                alt="Three Dots"
                                            />
                                            <img
                                                className="absolute top-0 right-0 rotate-90 w-8 h-8"
                                                src="/threeDots.svg"
                                                alt="Three Dots"
                                            />
                                        </div>
                                    )}
                                {projectData.galleryItems &&
                                    projectData.galleryItems[1] && (
                                        <div className="col-span-5 lg:col-span-4 relative">
                                            <div className="px-8 md:pr-0">
                                                <div className="flex relative">
                                                    <GalleryItem
                                                        key={
                                                            projectData
                                                                .galleryItems[1]
                                                                ._key
                                                        }
                                                        item={
                                                            projectData
                                                                .galleryItems[1]
                                                                .images
                                                        }
                                                        sizes="(min-width: 768px) 40vw, 100vw"
                                                    />
                                                    <img
                                                        className="absolute bottom-0 left-0 w-8 h-8 translate-y-full -translate-x-full rotate-270 hidden md:block"
                                                        src="/threeDots.svg"
                                                        alt="Three Dots"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                {projectData.galleryItems &&
                                    projectData.galleryItems[1] && (
                                        <div className="col-span-7 lg:col-span-6">
                                            <div className="px-8 md:pl-0">
                                                <div className="flex relative">
                                                    <GalleryItem
                                                        key={
                                                            projectData
                                                                .galleryItems[2]
                                                                ._key
                                                        }
                                                        item={
                                                            projectData
                                                                .galleryItems[2]
                                                                .images
                                                        }
                                                        sizes="(min-width: 768px) 60vw, 100vw"
                                                    />
                                                    <img
                                                        className="absolute bottom-0 left-0 w-8 h-8 translate-y-full -translate-x-full rotate-270"
                                                        src="/threeDots.svg"
                                                        alt="Three Dots"
                                                    />
                                                    <img
                                                        className="absolute bottom-0 right-0 w-8 h-8 translate-y-full translate-x-full rotate-180"
                                                        src="/threeDots.svg"
                                                        alt="Three Dots"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
                {(projectData.team || projectData.context) && (
                    <div className="row pt-blue justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="-mx-4 flex flex-wrap justify-center lg:mx-0 gap-y-blue  lg:grid lg:gap-x-8 grid-cols-10">
                                {projectData.team && (
                                    <div className="w-full md:w-7/12 lg:w-auto lg:col-span-4 text-center lg:text-left px-4 lg:px-0">
                                        <div className="px-8 md:px-0 lg:pl-8 h-full">
                                            <div className="lg:px-12 flex flex-col h-full">
                                                <h2 className="detail">
                                                    {dict.project.team}
                                                </h2>
                                                <div className="pt-2 mt-auto whitespace-pre-wrap">
                                                    {projectData.team}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            )}
                            {projectData.context && (
                                <div className="w-full md:w-10/12 lg:w-auto lg:col-span-6 px-4 lg:px-0">
                                    <div className="px-8 md:px-0 lg:pr-8 h-full">
                                        <div className="lg:px-12 flex flex-col">
                                            <h2 className="detail">
                                                {dict.project.context}
                                            </h2>
                                            <div className="pt-2 mt-auto whitespace-pre-wrap ">
                                                {projectData.context}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
                {projectData.galleryItems &&
                    projectData.galleryItems.length > 3 && (
                        <div className="row justify-center pt-blue pb-8 ">
                            <div className="w-full lg:w-10/12">
                                <div className="flex flex-col md:grid grid-cols-12 lg:grid-cols-10 gap-8">
                                    {projectData.galleryItems &&
                                        projectData.galleryItems[3] && (
                                            <div className="col-span-12 lg:col-span-10 relative">
                                                <div className="px-8 pt-8">
                                                    <GalleryItem
                                                        key={
                                                            projectData
                                                                .galleryItems[3]
                                                                ._key
                                                        }
                                                        item={
                                                            projectData
                                                                .galleryItems[3]
                                                                .images
                                                        }
                                                        sizes="100vw"
                                                    />
                                                </div>
                                                <img
                                                    className="absolute top-0 left-0 w-8 h-8"
                                                    src="/threeDots.svg"
                                                    alt="Three Dots"
                                                />
                                                <img
                                                    className="absolute top-0 right-0 rotate-90 w-8 h-8"
                                                    src="/threeDots.svg"
                                                    alt="Three Dots"
                                                />
                                            </div>
                                        )}
                                    {projectData.galleryItems &&
                                        projectData.galleryItems[4] && (
                                            <div className="col-span-7 lg:col-span-6 relative">
                                                <div className="px-8 md:pr-0">
                                                    <div className="flex relative">
                                                        <GalleryItem
                                                            key={
                                                                projectData
                                                                    .galleryItems[4]
                                                                    ._key
                                                            }
                                                            item={
                                                                projectData
                                                                    .galleryItems[4]
                                                                    .images
                                                            }
                                                            sizes="(min-width: 768px) 60vw, 100vw"
                                                        />
                                                        <img
                                                            className="absolute bottom-0 left-0 w-8 h-8 translate-y-full -translate-x-full rotate-270 hidden md:block"
                                                            src="/threeDots.svg"
                                                            alt="Three Dots"
                                                        />
                                                        <img
                                                            className="absolute bottom-0 right-0 w-8 h-8 translate-y-full translate-x-full rotate-180 hidden md:block"
                                                            src="/threeDots.svg"
                                                            alt="Three Dots"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    {projectData.galleryItems &&
                                        projectData.galleryItems[5] && (
                                            <div className="col-span-5 lg:col-span-4">
                                                <div className="px-8 md:pl-0 lg:pr-8">
                                                    <div className="flex relative">
                                                        <GalleryItem
                                                            key={
                                                                projectData
                                                                    .galleryItems[5]
                                                                    ._key
                                                            }
                                                            item={
                                                                projectData
                                                                    .galleryItems[5]
                                                                    .images
                                                            }
                                                            sizes="(min-width: 768px) 40vw, 100vw"
                                                        />
                                                        
                                                        <img
                                                            className="absolute bottom-0 right-0 w-8 h-8 translate-y-full translate-x-full rotate-180 lg:hidden"
                                                            src="/threeDots.svg"
                                                            alt="Three Dots"
                                                        />
                                                        <img
                                                            className="absolute bottom-0 left-0 w-8 h-8 translate-y-full -translate-x-full rotate-270 md:hidden"
                                                            src="/threeDots.svg"
                                                            alt="Three Dots"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </main>
    );
}