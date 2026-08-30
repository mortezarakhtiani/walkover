import { StoreClientProvider } from '@/store/components/context';
import { StoreClientWrapper } from '@/store/components/wrapper';
import { StoreClientTopbar } from '@/store/components/common/topbar';
import { Container } from '@/components/common/container';

export default function StoreClientLayout({ children }) {
  return (
    <StoreClientProvider>
      <div className="store-theme">
        <header className="sticky top-0 z-50 w-full shrink-0 border-b border-border bg-background">
          <Container>
            <div className="flex items-center justify-end min-h-[64px]">
              <StoreClientTopbar />
            </div>
          </Container>
        </header>

        <StoreClientWrapper>
          {children}
        </StoreClientWrapper>
      </div>
    </StoreClientProvider>
  );
}

