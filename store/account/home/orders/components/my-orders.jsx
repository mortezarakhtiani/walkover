'use client';

import { useState } from 'react';
import {
    CalendarDays,
    Package,
    Truck,
    UserRound,
    Clock3,
    CircleCheck,
    XCircle,
} from 'lucide-react';

import {
    Card,
    CardContent,
    CardHeader,
} from '@/store/components/ui/card';

import { Card4 } from '@/store/components/common/card4';
import { toPersianDigits, formatToman } from '@/lib/to-persian';

const STATUS_CONFIG = {
    current: {
        label: 'جاری',
        icon: Clock3,
        className:
            'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400',
        iconClassName: 'text-red-600 dark:text-red-400',
    },
    shipped: {
        label: 'ارسال شده',
        icon: CircleCheck,
        className:
            'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
        iconClassName: 'text-emerald-600 dark:text-emerald-400',
    },
    cancelled: {
        label: 'لغو شده',
        icon: XCircle,
        className:
            'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400',
        iconClassName: 'text-rose-600 dark:text-rose-400',
    },
};

function OrderStatus({ status, mobile = false }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.current;
    const Icon = config.icon;

    return (
        <span
            className={`
                inline-flex w-fit shrink-0 items-center gap-1.5
                rounded-full px-3 py-1.5 text-xs font-semibold
                ${config.className}
                ${mobile ? 'text-[10px] px-2.5 py-1' : ''}
            `}
        >
            <Icon className="size-3.5" strokeWidth={2} />
            {config.label}
        </span>
    );
}

function OrderInfo({ label, children, className = '' }) {
    return (
        <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
            <span className="text-xs text-muted-foreground">
                {label}
            </span>

            <span className="text-sm font-medium text-foreground">
                {children}
            </span>
        </div>
    );
}

export function MyOrders() {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'همه' },
        { id: 'current', label: 'جاری' },
        { id: 'shipped', label: 'ارسال شده' },
        { id: 'cancelled', label: 'لغو شده' },
    ];

    const orders = [
        {
            id: 'X319330-S24',
            status: 'current',
            date: '۲۶ خرداد ۱۴۰۴',
            total: '۵۱۲٬۶۰۰ تومان',
            customer: 'جرون ون دایک',
            delivery: '۱۷ تیر ۱۴۰۴',
            limit: 4,
        },
        {
            id: 'X319331-S24',
            status: 'shipped',
            date: '۲۰ خرداد ۱۴۰۴',
            total: '۲۵۰٬۰۰۰ تومان',
            customer: 'جرون ون دایک',
            delivery: '۳۰ خرداد ۱۴۰۴',
            limit: 1,
        },
    ];

    const filteredOrders =
        activeTab === 'all'
            ? orders
            : orders.filter((order) => order.status === activeTab);

    return (
        <div dir="rtl" className="w-full">
            {/* فیلتر وضعیت سفارش‌ها */}
            <div className="mb-5 overflow-x-auto border-b border-border/60 scrollbar-none">
                <div className="flex min-w-max items-center gap-1">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;

                        const count =
                            tab.id === 'all'
                                ? orders.length
                                : orders.filter(
                                      (order) => order.status === tab.id,
                                  ).length;

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                aria-pressed={isActive}
                                className={`
                                    relative inline-flex cursor-pointer
                                    items-center gap-2 whitespace-nowrap
                                    px-4 py-3 text-sm font-medium
                                    transition-colors duration-200 sm:px-5
                                    ${
                                        isActive
                                            ? 'text-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }
                                `}
                            >
                                {tab.label}

                                <span
                                    className={`
        rounded-full px-1.5 py-0.5 text-[10px]
        ${
                                        isActive
                                            ? 'bg-muted text-muted-foreground text-white'
                                            : 'bg-muted text-muted-foreground'
                                    }
    `}
                                >
    {toPersianDigits(count)}
</span>

                                {isActive && (
                                    <span
                                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-red-600 dark:bg-red-600"/>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* لیست سفارش‌ها */}
            <div className="grid gap-4 lg:gap-6">
                {filteredOrders.map((order) => (
                    <Card
                        key={order.id}
                        className="overflow-hidden border-border/60 shadow-sm"
                    >
                        {/* هدر دسکتاپ */}
                        <CardHeader
                            className="
    hidden h-auto flex-row flex-wrap items-center
    justify-between gap-x-12 gap-y-6
    bg-muted/60 px-8 py-6
    lg:flex
"
                        >

                            {/* وضعیت سفارش فقط در دسکتاپ نمایش داده شود */}
                            <div className="hidden min-w-[120px] flex-col gap-1.5 lg:flex">
    <span className="text-xs text-muted-foreground">
        وضعیت سفارش
    </span>

                                <OrderStatus status={order.status}/>
                            </div>
                            <OrderInfo label="شناسه سفارش">
                            <span dir="ltr">{order.id}</span>
                            </OrderInfo>

                            <OrderInfo label="ثبت سفارش در">
                                {order.date}
                            </OrderInfo>

                            <OrderInfo label="جمع کل">
                                <span className="font-bold">
                                    {formatToman(order.total)} تومان
                                </span>
                            </OrderInfo>

                            <OrderInfo label="ارسال به">
                                {order.customer}
                            </OrderInfo>

                            <OrderInfo label="تخمین زمان ارسال">
                                {order.delivery}
                            </OrderInfo>


                        </CardHeader>

                        {/* هدر موبایل */}
                        <div className="border-b border-border/60 bg-muted/40 p-4 lg:hidden">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground">
                                        <Package
                                            className="size-[18px]"
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[11px] text-muted-foreground">
                                            شناسه سفارش
                                        </p>

                                        <p
                                            dir="ltr"
                                            className="mt-0.5 truncate text-right text-sm font-semibold text-foreground"
                                        >
                                            {order.id}
                                        </p>
                                    </div>
                                </div>

                                <OrderStatus
                                    status={order.status}
                                    mobile
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="min-w-0 rounded-md bg-background/70 p-3">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <CalendarDays className="size-3.5" />
                                        <span className="text-[10px]">
                                            ثبت سفارش
                                        </span>
                                    </div>

                                    <p className="text-xs font-medium text-foreground">
                                        {order.date}
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-md bg-background/70 p-3">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <Package className="size-3.5" />
                                        <span className="text-[10px]">
                                            جمع کل
                                        </span>
                                    </div>

                                    <p className="text-xs font-bold text-foreground">
                                        {formatToman(order.total)} تومان
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-md bg-background/70 p-3">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <UserRound className="size-3.5" />
                                        <span className="text-[10px]">
                                            ارسال به
                                        </span>
                                    </div>

                                    <p className="truncate text-xs font-medium text-foreground">
                                        {order.customer}
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-md bg-background/70 p-3">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <Truck className="size-3.5" />
                                        <span className="text-[10px]">
                                            زمان ارسال
                                        </span>
                                    </div>

                                    <p className="text-xs font-medium text-foreground">
                                        {order.delivery}
                                    </p>
                                </div>

                                {/* کادر مستقل وضعیت در موبایل */}
                            </div>
                        </div>

                        {/* محصولات سفارش */}
                        <CardContent className="space-y-4 p-4 sm:p-5 lg:p-7.5">
                            <Card4 limit={order.limit} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* حالت بدون سفارش */}
            {filteredOrders.length === 0 && (
                <div className="flex min-h-[240px] flex-col items-center justify-center rounded-md border border-dashed border-border px-4 text-center">
                    <Package className="mb-3 size-8 text-muted-foreground/50" />

                    <p className="text-sm font-medium text-foreground">
                        سفارشی در این بخش وجود ندارد
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        سفارش‌های مربوط به این وضعیت اینجا نمایش داده می‌شوند.
                    </p>
                </div>
            )}
        </div>
    );
}
