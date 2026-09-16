
'use client';

import {useState} from 'react';
import {
    CalendarDays,
    ChevronLeft,
    Package,
    Truck,
    UserRound,
} from 'lucide-react';

import {Card, CardContent, CardHeader} from '@/store/components/ui/card';
import {Card4} from '@/store/components/common/card4';

export function MyOrders() {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        {id: 'all', label: 'همه'},
        {id: 'current', label: 'جاری'},
        {id: 'shipped', label: 'ارسال شده'},
        {id: 'cancelled', label: 'لغو شده'},
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
            {/* =========================
                TABS
            ========================== */}
            <div
                className="
                    mb-5
                    overflow-x-auto
                    border-b
                    border-border/60
                    scrollbar-none
                "
            >
                <div className="flex min-w-max items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                relative
                                cursor-pointer
                                whitespace-nowrap
                                px-4
                                py-3
                                text-sm
                                font-medium
                                transition-colors
                                duration-200
                                sm:px-5
                                ${
                                    activeTab === tab.id
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }
                            `}
                        >
                            {tab.label}

                            {activeTab === tab.id && (
                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-2
                                        right-2
                                        h-0.5
                                        rounded-full
                                        bg-indigo-600
                                        dark:bg-indigo-500
                                    "
                                    style={{
                                        animation:
                                            'tabIndicator 200ms ease-out',
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* =========================
                ORDERS
            ========================== */}
            <div className="grid gap-4 lg:gap-6">
                {filteredOrders.map((order) => (
                    <Card
                        key={order.id}
                        className="
                            overflow-hidden
                            border-border/60
                            shadow-sm
                        "
                    >
                        {/* =========================
                            DESKTOP HEADER
                        ========================== */}
                        <CardHeader
                            className="
                                hidden
                                h-auto
                                flex-row
                                items-center
                                justify-start
                                gap-8
                                bg-muted/60
                                py-5
                                lg:flex
                                xl:gap-10
                            "
                        >
                            {/* Order ID */}
                            <div className="flex min-w-[130px] flex-col gap-1.5">
                                <span className="text-xs text-muted-foreground">
                                    شناسه سفارش
                                </span>

                                <span className="text-sm font-semibold text-foreground">
                                    {order.id}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="flex min-w-[130px] flex-col gap-1.5">
                                <span className="text-xs text-muted-foreground">
                                    ثبت سفارش در
                                </span>

                                <span className="text-sm font-medium text-foreground">
                                    {order.date}
                                </span>
                            </div>

                            {/* Total */}
                            <div className="flex min-w-[130px] flex-col gap-1.5">
                                <span className="text-xs text-muted-foreground">
                                    جمع کل
                                </span>

                                <span className="text-sm font-semibold text-foreground">
                                    {order.total}
                                </span>
                            </div>

                            {/* Customer */}
                            <div className="flex min-w-[130px] flex-col gap-1.5">
                                <span className="text-xs text-muted-foreground">
                                    ارسال به
                                </span>

                                <span className="text-sm font-medium text-foreground">
                                    {order.customer}
                                </span>
                            </div>

                            {/* Delivery */}
                            <div className="flex min-w-[150px] flex-col gap-1.5">
                                <span className="text-xs text-muted-foreground">
                                    تخمین زمان ارسال
                                </span>

                                <span className="text-sm font-medium text-foreground">
                                    {order.delivery}
                                </span>
                            </div>
                        </CardHeader>

                        {/* =========================
                            MOBILE HEADER
                        ========================== */}
                        <div className="block border-b border-border/60 bg-muted/40 p-4 lg:hidden">
                            {/* Top row */}
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className="
                                            flex
                                            size-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-background
                                            text-muted-foreground
                                        "
                                    >
                                        <Package
                                            className="size-[18px]"
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[11px] text-muted-foreground">
                                            شناسه سفارش
                                        </p>

                                        <p className="mt-0.5 text-sm font-semibold text-foreground">
                                            {order.id}
                                        </p>
                                    </div>
                                </div>

                                {/* Status */}
                                <span
                                    className={`
                                        rounded-full
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        font-medium
                                        ${
                                            order.status === 'current'
                                                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                                                : order.status === 'shipped'
                                                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                                                  : 'bg-muted text-muted-foreground'
                                        }
                                    `}
                                >
                                    {order.status === 'current'
                                        ? 'جاری'
                                        : order.status === 'shipped'
                                          ? 'ارسال شده'
                                          : 'لغو شده'}
                                </span>
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Date */}
                                <div className="rounded-xl bg-background/70 p-3">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <CalendarDays
                                            className="size-3.5"
                                            strokeWidth={1.8}
                                        />

                                        <span className="text-[10px]">
                                            ثبت سفارش
                                        </span>
                                    </div>

                                    <p className="text-xs font-medium text-foreground">
                                        {order.date}
                                    </p>
                                </div>

                                {/* Total */}
                                <div className="rounded-xl bg-background/70 p-3">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <Package
                                            className="size-3.5"
                                            strokeWidth={1.8}
                                        />

                                        <span className="text-[10px]">
                                            جمع کل
                                        </span>
                                    </div>

                                    <p className="text-xs font-semibold text-foreground">
                                        {order.total}
                                    </p>
                                </div>

                                {/* Customer */}
                                <div className="rounded-xl bg-background/70 p-3">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <UserRound
                                            className="size-3.5"
                                            strokeWidth={1.8}
                                        />

                                        <span className="text-[10px]">
                                            ارسال به
                                        </span>
                                    </div>

                                    <p className="truncate text-xs font-medium text-foreground">
                                        {order.customer}
                                    </p>
                                </div>

                                {/* Delivery */}
                                <div className="rounded-xl bg-background/70 p-3">
                                    <div className="mb-1.5 flex items-center gap-1.5 text-muted-foreground">
                                        <Truck
                                            className="size-3.5"
                                            strokeWidth={1.8}
                                        />

                                        <span className="text-[10px]">
                                            زمان ارسال
                                        </span>
                                    </div>

                                    <p className="text-xs font-medium text-foreground">
                                        {order.delivery}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* =========================
                            ORDER CONTENT
                        ========================== */}
                        <CardContent
                            className="
                                space-y-4
                                p-4
                                sm:p-5
                                lg:p-7.5
                            "
                        >
                            <Card4 limit={order.limit}/>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty state */}
            {filteredOrders.length === 0 && (
                <div
                    className="
                        flex
                        min-h-[240px]
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-border
                        text-center
                    "
                >
                    <Package className="mb-3 size-8 text-muted-foreground/50"/>

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

