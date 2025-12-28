import { defineField, defineType } from "sanity";

export default defineType({
    name: "legal",
    title: "Legal Section",
    type: "object",
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: "blockContent",
            title: "Content",
            type: "blockContent",
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            return {
                title: "Legal Section",
            };
        },
    },
});