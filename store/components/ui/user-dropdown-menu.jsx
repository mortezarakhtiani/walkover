
'use client';

import Link from 'next/link';
import {
    LogOut,
    ShoppingBag,
    User,
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/store/components/ui/dropdown-menu';

export function UserDropdownMenu({
    trigger,
    onLogout,
    name = 'رضا حسن‌زاده',
    image,
}) {
    const itemClass = `
        cursor-pointer rounded-md p-0
        focus:bg-red-50 hover:bg-red-50
        dark:focus:bg-accent/40 dark:hover:bg-accent/40
    `;

    const linkClass = `
        flex w-full items-center gap-2.5
        rounded-md px-2.5 py-2
        transition-colors duration-150
    `;

    const iconClass = 'size-[18px] text-foreground';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="bottom"
                align="end"
                dir="rtl"
                sideOffset={5}
                className="
                    w-[240px] overflow-hidden
                    rounded-md border-border/60
                    bg-background p-1 shadow-lg
                "
            >
                {/* تصویر و نام شخص */}
                <div className="flex items-center gap-3 px-3 py-3">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="size-11 shrink-0 rounded-full object-cover"
                        />
                    ) : (
                        <div className="
                            flex size-11 shrink-0 items-center
                            justify-center rounded-full
                            bg-red-50 text-red-600
                            dark:bg-red-950/50 dark:text-red-300
                        ">
                            <User className="size-5" strokeWidth={1.8} />
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                            {name}
                        </p>

                    </div>
                </div>

                <DropdownMenuSeparator className="my-1 bg-border/60" />

                <div className="space-y-0.5">
                    {/* پروفایل */}
                    <DropdownMenuItem asChild className={itemClass}>
                        <Link
                            href="/account/home/user-profile"
                            className={linkClass}
                        >
                            <span className="flex size-8 shrink-0 items-center justify-center">
                                <User className={iconClass} strokeWidth={1.8} />
                            </span>
                            <span className="text-[13px] font-medium text-foreground">
                                پروفایل من
                            </span>
                        </Link>
                    </DropdownMenuItem>

                    {/* سفارشات */}
                    <DropdownMenuItem asChild className={itemClass}>
                        <Link href="/store/my-orders" className={linkClass}>
                            <span className="flex size-8 shrink-0 items-center justify-center">
                                <ShoppingBag className={iconClass} strokeWidth={1.8} />
                            </span>
                            <span className="text-[13px] font-medium text-foreground">
                                سفارشات من
                            </span>
                        </Link>
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="my-1 bg-border/60" />

                {/* خروج از حساب */}
                <DropdownMenuItem
                    onSelect={(event) => {
                        if (onLogout) {
                            event.preventDefault();
                            onLogout();
                        }
                    }}
                    className="
                        cursor-pointer rounded-md px-2.5 py-2
                        text-red-600 focus:bg-red-50 focus:text-red-600
                        hover:bg-red-50
                        dark:text-red-400 dark:focus:bg-red-950/30
                        dark:focus:text-red-400 dark:hover:bg-red-950/30
                    "
                >
                    <span className="flex size-8 shrink-0 items-center justify-center">
                        <LogOut className="size-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="text-[13px] font-medium">
                        خروج از حساب کاربری
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
