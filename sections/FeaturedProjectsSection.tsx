import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";
import { Fragment } from "react";
import { getDictionary } from "@/config/i18n/dictionaries";

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
                <div className="row justify-center lg:justify-start">
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-8">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-8 md:px-0">
                            <p className="detail">{headline}</p>
                            <h3 className="h1 pt-2">{title}</h3>
                        </div>
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-auto">
                        {link && (
                            <div className="flex justify-center lg:items-end lg:justify-end h-full pt-green px-8 md:px-0 lg:pt-0! lg:pb-[9px] lg:mr-8">
                                <LinkComponent
                                    {...link}
                                    className="bg-gray py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]"
                                >
                                    <span className="dot"></span>
                                    <p className="detail">{link.label}</p>
                                </LinkComponent>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row justify-center lg:justify-start mt-yellow gap-y-4 md:gap-y-8">
                    {projects?.map((project, index) => (
                        <Fragment key={project._id}>
                            <div className="w-full md:w-10/12 lg:w-6/12 ">
                                <div className="mx-8 md:mx-0 lg:ml-8">
                                    {project.thumbnail && (
                                        <LinkComponent
                                            linkType="page"
                                            page={{
                                                _type: "project",
                                                slug: project.slug.current,
                                                language: project.language,
                                            }}
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
                            </div>
                            <div className={`w-full md:w-10/12 lg:w-6/12  lg:mb-0 ${index != projects.length -1 ? 'mb-4' : ''}`}>
                                <div className="mx-8 md:mx-0 lg:mr-8 h-full">
                                    <div className="bg-gray p-8 lg:p-12 h-full rounded-[20px]">
                                        <div className="w-full md:w-[71.058%] lg:w-[74.577%]">
                                            {project.title && (
                                                <h4 className="detail text-center md:text-left">
                                                    {project.title}
                                                </h4>
                                            )}
                                            {project.description && (
                                                <p className="mt-2 md:mt-4">
                                                    {project.description}
                                                </p>
                                            )}
                                            <div className="mt-orange flex justify-center md:justify-start">
                                                {project.slug && (
                                                    <LinkComponent
                                                        linkType="page"
                                                        page={{
                                                            _type: "project",
                                                            slug: project.slug.current,
                                                            language: project.language,
                                                        }}
                                                        className="bg-white py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]"
                                                    >
                                                        <svg
                                                            width="12"
                                                            height="11"
                                                            viewBox="0 0 12 11"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M11 5.17997L6.52701 0.707092M11 5.17997L6.47299 9.70698M11 5.17997L0.5 5.18005"
                                                                stroke="#12161C"
                                                                strokeMiterlimit="10"
                                                                strokeLinecap="square"
                                                            />
                                                        </svg>
                                                        <p className="detail">
                                                            {
                                                                dict.project
                                                                    .visit_case
                                                            }
                                                        </p>
                                                    </LinkComponent>
                                                )}
                                            </div>
                                        </div>
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
