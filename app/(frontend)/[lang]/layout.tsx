import { getDictionary } from "@/config/i18n/dictionaries";
import { I18nProvider } from "@/config/i18n/i18nProvider";
import { fetchSettings, fetchTranslations } from "@/sanity/services/fetchSetting";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";


export default async function LangLayout({
    children,
    params,
}: {
    readonly children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as LocalePage);
    const settings = await fetchSettings(lang as LocalePage);
    const translations = await fetchTranslations(lang as LocalePage);

    return (
        <I18nProvider lang={lang as LocalePage} dict={dict}>
            <Header
                lang={lang as LocalePage}
                translations={translations}
                headerNavigation={settings.headerNavigation}
            />
                
            <>{children}</>
            <Footer 
                footerSitemap={settings.footerSitemap} 
                footerSocial={settings.footerSocial} 
                footerLegal={settings.footerLegal} 
            />
        </I18nProvider>
    );
}
