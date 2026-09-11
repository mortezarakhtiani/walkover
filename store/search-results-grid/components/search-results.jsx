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

export function SearchResults({mode}) {
    const [activePeriod, setActivePeriod] = useState('week');
    const [activeTab, setActiveTab] = useState(mode);

    const items = [
        {
            logo: '/images/hoodimanfront.webp',
            title: 'هودی مردانه اسپرت کتان',
            total: '990000',
            star: '5.0',
            sku: 'SH-001-BLK-42',
            category1: 'نایک',
            category2: 'هودی',
        },
        {
            logo: '/images/hoodimanback.webp',
            title: 'تیشرت مردانه طرح اسپرت',
            total: '659000',
            star: '3.5',
            sku: 'SNK-XY-WHT-10',
            category1: 'آدیداس',
            category2: 'تیشرت',
        },
        {
            logo: '/images/hoodifront.webp',
            title: 'هودی اسپرت طرح جدید',
            total: '1200000',
            star: '4.7',
            sku: 'BT-A1-YLW-8',
            category1: 'تیمبرلند',
            category2: 'هودی',
        },
        {
            logo: '/images/hoodiback.webp',
            title: 'هودی مردانه مدل کلاسیک',
            total: '1400000',
            label: '1790000',
            badge: true,
            star: '3.2',
            sku: 'SD-Z9-BRN-39',
            category1: 'برند اختصاصی',
            category2: 'هودی',
        },
        {
            logo: '/images/man.png',
            title: 'تیشرت مردانه اورسایز',
            total: '990000',
            label: '1400000',
            badge: true,
            star: '4.1',
            sku: 'WRK-77-BLK-9',
            category1: 'دکتر مارتنز',
            category2: 'تیشرت',
        },
        {
            logo: '/images/woman.png',
            title: 'تیشرت اسپرت مردانه',
            total: '659000',
            star: '3.5',
            sku: 'SNK-555-GRY-11',
            category1: 'نیوبالانس',
            category2: 'تیشرت',
        },
        {
            logo: '/images/show1.webp',
            title: 'هودی اورسایز اسپرت',
            total: '2800000',
            label: '3150000',
            badge: true,
            star: '4.9',
            sku: 'SH-222-BLU-40',
            category1: 'پوما',
            category2: 'هودی',
        },
        {
            logo: '/images/show2.webp',
            title: 'هودی مردانه طرح مینیمال',
            total: '1100000',
            star: '4.9',
            sku: 'BT-777-BLK-9',
            category1: 'UGG',
            category2: 'هودی',
        },
        {
            logo: '/images/show3.webp',
            title: 'تیشرت مردانه اسپرت',
            total: '990000',
            star: '5.0',
            sku: 'SD-999-TAN-38',
            category1: 'کروکس',
            category2: 'تیشرت',
        },
        {
            logo: '/images/hoodiwomanback.webp',
            title: 'تیشرت مردانه طرح گرافیکی',
            total: '460000',
            label: '1100000',
            badge: true,
            star: '3.5',
            sku: 'WRK-333-GRN-10',
            category1: 'کاترپیلار',
            category2: 'تیشرت',
        },
        {
            logo: '/images/hoodiwomanfront.webp',
            title: 'هودی مردانه طرح جدید',
            total: '1200000',
            star: '4.7',
            sku: 'SNK-888-RED-42',
            category1: 'ریباک',
            category2: 'هودی',
        },
        {
            logo: '/images/shoose.png',
            title: 'هودی مردانه اسپرت',
            total: '1100000',
            star: '4.9',
            sku: 'BT-444-BRN-7',
            category1: 'کلمبیا',
            category2: 'هودی',
        },
    ];

    const renderItem = (item, index) => {
        const props = {
            logo: item.logo,
            star: item.star,
            sku: item.sku,
            title: item.title,
            total: item.total,
            label: item.label,
            badge: item.badge,
            category1: item.category1,
            category2: item.category2,
        };

        return activeTab === 'card' ? (
            <Card2 key={index} {...props} />
        ) : (
            <Card3 key={index} {...props} />
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

