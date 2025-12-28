import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";

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
                    <div className="md:w-10/12 lg:w-5/12 lg:mb-8">
                        <div className="flex flex-col px-8 md:pl-8 md:pr-0 lg:mt-8 h-full">
                            <p className="detail text-center md:text-left">{headline}</p>
                            <h2 className="h1 pt-2 text-center md:text-left">
                                {title}
                            </h2>
                            <p className="mt-auto pt-green ">
                                {description}
                            </p>
                            {
                                link && (
                                    <div className="flex mt-orange  justify-center md:justify-start">
                                        <LinkComponent {...link} className="bg-gray py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]">
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
                    <div className="w-6/12 lg:w-3/12 ml-auto mt-8">
                        {images[0].asset && (
                            <div className="pl-8">
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
                    </div>
                    <div className="w-6/12 lg:w-3/12 lg:mr-8 mt-8">
                        {images[1].asset && (
                            <div className="pr-8 lg:pr-0">
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
                    </div>
                </div>
            </div>
       </section>
    )
}