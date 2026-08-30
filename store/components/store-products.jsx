'use client';

import {SpecialOffers} from '@/store/home/components/special-offers';
import {NewArrivals} from '@/store/home/components/new-arrivals';

export default function StoreProducts() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="space-y-10">
                    <SpecialOffers showSeeAll={false}/>
                    <NewArrivals showSeeAll={false}/>
                </div>
            </div>
        </section>
    );
}