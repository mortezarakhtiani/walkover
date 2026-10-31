'use client';

import {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';
import {Moon, ShoppingCart, Sun, User} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {UserDropdownMenu} from '@/store/components/ui/user-dropdown-menu';
import {useStoreClient} from '@/store/components/context';

interface HeaderDesktopActionsProps {
    className?: string;
}

export function HeaderDesktopActions({
                                         className,
                                     }: HeaderDesktopActionsProps) {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const {showCartSheet} = useStoreClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    const actionButtonClass = cn(
        'size-9 rounded-full text-white',
        'transition-all duration-200',
        'hover:bg-red-50 hover:text-red-700',
        'dark:hover:bg-red-950/50 dark:hover:text-red-300',
    );

    return (
        <div
            className={cn(
                'absolute left-0 top-1/2 z-20',
                'flex -translate-y-1/2 items-center gap-1 sm:gap-2',
                className,
            )}
        >
            {/* My Orders */}
            {/* Cart */}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className={actionButtonClass}
                aria-label="باز کردن سبد خرید"
                onClick={showCartSheet}
            >
                <ShoppingCart className="size-5"/>
            </Button>

            {/* Theme */}
            {mounted && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={actionButtonClass}
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
            <div className="hidden items-center sm:flex">
                <UserDropdownMenu
                    trigger={
                        <Button
                            type="button"
                            variant="ghost"
                            className={cn(
                                'flex size-9 items-center justify-center rounded-full p-0',
                                'text-foreground transition-colors duration-200',
                                'hover:bg-red-50 hover:text-red-700',
                                'dark:hover:bg-red-950/50 dark:hover:text-red-300',
                            )}
                            aria-label="حساب کاربری"
                        >
                            <User className="size-5 shrink-0"/>
                        </Button>
                    }
                />
            </div>
        </div>
    );
}
