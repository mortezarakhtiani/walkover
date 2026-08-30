
import { Container } from '@/components/common/container';
import { StoreClientContent } from '@/store/home/content';

export default function StoreClientPage() {
  return (
    <div className="min-h-screen">
      {/* Store Content */}
      <Container>
        <StoreClientContent />
      </Container>
    </div>
  );
}

