import { defineField, defineType } from "sanity";

export default defineType({
    name: "cta",
    title: "CTA Section",
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
            name: "backgroundImage",
            title: "Background Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    type: "string",
                    title: "Alternative Text",
                    description: "Important for SEO and accessibility.",
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "CTA Section",
            };
        },
    },
});