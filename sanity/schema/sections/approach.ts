import { defineField, defineType } from "sanity";

export default defineType({
    name: "approach",
    title: "Approach Section",
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
            name: "approchItem",
            title: "Approach Items",
            type: "array",
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'name',
                        title: 'Name',
                        type: 'string',
                    },
                    {
                        name: 'description',
                        title: 'Description',
                        type: 'text',
                    },
                    {
                        name: 'image',
                        title: 'Image',
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
                    }
                ]
            }],
            validation: (Rule) => Rule.min(4).max(4),
        })
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Approach Section",
            };
        },
    },
});