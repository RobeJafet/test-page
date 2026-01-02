import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";
import { Fragment } from "react";
import { getDictionary } from "@/config/i18n/dictionaries";
import AnimateOnView from "@/components/AnimateOnView";
import Button from "@/components/Button";

type FeaturedProjectsSection = {
    headline?: string;
    title?: string;
    link?: Link;
    projects: {
        _id?: string;
        title?: string;
        description?: string;
        slug: { current: string };
        language: LocalePage;
        thumbnail?: Image;
    }[];
};

export default async function fetchProjectsSection({headline, title, link, projects}: FeaturedProjectsSection) {
    const dict = await getDictionary(projects[0]?.language || 'en');
    return (
        <section>
            <div className="container">
                <AnimateOnView className="row justify-center lg:justify-start">
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-8 ">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-8 md:px-0">
                            <p className="detail animate">{headline}</p>
                            <h3 className="h1 pt-2 animate">{title}</h3>
                        </div>
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-auto">
                        {link && (
                            <div className="flex justify-center lg:items-end lg:justify-end h-full pt-green px-8 md:px-0 lg:pt-0! lg:pb-[9px] lg:mr-8 animate">
                                <Button {...link}
                                    whiteOrGray="gray"
                                    dotOrArrow="dot"
                                />
                            </div>
                        )}
                    </div>
                </AnimateOnView>
                <div className="row justify-center lg:justify-start mt-yellow gap-y-4 md:gap-y-8">
                    {projects?.map((project, index) => (
                        <Fragment key={project._id}>
                            <AnimateOnView className="w-full md:w-10/12 lg:w-6/12 ">
                                <div className="mx-8 md:mx-0 lg:ml-8 animate">
                                    {project.thumbnail && (
                                        <LinkComponent
                                            linkType="page"
                                            page={{
                                                _type: "project",
                                                slug: project.slug.current,
                                                language: project.language,
                                            }}
                                            className="
                                            hover-rounded 
                                            overflow-hidden
                                            flex
                                            "
                                        >
                                            <ImageComponent
                                                image={project.thumbnail}
                                                optionalAlt="Project Thumbnail"
                                                classContainer="aspect-[1.43]"
                                                classImg="object-cover "
                                                sizes="(max-width: 993px) 100vw, 80vw"
                                            />
                                        </LinkComponent>
                                    )}
                                </div>
                            </AnimateOnView>
                            <div className={`w-full md:w-10/12 lg:w-6/12  lg:mb-0 ${index != projects.length -1 ? 'mb-4' : ''}`}>
                                <div className="mx-8 md:mx-0 lg:mr-8 h-full">
                                    <div className="bg-gray p-8 lg:p-12 h-full rounded-[20px]">
                                        <AnimateOnView className="w-full md:w-[71.058%] lg:w-[74.577%]">
                                            {project.title && (
                                                <h4 className="detail text-center md:text-left animate">
                                                    {project.title}
                                                </h4>
                                            )}
                                            {project.description && (
                                                <p className="mt-2 md:mt-4 animate">
                                                    {project.description}
                                                </p>
                                            )}
                                            <div className="mt-orange flex justify-center md:justify-start animate">
                                                {project.slug && (
                                                    <Button 
                                                        linkType="page"
                                                        page={{
                                                            _type: "project",
                                                            slug: project.slug.current,
                                                            language: project.language,
                                                        }}
                                                        label={dict.project.visit_case}
                                                        dotOrArrow="arrow"
                                                    />
                                                 
                                                )}
                                            </div>
                                        </AnimateOnView>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
