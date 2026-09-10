'use client';

import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
import {Button} from '@/store/components/ui/button';
import {Card2} from '@/store/components/common/card2';
import {getProducts} from '@/store/product/services/product-service';

export function NewArrivals({
                                showAddButton = true,
                                showSeeAll = true,
                                moreButton = 'نمایش همه',
                                moreButtonHref = '/store/search-results-grid',
                            }) {
    const items = getProducts();

    const renderItem = (item, index) => (
        <Card2
            id={item.id}
            logo={item.logo}
            star={item.rating}
            title={item.title}
            total={item.total}
            key={item.id}
            showAddButton={showAddButton}
        />
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">


                {showSeeAll && (
                    <Button mode="link" asChild>
                        <Link href={moreButtonHref} className="text-xs">
                            <ChevronRight/>
                            {moreButton}
                        </Link>
                    </Button>
                )}

                <span className="text-lg font-medium text-mono">
                    محصولات جدید
                </span>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-2">
                {items.map((item, index) => {
                    return renderItem(item, index);
                })}
            </div>
        </div>
    );
}

