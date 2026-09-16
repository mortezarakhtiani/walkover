
'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

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

import {useStoreClient} from '@/store/components/context';

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
    const {showWishlistSheet} = useStoreClient();

    return (
        <Card
            dir="rtl"
            className="
                w-full
                overflow-hidden
                border-border/60
                bg-background
                shadow-sm
            "
        >
            {/* Header */}
            <CardHeader className="border-b border-border/60 px-5 py-5">
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex size-10 shrink-0
                            items-center justify-center
                            rounded-xl
                            bg-muted
                            text-muted-foreground
                        "
                    >
                        <UserRound
                            size={20}
                            strokeWidth={1.8}
                        />
                    </div>

                    <div>
                        <CardTitle className="text-sm font-bold">
                            حساب کاربری
                        </CardTitle>

                        <p className="mt-1 text-[11px] text-muted-foreground">
                            مدیریت حساب کاربری
                        </p>
                    </div>
                </div>
            </CardHeader>

            {/* Menu */}
            <CardContent className="p-3">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const isActive =
                            item.href &&
                            item.href !== '#' &&
                            (
                                pathname === item.href ||
                                pathname.startsWith(`${item.href}/`)
                            );

                        const classes = `
                            group
                            relative
                            flex w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3 py-3
                            text-sm
                            transition-all
                            duration-200

                            ${
                                isActive
                                    ? `
                                        bg-indigo-50
                                        text-indigo-600
                                        dark:bg-indigo-950/40
                                        dark:text-indigo-400
                                    `
                                    : `
                                        text-muted-foreground
                                        hover:bg-muted/70
                                        hover:text-foreground
                                    `
                            }
                        `;

                        const content = (
                            <>
                                {/* Active indicator */}
                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            right-0
                                            top-1/2
                                            h-7
                                            w-1
                                            -translate-y-1/2
                                            rounded-l-full
                                            bg-indigo-600
                                            dark:bg-indigo-500
                                        "
                                    />
                                )}

                                {/* Icon */}
                                <span
                                    className={`
                                        flex size-9 shrink-0
                                        items-center justify-center
                                        rounded-lg
                                        transition-colors
                                        ${
                                            isActive
                                                ? `
                                                    bg-indigo-100
                                                    text-indigo-600
                                                    dark:bg-indigo-900/50
                                                    dark:text-indigo-400
                                                `
                                                : `
                                                    bg-muted
                                                    text-muted-foreground
                                                    group-hover:bg-background
                                                `
                                        }
                                    `}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={1.8}
                                    />
                                </span>

                                {/* Title */}
                                <span
                                    className={`
                                        flex-1 text-right
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
                                    size={16}
                                    strokeWidth={1.8}
                                    className={`
                                        transition-all duration-200
                                        ${
                                            isActive
                                                ? 'text-indigo-500'
                                                : 'text-muted-foreground/40 group-hover:text-muted-foreground'
                                        }
                                    `}
                                />
                            </>
                        );

                        if (item.action === 'wishlist') {
                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={showWishlistSheet}
                                    className={classes}
                                >
                                    {content}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={classes}
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

export {ProfileMenu};

