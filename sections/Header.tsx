'use client';

import { useEffect, useState } from "react";
import LinkComponent from "@/components/LinkComponent";
import LangChangeHandler from "@/components/LangChangeHandler";
import { usePathname } from 'next/navigation'
import { useI18n } from "@/config/i18n/i18nProvider";

type Header = {
    lang: LocalePage;
    translations: Translation[];
    headerNavigation?: Link[];
};

export default function Header({ lang, translations, headerNavigation }: Header) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLabel, setActiveLabel] = useState<string>("");
    const pathname = usePathname();
    const { dict } = useI18n();

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

    return (
        <>
            <header className="sticky top-0 left-0 pt-green z-1000">
                <div className="container ">
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
                                                        translations={translations}
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
                <div className="absolute left-0 top-[calc(100%+10px)] w-full pointer-events-none">
                    <div className="container">
                        <div className="row justify-center">
                            <div className="w-full md:w-6/12 lg:w-4/12">
                                <div className="md:px-4 lg:px-0">
                                    <div
                                        className={`bg-white rounded-[15px] menu-dropdown pointer-events-auto ${
                                            menuOpen ? "open" : ""
                                        }`}
                                    >
                                        {
                                            <div className="overflow-hidden">
                                                <div className="p-8">
                                                    <div className="grid grid-cols-2 gap-8">
                                                        <div></div>
                                                        <div className="flex flex-col relative items-start">
                                                            {headerNavigation?.map(
                                                                (link) => (
                                                                    <LinkComponent
                                                                        className="detail link-hover"
                                                                        key={
                                                                            link._key
                                                                        }
                                                                        {...link}
                                                                        onClickAction={() => setMenuOpen(false)}
                                                                    >
                                                                        {
                                                                            link.label
                                                                        }
                                                                      
                                                                    </LinkComponent>
                                                                )
                                                            )}
                                                            <div className="flex gap-4 items-center top-0 right-full -translate-x-8  absolute  whitespace-nowrap">
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
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div
                className={`overlay ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(false)}
            ></div>
        </>
    );
}