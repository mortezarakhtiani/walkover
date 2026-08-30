import { StoreClientProvider } from '@/store/components/context';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreClientProvider>
            {children}
        </StoreClientProvider>
    );
}