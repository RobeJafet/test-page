import { defineField, defineType } from "sanity";

export default defineType({
    name: "studio",
    title: "Studio Section",
    type: "object",
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "link"
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
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
            validation: (Rule) => Rule.max(2),
        })
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Studio Section",
            };
        },
    },
});