"use client";

/*
 * Cart state, API-compatible with the previous storefront's `useStoreClient()`:
 *   handleAddToCart({ productId, quantity, color, size })
 * One provider for the whole page (wrapped in app/page.jsx); the nav, the cards and the detail
 * sheet all read the same cart. No checkout exists yet; this is the hook-up point for one.
 */

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const StoreContext = createContext(null);

const lineKey = (i) => `${i.productId}|${i.color?.name ?? ""}|${i.size ?? ""}`;

export function StoreClientProvider({ children }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = useCallback(({ productId, quantity = 1, color = null, size = null }) => {
    setCart((items) => {
      const key = lineKey({ productId, color, size });
      const found = items.find((i) => lineKey(i) === key);
      if (found) return items.map((i) => (i === found ? { ...i, quantity: i.quantity + quantity } : i));
      return [...items, { productId, quantity, color, size }];
    });
  }, []);

  const handleUpdateQuantity = useCallback(({ productId, color = null, size = null, quantity }) => {
    setCart((items) => {
      const key = lineKey({ productId, color, size });
      return quantity <= 0 ? items.filter((i) => lineKey(i) !== key) : items.map((i) => (lineKey(i) === key ? { ...i, quantity } : i));
    });
  }, []);

  const handleRemoveFromCart = useCallback(({ productId, color = null, size = null }) => {
    const key = lineKey({ productId, color, size });
    setCart((items) => items.filter((i) => lineKey(i) !== key));
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount: cart.reduce((n, i) => n + i.quantity, 0),
      handleAddToCart,
      handleUpdateQuantity,
      handleRemoveFromCart,
    }),
    [cart, handleAddToCart, handleUpdateQuantity, handleRemoveFromCart]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStoreClient() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStoreClient must be used inside <StoreClientProvider>");
  return ctx;
}
