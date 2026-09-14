'use client';

import {useState} from 'react';
import {LayoutGrid, List} from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/store/components/ui/select';

import {ToggleGroup, ToggleGroupItem} from '@/store/components/ui/toggle-group';
import {Card2} from '@/store/components/common/card2';
import {Card3} from '@/store/components/common/card3';
import {toPersianDigits} from '../../../lib/to-persian-digits';
import {products} from '@/store/product/data/products';


export function SearchResults({mode}) {
    const [activePeriod, setActivePeriod] = useState('week');
    const [activeTab, setActiveTab] = useState(mode);
    const items = products;


    const renderItem = (item, index) => {
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
            <Card2 key={item.id} {...props} />
        ) : (
            <Card3 key={item.id} {...props} />
        );
    };

    return (
        <div
            className="flex flex-col items-stretch gap-7"
            dir="rtl"
        >
            {/* نوار فیلتر و مرتب‌سازی */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-5" dir="ltr">

                {/* تعداد نتایج */}
                <h3 className="text-sm font-medium text-mono">
                    نمایش{' '}
                    <span className="text-foreground">
            {toPersianDigits(`۱ تا ${items.length}`)}
          </span>{' '}
                    از{' '}
                    <span className="text-foreground">
            {toPersianDigits('۲۸۰')}
          </span>{' '}
                    نتیجه برای{' '}
                    <span className="text-destructive">
            نایک
          </span>
                </h3>

                <div className="flex flex-wrap items-center gap-2.5">

                    {/* مرتب‌سازی قیمت */}
                    <Select defaultValue="high-to-low" dir="rtl">
                        <SelectTrigger className="w-[210px] text-right" dir="rtl">
                            <SelectValue placeholder="مرتب‌سازی بر اساس قیمت"/>
                        </SelectTrigger>

                        <SelectContent dir="rtl" className="text-right">
                            <SelectItem
                                value="low-to-high"
                                dir="rtl"
                                className="text-right [&>span:last-child]:text-right"
                            >
                                قیمت: ارزان‌ترین تا گران‌ترین
                            </SelectItem>

                            <SelectItem
                                value="high-to-low"
                                dir="rtl"
                                className="text-right [&>span:last-child]:text-right"
                            >
                                قیمت: گران‌ترین تا ارزان‌ترین
                            </SelectItem>

                            <SelectItem
                                value="0-1"
                                dir="rtl"
                                className="text-right [&>span:last-child]:text-right"
                            >
                                زیر ۱ میلیون تومان
                            </SelectItem>

                            <SelectItem
                                value="1-2"
                                dir="rtl"
                                className="text-right [&>span:last-child]:text-right"
                            >
                                ۱ تا ۲ میلیون تومان
                            </SelectItem>

                            <SelectItem
                                value="2-5"
                                dir="rtl"
                                className="text-right [&>span:last-child]:text-right"
                            >
                                ۲ تا ۵ میلیون تومان
                            </SelectItem>

                            <SelectItem
                                value="5-10"
                                dir="rtl"
                                className="text-right [&>span:last-child]:text-right"
                            >
                                ۵ تا ۱۰ میلیون تومان
                            </SelectItem>

                            <SelectItem
                                value="10+"
                                dir="rtl"
                                className="text-right [&>span:last-child]:text-right"
                            >
                                بیشتر از ۱۰ میلیون تومان
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* بازه زمانی */}
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        value={activePeriod}
                        onValueChange={(value) => {
                            if (value) {
                                setActivePeriod(value);
                            }
                        }}
                        className="grid grid-cols-4"
                        dir="rtl"
                    >
                        <ToggleGroupItem
                            value="today"
                            className="px-4"
                        >
                            امروز
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="week"
                            className="px-4"
                        >
                            هفته
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="month"
                            className="px-4"
                        >
                            ماه
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="all"
                            className="px-4"
                        >
                            همه
                        </ToggleGroupItem>
                    </ToggleGroup>

                    {/* حالت نمایش */}
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        value={activeTab}
                        onValueChange={(value) => {
                            if (value === 'card' || value === 'list') {
                                setActiveTab(value);
                            }
                        }}
                        dir="rtl"
                    >
                        <ToggleGroupItem
                            value="card"
                            aria-label="نمایش کارت‌ها"
                        >
                            <LayoutGrid size={16}/>
                        </ToggleGroupItem>

                        <ToggleGroupItem
                            value="list"
                            aria-label="نمایش فهرستی"
                        >
                            <List size={16}/>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>

            {/* محصولات */}
            <div
                className={
                    activeTab === 'card'
                        ? 'grid gap-5 sm:grid-cols-4 mb-2'
                        : 'grid grid-cols-1 gap-5'
                }
            >
                {items.map((item, index) =>
                    renderItem(item, index)
                )}
            </div>
        </div>
    );
}

