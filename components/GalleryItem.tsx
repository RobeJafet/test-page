'use client'

import ImageComponent from "./ImageComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper/types';
import {  Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function GalleryItem({item, sizes, priority = false}: {item: Image[], sizes: string, priority?: boolean}) {
    const [isInView, setIsInView] = useState(false);
    const swiperRef = useRef<HTMLDivElement>(null);
    const swiperInstance = useRef<SwiperCore | null>(null);
    

    useEffect(() => {
        if (!swiperRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        if (swiperInstance.current?.autoplay) {
                            swiperInstance.current.autoplay.start();
                        }
                    } else {
                        setIsInView(false);
                        if (swiperInstance.current?.autoplay) {
                            swiperInstance.current.autoplay.stop();
                        }
                    }
                });
            },
            { threshold: 0, rootMargin: '0px 0px 100px 0px ' }
        );

        observer.observe(swiperRef.current);

        return () => {
            if (swiperRef.current) {
                observer.unobserve(swiperRef.current);
            }
        };
    }, []);

    if (!item || item.length === 0) {
        return null;
    } else if (item.length === 1) {
        return (
                <ImageComponent image={item[0]} sizes={sizes} optionalAlt="Image Gallery" loading={priority ? 'eager' : 'lazy'} />
        );
    } else {
        return (
            <div ref={swiperRef} className="w-full">
                <Swiper
                    className="w-full"
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    speed={700}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    style={{
                        ['--swiper-wrapper-transition-timing-function' as string]: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    onSwiper={(swiper) => {
                        swiperInstance.current = swiper;
                        swiper.autoplay.stop();
                    }}
                >
                    {item.map((img) => (
                        <SwiperSlide key={img._key} className="h-auto!">
                            <ImageComponent image={img} sizes={sizes} optionalAlt="Image Gallery" classContainer="h-full!" classImg="h-full! object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    }
}