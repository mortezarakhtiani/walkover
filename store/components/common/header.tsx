
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

import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import Logo from '@/components/logo';
import {cn} from '@/lib/utils';
import {UserDropdownMenu} from '@/store/components/ui/user-dropdown-menu';
import {StoreClientWishlistSheet} from '@/store/components/sheets/wishlist-sheet';

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
                        container mx-auto
                        flex w-full
                        items-start justify-between
                        gap-3
                        px-4 py-3
                        sm:px-6
                    "
                >
                    {/* =========================
                        Logo + Search
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
                        <Link
                            href="/landing-v2"
                            className="
                                mt-1
                                shrink-0
                                cursor-pointer
                            "
                            aria-label="خانه"
                        >
                            <Logo/>
                        </Link>

                        {/* Search */}
                        <div className="relative w-full max-w-[min(100%,28rem)]">
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
                                    h-9
                                    w-full
                                    rounded-xl
                                    bg-white/5
                                    pr-9
                                    pl-4
                                    text-right
                                    text-sm
                                "
                                placeholder="جستجو در همه محصولات"
                            />
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
                        <div className="hidden items-center gap-1 sm:flex">

                            {/* Search */}
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

                            {/* User */}
                            <UserDropdownMenu
                                trigger={
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="size-9 rounded-full"
                                        aria-label="حساب کاربری"
                                    >
                                        <User className="size-5"/>
                                    </Button>
                                }
                            />
                        </div>

                        {/* =========================
                            Cart → My Orders
                        ========================== */}
                        <Link
                            href="/store/my-orders"
                            aria-label="سفارشات من"
                        >
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-9 rounded-full"
                                asChild
                            >
                                <span>
                                    <ShoppingBag className="size-5"/>
                                </span>
                            </Button>
                        </Link>

                        {/* =========================
                            Theme
                        ========================== */}
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

