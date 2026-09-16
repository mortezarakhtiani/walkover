
'use client';

import Link from 'next/link';
import {
    ChevronLeft,
    ShoppingBag,
    UserRound,
} from 'lucide-react';

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/store/components/ui/dropdown-menu';

export function UserDropdownMenu({trigger}) {

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="bottom"
                align="end"
                dir="rtl"
                sideOffset={8}
                className="
                    w-[270px]
                    overflow-hidden
                    rounded-2xl
                    border-border/60
                    bg-background
                    p-2
                    shadow-xl
                "
            >

                {/* =========================
                    Header
                ========================== */}

                <div className="px-3 pb-2 pt-2">

                    <div className="text-sm font-bold text-foreground">
                        حساب کاربری
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                        مدیریت حساب و سفارش‌های شما
                    </div>

                </div>


                {/* =========================
                    Menu
                ========================== */}

                <div className="space-y-1">

                    {/* Profile */}

                    <DropdownMenuItem
                        asChild
                        className="
                            cursor-pointer
                            rounded-xl
                            p-0
                            focus:bg-transparent
                        "
                    >

                        <Link
                            href="/account/home/user-profile"
                            className="
                                group
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-3
                                transition-colors
                                duration-150
                                hover:bg-muted/70
                            "
                        >

                            <span
                                className="
                                    flex
                                    size-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-muted/60
                                    text-muted-foreground
                                    transition-colors
                                    group-hover:bg-indigo-50
                                    group-hover:text-indigo-600
                                    dark:group-hover:bg-indigo-950/40
                                    dark:group-hover:text-indigo-400
                                "
                            >
                                <UserRound
                                    className="size-[18px]"
                                    strokeWidth={1.8}
                                />
                            </span>


                            <span className="flex-1">

                                <span className="block text-sm font-medium text-foreground">
                                    پروفایل من
                                </span>

                                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                                    اطلاعات حساب کاربری
                                </span>

                            </span>


                            <ChevronLeft
                                className="
                                    size-4
                                    text-muted-foreground/40
                                    transition-all
                                    group-hover:-translate-x-0.5
                                    group-hover:text-muted-foreground
                                "
                                strokeWidth={1.8}
                            />

                        </Link>

                    </DropdownMenuItem>


                    {/* Orders */}

                    <DropdownMenuItem
                        asChild
                        className="
                            cursor-pointer
                            rounded-xl
                            p-0
                            focus:bg-transparent
                        "
                    >

                        <Link
                            href="/store/my-orders"
                            className="
                                group
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-3
                                transition-colors
                                duration-150
                                hover:bg-muted/70
                            "
                        >

                            <span
                                className="
                                    flex
                                    size-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-muted/60
                                    text-muted-foreground
                                    transition-colors
                                    group-hover:bg-indigo-50
                                    group-hover:text-indigo-600
                                    dark:group-hover:bg-indigo-950/40
                                    dark:group-hover:text-indigo-400
                                "
                            >
                                <ShoppingBag
                                    className="size-[18px]"
                                    strokeWidth={1.8}
                                />
                            </span>


                            <span className="flex-1">

                                <span className="block text-sm font-medium text-foreground">
                                    سفارشات من
                                </span>

                                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                                    مشاهده سفارش‌های ثبت‌شده
                                </span>

                            </span>


                            <ChevronLeft
                                className="
                                    size-4
                                    text-muted-foreground/40
                                    transition-all
                                    group-hover:-translate-x-0.5
                                    group-hover:text-muted-foreground
                                "
                                strokeWidth={1.8}
                            />

                        </Link>

                    </DropdownMenuItem>

                </div>


                {/* =========================
                    Footer
                ========================== */}

                <div className="mt-2 border-t border-border/50 px-3 py-2">

                    <span className="text-[10px] text-muted-foreground">
                        مدیریت حساب کاربری
                    </span>

                </div>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}

