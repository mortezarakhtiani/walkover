import Header from '@/store/components/common/header';
import {StoreClientProvider} from '@/store/components/context';
import {StoreClientWrapper} from '@/store/components/wrapper';
import {Toaster} from '@/store/components/ui/sonner';

export default function StoreClientLayout({children}) {
    return (
        <StoreClientProvider>
            <div className="store-theme min-h-screen">

                <Header/>

                <StoreClientWrapper>
                    <main className="pt-32">
                        {children}
                    </main>
                </StoreClientWrapper>

                <Toaster/>
            </div>
        </StoreClientProvider>
    );
}