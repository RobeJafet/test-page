
import LinkComponent from "@/components/LinkComponent";

type Footer = {
   footerSitemap: Link[];
    footerSocial: Link[];
    footerLegal: Link[];

};

export default function Footer({ footerSitemap, footerSocial, footerLegal }: Footer) {
    return (
        <footer>
            <div className="container ">
                <div className="bg-gray py-20 md:py-12 rounded-[20px] mb-4 md:mb-6 lg:mb-8 ">
                    <div className="row justify-center md:justify-start">
                        <div className="w-8/12 md:w-4/12 lg:w-3/12">
                            <div className=" md:pl-12 flex flex-col items-start h-full">
                                <img className="w-full md:w-auto md:h-12 lg:h-[42px] " src="/TestLogoOff.svg" alt="Logo test" />
                                <div className="pt-yellow mt-auto hidden md:block">
                                    <p className="detail">
                                        Test Studio ©
                                    </p>
                                </div>
                            </div>
                        </div>  
                        <div className="w-1/12 hidden md:block">
                            <div className="flex flex-col h-full lg:items-end">
                                <img className="w-8 h-8" src="/threeDots.svg" alt="Three dots" />
                                <img className="w-8 h-8 rotate-270 mt-auto" src="/threeDots.svg" alt="Three dots" />
                            </div>
                        </div>
                        <div className="w-1/12 hidden lg:block"></div>
                        <div className="w-3/12 detail hidden md:flex flex-col">
                            <p>Social</p>
                            <div className="flex flex-col items-start mt-4">
                                {footerSocial?.map((link) => (
                                    <LinkComponent key={link._key} {...link}>
                                        {link.label}
                                    </LinkComponent>
                                ))}
                            </div>
                            <div className="pt-red mt-auto">
                                {footerLegal?.[0] && (
                                    <LinkComponent key={footerLegal[0]._key} {...footerLegal[0]}>
                                        {footerLegal[0].label}
                                    </LinkComponent>
                                )}
                            </div>
                        </div>
                        <div className="w-1/12  flex-col hidden lg:flex">
                            <div className="flex flex-col h-full ">
                                <img className="w-8 h-8" src="/threeDots.svg" alt="Three dots" />
                                <img className="w-8 h-8 rotate-270 mt-auto" src="/threeDots.svg" alt="Three dots" />
                            </div>
                        </div>
                        <div className="md:w-3/12 lg:w-2/12 detail hidden md:flex flex-col">
                            <p>Sitemap</p>
                            <div className="flex flex-col items-start mt-4">
                                {footerSitemap?.map((link) => (
                                    <LinkComponent key={link._key} {...link}>
                                        {link.label}
                                    </LinkComponent>
                                ))}
                                
                            </div>
                            <div className="pt-red mt-auto">
                                {footerLegal?.[1] && (
                                    <LinkComponent key={footerLegal[1]._key} {...footerLegal[1]}>
                                        {footerLegal[1].label}
                                    </LinkComponent>
                                )}
                            </div>
                        </div>
                        <div className="w-auto flex-1 lg:flex-none lg:w-1/12 hidden md:block">
                            <div className="pr-8 flex flex-col h-full items-end">
                                <img className="w-8 h-8 rotate-90" src="/threeDots.svg" alt="Three dots" />
                                <img className="w-8 h-8 rotate-180 mt-auto" src="/threeDots.svg" alt="Three dots" />
                            </div>
                        </div>
                        <div className="w-full detail block md:hidden">
                            <div className="px-16">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="text-center py-8 mt-yellow relative">
                                        <p>Social</p>
                                        <div className="flex flex-col pt-2 items-center">
                                            {footerSocial?.map((link) => (
                                                <LinkComponent key={link._key} {...link}>
                                                    {link.label}
                                                </LinkComponent>
                                            ))}
                                        </div>
                                        <img className="w-8 h-8 absolute top-0 left-0 -translate-x-full" src="/threeDots.svg" alt="Three dots" />
                                        <img className="w-8 h-8 rotate-270 absolute bottom-0 -translate-x-full" src="/threeDots.svg" alt="Three dots" />
                                        <img className="w-8 h-8 rotate-90 absolute top-0 right-0 translate-x-full" src="/threeDots.svg" alt="Three dots" />
                                    </div>
                                    <div className="text-center py-8 mt-yellow relative">
                                        <p>Sitemap</p>
                                        <div className="flex flex-col pt-2 items-center">
                                            {footerSitemap?.map((link) => (
                                                <LinkComponent key={link._key} {...link}>
                                                    {link.label}
                                                </LinkComponent>
                                            ))}
                                            <img className="w-8 h-8 rotate-270 absolute bottom-0 left-0 -translate-x-full" src="/threeDots.svg" alt="Three dots" />
                                            <img className="w-8 h-8 rotate-90 absolute top-0 right-0 translate-x-full" src="/threeDots.svg" alt="Three dots" />
                                            <img className="w-8 h-8 rotate-180 absolute bottom-0 right-0 translate-x-full" src="/threeDots.svg" alt="Three dots" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-red">
                                <div className="text-center">
                                    Test Studio ©
                                </div>
                                <div className="flex justify-center gap-8">
                                    {footerLegal?.map((link) => (
                                        <LinkComponent key={link._key} {...link}>
                                            {link.label}
                                        </LinkComponent>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}