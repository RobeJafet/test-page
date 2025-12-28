"use client";
import { useEffect, useState } from "react";
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

  const otherLocale = locales.filter((locale) => locale !== lang)[0];

  return (
    <Link href={`${newRoute as Route}`} className="bg-white rounded-[50px] py-[8px] px-6 flex items-center gap-4">
      <span className="bg-green h-[8px] w-[8px] rounded-full block"></span>
      <p className="detail">
        { otherLocale === 'es' ? 'ESP' : 'ENG' }
      </p>
    </Link>
  );
}