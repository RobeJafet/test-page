import { defineField, defineType } from "sanity";

export default defineType({
    name: "heroHome",
    title: "Hero Home Section",
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
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Hero Home Section",
            };
        },
    },
});