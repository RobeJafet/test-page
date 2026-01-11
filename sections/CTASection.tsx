import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";
import AnimateOnView from "@/components/AnimateOnView";
import Button from "@/components/Button";

type CTASection = {
    headline?: string;
    title?: string;
    link: Link;
    backgroundImage?: Image;
};

export default function AboutUsSection({headline, title, link, backgroundImage}: CTASection) {
    return (
        <section>
            <AnimateOnView className="container">
                <div className="px-8">
                    <div className="flex flex-col relative">
                        {backgroundImage?.asset && (
                            <ImageComponent
                                image={backgroundImage}
                                optionalAlt="CTA background image"
                                sizes="100vw"
                                classContainer="h-[315px] md:h-[420px] lg:h-[600px] animate"
                                classImg="object-cover w-full h-full "
                            />
                        )}
                        <div className="absolute w-full h-full top-0 left-0">
                            <div className="row items-center h-full justify-center">
                                <div className="lg:w-6/12 flex flex-col justify-center text-white text-center">
                                    <div className="px-8 md:px-0 animate">
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
                                <div className="flex justify-center absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate">
                                    <Button {...link}
                                        whiteOrGray="gray"
                                        dotOrArrow="dot"
                                    />
                                </div>
                               
                            )
                        }
                    </div>
                </div>
            </AnimateOnView>
        </section>
    );
}