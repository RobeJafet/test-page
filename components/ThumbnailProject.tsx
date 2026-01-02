'use client';

import LinkComponent from "./LinkComponent";
import ImageComponent from "./ImageComponent";
import { useI18n } from "@/config/i18n/i18nProvider";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import AnimateOnView from "./AnimateOnView";

export default function ThumbnailProject({ project, index, projectsLength }: { project: ProjectThumbnail, index: number, projectsLength: number }) {
    const { dict } = useI18n();
    const [isLinkHover, setIsLinkHover] = useState(false);
    const [isComponentHover, setIsComponentHover] = useState(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const linkRef = useRef<HTMLDivElement>(null);
    
    const handleResize = () => {
        setIsDesktop(window.matchMedia('(min-width: 993px)').matches);
    };
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleHoverComponent = (hover: boolean) => {
        if (!isDesktop) return;
        setIsComponentHover(hover);
        
    }

    const handleHoverLink = (hover: boolean) => {
        if (!isDesktop) return;
        setIsLinkHover(hover);
    }

    useEffect(() => {
        if (isComponentHover) {
            handleScrambleEnter();
        } else {
            handleScrambleLeave();
        }
    }, [isComponentHover]);

    const intervals = new Map<HTMLElement, NodeJS.Timeout>();
    const timeouts = new Map<HTMLElement, NodeJS.Timeout>();
    const originals = new Map<HTMLElement, string>();

    const shuffleString = (str: string): string => {
      const arr = str.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
    };

    const getFirstTextNode = (el: HTMLElement): Text | null => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
        return walker.nextNode() as Text | null;
    };


    const stopScramble = (el: HTMLElement) => {
      clearInterval(intervals.get(el));
      clearTimeout(timeouts.get(el));
      const original = originals.get(el);
      const textNode = getFirstTextNode(el);
      if (original && textNode) {
        textNode.nodeValue = original;
      }
    };

    const startScramble = (el: HTMLElement) => {
      const textNode = getFirstTextNode(el);
      if (!textNode) return;

      const originalText = dict.project.visit_case

      originals.set(el, originalText);
        if (textNode) {
            textNode.nodeValue = shuffleString(originalText);
        }
      const interval = setInterval(() => {
        if (textNode) {
            textNode.nodeValue = shuffleString(originalText);
        }
      }, 100);
      intervals.set(el, interval);

      const timeout = setTimeout(() => {
        stopScramble(el);
      }, 500);
      timeouts.set(el, timeout);
    };


    const handleScrambleEnter = () => {
        if ( linkRef.current && isDesktop) {
            if (timeouts.has(linkRef.current)) {
                stopScramble(linkRef.current);
            }
            startScramble(linkRef.current);
        }
    };
    const handleScrambleLeave = () => {
        if ( linkRef.current) {
            stopScramble(linkRef.current);
        }
    };


    return (
        <div key={project._id} className="w-full" onMouseEnter={() => handleHoverComponent(true)} onMouseLeave={() => setIsComponentHover(false)}>
            <AnimateOnView
                className={`row  ${index % 2 !== 0 ? "flex-row-reverse" : ""}`}
            >
                <div className="w-full md:w-6/12 lg:w-4/12">
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
                                className={`flex transition-border overflow-hidden ${isComponentHover ? 'rounded-[15px]' : ''} `}
                            >
                                <ImageComponent
                                    image={project.thumbnail}
                                    optionalAlt="Project Thumbnail"
                                    classContainer="aspect-[1.43]"
                                    classImg="object-cover "
                                    sizes="(max-width: 767px) 100vw, 60vw"
                                    loading={index < 2 ? 'eager' : 'lazy'}
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
                                    index % 2 === 0 &&
                                    index !== projectsLength - 1
                                        ? "md:hidden lg:block"
                                        : ""
                                }`}
                                src="/threeDots.svg"
                                alt="Three decorative dots"
                            />
                            <img
                                className={`absolute hidden md:block lg:hidden top-0 -translate-y-[calc(100%+7.5px)] w-8 h-2 
                            ${index == 0 && "hidden!"}  
                            ${
                                index % 2 !== 0
                                    ? "left-0 -translate-x-full"
                                    : "right-0 translate-x-full"
                            }`}
                                src="/twoDots.svg"
                                alt="Two decorative dots"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-4/12">
                    <div className="detail flex flex-col h-full justify-center text-center items-center aspect-[1.43] md:aspect-auto px-8 pt-8">
                        <div
                            className="flex"
                            onMouseEnter={() => handleHoverLink(true)}
                            onMouseLeave={() => handleHoverLink(false)}
                        >
                            <LinkComponent
                                linkType="page"
                                page={{
                                    _type: "project",
                                    slug: project.slug.current,
                                    language: project.language,
                                }}
                                className={`${
                                    isLinkHover ? "opacity-50" : ""
                                } transition-link`}
                            >
                                {project.date}
                            </LinkComponent>
                        </div>
                        <div className="flex"
                            onMouseEnter={() => handleHoverLink(true)}
                            onMouseLeave={() => handleHoverLink(false)}
                        >
                            <LinkComponent
                            linkType="page"
                                page={{
                                    _type: "project",
                                    slug: project.slug.current,
                                    language: project.language,
                                }}
                                className={`${
                                    isLinkHover ? "opacity-50" : ""
                                } transition-link`}
                            >
                                {project.services}
                            </LinkComponent>
                        </div>
                        <div className="flex"
                            onMouseEnter={() => handleHoverLink(true)}
                            onMouseLeave={() => handleHoverLink(false)}
                        >
                            <LinkComponent
                                linkType="page"
                                page={{
                                    _type: "project",
                                    slug: project.slug.current,
                                    language: project.language,
                                }}
                                className={
                                    `${isLinkHover ? "opacity-50" : ""} transition-link`
                                }
                                
                            >
                                <h2>{project.title}</h2>
                            </LinkComponent>
                        </div>
                        
                        <div className="flex lg:hidden pt-green justify-center">
                            
                            <Button
                                linkType="page"
                                page={{
                                    _type: "project",
                                    slug: project.slug.current,
                                    language: project.language,
                                }}
                                whiteOrGray="gray"
                                dotOrArrow="arrow"
                                label={dict.project.visit_case}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-4/12 hidden lg:block">
                    <div ref={linkRef} className={`relative flex items-center justify-center h-full pt-8 transition-link ${isComponentHover ? 'opacity-100' : 'opacity-0'} `}>
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
                                    className="w-[11px] h-4"
                                >
                                    <path
                                        d="M11 5.17997L6.52701 0.707092M11 5.17997L6.47299 9.70698M11 5.17997L0.5 5.18005"
                                        stroke="#12161C"
                                        strokeMiterlimit="10"
                                        strokeLinecap="square"
                                    />
                                </svg>
                                <p className="detail">
                                    {dict.project.visit_case}
                                </p>
                            </LinkComponent>
                        )}
                    </div>
                </div>
            </AnimateOnView>
        </div>
    );
}