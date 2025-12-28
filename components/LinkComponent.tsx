'use client'

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { Route } from "next";


export default function LinkComponent({
    href,
    page,
    linkType,
    children,
    inNewTab = false,
    className = "",
    onClickAction
}: Link) {
    const pathname = usePathname();
    const router = useRouter();
    const [linkPath, setLinkPath] = useState<string>("");
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    async function pageTransition(hrefString: string) {
        // const overlay = document.getElementById("page-loader");
        // const body = document.body;
        // const header = document.querySelector("header");

        // overlay?.classList.add("visible");
        // header?.classList.add("no-touch");
        // body.classList.add("loading");

        // await sleep(300); // Pause for 300ms
        router.push(hrefString as Route);
    }


    useEffect(() => {
        if (linkType === "page" && page) {
            if (page._type === "page") {
                setLinkPath(`/${page.language}/${page.slug}`);
            } else if (page._type === "project") {
                setLinkPath(`/${page.language}/project/${page.slug}`);
            } else if (page._type === "home") {
                setLinkPath(`/${page.language}`);
            } else if (page._type === "projects") {
                setLinkPath(`/${page.language}/projects`);
            } else {
                setLinkPath("/");
            }
        }
    }, [pathname, linkType, page]);

    const handleClick = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, 
        href: string | URL | undefined
    ) => {

        if (!href) return; 
        const hrefString = href.toString();

        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
            return;
        }

        if (pathname === hrefString) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

         if (onClickAction) {
            onClickAction(e);
        }

        e.preventDefault();

        // PAGE TRANSITION FUNCTION
        pageTransition(hrefString);
       
    };

    if (linkType === "href") {
        return (
            <a
                href={href}
                target={inNewTab ? "_blank" : "_self"}
                rel={inNewTab ? "noopener noreferrer" : undefined}
                className={`${className}`}
            >
                {children}
            </a>
        );
    } else if (linkType === "page") {
        return (
            <Link
                href={{
                    pathname: linkPath
                }}
                className={`${className}`}
                onClick={(e) => handleClick(e, linkPath)}
                target={inNewTab ? "_blank" : "_self"}
                rel={inNewTab ? "noopener noreferrer" : undefined}
            >
                {children}
            </Link>
        );
    }

    return null;
}

