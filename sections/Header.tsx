'use client';

import { useEffect, useState, useRef } from "react";
import LinkComponent from "@/components/LinkComponent";
import LangChangeHandler from "@/components/LangChangeHandler";
import { usePathname } from 'next/navigation'
import { useI18n } from "@/config/i18n/i18nProvider";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import Form from "@/components/Form";
import { Draggable } from "gsap/Draggable";

// @ts-ignore
import Headroom from "headroom.js";

type Header = {
    lang: LocalePage;
    translations: Translation[];
    headerNavigation?: Link[];
    mail?: string;
    contactTitle?: string;
};

export default function Header({ lang, translations, headerNavigation, mail, contactTitle }: Header) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const [activeLabel, setActiveLabel] = useState<string>("");
    const pathname = usePathname();
    const { dict } = useI18n();
    gsap.registerPlugin(CustomEase, Draggable);
    CustomEase.create("custom", "0.19, 1, 0.22, 1");
    const refContact = useRef<HTMLDivElement>(null);
    const refMenu = useRef<HTMLDivElement>(null);
    const refInnerMenu = useRef<HTMLDivElement>(null);
    const refMenuGrid = useRef<HTMLDivElement>(null);
    const refOverlay = useRef<HTMLDivElement>(null);
    const bottomSheetRef = useRef<HTMLDivElement>(null);
    const draggableAreaRef = useRef<HTMLDivElement>(null);
    const bottomSheetContactRef = useRef<HTMLDivElement>(null);
    const draggableContactAreaRef = useRef<HTMLDivElement>(null);

    const tl = gsap.timeline({
        defaults: {
            duration: 0.6,
            ease: "custom",
        }
    });
    const openTl = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: "custom",
        }
    });
    const closeTl = gsap.timeline({
        defaults: {
            duration: 0.6,
            ease: "custom",
        }
    });

    useEffect(() => {
        let headroom: Headroom | null = null;
        let draggableInstanceSheet: Draggable[] = [];
        let draggableInstanceContact: Draggable[] = [];

        var myElement = document.querySelector("header");
        const options = {
            offset: 200,
        }
        headroom = new Headroom(myElement, options);
        headroom.init();

        const bottomSheet = bottomSheetRef.current;
        if (!bottomSheet) return;

        draggableInstanceSheet = Draggable.create(bottomSheet, {
            trigger: draggableAreaRef.current,
            type: "y",
            bounds: {minY: (bottomSheet.clientHeight * 1) + 50, maxY: -10},
            onDragEnd: function() {
                if (this.y > bottomSheet.clientHeight * 0.1) {
                    gsap.to(bottomSheet, {
                        y: "100%",
                        duration: 0.3,
                        ease: "custom",
                        onStart: () => {
                            setMenuOpen(false);
                        }
                    });
                } else {
                    gsap.to(bottomSheet, {
                        y: 0,
                        duration: 0.3,
                        ease: "custom"
                    });
                }
            }
        });

        const bottomSheetContact = bottomSheetContactRef.current;  
        if (bottomSheetContact) {
            draggableInstanceContact = Draggable.create(bottomSheetContact, {
                trigger: draggableContactAreaRef.current,
                type: "y",
                bounds: {minY: (bottomSheetContact.clientHeight * 1) + 50, maxY: -10},
                onDragEnd: function() {
                    if (this.y > bottomSheetContact.clientHeight * 0.1) {
                        gsap.to(bottomSheetContact, {
                            y: "100%",
                            duration: 0.3,
                            ease: "custom",
                            onStart: () => {
                                setOpenContact(false);
                                setMenuOpen(false);
                            }
                        });
                    } else {
                        gsap.to(bottomSheetContact, {
                            y: 0,
                            duration: 0.3,
                            ease: "custom"

                        });
                    }
                }
            });
        }
        return () => {
            if (draggableInstanceSheet.length > 0) {
                draggableInstanceSheet[0].kill();
            }
        };
    }, []);

    useEffect(() => {
        if (headerNavigation) {
            const currentLang = pathname.split('/')[1];
            const currentSlug = pathname.split('/').slice(2).join('/');
            
            if (currentSlug === "") {
                if (lang === currentLang) {
                    setActiveLabel(dict.general.home);
                    return;
                } 
            } else if (currentSlug.startsWith('project/')) {
                const projectSlug = currentSlug.replace('project/', '');
                setActiveLabel(projectSlug);
            } else {
                headerNavigation.forEach((link) => {
                   setActiveLabel(currentSlug);
                });
            }
        }
    }, [pathname, lang, dict]);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
            refMenuGrid.current?.classList.add("open");
            refOverlay.current?.classList.add("open");
            setOpenContact(false);
            gsap.to(bottomSheetRef.current, {
                y: 0,
                duration: 0.6,
                ease: "custom"
            })
        } else {
            document.body.style.overflow = "";
            if(!openContact) {
                refMenuGrid.current?.classList.remove("open");
                refOverlay.current?.classList.remove("open");
            } else {
                setOpenContact(false);
            }
            gsap.to(bottomSheetRef.current, {
                y: "100%",
                duration: 0.6,
                ease: "custom"
            });
        }
    }, [menuOpen]);

    useEffect(() => {
        if (openContact) {
            openTl.to(refMenu.current, {
                width: refContact.current?.clientWidth ? refContact.current.clientWidth + 20 : 0,
            })
            .to(refInnerMenu.current, {
               height: refContact.current?.clientHeight ? refContact.current.clientHeight - 40 : 0,
            }, "<")
            .to(refInnerMenu.current, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    if (refMenu.current) refMenu.current.style.pointerEvents = "none";
                }
            }, "<0.1")
            .to(refContact.current, {
                opacity: 1,
                pointerEvents: "auto",
            }, ">");
            gsap.to(bottomSheetRef.current, {
                y: "100%",
                duration: 0.6,
                ease: "custom",
                onComplete: () => {
                    gsap.to(bottomSheetContactRef.current, {
                        y: 0,
                        duration: 0.6,
                        ease: "custom"
                    });
                }
            });
            
        } else {
            closeTl.to(refContact.current, {
                opacity: 0,
                pointerEvents: "none",
                onStart: () => {
                    refMenuGrid.current?.classList.add("no-transition");
                    setTimeout(() => {
                        refMenuGrid.current?.classList.remove("open");
                        refOverlay.current?.classList.remove("open");
                    }, 30);
                    setTimeout(() => {
                        refMenuGrid.current?.classList.remove("no-transition");
                    }, 75);
                },
            }).to(refMenu.current, {
                opacity: 0,
                pointerEvents: "none",
                onComplete: () => {
                    refMenu.current?.style.removeProperty('width');
                    refInnerMenu.current?.style.removeProperty('height');
                    refInnerMenu.current?.style.removeProperty('opacity');
                    refMenu.current?.style.removeProperty('pointer-events');
                    refMenu.current?.style.removeProperty('opacity');
                }
            }, "<");

            gsap.to(bottomSheetContactRef.current, {
                y: "100%",
                duration: 0.6,
                ease: "custom"
            });
        }   
        return () => {
            openTl.kill();
            closeTl.kill();
        };
    }, [openContact]);

    

    return (
        <>
            <header className="sticky top-0 left-0 pt-green z-1000">
                <div className="container">
                    <div className="w-full bg-gray py-4 rounded-2xl lg:rounded-3xl relative min-h-20">
                        <div className="flex items-center justify-between">
                            <div className="block">
                                <div className="pl-6 lg:pl-8 flex items-start">
                                    <LinkComponent
                                        linkType={"page"}
                                        page={{
                                            _type: "home",
                                            slug: "",
                                            language: lang,
                                        }}
                                    >
                                        <img
                                            src="/testLogo.svg"
                                            alt="Logo"
                                            className=" h-7 lg:h-8 w-auto"
                                        />
                                    </LinkComponent>
                                </div>
                            </div>
                            <div className="w-auto md:w-full md:absolute pointer-events-none left-0 right-0 top-1/2 md:-translate-y-1/2 ">
                                <div className="row justify-center ">
                                    <div className="w-full md:w-6/12 lg:w-4/12 relative flex items-center gap-2 md:gap-4 px-8! md:px-4!">
                                        <div className="md:px-4 lg:px-0 hidden md:block w-full">
                                            <div
                                                className="bg-white h-full flex items-center justify-center cursor-pointer py-[8px] px-8 pointer-events-auto"
                                                onClick={() =>
                                                    setMenuOpen(!menuOpen)
                                                }
                                            >
                                                <p className="detail select-none">
                                                    TEST/{activeLabel}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="md:hidden pointer-events-auto">
                                            <div className="flex justify-end ">
                                                {
                                                    <LangChangeHandler
                                                        lang={lang}
                                                        translations={
                                                            translations
                                                        }
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="md:absolute w-auto top-0 md:left-[calc(100%-10px)] lg:left-full pointer-events-auto">
                                            <div
                                                className={`w-[32px] h-[32px] md:w-[34px] md:h-[34px] bg-white rounded-full px-[8px] md:px-4 flex items-center burger-menu cursor-pointer ${
                                                    menuOpen ? "open" : ""
                                                }`}
                                                onClick={() =>
                                                    setMenuOpen(!menuOpen)
                                                }
                                            >
                                                <div className="relative h-[8px] w-full">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex justify-end pr-6 lg:pr-8">
                                    {
                                        <LangChangeHandler
                                            lang={lang}
                                            translations={translations}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block absolute left-0 top-[calc(100%+10px)] w-full pointer-events-none">
                    <div className="container relative">
                        <div className="row justify-center">
                            <div
                                className="w-full md:w-6/12 lg:w-4/12"
                                ref={refMenu}
                            >
                                <div className="md:px-4 lg:px-0">
                                    <div
                                        ref={refMenuGrid}
                                        className={`bg-white rounded-[15px] menu-dropdown pointer-events-auto `}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-8">
                                                <div
                                                    className="grid grid-cols-2 gap-8"
                                                    ref={refInnerMenu}
                                                >
                                                    <div></div>
                                                    <div className=" flex flex-col relative items-start">
                                                        {headerNavigation?.map(
                                                            (link) => (
                                                                <LinkComponent
                                                                    className="detail link-hover"
                                                                    key={
                                                                        link._key
                                                                    }
                                                                    {...link}
                                                                    onClickAction={() =>
                                                                        setMenuOpen(
                                                                            false,
                                                                        )
                                                                    }
                                                                >
                                                                    {link.label}
                                                                </LinkComponent>
                                                            ),
                                                        )}
                                                        <div
                                                            className="detail link-hover cursor-pointer"
                                                            onClick={() => {
                                                                setOpenContact(
                                                                    !openContact,
                                                                );
                                                            }}
                                                        >
                                                            {dict.contact.title}
                                                        </div>
                                                        <div className="flex gap-4 items-center top-0 right-full -translate-x-8 absolute whitespace-nowrap">
                                                            <p className="detail">
                                                                Go to
                                                            </p>
                                                            <svg
                                                                width="12"
                                                                height="11"
                                                                viewBox="0 0 12 11"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M11 5.18003L6.52701 0.707153M11 5.18003L6.47299 9.70704M11 5.18003L0.5 5.18011"
                                                                    stroke="#12161C"
                                                                    strokeMiterlimit="10"
                                                                    strokeLinecap="square"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-0 top-0 z-10 w-full">
                            <div className={`row justify-center`}>
                                <div className="w-6/12">
                                    <div
                                        className="bg-white lg:p-20 rounded-[15px] opacity-0 pointer-events-none"
                                        ref={refContact}
                                    >
                                        <p className="h1 text-center">
                                            {contactTitle}
                                        </p>
                                        <div className="text-center pt-2">
                                            {dict.contact.description}
                                            <a
                                                className="detail link-hover"
                                                href={`mailto:${mail}`}
                                            >
                                                {mail}
                                            </a>
                                        </div>
                                        <Form lang={lang} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="lg:hidden fixed inset-x-4 md:inset-x-6 bottom-0 z-1000 pointer-events-none">
                <div
                    className="w-full relative transform-y-full pointer-events-auto"
                    ref={bottomSheetRef}
                >
                    <div className="bg-gray absolute top-0 w-full left-0 h-[calc(100%+50px)] rounded-tl-[15px] rounded-tr-[15px]"></div>
                    <div
                        className="flex justify-center py-6 md:py-8 relative z-10"
                        ref={draggableAreaRef}
                    >
                        <span className="draggable "></span>
                    </div>
                    <div className="pt-2 md:pt-4 pb-6 md:pb-12 px-6 md:px-12">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            {headerNavigation?.map((link, index) => (
                                <LinkComponent
                                    key={link._key}
                                    className="bg-white aspect-[1.3] md:aspect-[1.8] flex justify-center items-center relative"
                                    {...link}
                                >
                                    <span className="bg-second-gray rounded-full w-[8px] h-[8px] absolute top-6 right-6"></span>
                                    <p className="detail">{link.label}</p>
                                </LinkComponent>
                            ))}
                            <div
                                className="detail bg-white aspect-[1.3] md:aspect-[1.8] flex justify-center items-center cursor-pointer relative"
                                onClick={() => {
                                    setOpenContact(!openContact);
                                }}
                            >
                                <span className="bg-second-gray rounded-full w-[8px] h-[8px] absolute top-6 right-6"></span>
                                <p className="detail">{dict.contact.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:hidden fixed inset-x-4 md:inset-x-6 bottom-0 z-1000 pointer-events-none ">
                <div
                    className="w-full relative transform-y-full pointer-events-auto "
                    ref={bottomSheetContactRef}
                >
                    <div className="bg-white absolute top-0 w-full left-0 h-[calc(100%+50px)] rounded-tl-[15px] rounded-tr-[15px]"></div>
                    <div
                        className="flex justify-center py-6 md:py-8 relative z-10"
                        ref={draggableContactAreaRef}
                    >
                        <span className="draggable"></span>
                    </div>
                    <div className="pt-2 md:pt-4 pb-6 md:pb-12 px-6 md:px-12 relative z-10 max-h-[84vh] overflow-scroll">
                        <p className="h1 text-center">
                            {contactTitle}
                        </p>
                        <div className="text-center pt-2">
                            {dict.contact.description}
                            <a
                                className="detail"
                                href={`mailto:${mail}`}
                            >
                                {mail}
                            </a>
                        </div>
                        <Form lang={lang} />
                    </div>
                </div>
            </div>
            <div
                className={`overlay`}
                ref={refOverlay}
                onClick={() => setMenuOpen(false)}
            ></div>
        </>
    );
}