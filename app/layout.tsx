import {ReactNode} from 'react';
// import {Inter} from 'next/font/google';
import {cn} from '@/lib/utils';
import {Metadata} from 'next';
import {ThemeProvider} from '@/providers/theme-provider';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import {SettingsProvider} from '@/providers/settings-provider';
// import SessionProviderWrapper from '@/providers/session-provider';
import '@/styles/globals.css';
import './store/store-theme.css';

// const inter = Inter({subsets: ['latin']});


export const metadata: Metadata = {
    title: {
        template: '%s | Metronic SaaS',
        default: 'Metronic SaaS',
    },
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl" className="h-full" suppressHydrationWarning>
        <body className="antialiased text-base text-foreground bg-background">
        <SettingsProvider>
            <ThemeProvider>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </ThemeProvider>
        </SettingsProvider>
        </body>
        </html>
    );
}