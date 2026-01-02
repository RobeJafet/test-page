import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";
import AnimateOnView from "@/components/AnimateOnView";
import Button from "@/components/Button";

type StudioSection = {
    headline: string;
    title: string;
    description: string;
    link: Link,
    images: Image[];
};

export default function StudioSection({headline, title, description, link, images }: StudioSection) {
    return(
       <section>
            <div className="container pb-8">
                <div className="row gap-y-blue ">
                    <AnimateOnView className="md:w-10/12 lg:w-5/12 lg:mb-8">
                        <div className="flex flex-col px-8 md:pl-8 md:pr-0 lg:mt-8 h-full">
                            <div className="flex flex-col animate">
                                <p className="detail text-center md:text-left">{headline}</p>
                                <h2 className="h1 pt-2 text-center md:text-left">
                                    {title}
                                </h2>
                            </div>
                            <p className="mt-auto pt-green animate">
                                {description}
                            </p>
                            {
                                link && (
                                    <div className="flex mt-orange  justify-center md:justify-start animate">
                                       <Button {...link}
                                            whiteOrGray="gray"
                                            dotOrArrow="dot"
                                        />
                                    </div>  
                                )
                            }
                        </div>
                    </AnimateOnView>
                    <AnimateOnView className="w-6/12 lg:w-3/12 ml-auto mt-8 ">
                        {images[0].asset && (
                            <div className="pl-8 ">
                                <div className="relative">
                                    <img className="absolute top-0 left-0 -translate-full w-8 h-8" src="/threeDots.svg" alt="Three Dots" />
                                    <img className="absolute top-full left-0  -translate-x-full rotate-270 w-8 h-8" src="/threeDots.svg" alt="Three Dots" />
                                    <ImageComponent 
                                        image={images[0]} 
                                        optionalAlt="Studio Section Image 1"
                                        sizes="50vw"
                                    />
                                </div>
                            </div>
                        )}
                    </AnimateOnView>
                    <AnimateOnView className="w-6/12 lg:w-3/12 lg:mr-8 mt-8 animate-delay-150">
                        {images[1].asset && (
                            <div className="pr-8 lg:pr-0  ">
                                <div className="relative">
                                    <ImageComponent 
                                        image={images[1]} 
                                        optionalAlt="Studio Section Image 2"
                                        sizes="50vw"
                                    />
                                    <img className="absolute top-0 right-0 rotate-90 -translate-y-full translate-x-full w-8 h-8" src="/threeDots.svg" alt="Three Dots"/>
                                    <img className="absolute top-full right-0 rotate-180 w-8 h-8 translate-x-full" src="/threeDots.svg" alt="Three Dots" />
                                    <img className="absolute top-full left-0  -translate-x-full rotate-270 w-8 h-8" src="/threeDots.svg" alt="Three Dots" />
                                </div>
                            </div>  
                        )}
                    </AnimateOnView>
                </div>
            </div>
       </section>
    )
}