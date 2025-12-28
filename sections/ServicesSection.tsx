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
                        <div className="text-center lg:text-start px-8 md:px-0 lg:pl-8 sticky top-[104px]">
                            <p className="detail ">{headline}</p>
                            <h2 className="h1 pt-2">{title}</h2>
                            <div className="flex justify-center lg:justify-start pt-green">
                                <LinkComponent
                                    {...link}
                                    className="bg-gray py-[8px] px-[12px] md:px-6 flex items-center gap-4 rounded-[50px]"
                                >
                                    <span className="dot"></span>
                                    <p className="detail">{link.label}</p>
                                </LinkComponent>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-10/12 lg:w-6/12 lg:ml-auto">
                        <div className="flex flex-col px-8 md:px-0 lg:pr-8 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="bg-gray p-8 md:p-12 rounded-[20px]">
                                    <div className="lg:w-[88.984%]">
                                        <h3 className="detail text-center md:text-start">{service.name}</h3>
                                        <p className="pt-2">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}