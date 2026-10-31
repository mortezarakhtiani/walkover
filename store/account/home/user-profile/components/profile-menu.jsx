
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Heart,
    MapPin,
    ShoppingBag,
    MessageSquare,
    UserRound,
    ChevronLeft,
} from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/store/components/ui/card';

import { useStoreClient } from '@/store/components/context';

const menuItems = [
    {
        title: 'اطلاعات شخصی',
        icon: UserRound,
        href: '/account/home/user-profile',
    },
    {
        title: 'لیست علاقه‌مندی‌ها',
        icon: Heart,
        action: 'wishlist',
    },
    {
        title: 'آدرس‌ها',
        icon: MapPin,
        href: '/account/home/addresses',
    },
    {
        title: 'سفارشات من',
        icon: ShoppingBag,
        href: '/account/home/orders',
    },
    {
        title: 'پیام‌ها',
        icon: MessageSquare,
        href: '#',
    },
];

const ProfileMenu = () => {
    const pathname = usePathname();
    const { showWishlistSheet } = useStoreClient();

    const itemClass = `
        group relative flex w-full items-center gap-2.5
        rounded-md px-2.5 py-2.5
        text-[13px] transition-colors duration-150
    `;

    const iconClass = 'size-[18px] shrink-0';

    return (
        <Card
            dir="rtl"
            className="
                w-full overflow-hidden
                rounded-md border-border/60
                bg-background shadow-sm
            "
        >
            {/* Header */}
            <CardHeader className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex size-11 shrink-0 items-center
                            justify-center rounded-full
                            bg-red-50 text-red-600
                            dark:bg-red-950/50 dark:text-red-300
                        "
                    >
                        <UserRound
                            className="size-5"
                            strokeWidth={1.8}
                        />
                    </div>

                    <div className="min-w-0">
                        <CardTitle className="text-sm font-semibold text-foreground">
                            حساب کاربری
                        </CardTitle>

                    </div>
                </div>
            </CardHeader>


            {/* Menu */}
            <CardContent className="p-2">
                <div className="space-y-0.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const isActive =
                            item.href &&
                            item.href !== '#' &&
                            (
                                pathname === item.href ||
                                pathname.startsWith(`${item.href}/`)
                            );

                        const linkClass = `
                            ${itemClass}
                            ${
                                isActive
                                    ? `
                                        bg-red-50 text-red-600
                                        dark:bg-red-950/40
                                        dark:text-red-300
                                    `
                                    : `
                                        text-foreground
                                        hover:bg-background
                                        dark:hover:bg-accent/40
                                    `
                            }
                        `;

                        const content = (
                            <>
                                {/* Active indicator */}
                                {isActive && (
                                    <span
                                        className="
                                            absolute right-0 top-1/2
                                            h-6 w-[3px]
                                            -translate-y-1/2
                                            rounded-l-full bg-red-600
                                            dark:bg-red-400
                                        "
                                    />
                                )}

                                {/* Icon */}
                                <span
                                    className={`
                                        flex size-8 shrink-0
                                        items-center justify-center
                                        rounded-md
                                        ${
                                            isActive
                                                ? 'text-red-600 dark:text-red-300'
                                                : 'text-foreground'
                                        }
                                    `}
                                >
                                    <Icon
                                        className={iconClass}
                                        strokeWidth={1.8}
                                    />
                                </span>

                                {/* Title */}
                                <span
                                    className={`
                                        min-w-0 flex-1 text-right
                                        ${
                                            isActive
                                                ? 'font-semibold'
                                                : 'font-medium'
                                        }
                                    `}
                                >
                                    {item.title}
                                </span>

                                {/* Arrow */}
                                <ChevronLeft
                                    className={`
                                        size-4 shrink-0
                                        transition-colors duration-150
                                        ${
                                            isActive
                                                ? 'text-red-700'
                                                : 'text-muted-foreground/50'
                                        }
                                    `}
                                    strokeWidth={1.8}
                                />
                            </>
                        );

                        if (item.action === 'wishlist') {
                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={showWishlistSheet}
                                    className={linkClass}
                                >
                                    {content}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={linkClass}
                            >
                                {content}
                            </Link>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export { ProfileMenu };
