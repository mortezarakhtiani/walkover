// 'use client';

import {Container} from '@/components/common/container';
import {StoreClientContent} from '@/store/home/content';
import {StoreClientProvider} from '@/store/components/context';

export default function StoreClientPage() {
    return (
        <Container>
            <StoreClientContent/>
        </Container>
    );
}