'use client';

import {Fragment} from 'react';
import Link from 'next/link';
import {
    Toolbar,
    ToolbarActions,
    ToolbarDescription,
    ToolbarHeading,
    ToolbarPageTitle,
} from '@/partials/common/toolbar';
import {Captions, SquareMousePointer} from 'lucide-react';
import {Button} from '@/store/components/ui/button';
import {Container} from '@/store/components/common/container';
import {OrderPlacedContent} from '@/store/checkout/order-placed/content';
import {Steps} from '@/store/checkout/steps';

export default function OrderPlacedPage() {
    return (
        <Fragment>
            <Steps currentStep={3}/>
            <Container>
                <Toolbar>
                    <ToolbarHeading>
                        <ToolbarPageTitle/>
                        <ToolbarDescription>
                            سفارش شما با موفقیت انجام شد
                        </ToolbarDescription>
                    </ToolbarHeading>
                    <ToolbarActions>

                        <Button asChild>
                            <Link href="/store">
                            <Captions/>
                                ادامه خرید
                            </Link>
                        </Button>

                        <Button asChild variant="outline">
                            <Link href="/store/my-orders">
                                سفارشات من
                            </Link>
                        </Button>
                    </ToolbarActions>
                </Toolbar>
            </Container>
            <Container className="pb-10">
                <OrderPlacedContent/>
            </Container>
        </Fragment>
    );
}
