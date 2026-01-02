import AnimateOnView from "@/components/AnimateOnView";

type HeroHomeSection = {
    headline: string;
    title: string;
};

export default function HeroHomeSection({ headline, title }: HeroHomeSection) {
    return (
        <section>
            <div className="container mt-12 md:mt-16 lg:mt-20 md:h-[75vh] lg:h-[calc(100vh-248px)] relative ">
                <div className="relative w-full h-full py-44 md:py-0">
                    <div className="row justify-center h-full items-center">
                        <div className="w-full md:w-10/12 lg:w-8/12 flex flex-col items-center text-center">
                            <div className="relative px-8 md:px-0">
                                <div className="row justify-center ">
                                    <div className=" md:w-[90.08%] lg:w-[87.283%]">
                                        <p className="detail">{headline}</p>
                                        <h1 className="h1 pt-2 ">{title}</h1>
                                    </div>
                                </div>
                                <AnimateOnView>
                                    <img
                                        className="w-8 h-8 absolute top-0 left-20 md:left-0 -translate-y-24 md:-translate-y-full "
                                        src="/threeDots.svg"
                                        alt="Three decorative dots"
                                    />
                                    <img
                                        className="w-8 h-8 absolute bottom-0 left-20 md:left-0 rotate-270 translate-y-24 md:translate-y-full "
                                        src="/threeDots.svg"
                                        alt="Three decorative dots"
                                    />
                                    <img
                                        className="w-8 h-8 absolute right-20 top-0 md:right-0 rotate-90 -translate-y-24  md:-translate-y-full"
                                        src="/threeDots.svg"
                                        alt="Three decorative dots"
                                    />
                                    <img
                                        className="w-8 h-8 absolute bottom-0 right-20 md:right-0 rotate-180 translate-y-24  md:translate-y-full"
                                        src="/threeDots.svg"
                                        alt="Three decorative dots"
                                    />
                                </AnimateOnView>
                            </div>
                        </div>
                    </div>
                    <AnimateOnView className="animate-delay-1000">
                        <img
                            className="w-8 h-8 absolute top-0 left-0"
                            src="/threeDots.svg"
                            alt="Three decorative dots"
                        />
                        <img
                            className="w-8 h-8 absolute bottom-0 left-0 rotate-270"
                            src="/threeDots.svg"
                            alt="Three decorative dots"
                        />
                        <img
                            className="w-8 h-8 absolute top-0 right-0 rotate-90"
                            src="/threeDots.svg"
                            alt="Three decorative dots"
                        />
                        <img
                            className="w-8 h-8 absolute bottom-0 right-0 rotate-180"
                            src="/threeDots.svg"
                            alt="Three decorative dots"
                        />
                        <img
                            className="w-8 h-8 absolute top-16 lg:top-8 right-1/2 translate-x-1/2 hidden md:block"
                            src="/fourDots.svg"
                            alt="Four decorative dots"
                        />
                        <img
                            className="w-8 h-8 absolute bottom-16 lg:bottom-8 right-1/2 translate-x-1/2 hidden md:block"
                            src="/fourDots.svg"
                            alt="Four decorative dots"
                        />
                    </AnimateOnView>

                    <AnimateOnView className="absolute left-0 top-1/2 -translate-y-1/2 w-full hidden lg:block animate-delay-500">
                        <div className="row justify-center">
                            <div className="w-10/12 flex justify-between">
                                <img
                                    className="w-8 h-8"
                                    src="/fourDots.svg"
                                    alt="Four decorative dots"
                                />
                                <img
                                    className="w-8 h-8"
                                    src="/fourDots.svg"
                                    alt="Four decorative dots"
                                />
                            </div>
                        </div>
                    </AnimateOnView>
                </div>
            </div>
        </section>
    );
}
