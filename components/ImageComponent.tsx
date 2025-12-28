'use client'

import Image from "next/image";
import { blurHashToDataURL } from "@/lib/blurhashDataURL";
import { urlFor } from "@/sanity/lib/image";

interface ImageWithBlurProps {
    image: Image;
    sizes?: string;
    loading?: "lazy" | "eager";
    optionalAlt: string;
    classContainer?: string;
    classImg?: string;
    noBlur?: boolean;
}

export default function ImageComponent({ ...props  }: ImageWithBlurProps ) {
    const { image, sizes, loading, optionalAlt, classContainer = '', classImg = '', noBlur = false } = props;
    const width = image.asset.metadata.dimensions.width;
    const height = image.asset.metadata.dimensions.height;
    const blurhash = image.asset.metadata.blurHash;
    const base64Image = blurHashToDataURL(blurhash);

    let leftHotspot: number | undefined;
    let topHotspot: number | undefined;

    if (image.hotspot) {
        leftHotspot = image.hotspot.x - (image.hotspot.width / 2);
        topHotspot = image.hotspot.y + (image.hotspot.height / 2);
    }
    return (
        image.asset ? (
            <picture className={`relative w-full bg-cover bg-no-repeat block ${classContainer} `} style={ noBlur ? {backgroundColor: '#195F54'} : { backgroundImage: `url(${base64Image})` }}>
                <Image
                    src={urlFor(image).url()}
                    width={width}
                    height={height}
                    sizes={sizes}
                    alt={image.alt || optionalAlt}
                    loading={loading || "lazy"}
                    className={`w-full h-auto opacity-0 transition-opacity ${classImg} h-full`}
                    style={
                        image.hotspot && leftHotspot && topHotspot ? {
                            objectPosition: `${leftHotspot * 100}% ${topHotspot * 100}%`,
                            objectFit: 'cover'
                        } : undefined
                    }
                    quality={100}
                    blurDataURL={base64Image}
                    onLoad={(e) => {
                        e.currentTarget.classList.remove("opacity-0");
                        
                        // Remove background from picture element after delay
                        setTimeout(() => {
                            const pictureElement = e.currentTarget.parentElement as HTMLElement;
                            if (pictureElement) {
                                pictureElement.style.backgroundImage = 'none';
                                pictureElement.style.backgroundColor = 'transparent';
                            }
                        }, 500);
                    }}
                />
            </picture>
        ) : null
    );
}