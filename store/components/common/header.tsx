'use client';

import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {
    ShoppingCart,
    Search,
    User,
    Sun,
    Moon,
    Home,
    Grid2X2,
    Heart,
} from 'lucide-react';

import {useTheme} from 'next-themes';

import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import Logo from '@/components/logo';
import {cn} from '@/lib/utils';
import {UserDropdownMenu} from '@/store/components/ui/user-dropdown-menu';
import {StoreClientWishlistSheet} from '@/store/components/sheets/wishlist-sheet';
import { AuthButton } from '@/store/components/ui/auth-button';

const navItems = [
    {label: 'تیشرت', href: '#home'},
    {label: 'هودی', href: '#products'},
    {label: 'ماگ', href: '#latest'},
    {label: 'ورزش و سلامت', href: '#latest'},
];

export default function Header() {
    const {theme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [wishlistOpen, setWishlistOpen] = useState(false);

    useEffect(() => {
        setMounted(true);

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

        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        const sectionName = href.replace('#', '');
        setActiveSection(sectionName);
    };

    return (
        <>
            {/* =========================
                Desktop / Mobile Header
            ========================== */}
            <motion.header
                initial={{y: -100}}
                animate={{y: 0}}
                transition={{duration: 0.5}}
                className={cn(
                    'fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300',
                    isScrolled
                        ? 'border-border/50 bg-background/95 shadow-sm backdrop-blur-xl'
                        : 'border-transparent bg-background/80 backdrop-blur-lg'
                )}
            >
                <div
                    className="
    relative mx-auto
    flex w-full items-center
    gap-3 px-4 py-5 sm:px-6
  "
                >
                    {/* Logo + Navigation + Search */}
                    <div className="flex w-full min-w-0 items-center gap-4 pl-36 sm:pl-40 md:gap-6">

                        {/* Logo */}
                        <Link
                            href="/landing-v2"
                            className="shrink-0"
                            aria-label="خانه"
                        >
                            <Logo/>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex shrink-0 items-center gap-5 md:gap-8 lg:gap-10">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.label}
                                    type="button"
                                    onClick={() => handleNavigation(item.href)}
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{
                                        delay: (index + 1) * 0.08,
                                        duration: 0.3,
                                    }}
                                    className={cn(
                                        "group relative whitespace-nowrap py-2 text-base font-medium transition-colors",
                                        activeSection === item.href.replace("#", "")
                                            ? "text-indigo-600 dark:text-indigo-400"
                                            : "text-foreground hover:text-indigo-600 dark:hover:text-indigo-400"
                                    )}
                                >
                                    {item.label}

                                    <span
                                        className={cn(
                                            "absolute bottom-0 right-0 h-0.5 bg-indigo-600 transition-all duration-300 dark:bg-indigo-400",
                                            activeSection === item.href.replace("#", "")
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        )}
                                    />
                                </motion.button>
                            ))}
                        </nav>

                        {/* Search */}
                        <div className="relative mr-auto min-w-0 w-full max-w-[480px] flex-1">
                            <Search
                                className="absolute right-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"/>

                            <Input
                                id="search-input"
                                type="text"
                                className="h-12 w-full rounded-md border-0 !bg-white/5 px-3 pr-9 text-right text-sm"
                                placeholder="جستجو"
                            />
                        </div>

                        <div className="md:ml-20">
                            <AuthButton/>
                        </div>


                    </div>

                    {/* Desktop Actions — چسبیده به لبه چپ صفحه */}
                    <div
                        className="
    absolute left-0 md:left-10 top-1/2 z-20
    flex -translate-y-1/2
    items-center gap-1
    sm:gap-2
  "
                    >


                        {/* My Orders */}
                        <Link href="/store/my-orders" aria-label="سفارشات من">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="
    size-9 rounded-full
    text-white
    transition-all duration-200
    hover:bg-indigo-50 hover:text-indigo-700
    dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300
"
                            >
                                <ShoppingCart className="size-5"/>
                            </Button>
                        </Link>

                        {/* Theme */}
                        {mounted && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="
    size-9 rounded-full
    text-white
    transition-all duration-200
    hover:bg-indigo-50 hover:text-indigo-700
    dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300
"
                                aria-label="تغییر تم"
                                onClick={() =>
                                    setTheme(theme === 'dark' ? 'light' : 'dark')
                                }
                            >
                                {theme === 'dark' ? (
                                    <Sun className="size-5"/>
                                ) : (
                                    <Moon className="size-5"/>
                                )}
                            </Button>
                        )}

                        {/* User */}
<div className="hidden sm:flex items-center">
    <UserDropdownMenu
        trigger={
            <Button
                type="button"
                variant="ghost"
                className="
                    flex size-9 items-center justify-center
                    rounded-full p-0
                    text-foreground
                    transition-colors duration-200
                    hover:bg-indigo-50
                    hover:text-indigo-700
                    dark:hover:bg-indigo-950/50
                    dark:hover:text-indigo-300
                "
                aria-label="حساب کاربری"
            >
                <User className="size-5 shrink-0" />
            </Button>
        }
    />
</div>
                    </div>
                </div>


            </motion.header>

            <StoreClientWishlistSheet
                open={wishlistOpen}
                onOpenChange={setWishlistOpen}
            />

            {/* =========================
                Mobile Bottom Navigation
            ========================== */}
            <nav
                className="
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
                "
            >

                {/* =========================
                    خانه → /landing-v2
                ========================== */}
                <Link
                    href="/landing-v2"
                    className={cn(
                        `
                            flex
                            flex-1
                            flex-col
                            items-center
                            justify-center
                            gap-1
                            transition-all
                            active:scale-95
                        `,
                        activeSection === 'home'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                    )}
                >
                    <Home className="size-5"/>

                    <span className="text-[11px] font-medium">
                        خانه
                    </span>
                </Link>

                {/* =========================
                    دسته‌بندی
                ========================== */}
                <button
                    type="button"
                    onClick={() => handleNavigation('#products')}
                    className={cn(
                        `
                            flex
                            flex-1
                            flex-col
                            items-center
                            justify-center
                            gap-1
                            transition-all
                            active:scale-95
                        `,
                        activeSection === 'products'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                    )}
                >
                    <Grid2X2 className="size-5"/>

                    <span className="text-[11px] font-medium">
                        دسته‌بندی
                    </span>
                </button>

                {/* =========================
                    علاقه‌مندی → Wishlist
                ========================== */}
                <button
                    type="button"
                    onClick={() => setWishlistOpen(true)}
                    className="
        flex
        flex-1
        flex-col
        items-center
        justify-center
        gap-1
        text-muted-foreground
        transition-all
        active:scale-95
    "
                >
                    <Heart className="size-5"/>

                    <span className="text-[11px] font-medium">
        علاقه‌مندی
    </span>
                </button>

                {/* =========================
                    حساب → User Profile
                ========================== */}
                <Link
                    href="/account/home/user-profile"
                    className="
                        flex
                        flex-1
                        flex-col
                        items-center
                        justify-center
                        gap-1
                        text-muted-foreground
                        transition-all
                        active:scale-95
                    "
                >
                    <User className="size-5"/>

                    <span className="text-[11px] font-medium">
                        حساب
                    </span>
                </Link>
            </nav>
        </>
    );
}

