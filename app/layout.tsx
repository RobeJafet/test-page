import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const SuisseIntl = localFont({
    src: "../fonts/SuisseIntlMono-Regular.woff2",
    variable: "--font-suisse-intl",
});

const FormaDJR = localFont({
    src: "../fonts/FormaDJRDisplay-Medium.woff2",
    variable: "--font-forma-djr",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`
                    ${SuisseIntl.variable} 
                    ${FormaDJR.variable} 
                    antialiased 
                    flex 
                    flex-col`
                }
            >
                {children}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
