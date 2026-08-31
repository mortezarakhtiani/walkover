import { StoreClientProvider } from '@/store/components/context';
import { StoreClientWrapper } from '@/store/components/wrapper';
import { StoreHeader } from '@/store/components/common/store-header';

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
      </div>
    </StoreClientProvider>
  );
}