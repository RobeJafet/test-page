import ImageComponent from "@/components/ImageComponent";

type ApproachSection = {
    headline: string;
    title: string;
    description: string;
    approchItem: {
        name: string;
        description: string;
        image: Image;
    }[];
};

export default function ApproachSection({headline, title, description, approchItem}: ApproachSection) {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="md:w-8/12 lg:w-6/12">
                        <div className="row">
                            <div className="lg:w-10/12 lg:ml-8">
                                <div className="px-8 md:pr-0 lg:pl-0 text-center md:text-start">
                                    <p className="detail">{headline}</p>
                                    <h2 className="h1 pt-2">{title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-10/12 lg:w-5/12 lg:ml-auto pt-green lg:pt-[37px]!">
                        <div className="px-8 md:pr-0 lg:pl-0">
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="w-1/12 hidden lg:block"></div>
                </div>
                <div className="row pt-8 mt-blue gap-y-8 pb-8">
                    {approchItem[0] && (
                        <div className="w-full md:w-6/12 lg:w-3/12 lg:ml-8">
                            <div className="aspect-square lg:aspect-auto mx-8 md:mr-0 lg:mx-0 relative">
                                <div className="absolute left-1/2 top-8 tag -translate-x-1/2 z-1">
                                    <span className="detail">01</span>
                                    <span className="detail">{approchItem[0].name}</span>
                                </div>
                                <ImageComponent
                                    image={approchItem[0].image}
                                    optionalAlt={`${approchItem[0].name}`}
                                    sizes="(max-width: 768px) 50vw, (min-width: 769px) 25vw, 100vw"
                                    classContainer="w-full h-full"
                                    classImg="object-cover w-full h-full"
                                />
                                <img
                                    className="w-8 h-8 absolute top-0 left-0 -translate-full "
                                    src="/threeDots.svg"
                                    alt="Three decorative dots"
                                />
                                <img
                                    className="w-8 h-8 absolute bottom-0 left-0 rotate-270 translate-y-full -translate-x-full hidden lg:block" 
                                    src="/threeDots.svg"
                                    alt="Three decorative dots"
                                />
                                <img
                                    className="w-8 h-8 absolute top-0 right-0 rotate-90 -translate-y-full translate-x-full md:hidden"
                                    src="/threeDots.svg"
                                    alt="Three decorative dots"
                                />
                                
                            </div>
                        </div>
                    )}
                    {approchItem[1] && (
                        <div className="w-full md:w-6/12 lg:w-auto lg:flex-1">
                            <div className="aspect-square lg:aspect-auto mx-8 md:ml-0 lg:mx-0 relative">
                                <div className="absolute left-1/2 top-8 tag -translate-x-1/2 z-1">
                                    <span className="detail">02</span>
                                    <span className="detail">{approchItem[1].name}</span>
                                </div>
                                <ImageComponent
                                    image={approchItem[1].image}
                                    optionalAlt={`${approchItem[1].name}`}
                                    sizes="(max-width: 768px) 50vw, (min-width: 769px) 25vw, 100vw"
                                    classContainer="w-full h-full"
                                    classImg="object-cover w-full h-full"
                                />
                                <img
                                    className="w-8 h-8 absolute top-0 right-0 rotate-90 -translate-y-full translate-x-full hidden md:block lg:hidden"
                                    src="/threeDots.svg"
                                    alt="Three decorative dots"
                                />
                                <img
                                    className="w-8 h-8 absolute bottom-0 right-0 rotate-180 translate-y-full translate-x-full hidden md:block lg:hidden"
                                    src="/threeDots.svg"
                                    alt="Three decorative dots"
                                />
                            </div>
                        </div>
                    )}
                    {approchItem[2] && (
                        <>
                            <div className="w-full md:w-6/12 lg:w-3/12">
                                <div className="aspect-square lg:aspect-auto mx-8 md:mr-0 lg:mx-0 relative">
                                    <div className="absolute left-1/2 top-8 tag -translate-x-1/2 z-1">
                                        <span className="detail">03</span>
                                        <span className="detail">{approchItem[2].name}</span>
                                    </div>
                                    <ImageComponent
                                        image={approchItem[2].image}
                                        optionalAlt={`${approchItem[2].name}`}
                                        sizes="(max-width: 768px) 50vw, (min-width: 769px) 25vw, 100vw"
                                        classContainer="w-full h-full"
                                        classImg="object-cover w-full h-full"
                                    />
                                    <img
                                        className="w-8 h-8 absolute bottom-0 left-0 rotate-270 translate-y-full -translate-x-full hidden md:block lg:hidden"
                                        src="/threeDots.svg"
                                        alt="Three decorative dots"
                                    />
                                </div>
                            </div>
                            <div className="md:w-6/12 lg:hidden hidden md:block"></div>
                        </>
                        
                        
                    )}
                    {approchItem[3] && (
                        <>
                            <div className=" md:w-6/12 lg:hidden hidden md:block"></div>
                            <div className="w-full md:w-6/12 lg:w-auto flex-1 lg:mr-8">
                                <div className="aspect-square lg:aspect-auto mx-8 md:ml-0 lg:mx-0 relative">
                                    <div className="absolute left-1/2 top-8 tag -translate-x-1/2 z-1">
                                        <span className="detail">04</span>
                                        <span className="detail">{approchItem[3].name}</span>
                                    </div>
                                    <ImageComponent
                                        image={approchItem[3].image}
                                        optionalAlt={`${approchItem[3].name}`}
                                        sizes="(max-width: 768px) 50vw, (min-width: 769px) 25vw, 100vw"
                                    />
                                    <img
                                        className="w-8 h-8 absolute  top-0 right-0 rotate-90 -translate-y-full translate-x-full hidden md:block"
                                        src="/threeDots.svg"
                                        alt="Three decorative dots"
                                    />
                                    <img
                                        className="w-8 h-8 absolute bottom-0 right-0 rotate-180 translate-full "
                                        src="/threeDots.svg"
                                        alt="Three decorative dots"
                                    />
                                     <img
                                        className="w-8 h-8 absolute bottom-0 left-0 rotate-270 translate-y-full -translate-x-full lg:hidden"
                                        src="/threeDots.svg"
                                        alt="Three decorative dots"
                                    />
                                </div>  
                               
                            </div>
                        </>
                        
                    )}
                </div>
            </div>
        </section>
    );
}