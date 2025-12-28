import { defineField, defineType } from "sanity";

export default defineType({
    name: "services",
    title: "Services Section",
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
            name: 'link',
            title: 'Link',
            type: 'link',
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'name',
                        title: 'Service Name',
                        type: 'string',
                    }),
                    defineField({
                        name: 'description',
                        title: 'Service Description',
                        type: 'text',
                    }),
                ],
            }],
        })
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Services Section",
            };
        },
    },
});