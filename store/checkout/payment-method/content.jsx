'use client';

import Link from 'next/link';
import {MoveLeft, SquareMousePointer} from 'lucide-react';
import {Button} from '@/store/components/ui/button';
import {Payment} from '@/store/checkout/payment-method/components/payment';
import {Order} from '@/store/checkout/shipping-info/components/order';

export function PaymentMethodContent() {
    return (
        <div className="grid xl:grid-cols-3 gap-5 lg:gap-9 mb-5 lg:mb-10">
            <div className="lg:col-span-2 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                    <Payment/>
                </div>
                <div className="flex justify-end items-center flex-wrap gap-3">


                    <Button asChild>
                        <Link href="/store/checkout/order-placed">
                            ثبت نهایی سفارش
                            <SquareMousePointer className="text-base"/>
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href="/store/checkout/shipping-info">
                        <MoveLeft className="text-base"/>
                            اطلاعات ارسال
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
