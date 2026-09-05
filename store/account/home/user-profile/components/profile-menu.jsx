
'use client';

import Link from 'next/link';
import {
    Heart,
    MapPin,
    ShoppingBag,
    MessageSquare,
} from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/store/components/ui/card';

const menuItems = [
    {
        title: 'لیست علاقه‌مندی‌ها',
        icon: Heart,
        href: '/store/wishlist',
    },
    {
        title: 'آدرس‌های من',
        icon: MapPin,
        href: '#',
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

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-secondary-foreground hover:bg-accent hover:text-foreground transition-colors"
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
