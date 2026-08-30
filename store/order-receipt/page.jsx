'use client';

import { Container } from '@/store/components/common/container';
import { OrderReceiptContent } from '@/store/order-receipt/content';

export default function OrderReceiptPage() {
  return (
    <Container>
      <OrderReceiptContent />
    </Container>
  );
}
