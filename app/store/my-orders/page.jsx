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
              My Orders
            </h1>

            <p className="text-sm text-secondary-foreground mt-1">
              View and manage your orders
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/store">
              <BaggageClaim />
              Continue Shopping
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