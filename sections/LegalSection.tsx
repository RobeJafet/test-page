import ImageComponent from "@/components/ImageComponent";
import LinkComponent from "@/components/LinkComponent";

import PortableTextRenderer from "@/components/PortableTextRenderer";
import { PortableTextBlock } from "next-sanity";

type LegalSection = {
    title?: string;
    blockContent?: PortableTextBlock[];
    updatedAt?: string;
};

export default function LegalSection({ title, blockContent, updatedAt }: LegalSection) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}.${day}.${year}`;
    };

    return (
        <section>
            <div className="container">
                <div className="row justify-center mt-yellow">
                    <div className="w-10/12 lg:w-6/12 text-center">
                        <p className="detail">Updated at {formatDate(updatedAt)}</p>
                        <h2 className="h1 pt-2">{title}</h2>
                        <div className="text-start content-legal mt-blue">
                            { blockContent && 
                                <PortableTextRenderer value={blockContent} />
                            }
                        </div>
                       
                    </div>
                </div>
            </div>
        </section>
    );
}