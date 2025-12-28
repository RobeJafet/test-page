import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";

type CTASection = {
    headline?: string;
    title?: string;
    link: Link;
    backgroundImage?: Image;
};

export default function AboutUsSection({headline, title, link, backgroundImage}: CTASection) {
    return (
        <section>
            <div className="container">
                <div className="px-8">
                    <div className="flex flex-col relative">
                        {backgroundImage?.asset && (
                            <ImageComponent
                                image={backgroundImage}
                                optionalAlt="CTA background image"
                                sizes="100vw"
                                classContainer="h-[315px] md:h-[420px] lg:h-[600px]"
                                classImg="object-cover w-full h-full"
                            />
                        )}
                        <div className="absolute w-full h-full top-0 left-0">
                            <div className="row items-center h-full justify-center">
                                <div className="lg:w-6/12 flex flex-col justify-center text-white text-center">
                                    <div className="px-8 md:px-0">
                                        <p className="detail">
                                            {headline}
                                        </p>
                                        <h3 className="h1 pt-2">
                                            {title}
                                        </h3>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        {
                            link && (
                                <div className="flex justify-center absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 ">
                                    <LinkComponent {...link}
                                        className="bg-gray py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]">
                                        <span className="dot"></span>
                                        <p className="detail">
                                            {link.label}
                                        </p>
                                    </LinkComponent>  
                                </div>  
                               
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}