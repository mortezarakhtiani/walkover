import { Container } from '@/components/common/container';
import { StoreClientContent } from '@/store/home/content';
import { StoreClientTopbar } from '@/store/components/common/topbar';

export default function StoreClientPage() {
  return (
      <div className="min-h-screen">
          {/* Store Topbar */}
          <header className="sticky top-0 z-10 w-full shrink-0 border-b border-border bg-background">
              <Container>
                  <div className="flex items-center justify-end min-h-[64px]">
                      <StoreClientTopbar/>
                  </div>
              </Container>
          </header>

          {/* Store Content */}
          <Container>
              <StoreClientContent/>
          </Container>
      </div>
  );
}