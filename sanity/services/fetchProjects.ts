import { PROJECTS_QUERY } from "../queries/projects";
import { sanityFetch } from "@/sanity/lib/live";

export const fetchProjects = async (lang: LocalePage, order: string, start: number, end: number): Promise<ProjectThumbnail[]> => {
    const { data } = await sanityFetch<string>({
        query: PROJECTS_QUERY(order),
        params: { lang, start, end},
    });
    return data;
}
