import {StoreClientProvider} from '@/store/components/context';
import {StoreClientWrapper} from '@/store/components/wrapper';
import {Toaster} from '@/store/components/ui/sonner';

export default function StoreClientLayout({children}) {
    return (
        <StoreClientProvider>
            <div className="store-theme">

                <StoreClientWrapper>
                    <div className="pt-10">
                        {children}
                    </div>
                </StoreClientWrapper>

                <Toaster/>
            </div>
        </StoreClientProvider>
    );
}