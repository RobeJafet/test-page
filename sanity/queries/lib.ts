import { groq } from "next-sanity";

export const IMG = groq`
  alt,
  hotspot{
    x, y, width, height
  },
  asset->{
    _id,
    metadata {
      dimensions,
      blurHash
    },
  }
`;

export const LINK = groq`
    _key,
    linkType,
    label,
    linkType == 'href' => {
      "href": href,
      label,
      inNewTab
    },
    linkType == 'page' => {
      "page": page->{
        _type,
        "pageTitle": title,
        "slug": slug.current,
        language
      }
    }
`;

export const METADATA = groq`
  "metadata": {
    metaTitle,
    metaDescription,
    noIndex,
    ogImage {
      asset->{
        _id,
        metadata {
          dimensions
        }
      }
    },
    language
  }
`;

export const TRANSLATION_QUERY = groq`
*[
    _type == "translation.metadata" &&
    count(schemaTypes[@ in ["page", "project"]]) > 0 &&
    defined(translations[_key == "en"][0].value->slug.current) &&
    defined(translations[_key == "es"][0].value->slug.current)
  ]{
    "en": {
      "slug": translations[_key == "en"][0].value->slug.current,
      "type": translations[_key == "en"][0].value->_type
    },
    "es": {
      "slug": translations[_key == "es"][0].value->slug.current,
      "type": translations[_key == "es"][0].value->_type
    }
  }
`

export const PAGE_SLUG = groq`
*[_type == "page" && defined(slug) && language==$lang ] {
    slug
  }
`;

export const PROJECT_SLUG = groq`
*[_type == "project" && defined(slug) && language==$lang ] {
    slug
  }
`;
