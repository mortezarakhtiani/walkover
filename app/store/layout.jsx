import { StoreClientProvider } from '@/store/components/context';
import { StoreClientWrapper } from '@/store/components/wrapper';
import { StoreHeader } from '@/store/components/common/store-header';
import { Toaster } from '@/store/components/ui/sonner';

export default function StoreClientLayout({ children }) {
  return (
    <StoreClientProvider>
      <div className="store-theme">
        <StoreHeader />

        <StoreClientWrapper>
          <div className="pt-10">
            {children}
          </div>
        </StoreClientWrapper>

        <Toaster />
      </div>
    </StoreClientProvider>
  );
}