import {StoreClientProvider} from '@/store/components/context';
import {StoreClientWrapper} from '@/store/components/wrapper';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            {children}
        </div>
    );
}