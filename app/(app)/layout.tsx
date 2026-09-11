import {StoreClientProvider} from '@/store/components/context';
import {StoreClientWrapper} from '@/store/components/wrapper';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreClientProvider>
            <StoreClientWrapper>
                <div className="container mx-auto px-10">
                    {children}
                </div>
            </StoreClientWrapper>
        </StoreClientProvider>
    );
}