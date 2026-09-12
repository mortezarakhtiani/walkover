'use client';

import Link from 'next/link';
import {
    Moon,
    ShoppingBag,
    User,
} from 'lucide-react';
import {useTheme} from 'next-themes';

import {Button} from '@/store/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/store/components/ui/dropdown-menu';
import {Switch} from '@/store/components/ui/switch';

export function UserDropdownMenu({trigger}) {
    const {resolvedTheme, setTheme} = useTheme();

    const handleThemeToggle = (checked) => {
        setTheme(checked ? 'dark' : 'light');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56 text-right"
                side="bottom"
                align="end"
                dir="rtl"
            >

                {/* Profile */}
                <DropdownMenuItem asChild>
                    <Link
                        href="/account/home/user-profile"
                        className="flex w-full items-center gap-2"
                    >
                        <User className="size-4"/>
                        <span>پروفایل من</span>
                    </Link>
                </DropdownMenuItem>

                {/* Orders */}
                <DropdownMenuItem asChild>
                    <Link
                        href="/store/my-orders"
                        className="flex w-full items-center gap-2"
                    >
                        <ShoppingBag className="size-4"/>
                        <span>سفارشات من</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>

                {/* Dark Mode */}
                <DropdownMenuItem
                    className="flex items-center gap-2"
                    onSelect={(event) => event.preventDefault()}
                >
                    <Moon className="size-4"/>

                    <div className="flex flex-1 items-center justify-between gap-3">
                        <span>حالت تاریک</span>

                        <Switch
                            key={resolvedTheme}
                            dir="ltr"
                            size="sm"
                            checked={resolvedTheme === 'dark'}
                            onCheckedChange={handleThemeToggle}
                            aria-label="حالت تاریک"
                        />
                    </div>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

