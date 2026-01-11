"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

export default function FirstVisitManager({
    isFirstVisit,
}: {
    isFirstVisit: boolean;
}) {

    const pathname = usePathname();
    gsap.registerPlugin(CustomEase);

    CustomEase.create("custom", "0.4, 0, 0.2, 1");

    useEffect(() => {
        const heroDots = document.querySelectorAll("[data-hero-dots]");
        const header = document.querySelector("header");
        const text = document.querySelectorAll(".hero-text");
        const body = document.querySelector("body");

        if (isFirstVisit) {
            if (sessionStorage.getItem("first_visit_cookie_set")){
                body?.classList.remove("first-visit");
            }

            if (pathname === "/en" || pathname === "/es") {
                const onAlmostComplete = () => {
                    body?.classList.remove("first-visit");
                };  
                const tl = gsap.timeline({
                    defaults: { 
                        ease: "custom",
                        delay: 0.3
                    },
                });
                const isMobile = window.matchMedia("(max-width: 993px)").matches;
                let sortedHeroDots = Array.from(heroDots).sort((a, b) => {
                    const aOrder = parseInt((a as HTMLElement).dataset.heroDots || '0');
                    const bOrder = parseInt((b as HTMLElement).dataset.heroDots || '0');
                    return aOrder - bOrder;
                });
                if (isMobile) {
                    sortedHeroDots = sortedHeroDots.filter(dot => (dot as HTMLElement).dataset.heroDots !== '2');
                }

                if (!sessionStorage.getItem("first_visit_cookie_set")) {
                    tl.to(sortedHeroDots, { 
                        opacity: 1, 
                        duration: 0.6, 
                        stagger: 0.3
                    }, "-=0.3")
                    .to(text, {
                        opacity: 1,
                        duration: 1,
                        stagger: 0.3
                    }, "-=0.6")
                    .to(header, { opacity: 1, duration: 0.8 }, "<-=0.3")
                    .call(onAlmostComplete, [], "-=0.3");
                } else {
                     tl.to(sortedHeroDots, { 
                        opacity: 1, 
                        duration: 0.6, 
                        stagger: 0.3
                    }, "-=0.3")
                    .to(text, {
                        opacity: 1,
                        duration: 1,
                        stagger: 0.3
                    }, "-=0.6")
                    .call(onAlmostComplete, [], "-=0.3");
                }
            }
        }
        if (!sessionStorage.getItem("first_visit_cookie_set")) {
            fetch("/api/firstVisit", { method: "POST" });
            sessionStorage.setItem("first_visit_cookie_set", "true");
        }
    }, [isFirstVisit, pathname]);

    return null;
}
