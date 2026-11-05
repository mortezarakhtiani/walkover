
'use client';

import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/store/components/ui/select';

import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/store/components/ui/toggle-group';

import { ProductRevealCard } from '@/store/components/common/product-card-common';
import { Card3 } from '@/store/components/common/card3';
import { toPersianDigits } from '../../../lib/to-persian';
import { products } from '@/store/product/data/products';

export function SearchResults({ mode }) {
    const [activePeriod, setActivePeriod] = useState('week');
    const [activeTab, setActiveTab] = useState(mode);

    const items = products;

    const renderItem = (item) => {
        const props = {
            id: item.id,
            logo: item.logo,
            star: item.rating,
            sku: item.sku,
            title: item.title,
            total: item.price,
            label: item.originalPrice,
            badge: item.discount > 0,
        };

        return activeTab === 'card' ? (
            <ProductRevealCard key={item.id} {...props} />
        ) : (
            <Card3 key={item.id} {...props} />
        );
    };

    return (
        <div className="w-full min-w-0 space-y-5 sm:space-y-7" dir="rtl">

            {/* نوار فیلتر و مرتب‌سازی */}
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* تعداد نتایج */}
                <h3 className="text-xs font-medium leading-7 text-muted-foreground sm:text-sm">
                    نمایش{' '}
                    <span className="text-foreground">
                        {toPersianDigits(`۱ تا ${items.length}`)}
                    </span>
                    {' '}از{' '}
                    <span className="text-foreground">
                        {toPersianDigits('۲۸۰')}
                    </span>
                    {' '}نتیجه برای{' '}
                    <span className="text-destructive">
                        نایک
                    </span>
                </h3>

                {/* کنترل‌ها */}
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">

                    {/* مرتب‌سازی */}
                    <Select defaultValue="high-to-low" dir="rtl">
                        <SelectTrigger className="h-11 w-full text-right sm:w-[260px]" dir="rtl">
                            <SelectValue placeholder="مرتب‌سازی بر اساس قیمت" />
                        </SelectTrigger>

                        <SelectContent dir="rtl" className="text-right">
                            <SelectItem value="low-to-high">
                                قیمت: ارزان‌ترین تا گران‌ترین
                            </SelectItem>

                            <SelectItem value="high-to-low">
                                قیمت: گران‌ترین تا ارزان‌ترین
                            </SelectItem>

                            <SelectItem value="0-1">
                                زیر ۱ میلیون تومان
                            </SelectItem>

                            <SelectItem value="1-2">
                                ۱ تا ۲ میلیون تومان
                            </SelectItem>

                            <SelectItem value="2-5">
                                ۲ تا ۵ میلیون تومان
                            </SelectItem>

                            <SelectItem value="5-10">
                                ۵ تا ۱۰ میلیون تومان
                            </SelectItem>

                            <SelectItem value="10+">
                                بیشتر از ۱۰ میلیون تومان
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* بازه زمانی و حالت نمایش */}
                    <div className="flex min-w-0 items-center gap-2">

                        <ToggleGroup
                            type="single"
                            variant="outline"
                            value={activePeriod}
                            onValueChange={(value) => {
                                if (value) setActivePeriod(value);
                            }}
                            className="grid min-w-0 flex-1 grid-cols-4"
                            dir="rtl"
                        >
                            <ToggleGroupItem value="today" className="min-w-0 px-1.5 text-xs sm:px-3">
                                امروز
                            </ToggleGroupItem>

                            <ToggleGroupItem value="week" className="min-w-0 px-1.5 text-xs sm:px-3">
                                هفته
                            </ToggleGroupItem>

                            <ToggleGroupItem value="month" className="min-w-0 px-1.5 text-xs sm:px-3">
                                ماه
                            </ToggleGroupItem>

                            <ToggleGroupItem value="all" className="min-w-0 px-1.5 text-xs sm:px-3">
                                همه
                            </ToggleGroupItem>
                        </ToggleGroup>

                        {/*<ToggleGroup*/}
                        {/*    type="single"*/}
                        {/*    variant="outline"*/}
                        {/*    value={activeTab}*/}
                        {/*    onValueChange={(value) => {*/}
                        {/*        if (value === 'card' || value === 'list') {*/}
                        {/*            setActiveTab(value);*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*    dir="rtl"*/}
                        {/*    className="shrink-0"*/}
                        {/*>*/}
                        {/*    <ToggleGroupItem*/}
                        {/*        value="card"*/}
                        {/*        aria-label="نمایش کارت‌ها"*/}
                        {/*        className="size-10"*/}
                        {/*    >*/}
                        {/*        <LayoutGrid size={16} />*/}
                        {/*    </ToggleGroupItem>*/}

                        {/*    <ToggleGroupItem*/}
                        {/*        value="list"*/}
                        {/*        aria-label="نمایش فهرستی"*/}
                        {/*        className="size-10"*/}
                        {/*    >*/}
                        {/*        <List size={16} />*/}
                        {/*    </ToggleGroupItem>*/}
                        {/*</ToggleGroup>*/}

                    </div>
                </div>
            </div>

            {/* محصولات */}
            <div
                className={
                    activeTab === 'card'
                        ? 'grid min-w-0 grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid min-w-0 grid-cols-1 gap-4 sm:gap-5'
                }
            >
                {items.map((item) => renderItem(item))}
            </div>

        </div>
    );
}
