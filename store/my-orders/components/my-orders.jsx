'use client';

import {useState} from 'react';
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
        <>
            <div className="flex items-center gap-2 border-b mb-5">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-4 py-3 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'text-white'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {tab.label}

                        {activeTab === tab.id && (
                            <span
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                                style={{
                                    animation: 'tabIndicator 200ms ease-out',
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="grid xl:grid-cols-1 gap-5 lg:gap-9">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="lg:col-span-1">
                        <Card className="overflow-hidden">
                            <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                                <div className="flex flex-col gap-1.5">
          <span className="text-xs font-normal text-secondary-foreground">
            شناسه سفارش
          </span>
                                    <span className="text-sm font-medium text-mono">
            {order.id}
          </span>
                                </div>

                                <div className="flex flex-col gap-1.5">
          <span className="text-xs font-normal text-secondary-foreground">
            ثبت سفارش در
          </span>
                                    <span className="text-sm font-medium text-mono">
            {order.date}
          </span>
                                </div>

                                <div className="flex flex-col gap-1.5">
          <span className="text-xs font-normal text-secondary-foreground">
            جمع کل
          </span>
                                    <span className="text-sm font-medium text-mono">
            {order.total}
          </span>
                                </div>

                                <div className="flex flex-col gap-1.5">
          <span className="text-xs font-normal text-secondary-foreground">
            ارسال به
          </span>
                                    <span className="text-sm font-medium text-mono">
            {order.customer}
          </span>
                                </div>

                                <div className="flex flex-col gap-1.5">
          <span className="text-xs font-normal text-secondary-foreground">
            تخمین زمان ارسال
          </span>
                                    <span className="text-sm font-medium text-mono">
            {order.delivery}
          </span>
                                </div>
                            </CardHeader>

                            <CardContent className="p-5 lg:p-7.5 space-y-5">
                                <Card4 limit={order.limit}/>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}