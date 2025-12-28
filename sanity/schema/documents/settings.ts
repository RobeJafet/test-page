import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
    name: "settings",
    type: "document",
    title: "Settings",
    groups: [
        {
            name: 'header',
            title: 'Header Settings',
        },
        {
            name: 'footer',
            title: 'Footer Settings',
        },
    ],
    fields: [
        defineField({
            name: 'headerNavigation',
            title: 'Header Navigation',
            type: 'array',
            of: [
                {
					type: 'link',
				},
            ],
            options: {
                insertMenu: {
                  views: [
                    { name: 'list' },
                  ]
                }
            },
            group: 'header',
        }),
        defineField({
            name: 'footerSitemap',
            title: 'Footer Sitemap',
            type: 'array',
            of: [
                {
					type: 'link',
				},
            ],
            options: {
                insertMenu: {
                  views: [
                    { name: 'list' },
                  ]
                }
            },
            group: 'footer',
        }),
        defineField({
            name: 'footerSocial',
            title: 'Footer Social Links',
            type: 'array',
            of: [
                {
					type: 'link',
				},
            ],
            options: {
                insertMenu: {
                  views: [
                    { name: 'list' },
                  ]
                }
            },
            group: 'footer',
        }),
        defineField({
            name: 'footerLegal',
            title: 'Footer Legal',
            type: 'array',
            of: [
                {
					type: 'link',
				},
            ],
            options: {
                insertMenu: {
                  views: [
                    { name: 'list' },
                  ]
                }
            },
            validation: (Rule) => Rule.max(2).error('You can only add up to 2 legal links.'),
            group: 'footer',
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
            title: "title",
            language: "language",
        },
        prepare(selection) {
            const { language } = selection;
            return {
                title: `Settings Page (${language?.toUpperCase()})`,
            };
        },
    },

});