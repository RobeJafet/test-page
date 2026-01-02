type LocalePage =  'en' | 'es';

type Section = {
  _type: string;
  _key: string;
};

interface Asset {
  _id: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    blurHash: string;
  }
}

type Image = {
    _key: string;
    alt: string;
    asset: Asset;
    hotspot?: { x: number; y: number; height: number; width: number };
};

type Translation = {
  en: {
    slug: string;
    type: "page" | "project" | "home";
  };
  es: {
    slug: string;
    type: "page" | "project" | "home";
  };
};

type InternalLink = {
  _type: string;
  slug: string;
  language: string;
  pageTitle?: string;
};

type Link = {
  _type?: "link";
  _key?: string;
  linkType: string;
  href?: string;
  label?: string;
  page?: InternalLink;
  inNewTab?: boolean;
  children?: React.ReactNode;
  className?: string;
  scramble?: boolean;
  onClickAction?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type Button = {
  _type?: "link";
  _key?: string;
  linkType: string;
  href?: string;
  label?: string;
  page?: InternalLink;
  inNewTab?: boolean;
  className?: string;
  scramble?: boolean;
  label?: string;
  onClickAction?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  dotOrArrow?: "dot" | "arrow";
  whiteOrGray?: "white" | "gray";
}

type SeoMetadata = {
  metaTitle: string;
  metaDescription?: string;
  ogImage?: Image;
  noIndex: boolean;
  language: LocalePage;
};

type Page ={
  readonly _type: "page";
  title?: string;
  slug?: { current: string };
  sections?: Section[];
  metadata?: SeoMetadata;
};

type Home =  {
  readonly _type: "home";
  metadata?: SeoMetadata;
  sections?: Section[];
};

type Project = {
  readonly _type: "project";
  metadata?: SeoMetadata;
  title?: string;
  slug?: { current: string };
  linkProject?: Link;
  excerpt?: string;
  wip?: boolean;
  team?: string;
  context?: string;
  galleryItems: {
    _key: string;
    images: Image[];
  }[];
};

type ProjectThumbnail = {
    _key: string;
    _id: string;
    title: string;
    date: string;
    services: string;
    language: LocalePage;
    slug: { current: string };
    thumbnail: Image;
}
