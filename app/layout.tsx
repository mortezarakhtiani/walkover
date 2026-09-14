import {ReactNode} from 'react';
import {Metadata} from 'next';
import {ThemeProvider} from '@/providers/theme-provider';
import {TooltipProvider} from '@radix-ui/react-tooltip';
import {SettingsProvider} from '@/providers/settings-provider';

import {StoreClientProvider} from '@/store/components/context';
import {StoreClientWrapper} from '@/store/components/wrapper';

import {Toaster} from '@/components/ui/sonner';

import '@/styles/globals.css';

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
        <html
            lang="fa"
            dir="rtl"
            className="h-full"
            suppressHydrationWarning
        >
        <body className="antialiased text-base text-foreground bg-background">

        <SettingsProvider>
            <ThemeProvider>
                <TooltipProvider>

                    <StoreClientProvider>
                        <StoreClientWrapper>

                            {/*<GlobalHeader />*/}

                            <Toaster />

                            {children}

                        </StoreClientWrapper>
                    </StoreClientProvider>

                </TooltipProvider>
            </ThemeProvider>
        </SettingsProvider>

        </body>
        </html>
    );
}