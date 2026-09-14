'use client';

import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {
    ShoppingBag,
    Search,
    User,
    Sun,
    Moon,
    Home,
    Grid2X2,
    Heart,
} from 'lucide-react';

import {useTheme} from 'next-themes';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import Logo from '@/components/logo';
import {cn} from '@/lib/utils';
import {UserDropdownMenu} from '@/store/components/ui/user-dropdown-menu';

const navItems = [
    {label: 'تیشرت', href: '#home'},
    {label: 'هودی', href: '#products'},
    {label: 'ماگ', href: '#latest'},
    {label: 'ورزش و سلامت', href: '#latest'},
    {label: 'سؤالات متداول', href: '#faq'},
];

export default function Header() {
    const {theme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

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
                        container mx-auto
                        flex w-full
                        items-start justify-between
                        gap-3
                        px-4 pt-4 pb-3
                        sm:px-6
                    "
                >
                    {/* =========================
                        Logo + Search + Navigation
                    ========================== */}
                    <div
                        className="
                            flex min-w-0 flex-1
                            items-start
                            gap-3
                            md:gap-10
                        "
                    >
                        {/* Logo */}
                        <button
                            type="button"
                            onClick={() => handleNavigation('#home')}
                            className="
                                mt-1
                                shrink-0
                                cursor-pointer
                            "
                            aria-label="خانه"
                        >
                            <Logo/>
                        </button>

                        {/* Search + Navigation */}
                        <div className="min-w-0 flex-1">
                            {/* Search */}
                            <div className="relative w-full">
                                <Search
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        z-10
                                        size-4
                                        -translate-y-1/2
                                        text-muted-foreground
                                    "
                                />

                                <Input
                                    id="search-input"
                                    type="text"
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        bg-white/5
                                        pr-9
                                        text-right
                                    "
                                    placeholder="جستجو در همه محصولات"
                                />
                            </div>

                            {/* Navigation */}
                            <nav
                                className="
        mt-3
        hidden
        w-full
        items-center
        gap-2
        overflow-x-auto
        pb-1
        md:flex
        md:mt-4
        md:gap-10
        md:overflow-visible
        md:pb-0
    "
                                style={{
                                    scrollbarWidth: 'none',
                                }}
                            >
                                {navItems.map((item) => {
                                    const sectionName =
                                        item.href.replace('#', '');

                                    const isActive =
                                        activeSection === sectionName;

                                    return (
                                        <motion.button
                                            key={item.label}
                                            type="button"
                                            whileTap={{scale: 0.95}}
                                            onClick={() =>
                                                handleNavigation(item.href)
                                            }
                                            className={cn(
                                                `
                                                    shrink-0
                                                    whitespace-nowrap
                                                    text-sm
                                                    font-medium
                                                    transition-colors
                                                `,
                                                `
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                    hover:bg-muted
                                                    md:rounded-none
                                                    md:px-0
                                                    md:py-1
                                                    md:hover:bg-transparent
                                                `,
                                                isActive
                                                    ? 'text-indigo-600 dark:text-indigo-400'
                                                    : 'text-muted-foreground hover:text-foreground'
                                            )}
                                        >
                                            {item.label}
                                        </motion.button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* =========================
                        Desktop Actions
                    ========================== */}
                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-1
                            pt-1
                            sm:gap-2
                        "
                    >
                        {/* Social / extra buttons */}
                        <div className="hidden items-center gap-1 sm:flex">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-9 rounded-full"
                                aria-label="جستجو"
                                onClick={() => {
                                    document
                                        .getElementById('search-input')
                                        ?.focus();
                                }}
                            >
                                <Search className="size-4"/>
                            </Button>
                        </div>

                        {/* User */}
                        <div className="hidden sm:block">
                            <UserDropdownMenu/>
                        </div>

                        {/* Cart */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-full"
                            aria-label="سبد خرید"
                        >
                            <ShoppingBag className="size-5"/>
                        </Button>

                        {/* Theme */}
                        {mounted && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="
                                    hidden
                                    size-9
                                    rounded-full
                                    sm:inline-flex
                                "
                                aria-label="تغییر تم"
                                onClick={() =>
                                    setTheme(
                                        theme === 'dark'
                                            ? 'light'
                                            : 'dark'
                                    )
                                }
                            >
                                {theme === 'dark' ? (
                                    <Sun className="size-5"/>
                                ) : (
                                    <Moon className="size-5"/>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </motion.header>

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
                {/* خانه */}
                <button
                    type="button"
                    onClick={() => handleNavigation('#home')}
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
                </button>

                {/* دسته‌بندی */}
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

                {/* علاقه‌مندی */}
                <button
                    type="button"
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

                {/* حساب */}
                <button
                    type="button"
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
                </button>
            </nav>
        </>
    );
}