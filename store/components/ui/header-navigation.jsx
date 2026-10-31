'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'تیشرت', href: '#home' },
    { label: 'هودی', href: '#products' },
    { label: 'ماگ', href: '#latest' },
    { label: 'ورزش و سلامت', href: '#latest' },
];

export function HeaderNavigation({
    activeSection,
    onNavigate,
    className,
}) {
    return (
        <nav
            aria-label="منوی اصلی"
            className={cn(
                'hidden shrink-0 items-center gap-5 md:flex md:gap-8 lg:gap-10',
                className
            )}
        >
            {navItems.map((item, index) => {
                const isActive =
                    activeSection === item.href.replace('#', '');

                return (
                    <motion.button
                        key={item.label}
                        type="button"
                        onClick={() => onNavigate(item.href)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: (index + 1) * 0.08,
                            duration: 0.3,
                        }}
                        className={cn(
                            'group relative whitespace-nowrap py-2 text-base font-medium transition-colors',
                            isActive
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-foreground hover:text-red-600 dark:hover:text-red-400'
                        )}
                    >
                        {item.label}

                        <span
                            className={cn(
                                'absolute bottom-0 right-0 h-0.5 bg-red-600 transition-all duration-800 dark:bg-red-400',
                                isActive
                                    ? 'w-full'
                                    : 'w-0 group-hover:w-full'
                            )}
                        />
                    </motion.button>
                );
            })}
        </nav>
    );
}
