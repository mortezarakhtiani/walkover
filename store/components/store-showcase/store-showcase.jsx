'use client';

import {ShoppingCart, Star, ChevronRight} from 'lucide-react';

export default function StoreShowcase() {
    const newArrivals = [
        {
            logo: '8.png',
            title: 'Cloud Shift Lightweight Runner Pro Edition',
            total: '99.00',
            star: '5.0',
        },
        {
            logo: '9.png',
            title: 'Wave Strike Dynamic Boost Sneaker',
            total: '120.00',
            star: '4.7',
        },
        {
            logo: '5.png',
            title: 'Titan Edge High Impact Stability Lightweight Trainers',
            total: '65.99',
            star: '3.5',
        },
        {
            logo: '10.png',
            title: 'Velocity Boost Xtreme High Shock Absorbers',
            total: '110.00',
            star: '4.9',
        },
    ];

    return (
        <section className="space-y-8 py-12">

            {/* ================= Special Offers ================= */}
            <div className="space-y-5">

                <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-medium text-mono">
                        Special Offers
                    </span>

                    <button className="text-primary text-xs inline-flex items-center gap-1.5">
                        See All
                        <ChevronRight className="size-4"/>
                    </button>
                </div>

                <div className="grid xl:grid-cols-2 gap-5">

                    {/* Main Offer */}
                    <div
                        className="rounded-xl border shadow-xs bg-violet-50 border-violet-200 dark:bg-violet-950/30 dark:border-violet-950 h-full">
                        <div
                            className="flex items-center flex-wrap sm:flex-nowrap justify-between gap-5 lg:gap-9 p-7.5 pb-0">

                            <div className="flex flex-col">

                                <div className="mb-3">
                                    <span
                                        className="inline-flex items-center justify-center bg-destructive text-destructive-foreground rounded-sm px-[0.325rem] h-5 text-[0.6875rem] uppercase">
                                        save 25%
                                    </span>
                                </div>

                                <h3 className="text-[26px] font-semibold text-mono mb-1">
                                    Nike Air Max 270
                                </h3>

                                <span className="text-sm font-normal text-foreground mb-5 leading-5.5">
                                    The Melodic Monster of Sonic Delights and Harmonious Rhythms
                                </span>

                                <div className="flex items-center gap-4 mb-5">
                                    <button
                                        className="inline-flex items-center justify-center bg-zinc-950 text-white h-7 rounded-md px-2.5 gap-1.25 text-xs">
                                        <ShoppingCart className="size-3.5"/>
                                        Add to Cart
                                    </button>

                                    <span className="text-base font-semibold text-mono">
                                        $140.00
                                    </span>
                                </div>

                            </div>

                            <img
                                src="/media/store/client/600x600/16.png"
                                className="h-[250px]"
                                alt="Nike Air Max 270"
                            />

                        </div>
                    </div>

                    {/* Two Smaller Offers */}
                    <div className="grid sm:grid-cols-2 gap-5 items-stretch">

                        <OfferCard
                            title="Nike Dunk Low"
                            total="$110.00"
                            logo="4.png"
                            bg="bg-green-50 dark:bg-green-950/30"
                            border="border-green-200 dark:border-green-950"
                        />

                        <OfferCard
                            title="Nike Air Force 1"
                            total="$96.99"
                            logo="1.png"
                            bg="bg-primary/10"
                            border="border-primary/10"
                        />

                    </div>
                </div>
            </div>


            {/* ================= New Arrivals ================= */}
            <div className="space-y-4">

                <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-medium text-mono">
                        New Arrivals
                    </span>

                    <button className="text-primary text-xs inline-flex items-center gap-1.5">
                        See All
                        <ChevronRight className="size-4"/>
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

                    {newArrivals.map((item) => (
                        <div
                            key={item.logo}
                            className="flex flex-col justify-between rounded-xl bg-card border border-border shadow-xs p-2.5 gap-4"
                        >

                            <div className="mb-2.5">

                                <div
                                    className="flex items-center justify-center relative bg-accent/50 w-full h-[180px] rounded-xl mb-4">
                                    <img
                                        src={`/media/store/client/600x600/${item.logo}`}
                                        className="h-[180px] shrink-0 cursor-pointer"
                                        alt={item.title}
                                    />
                                </div>

                                <div className="text-sm font-medium text-mono px-2.5 leading-5.5">
                                    {item.title}
                                </div>

                            </div>

                            <div className="flex items-center flex-wrap justify-between gap-5 px-2.5 pb-1">

                                <span
                                    className="inline-flex items-center justify-center bg-yellow-500 text-white px-[0.325rem] h-5 min-w-5 text-[0.6875rem] rounded-full gap-1">
                                    <Star
                                        className="size-3 text-white"
                                        fill="currentColor"
                                    />
                                    {item.star}
                                </span>

                                <div className="flex items-center flex-wrap gap-1.5">

                                    <span className="text-sm font-medium text-mono">
                                        ${item.total}
                                    </span>

                                    <button
                                        className="ms-1 inline-flex items-center justify-center bg-background border border-input hover:bg-accent h-7 rounded-md px-2.5 gap-1.25 text-xs">
                                        <ShoppingCart className="size-3.5"/>
                                        Add
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}


function OfferCard({title, total, logo, bg, border}) {
    return (
        <div className={`rounded-xl border shadow-xs h-full ${bg} ${border}`}>

            <div className="flex flex-col items-center justify-center p-5 pb-0">

                <div className="mb-3.5">
                    <span
                        className="inline-flex items-center justify-center bg-destructive text-destructive-foreground rounded-sm px-[0.325rem] h-5 text-[0.6875rem] uppercase">
                        save 25%
                    </span>
                </div>

                <span className="text-base font-medium text-mono mb-3">
                    {title}
                </span>

                <button
                    className="inline-flex items-center justify-center bg-background border border-input hover:bg-accent h-7 rounded-md px-2.5 gap-1.25 text-xs mb-2.5">
                    <ShoppingCart className="size-3.5"/>
                    Add to Cart
                </button>

                <span className="text-sm font-medium text-mono">
                    {total}
                </span>

                <img
                    src={`/media/store/client/600x600/${logo}`}
                    className="size-48"
                    alt={title}
                />

            </div>

        </div>
    );
}