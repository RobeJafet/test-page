import { defineField, defineType } from "sanity";

export default defineType({
    name: "featuredProjects",
    title: "Featured Projects",
    type: "object",
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "link",
        }),
        defineField({
            name: "projects",
            title: "Projects",
            type: "array",
            of: [{ 
                type: "reference", 
                to: [{ type: "project" }],
                options: {
                    filter: ({ document }) => {
                        const { language } = document;
                        if (language) {
                            return {
                                filter: 'language == $language',
                                params: {
                                    language: language,
                                },
                            };
                        }
                        return {};
                    },
                    disableNew: true,
                },
            }],
            validation: (Rule) => Rule.required().max(4),
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Featured Projects Section",
            };
        },
    },
});