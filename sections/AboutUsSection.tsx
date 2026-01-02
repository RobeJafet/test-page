import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";
import AnimateOnView from "@/components/AnimateOnView";

type AboutUsSection = {
    headline?: string;
    title?: string;
    mailLink: Link;
    telLink?: Link;
    imageItems?: Image[];
};

export default function AboutUsSection({headline, title, mailLink, telLink, imageItems}: AboutUsSection) {
    return (
        <section>
            <div className="container">
                <AnimateOnView className="row mt-yellow " >
                    <div className="w-full md:w-4/12 lg:w-3/12 animate">
                        <div className="px-8 md:pr-0 flex flex-col items-center md:items-start">
                            <h1 className="detail">{headline}</h1>
                            {mailLink && (
                                <LinkComponent
                                    {...mailLink}
                                    className="detail opacity-50"
                                >
                                    {mailLink.label}
                                </LinkComponent>
                            )}
                            {telLink && (
                                <LinkComponent
                                    {...telLink}
                                    className="detail opacity-50"
                                >
                                    {telLink.label}
                                </LinkComponent>
                            )}
                        </div>
                    </div>
                    <div className=" md:w-8/12 pt-blue md:pt-0! animate">
                        <div className="md:pr-8 lg:pr-0">
                            <p className="h1 text-center md:text-start">{title}</p>
                        </div>
                    </div>
                </AnimateOnView>
                {imageItems && (
                    <AnimateOnView className="row pt-8 mt-blue  md:justify-end pb-8">
                        {imageItems[0].asset && (
                            <div className="w-6/12 md:w-8/12 lg:w-6/12  px-0! md:px-4! ml-12 md:ml-0 ">
                                <div className="pr-4 md:pr-0 md:pl-8 lg:pl-0">
                                    <div className="relative animate">
                                        <ImageComponent
                                            image={imageItems[0]}
                                            optionalAlt="About us image 1"
                                            sizes="(max-width: 768px) 80vw, 50vw"
                                            loading="eager"
                                        />
                                        <img
                                            className="w-8 h-8 absolute top-0 left-0 -translate-full "
                                            src="/threeDots.svg"
                                            alt="Three decorative dots"
                                        />
                                        <img
                                            className="w-8 h-8 absolute bottom-0 left-0 rotate-270 translate-y-full -translate-x-full "
                                            src="/threeDots.svg"
                                            alt="Three decorative dots"
                                        />
                                        <img
                                            className="w-8 h-8 absolute bottom-0 right-0 rotate-180 translate-y-full translate-x-full hidden md:block"
                                            src="/threeDots.svg"
                                            alt="Three decorative dots"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {imageItems[1].asset && (
                            <div className="w-auto flex-1 md:flex-none md:w-4/12 lg:w-3/12 ">
                                <div className="pr-8">
                                    <div className="relative animate">
                                        <ImageComponent
                                            image={imageItems[1]}
                                            optionalAlt="About us image 2"
                                            sizes="(max-width: 768px) 40vw, 25vw"
                                        />
                                        <img
                                            className="w-8 h-8 absolute top-0 right-0 -translate-full translate-x-full rotate-90"
                                            src="/threeDots.svg"
                                            alt="Three decorative dots"
                                        />
                                        <img
                                            className="w-8 h-8 absolute bottom-0 right-0 rotate-180 translate-y-full translate-x-full"
                                            src="/threeDots.svg"
                                            alt="Three decorative dots"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </AnimateOnView>
                )}
            </div>
        </section>
    );
}