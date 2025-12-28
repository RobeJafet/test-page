'use client';

import LinkComponent from "./LinkComponent";
import ImageComponent from "./ImageComponent";
import { useI18n } from "@/config/i18n/i18nProvider";

export default function ThumbnailProject({ project, index, projectsLength }: { project: ProjectThumbnail, index: number, projectsLength: number }) {
    const { dict } = useI18n();
    return (
        <div
            className={`row  ${index % 2 !== 0 ? "flex-row-reverse" : ""}`}
            key={project._id}
        >
            <div className="md:w-6/12 lg:w-4/12">
                <div
                    className={`${
                        index % 2 !== 0 ? "md:pl-0" : " md:pr-0"
                    } px-8 lg:px-8 pt-8`}
                >
                    <div className="relative">
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
                                sizes="(max-width: 767px) 100vw, 60vw"
                            />
                        </LinkComponent>
                        <img
                            className={`w-8 h-8 absolute top-0 left-0 -translate-full ${
                                index % 2 !== 0 && "md:hidden lg:block"
                            }`}
                            src="/threeDots.svg"
                            alt="Three decorative dots"
                        />
                        <img
                            className={`w-8 h-8 absolute bottom-0 left-0 rotate-270 translate-y-full -translate-x-full ${
                                index % 2 !== 0 && "md:hidden lg:block"
                            }`}
                            src="/threeDots.svg"
                            alt="Three decorative dots"
                        />
                        <img
                            className={`w-8 h-8 absolute top-0 right-0 rotate-90 -translate-y-full translate-x-full ${
                                index % 2 === 0 && index !== 0
                                    ? "md:hidden lg:block"
                                    : ""
                            }`}
                            src="/threeDots.svg"
                            alt="Three decorative dots"
                        />
                        <img
                            className={`w-8 h-8 absolute bottom-0 right-0 rotate-180 translate-full ${
                                index % 2 === 0 && index !== projectsLength - 1
                                    ? "md:hidden lg:block"
                                    : ""
                            }`}
                            src="/threeDots.svg"
                            alt="Three decorative dots"
                        />
                        <img
                            className={`absolute hidden md:block lg:hidden top-0 -translate-y-[calc(100%+7.5px)] w-8 h-2 
                            ${index == 0 && "hidden!"}  
                            ${ index % 2 !== 0 ? "left-0 -translate-x-full" : "right-0 translate-x-full"}`}
                            src="/twoDots.svg"
                            alt="Two decorative dots"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-4/12">
                <div className="detail flex flex-col h-full justify-center text-center items-center aspect-[1.43] md:aspect-auto px-8 pt-8">
                    <LinkComponent
                        linkType="page"
                        page={{
                            _type: "project",
                            slug: project.slug.current,
                            language: project.language,
                        }}
                    >
                        {project.date}
                    </LinkComponent>
                    <LinkComponent
                        linkType="page"
                        page={{
                            _type: "project",
                            slug: project.slug.current,
                            language: project.language,
                        }}
                    >
                        {project.services}
                    </LinkComponent>
                    <LinkComponent
                        linkType="page"
                        page={{
                            _type: "project",
                            slug: project.slug.current,
                            language: project.language,
                        }}
                    >
                        <h2>{project.title}</h2>
                    </LinkComponent>
                    <div className="flex lg:hidden pt-green justify-center">
                        <LinkComponent
                            linkType="page"
                            page={{
                                _type: "project",
                                slug: project.slug.current,
                                language: project.language,
                            }}
                            className="bg-gray py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]"
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
                            <p className="detail">{dict.project.visit_case}</p>
                        </LinkComponent>
                    </div>
                </div>
            </div>
            <div className="w-4/12 hidden lg:block">
                <div className="relative flex items-center justify-center h-full pt-8">
                    {project.slug.current && (
                        <LinkComponent
                            linkType="page"
                            page={{
                                _type: "project",
                                slug: project.slug.current,
                                language: project.language,
                            }}
                            className="bg-gray py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]"
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
                            <p className="detail">{dict.project.visit_case}</p>
                        </LinkComponent>
                    )}
                </div>
            </div>
        </div>
    );
}