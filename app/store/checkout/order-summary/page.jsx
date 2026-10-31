'use client';

import { Fragment } from 'react';
import {
    Toolbar,
    ToolbarActions,
    ToolbarDescription,
    ToolbarHeading,
    ToolbarPageTitle,
} from '@/partials/common/toolbar';

import { BaggageClaim } from 'lucide-react';
import { Button } from '@/store/components/ui/button';
import { Container } from '@/store/components/common/container';
import { OrderSummaryContent } from '@/store/checkout/order-summary/content';
import { Steps } from '@/store/checkout/steps';
import { useStoreClient } from '@/store/components/context';

export default function OrderSummaryPage() {
    const { showCartSheet } = useStoreClient();

    return (
        <Fragment>
            <Steps currentStep={0} />

            <Container>
                <Toolbar>
                    <ToolbarHeading>
                        <ToolbarPageTitle />
                        <ToolbarDescription>
                            قبل از پرداخت، اقلام سفارش خود را بررسی کنید
                        </ToolbarDescription>
                    </ToolbarHeading>

                    <ToolbarActions>
                        <Button
                            variant="outline"
                            onClick={showCartSheet}
                        >
                            <BaggageClaim />
                            نمایش سبد خرید
                        </Button>
                    </ToolbarActions>
                </Toolbar>
            </Container>

            <Container className="pb-10">
                <OrderSummaryContent />
            </Container>
        </Fragment>
    );
}