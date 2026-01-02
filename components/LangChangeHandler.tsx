"use client";
import { useEffect, useState, useRef } from "react";
import { locales } from "@/config/i18n/i18nConfig";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";

export default function LangChangeHandler({
  lang,
  translations,
}: {
  lang: LocalePage;
  translations: Translation[];
}): React.ReactNode {
  
  const [newRoute, setNewRoute] = useState<string>("");
  const pathname = usePathname();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const handleResize = () => {
      setIsDesktop(window.matchMedia("(min-width: 993px)").matches);
  };
  useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
          window.removeEventListener("resize", handleResize);
      };
  }, []);


  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean); 
    const type = segments[1];
    const slug = segments[2];

    const otherLang = lang === "en" ? "es" : "en";

    if (!type && !slug) {
      setNewRoute(`/${otherLang}`);
    } else if (!slug && type) {
      if (type === "projects"){
        setNewRoute(`/${otherLang}/projects`);
        return;
      }
      translations.forEach((translation) => {
        if (translation[lang]?.slug === type && translation[lang]?.type === "page") {
          setNewRoute(`/${otherLang}/${translation[otherLang]?.slug}`);
        } else {
          setNewRoute(`/${otherLang}`);
        }
      });
    } else if (type === "project") {
      translations.forEach((translation) => {
        if (translation[lang]?.slug === slug && translation[lang]?.type === "project") {
          setNewRoute(`/${otherLang}/project/${translation[otherLang].slug}`);
        } else {
          setNewRoute(`/${otherLang}`);
        }
      });
    } else if (type == 'projects'){
      setNewRoute(`/${otherLang}/projects`);
    }
  }, [lang, pathname, translations]);


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

    const originalText = originals.get(el) || textNode.nodeValue || '';
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


  const handleMouseEnter = () => {
      if (linkRef.current && isDesktop) {
          if (timeouts.has(linkRef.current)) {
              stopScramble(linkRef.current);
          }
          startScramble(linkRef.current);
      }
  };
  const handleMouseLeave = () => {
      if (linkRef.current) {
          stopScramble(linkRef.current);
      }
  };
 


  const otherLocale = locales.filter((locale) => locale !== lang)[0];

  return (
    <Link href={`${newRoute as Route}`} className="bg-white rounded-[50px] py-[8px] px-6 flex items-center gap-4" ref={linkRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="bg-green h-[8px] w-[8px] rounded-full block"></span>
      <p className="detail">
        { otherLocale === 'es' ? 'ESP' : 'ENG' }
      </p>
    </Link>
  );
}