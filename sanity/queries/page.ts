import { groq } from "next-sanity";
import { METADATA, IMG, LINK } from "./lib";
import { HERO_HOME, STUDIO_SECTION, SERVICES_SECTION, APPROACH_SECTION, ABOUT_US_SECTION, CTA_SECTION, LEGAL_SECTION, FEATURED_PROJECTS_SECTION } from "./sections";

export const HOME = groq`
*[_type == "home" && language == $lang][0] {
    ${METADATA},
    sections[] {
        ${HERO_HOME},
        ${STUDIO_SECTION},
        ${SERVICES_SECTION},
        ${APPROACH_SECTION},
        ${ABOUT_US_SECTION},
        ${CTA_SECTION},
        ${LEGAL_SECTION},
        ${FEATURED_PROJECTS_SECTION}
    }
}
`;

export const PAGE = groq`
*[_type == "page" && slug.current == $slug && language == $lang][0] {
    ${METADATA},
    title,
    slug,
    sections[] {
        ${STUDIO_SECTION},
        ${SERVICES_SECTION},
        ${APPROACH_SECTION},    
        ${ABOUT_US_SECTION},
        ${CTA_SECTION},
        ${LEGAL_SECTION},
        ${FEATURED_PROJECTS_SECTION}
    }
}
`;

export const PAGE_SLUG = groq`
*[_type == "page" && defined(slug) && language==$lang ] {
    slug
  }
`;

export const PROJECT_SLUG = groq`
*[_type == "project" && defined(slug) && language==$lang ] {
    slug
  }
`;

export const PROJECT = groq`
*[_type == "project" && slug.current == $slug && language == $lang][0] {
    ${METADATA},   
    title,
    slug,
    excerpt,
    linkProject{
        ${LINK}
    },  
    team,
    context,
    wip,
    galleryItems[] {
       images[] {
            ${IMG}
        }
    }
}
`;

export const PROJECTS_PAGE = groq`
*[_type == "projects" && language == $lang][0] {
    ${METADATA}
}`;