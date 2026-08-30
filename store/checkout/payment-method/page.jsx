'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { WalletCards } from 'lucide-react';
import { Button } from '@/store/components/ui/button';
import { Container } from '@/store/components/common/container';
import { PaymentMethodContent } from '@/store/checkout/payment-method/content';
import { Steps } from '@/store/checkout/steps';

export default function PaymentMethodPage() {
  return (
    <Fragment>
      <Steps currentStep={2} />
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>Select how you want to pay</ToolbarDescription>
          </ToolbarHeading>
          <ToolbarActions>
            <Button variant="outline">
              <WalletCards />
              <Link href="#">Add Cart</Link>
            </Button>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <PaymentMethodContent />
      </Container>
    </Fragment>
  );
}
