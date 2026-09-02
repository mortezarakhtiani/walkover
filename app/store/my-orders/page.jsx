'use client';

import Link from 'next/link';
import { BaggageClaim } from 'lucide-react';
import { Button } from '@/store/components/ui/button';
import { Container } from '@/components/common/container';
import { MyOrdersContent } from '@/app/store/my-orders/content';

export default function MyOrdersPage() {
  return (
    <>
      <Container>
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-xl font-semibold text-mono">
              سفارشات من
            </h1>

            <p className="text-sm text-secondary-foreground mt-1">
              مشاهده و مدیریت سفارش‌ها
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/store">
              ادامه خرید
              <BaggageClaim />
            </Link>
          </Button>
        </div>
      </Container>

      <Container>
        <MyOrdersContent />
      </Container>
    </>
  );
}