'use client';

import {SpecialOffers} from '@/store/home/components/special-offers';
import {NewArrivals} from '@/store/home/components/new-arrivals';
import {StoreClientWrapper} from "@/store/components/wrapper";

export default function StoreProducts() {
    return (
        <StoreClientWrapper>
            <section className="store-theme py-20">
                <div className="container mx-auto px-4">
                    <div className="space-y-10">
                        <SpecialOffers
                            showSeeAll={true}
                            moreButton="نمایش بیشتر"
                            moreButtonHref="/store"
                            showAddButton={false}

                        />
                        <NewArrivals
                            showSeeAll={true}
                            moreButton="نمایش بیشتر"
                            moreButtonHref="/store"
                            showAddButton={false}

                        />
                    </div>
                </div>
            </section>
        </StoreClientWrapper>
    );
}