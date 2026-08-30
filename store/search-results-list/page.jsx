'use client';

import { Container } from '@/store/components/common/container';
import { SearchResultsListContent } from '@/store/search-results-list/content';

export default function SearchResultsListPage() {
  return (
    <Container>
      <SearchResultsListContent />
    </Container>
  );
}
