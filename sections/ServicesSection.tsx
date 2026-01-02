import AnimateOnView from "@/components/AnimateOnView";
import Button from "@/components/Button";
import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";

type ServicesSection = {
    headline: string;
    title: string;
    link: Link,
    services: {
        name: string;
        description: string;
    }[];
};

export default function ServicesSection({headline, title, link, services}: ServicesSection) {
    return (
        <section>
            <div className="container">
                <div className="row justify-center lg:justify-start gap-y-yellow">
                    <div className="w-full md:w-8/12 lg:w-5/12">
                        <AnimateOnView className="text-center lg:text-start px-8 md:px-0 lg:pl-8 sticky top-[104px]">
                            <div className="flex flex-col animate">
                                <p className="detail ">{headline}</p>
                                <h2 className="h1 pt-2">{title}</h2>
                            </div>
                            <div className="flex justify-center lg:justify-start pt-green animate">
                                <Button {...link}
                                    whiteOrGray="gray"
                                    dotOrArrow="dot"
                                />
                            </div>
                        </AnimateOnView>
                    </div>
                    <div className="w-full md:w-10/12 lg:w-6/12 lg:ml-auto">
                        <AnimateOnView className="flex flex-col px-8 md:px-0 lg:pr-8 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="bg-gray p-8 md:p-12 rounded-[20px] animate">
                                    <div className="lg:w-[88.984%]">
                                        <h3 className="detail text-center md:text-start">{service.name}</h3>
                                        <p className="pt-2">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </AnimateOnView>
                    </div>
                </div>
            </div>
        </section>
    );
}