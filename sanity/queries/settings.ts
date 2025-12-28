import { groq } from "next-sanity";
import { LINK } from "./lib";

export const SETTINGS = groq`
*[_type == "settings" && language==$lang][0] {
    headerNavigation[]{
        ${LINK}
    },
    footerSitemap[]{
        ${LINK}
    },
    footerSocial[]{
        ${LINK}
    },
    footerLegal[]{
        ${LINK}
    }
}
`