import { groq } from "next-sanity";
import { IMG, LINK } from "../queries/lib";

export const HERO_HOME = groq`
    _type == "heroHome" => {
        _type,
        _key,
        headline,
        title
    }
`

export const STUDIO_SECTION = groq`
    _type == "studio" => {
        _type,
        _key,
        headline,
        title,
        description,
        link{
            ${LINK}
        },
        images[] {
            ${IMG}
        }
    }
`

export const SERVICES_SECTION = groq`
    _type == "services" => {
        _type,
        _key,
        headline,
        title,
        link{
            ${LINK}
        },
        services[] {
            _key,
            name,
            description
        }
    }
`

export const APPROACH_SECTION = groq`
    _type == "approach" => {
        _type,
        _key,
        headline,
        title,
        description,
        approchItem[] {
            _key,
            name,
            description,
            image {
                ${IMG}
            }
        }
    }
`

export const ABOUT_US_SECTION = groq`
    _type == "aboutUs" => {
        _type,
        _key,
        headline,
        title,
        mailLink {
            ${LINK}
        },
        telLink {
            ${LINK}
        },
        imageItems[] {
            ${IMG}
        }
    }
`;

export const CTA_SECTION = groq`
    _type == "cta" => {
        _type,
        _key,
        headline,
        title,
        link {
            ${LINK}
        },
        backgroundImage {
            ${IMG}
        }
    }
`;

export const LEGAL_SECTION = groq`
    _type == "legal" => {
        _type,
        _key,
        title,
        blockContent,
        "updatedAt": ^._updatedAt
    }
`;

export const FEATURED_PROJECTS_SECTION = groq`
    _type == "featuredProjects" => {
        _type,
        _key,
        headline,
        title,
        link {
            ${LINK}
        },
        projects[]->{
            _id,
            title,
            slug{ current },
            language,
            description,
            thumbnail{
                ${IMG}
            }
        }
    }
`;