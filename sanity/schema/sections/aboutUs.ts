import { defineField, defineType } from "sanity";

export default defineType({
    name: "aboutUs",
    title: "About Us Section",
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
            type: 'text',
        }),
        defineField({
            name: "mailLink",
            title: "Mail Link",
            type: "link",
        }),
        defineField({
            name: "telLink",
            title: "Telephone Link",
            type: "link",
        }),
        
        defineField({
            name: "imageItems",
            title: "Image Items",
            type: "array",
            of: [{
                type: 'image',
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
            }],
            validation: (Rule) => Rule.min(2).max(2),
        })
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "About Us Section",
            };
        },
    },
});