import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS } from "../queries/settings";
import { TRANSLATION_QUERY } from "../queries/lib";


type Settings = {
    headerNavigation: Link[];
    footerSitemap: Link[];
    footerSocial: Link[];
    footerLegal: Link[];
}



export const fetchSettings = async (lang: LocalePage ): Promise<Settings> => {
  const { data } = await sanityFetch({
    query: SETTINGS,
    params: { lang },
  });
  return data;
}

export const fetchTranslations = async (lang: LocalePage ): Promise<Translation[]> => {
  const { data } = await sanityFetch({
    query: TRANSLATION_QUERY,
    params: { lang },
  });
  return data;
}