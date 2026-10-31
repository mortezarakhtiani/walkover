
'use client';

import { Fragment } from 'react';

import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';

import { Container } from '@/store/components/common/container';
import { PaymentMethodContent } from '@/store/checkout/payment-method/content';
import { Steps } from '@/store/checkout/steps';
import { AddPaymentCardDialog } from '@/store/components/ui/add-payment-card-dialog';

export default function PaymentMethodPage() {
  const handleAddCard = (newCard) => {
    console.log('کارت جدید:', newCard);
  };

  return (
    <Fragment>
      <Steps currentStep={2} />

      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle text="روش پرداخت" />
            <ToolbarDescription>
              لطفاً روش پرداخت خود را انتخاب کنید
            </ToolbarDescription>
          </ToolbarHeading>

          <ToolbarActions>
            <AddPaymentCardDialog onAdd={handleAddCard} />
          </ToolbarActions>
        </Toolbar>
      </Container>

      <Container className="pb-10">
        <PaymentMethodContent />
      </Container>
    </Fragment>
  );
}
