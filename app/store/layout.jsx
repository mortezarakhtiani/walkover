import { StoreClientProvider } from '@/store/components/context';
import { StoreClientWrapper } from '@/store/components/wrapper';

export default function StoreClientLayout({ children }) {
  return (
    <div className="store-theme">
      <StoreClientProvider>
        <StoreClientWrapper>
          {children}
        </StoreClientWrapper>
      </StoreClientProvider>
    </div>
  );
}