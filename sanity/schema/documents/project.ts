import { defineType, defineField, defineArrayMember } from "sanity";
import type { PrepareViewOptions } from 'sanity';
import { isUniqueOtherThanLanguage } from "@/sanity/lib/isUnique";


export default defineType({
    name: "project",
    type: "document",
    title: "Project",
    groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "date",
            title: "Project Date",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
            isUnique: isUniqueOtherThanLanguage,
            source: "title",
            maxLength: 96,
           
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "services",
            title: "Services",
            type: "string",
        }),
        defineField({
            name: "thumbnail",
            title: "Thumbnail Image",
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
            group: "content",
        }),
        defineField({
            name: "linkProject",
            title: "Link to Project",
            type: "link",
            description: "URL to the live project or case study.",
        }),
        defineField({
            name: "wip",
            title: "Work In Progress",
            type: "boolean",
            initialValue: false,
            group: "content",
        }),
        defineField({
            name: "galleryItems",
            title: "Gallery Images",
            type: "array",
            validation: (Rule) => Rule.max(6),
            of: [
                {
                    type: "object",
                    title: "Gallery Item",
                    fields: [
                        defineField({
                            name: "images",
                            title: "Images",
                            type: "array",
                            of: [
                                defineArrayMember({
                                    type: "image",
                                    options: {
                                        hotspot: true,
                                    },
                                    fields: [
                                        defineField({
                                            name: "alt",
                                            type: "string",
                                            title: "Alternative Text",
                                            description:
                                                "Important for SEO and accessibility.",
                                        }),
                                    ],
                                }),
                            ],
                            validation: (Rule) => Rule.required().max(4),
                        }),
                    ],
                    preview: {
                        select: {
                            images: 'images',
                            index: 'index',
                        },
                        prepare({ images }) {
                            return {
                                title: `Gallery Img`,
                                media: images?.[0]
                            };
                        },
                    },
                }
            ]
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            group: "content",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            group: "content",
        }),
        defineField({
            name: "team",
            title: "Team",
            type: "text",
            group: "content",
        }),
        defineField({
            name: "context",
            title: "Context",
            type: "text",
            group: "content",
        }),
        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            group: "seo",
        }),
        defineField({
        name: "metaDescription",
        title: "Meta Description",
        type: "text",
        group: "seo",
        }),
        defineField({
            name: "noIndex",
            title: "No Index",
            type: "boolean",
            initialValue: false,
            group: "seo",
        }),
        defineField({
            name: "ogImage",
            title: "Open Graph Image - [1200x630]",
            type: "image",
            group: "seo",
        }),
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
    ],
    preview: {
        select: {
        language: "language",
        media: "ogImage",
        title: "title",
        },
        prepare({ language, media, title }) {
        return {
            title: `${title} (${language?.toUpperCase()})`,
            media: media,
        };
        },
    },

});