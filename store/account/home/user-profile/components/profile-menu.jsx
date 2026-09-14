'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

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
    const {showWishlistSheet} = useStoreClient();

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

    if (item.action === 'wishlist') {
        return (
            <button
                key={item.title}
                type="button"
                onClick={showWishlistSheet}
                className="
                    flex w-full items-center gap-3
                    rounded-lg px-4 py-3 text-sm
                    text-secondary-foreground
                    transition-colors
                    hover:bg-accent
                    hover:text-foreground
                "
            >
                <Icon
                    size={19}
                    strokeWidth={1.8}
                />

                <span>{item.title}</span>
            </button>
        );
    }

    return (
        <Link
            key={item.title}
            href={item.href}
            className={`
                flex items-center gap-3
                rounded-lg px-4 py-3 text-sm
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

            <span>{item.title}</span>
        </Link>
    );
})}

                </div>

            </CardContent>
        </Card>
    );
};

export {ProfileMenu};