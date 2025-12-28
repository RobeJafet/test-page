import HeroHomeSection from "@/sections/HeroHomeSection";
import StudioSection from "@/sections/StudioSection";
import ServicesSection from "@/sections/ServicesSection";
import ApproachSection from "@/sections/ApproachSection";
import AboutUsSection from "@/sections/AboutUsSection";
import CTASection from "@/sections/CTASection";
import LegalSection from "@/sections/LegalSection";
import FeaturedProjectsSection from "@/sections/FeaturedProjectsSection";

const componentMap: {  [key: string]: React.ComponentType<any> } = {
  // Map section types to their corresponding components here
  // e.g., 'heroSection': HeroSectionComponent,
  "heroHome": HeroHomeSection,
  "studio": StudioSection,
  "services": ServicesSection,
  "approach": ApproachSection,
  "aboutUs": AboutUsSection,
  "cta": CTASection,
  "legal": LegalSection,
  "featuredProjects": FeaturedProjectsSection,
};

export default function Sections({ sections }: { sections?: Section[] }) {
  if (!sections || sections.length === 0) {
    return <p>No section included in this page</p>;
  }
  return (
    <>
      {sections.map((section: Section) => {
        const Component = componentMap[section._type];
        if (!Component) {
          return (
            <div data-type={section._type} key={section._key}>
              Unknown section type: {section._type}
            </div>
          );
        }
        return <Component {...section} key={section._key}  />;
      })}
    </>
  );
}
