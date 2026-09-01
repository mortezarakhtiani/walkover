'use client';

import Link from 'next/link';
import {MoveLeft, MoveRight} from 'lucide-react';
import {Button} from '@/store/components/ui/button';
import {Info} from './components/info';
import {Order} from './components/order';

export function ShippingInfoContent() {
    return (
        <div className="grid xl:grid-cols-3 gap-5 lg:gap-9 mb-5 lg:mb-10">
            <div className="lg:col-span-2 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                    <Info/>
                </div>
                <div className="flex justify-end items-center flex-wrap gap-3">
                    <Button asChild variant="outline">
                        <Link href="/store/checkout/order-summary">
                            <MoveLeft className="text-base"/>
                            Order Summary
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href="/store/checkout/payment-method">
                            Payment Method
                            <MoveRight className="text-base"/>
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="space-y-5">
                    <Order/>
                </div>
            </div>
        </div>
    );
}
