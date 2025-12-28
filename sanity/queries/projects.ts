import { IMG } from "./lib";
import { groq } from "next-sanity";

export const PROJECTS_QUERY = (order: string) => groq`
*[_type == "project" && language == $lang] | order(${order}) [$start...$end] {
    _id,
    title,
    date,
    language,
    services,
    slug{ current },
    thumbnail{
        ${IMG}
    }
}`;


