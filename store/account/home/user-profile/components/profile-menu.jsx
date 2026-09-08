'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Heart,
    MapPin,
    ShoppingBag,
    MessageSquare,
    UserRound,
} from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/store/components/ui/card';

const menuItems = [
    {
        title: 'اطلاعات شخصی',
        icon: UserRound,
        href: '/account/home/user-profile',
    },
    {
        title: 'لیست علاقه‌مندی‌ها',
        icon: Heart,
        href: '/store/wishlist',
    },
    {
        title: 'آدرس‌ها',
        icon: MapPin,
        href: '/account/home/addresses',
    },
    {
        title: 'سفارشات من',
        icon: ShoppingBag,
        href: '#',
    },
    {
        title: 'پیام‌ها',
        icon: MessageSquare,
        href: '#',
    },
];

const ProfileMenu = () => {
    const pathname = usePathname();

    return (
        <Card className="min-w-full" dir="rtl">

            <CardHeader>
                <CardTitle className="text-right">
                    حساب کاربری
                </CardTitle>
            </CardHeader>

            <CardContent className="p-3">

                <div className="flex flex-col">

                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm
                                    transition-colors
                                    ${
                                        isActive
                                            ? 'bg-accent text-foreground'
                                            : 'text-secondary-foreground hover:bg-accent hover:text-foreground'
                                    }
                                `}
                            >
                                <Icon
                                    size={19}
                                    strokeWidth={1.8}
                                />

                                <span>
                                    {item.title}
                                </span>
                            </Link>
                        );
                    })}

                </div>

            </CardContent>
        </Card>
    );
};

export {ProfileMenu};