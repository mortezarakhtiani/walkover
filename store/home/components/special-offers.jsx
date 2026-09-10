'use client';

import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
import {Button} from '@/store/components/ui/button';
import {Card1} from '@/store/home/special-offers/card1';
import {Card2} from '@/store/home/special-offers/card2';

export function SpecialOffers({
                                  showAddButton = true,
                                  showSeeAll = true,
                                  moreButton = 'نمایش همه',
                                  moreButtonHref = '/store/search-results-grid',
                              }) {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
    <span className="text-lg font-medium text-mono">
        پیشنهادات ویژه
    </span>

                {showSeeAll && (
                    <Button mode="link" asChild>
                        <Link href={moreButtonHref} className="text-xs">
                            <ChevronRight/>
                            {moreButton}
                        </Link>
                    </Button>
                )}

            </div>


            <div className="grid xl:grid-cols-2 gap-5 mb-2">
                <div className="lg:col-span-1">
                    <Card1
                        showAddButton={showAddButton}/>
                </div>

                <div className="lg:col-span-1">
                    <div className="grid sm:grid-cols-2 gap-5 items-stretch">
                        <Card2
                            logo="4.png"
                            title="کفش ورزشی Nike Dunk Low"
                            total="110.00"
                            bgColor="bg-green-50 dark:bg-green-950/30"
                            borderColor="border-green-200 dark:border-green-950"
                            showAddButton={showAddButton}
                        />

                        <Card2
                            logo="1.png"
                            title="کفش ورزشی Nike Air Force 1"
                            total="96.99"
                            bgColor="bg-primary/10"
                            borderColor="border-primary/10"
                            showAddButton={showAddButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
