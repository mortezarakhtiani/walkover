'use client';

import { useCallback, useState } from 'react';

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1500);
      return true;
    } catch {
      setIsCopied(false);
      return false;
    }
  }, []);

  return { copyToClipboard, isCopied };
}
