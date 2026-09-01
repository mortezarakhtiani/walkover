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
import {Captions} from 'lucide-react';
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
                            Your purchase has been successfully completed
                        </ToolbarDescription>
                    </ToolbarHeading>
                    <ToolbarActions>
                        <Button variant="outline">
                            <Captions/>
                            <Link href="/store/my-orders">My Orders</Link>
                        </Button>

                        <Button>
                            <Captions/>
                            <Link href="/store">Continue Shopping</Link>
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
