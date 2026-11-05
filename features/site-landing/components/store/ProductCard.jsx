"use client";

/*
 * Store product card. Follows the previous storefront's card language (rounded-md frame on a
 * thin border, image well with rounded-md inset, rounded-full discount badge at the reading
 * start, category over a bold title, price row with a cart action) in the walkover palette.
 * The hover swap to the print artwork comes from the original landing-page card.
 */

import { ShoppingCart } from "lucide-react";
import ProductArt from "../ProductArt";
import PriceTag, { DiscountBadge } from "./PriceTag";
import { useStoreClient } from "./StoreContext";

export default function ProductCard({ product, onOpen }) {
  const { handleAddToCart } = useStoreClient();
  const needsChoice = !!(product.sizes?.length || product.colors?.length);
  const canBuy = !!product.stock;

  const quickAdd = () => {
    if (!canBuy) return;
    if (needsChoice) onOpen(product); // size/colour must be picked in the detail sheet
    else handleAddToCart({ productId: product.id, quantity: 1, color: null, size: null });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-[var(--store-border)] bg-[var(--store-card)] transition-colors duration-500 hover:border-white/20">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative m-2 mb-0 block overflow-hidden rounded-md bg-[radial-gradient(ellipse_at_50%_30%,#262222_0%,#121111_70%)] text-start"
        aria-label={`جزئیات ${product.title}`}
      >
        <div className="relative aspect-square">
          <ProductArt
            product={product}
            idPrefix="card-"
            className="absolute inset-0 m-auto h-[86%] w-[86%] transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
          />
          {product.art && product.kind !== "stickers" && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden>
              <img src={product.art} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.2)_brightness(0.55)]" />
              <span className="absolute bottom-3 start-3 rounded-full bg-[#070707]/85 px-2.5 py-0.5 text-sm text-[#EAE6DF]">نمای طرح چاپ</span>
            </div>
          )}
          <DiscountBadge discount={product.discount} className="absolute start-3 top-3" />
          {product.sample && (
            <span className="absolute end-3 top-3 rounded-full border border-[#EAE6DF]/25 bg-black/40 px-2.5 py-0.5 text-sm text-[var(--store-muted)]">نمونه</span>
          )}
        </div>
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="text-sm text-[var(--store-primary-text)]">{product.category}</span>
        <h3 className="mt-1 text-[17px] font-bold leading-7 text-[var(--store-mono)] sm:text-lg">{product.title}</h3>
        <p className="mt-1 text-sm leading-6 text-[var(--store-muted)]">{product.line}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
          <PriceTag product={product} />
          <button
            type="button"
            onClick={quickAdd}
            disabled={!canBuy}
            aria-label={canBuy ? `افزودن ${product.title} به سبد خرید` : `${product.title}: هنوز قابل خرید نیست`}
            title={canBuy ? "افزودن به سبد خرید" : "به‌زودی"}
            className="flex size-10 shrink-0 items-center justify-center rounded-md border border-[var(--store-border)] text-[var(--store-fg)] transition-colors hover:border-[var(--store-primary)] hover:bg-[var(--store-primary)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[var(--store-border)] disabled:hover:bg-transparent"
          >
            <ShoppingCart className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
