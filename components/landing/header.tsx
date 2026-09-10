'use client';

import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {
    Menu,
    ShoppingBag,
    Search,
    User,
    Sun,
    Moon,
} from 'lucide-react';
import {useTheme} from 'next-themes';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

import Logo from '@/components/logo';
import {cn} from '@/lib/utils';

const navItems = [
    {
        label: 'خانه',
        href: '#home',
    },
    {
        label: 'محصولات',
        href: '#products',
    },
    {
        label: 'جدیدترین‌ها',
        href: '#latest',
    },
    {
        label: 'سؤالات متداول',
        href: '#faq',
    },
];

const Header = () => {
    const {resolvedTheme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            setIsScrolled(scrollY > 30);

            const sections = navItems
                .map((item) => item.href.replace('#', ''))
                .map((id) => document.getElementById(id))
                .filter(
                    (section): section is HTMLElement =>
                        section !== null
                );

            if (sections.length === 0) {
                return;
            }

            const scrollPosition = scrollY + 180;

            let currentSection = 'home';

            for (const section of sections) {
                if (scrollPosition >= section.offsetTop) {
                    currentSection = section.id;
                }
            }

            setActiveSection(currentSection);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isActiveItem = (item: (typeof navItems)[number]) => {
        return activeSection === item.href.replace('#', '');
    };

    const handleNavigation = (href: string) => {
        setIsOpen(false);

        const target = document.querySelector(href);

        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <motion.header
            initial={{y: -80, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{
                duration: 0.5,
                ease: 'easeOut',
            }}
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-xl'
                    : 'bg-transparent'
            )}
        >
            <div className="container mx-auto flex items-start justify-between px-4 pt-4 pb-2 sm:px-6">

                {/* Logo + Search + Navigation */}
                <div className="flex items-center gap-10">

                    {/* Logo */}
                    <button
                        type="button"
                        onClick={() => handleNavigation('#home')}
                        className="cursor-pointer"
                    >
                        <Logo/>
                    </button>

                    {/* Search + Navigation */}
                    <div className="flex flex-col items-start">

                        {/* Search */}
                        <div className="relative w-[clamp(280px,35vw,600px)]">
                            <Search
                                className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                            />

                            <Input
                                id="search-input"
                                type="text"
                                className="h-12 bg-white/5 pr-9 text-right"
                                placeholder="جستجو در همه محصولات"
                            />
                        </div>

                        {/* Navigation */}
                        <nav className="mt-4 hidden items-center gap-10 md:flex">
                            {navItems.map((item, index) => {
                                const isActive =
                                    isActiveItem(item);

                                return (
                                    <motion.button
                                        key={item.href}
                                        type="button"
                                        onClick={() =>
                                            handleNavigation(
                                                item.href
                                            )
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: -15,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.08,
                                        }}
                                        className={cn(
                                            'group relative cursor-pointer pb-1 text-sm font-medium transition-colors duration-200',
                                            isActive
                                                ? 'text-indigo-600 dark:text-indigo-400'
                                                : 'text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400'
                                        )}
                                    >
                                        {item.label}

                                        <span
                                            className={cn(
                                                'absolute bottom-0 right-0 h-0.5 rounded-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-400',
                                                isActive
                                                    ? 'w-full'
                                                    : 'w-0 group-hover:w-full'
                                            )}
                                        />
                                    </motion.button>
                                );
                            })}
                        </nav>

                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">

                    {/* User */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        aria-label="حساب کاربری"
                    >
                        <User className="size-4"/>
                    </Button>

                    {/* Cart */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative cursor-pointer text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        aria-label="سبد خرید"
                    >
                        <ShoppingBag className="size-4"/>

                        <span
                            className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                            0
                        </span>
                    </Button>

                    {/* Theme */}
                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setTheme(
                                    resolvedTheme === 'dark'
                                        ? 'light'
                                        : 'dark'
                                )
                            }
                            className="hidden cursor-pointer text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
                            aria-label="تغییر تم"
                        >
                            {resolvedTheme === 'dark' ? (
                                <Sun className="size-4"/>
                            ) : (
                                <Moon className="size-4"/>
                            )}
                        </Button>
                    )}

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Drawer
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <DrawerTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="cursor-pointer"
                                    aria-label="منو"
                                >
                                    <Menu className="size-5"/>
                                </Button>
                            </DrawerTrigger>

                            <DrawerContent className="px-6 pb-8">
                                <DrawerTitle className="sr-only">
                                    منوی سایت
                                </DrawerTitle>

                                <div className="mt-6 flex flex-col gap-2">

                                    {/* Mobile Search */}
                                    <div className="relative mb-3 w-full">
                                        <Search
                                            className="absolute end-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                                        />

                                        <Input
                                            type="text"
                                            className="bg-white/5 pe-9 text-right"
                                            placeholder="جستجو در همه محصولات"
                                        />
                                    </div>

                                    {/* Mobile Navigation */}
                                    {navItems.map((item) => {
                                        const isActive =
                                            isActiveItem(item);

                                        return (
                                            <Button
                                                key={item.href}
                                                type="button"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleNavigation(
                                                        item.href
                                                    )
                                                }
                                                className={cn(
                                                    'h-12 cursor-pointer justify-start text-base',
                                                    isActive &&
                                                    'bg-accent text-indigo-600 dark:text-indigo-400'
                                                )}
                                            >
                                                {item.label}
                                            </Button>
                                        );
                                    })}

                                    {/* Mobile Theme */}
                                    {mounted && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() =>
                                                setTheme(
                                                    resolvedTheme ===
                                                    'dark'
                                                        ? 'light'
                                                        : 'dark'
                                                )
                                            }
                                            className="mt-2 h-12 cursor-pointer justify-start gap-3 text-base"
                                        >
                                            {resolvedTheme ===
                                            'dark' ? (
                                                <>
                                                    <Sun className="size-4"/>
                                                    حالت روشن
                                                </>
                                            ) : (
                                                <>
                                                    <Moon className="size-4"/>
                                                    حالت تاریک
                                                </>
                                            )}
                                        </Button>
                                    )}

                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>

                </div>
            </div>
        </motion.header>
    );
};

export default Header;