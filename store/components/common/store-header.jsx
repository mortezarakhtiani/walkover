'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/common/container';
// import { StoreClientTopbar } from './topbar';

export function StoreHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full shrink-0 bg-background',
        scrolled && 'border-b border-border',
      )}
    >
      <Container>
        <div className="flex items-center justify-end min-h-[64px]">
          {/*<StoreClientTopbar />*/}
        </div>
      </Container>
    </header>
  );
}