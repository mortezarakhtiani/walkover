
import { StoreClientProvider } from '@/store/components/context';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreClientProvider>
            <div className="container mx-auto px-10">
                {children}
            </div>
        </StoreClientProvider>
    );
}

