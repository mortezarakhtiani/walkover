
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import {
    User,
    Home,
    Grid2X2,
    Heart,
} from 'lucide-react';

import Link from 'next/link';

import Logo from '@/components/logo';
import { cn } from '@/lib/utils';

import { useStoreClient } from '@/store/components/context';


import { HeaderSearch } from '@/store/components/ui/header-search';
import { HeaderNavigation } from '@/store/components/ui/header-navigation';
import { HeaderDesktopActions } from '@/store/components/ui/header-desktop-actions';
import { AuthButton } from '@/store/components/ui/auth-button';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

const {
    state: {
        isWishlistSheetOpen,
        isCartSheetOpen,
        isProductDetailsSheetOpen,
    },
    openWishlistSheet,
} = useStoreClient();

const isAnySheetOpen =
    isWishlistSheetOpen ||
    isCartSheetOpen ||
    isProductDetailsSheetOpen;


    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavigation = (href: string) => {
        const target = document.querySelector(href);

        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        const sectionName = href.replace('#', '');
        setActiveSection(sectionName);
    };

    return (
        <>
            {/* Desktop / Mobile Header */}

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    'fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300',

                    isScrolled
                        ? 'border-border/50 bg-background/95 shadow-sm backdrop-blur-xl'
                        : 'border-transparent bg-background/80 backdrop-blur-lg',

                    isAnySheetOpen && 'max-md:hidden'
                )}
            >
                <div
                    className="
                        relative mx-auto
                        flex w-full items-center
                        gap-3 px-4 py-5 sm:px-6
                    "
                >
                    <div className="flex w-full min-w-0 items-center gap-4 pl-36 sm:pl-40 md:gap-6">

                        {/* Logo */}

                        <Link
                            href="/landing-v2"
                            className="shrink-0"
                            aria-label="خانه"
                        >
                            <Logo />
                        </Link>

                        {/* Desktop Navigation */}

                        <HeaderNavigation
                            activeSection={activeSection}
                            onNavigate={handleNavigation}
                        />

                        <HeaderSearch />

                        <div className="md:ml-20">
                            <AuthButton />
                        </div>
                    </div>

                    {/* Desktop Actions */}

                    <HeaderDesktopActions className="md:left-10" />
                </div>
            </motion.header>


            {/* Mobile Bottom Navigation */}

            <nav
                className={cn(
                    `
                        fixed
                        inset-x-0
                        bottom-0
                        z-[60]
                        flex
                        h-16
                        w-full
                        items-center
                        justify-around
                        border-t
                        border-border/50
                        bg-background/95
                        px-2
                        pb-[env(safe-area-inset-bottom)]
                        shadow-[0_-4px_20px_rgba(0,0,0,0.06)]
                        backdrop-blur-xl
                        md:hidden
                    `,
                    isAnySheetOpen && 'hidden'
                )}
            >
                {/* Home */}

                <Link
                    href="/landing-v2"
                    className={cn(
                        `
                            flex flex-1 flex-col
                            items-center justify-center
                            gap-1 transition-all active:scale-95
                        `,
                        activeSection === 'home'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                    )}
                >
                    <Home className="size-5" />

                    <span className="text-[11px] font-medium">
                        خانه
                    </span>
                </Link>

                {/* Categories */}

                <button
                    type="button"
                    onClick={() => handleNavigation('#products')}
                    className={cn(
                        `
                            flex flex-1 flex-col
                            items-center justify-center
                            gap-1 transition-all active:scale-95
                        `,
                        activeSection === 'products'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                    )}
                >
                    <Grid2X2 className="size-5" />

                    <span className="text-[11px] font-medium">
                        دسته‌بندی
                    </span>
                </button>

                {/* Wishlist */}

                <button
                    type="button"
                    onClick={openWishlistSheet}
                    className="
                        flex flex-1 flex-col
                        items-center justify-center
                        gap-1 text-muted-foreground
                        transition-all active:scale-95
                    "
                >
                    <Heart className="size-5" />

                    <span className="text-[11px] font-medium">
                        علاقه‌مندی
                    </span>
                </button>

                {/* Account */}

                <Link
                    href="/account/home/user-profile"
                    className="
                        flex flex-1 flex-col
                        items-center justify-center
                        gap-1 text-muted-foreground
                        transition-all active:scale-95
                    "
                >
                    <User className="size-5" />

                    <span className="text-[11px] font-medium">
                        حساب
                    </span>
                </Link>
            </nav>
        </>
    );
}

