"use client";

/*
 * Product detail, ported from the previous storefront's app/store/product/[slug]/page.jsx and
 * fitted to a sheet. Kept from the original: gallery frame with discount badge and prev/next +
 * thumbnails, category/title/rating/description stack, price box, colour swatches, size pills,
 * the quantity stepper (disabled until added, trash icon at 1), add-to-cart, wishlist toggle,
 * shipping note, product code row, and the same useStoreClient().handleAddToCart call.
 * Adapted: renders inside the landing page (no route), walkover palette, and sections without
 * data (rating, sizes, colours, shipping, SKU) are hidden instead of filled with defaults.
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, ShoppingCart, Star, Trash2 } from "lucide-react";
import { links } from "@/data/site";
import { toPersianDigits } from "@/lib/to-persian";
import ProductArt from "../ProductArt";
import PriceTag, { DiscountBadge } from "./PriceTag";
import { useStoreClient } from "./StoreContext";

function Rating({ rating = 0, outOf = 5 }) {
  return (
    <div dir="ltr" className="flex items-center gap-0.5">
      {Array.from({ length: outOf }, (_, index) => {
        const filled = index + 1 <= rating;
        return <Star key={index} className={`size-4 ${filled ? "text-yellow-400" : "text-[#BFBCB7]/25"}`} fill={filled ? "currentColor" : "none"} strokeWidth={1.8} />;
      })}
    </div>
  );
}

export default function ProductDetail({ product, titleId = "product-title" }) {
  const { handleAddToCart, handleUpdateQuantity, handleRemoveFromCart } = useStoreClient();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // gallery views: the product render, the print artwork, then any real photos
  const views = [
    { type: "render" },
    ...(product.art && product.kind !== "stickers" ? [{ type: "print", src: product.art }] : []),
    ...product.images.map((src) => ({ type: "photo", src })),
  ];
  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];
  const canBuy = !!product.stock;
  const line = { productId: product.id, color: selectedColor, size: selectedSize };

  const decreaseQuantity = () => {
    const next = Math.max(0, quantity - 1);
    if (next === 0) setIsAddedToCart(false);
    setQuantity(next);
    handleUpdateQuantity({ ...line, quantity: next });
  };
  const increaseQuantity = () => {
    if (!isAddedToCart) return;
    setQuantity(quantity + 1);
    handleUpdateQuantity({ ...line, quantity: quantity + 1 });
  };
  const removeProductFromCart = () => {
    setQuantity(0);
    setIsAddedToCart(false);
    handleRemoveFromCart(line);
  };
  const addProductToCart = () => {
    handleAddToCart({ ...line, quantity: 1 });
    setIsAddedToCart(true);
    setQuantity((current) => current + 1);
  };

  const view = views[selectedImage];
  const renderView = (v, cls, prefix) =>
    v.type === "render" ? (
      <ProductArt product={product} idPrefix={prefix} className={cls} />
    ) : (
      <img src={v.src} alt={v.type === "print" ? `طرح چاپ ${product.title}` : product.title} className={`${cls} object-cover`} />
    );

  return (
    <div dir="rtl" className="px-5 pb-10 sm:px-7">
      {/* Gallery */}
      <div className="flex flex-col gap-4">
        <div className="group relative overflow-hidden rounded-md border border-[var(--store-border)] bg-[radial-gradient(ellipse_at_50%_30%,#262222_0%,#121111_70%)]">
          <DiscountBadge discount={product.discount} className="absolute start-5 top-5 z-20" />
          {views.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setSelectedImage((c) => (c > 0 ? c - 1 : c))}
                disabled={selectedImage === 0}
                aria-label="تصویر قبلی"
                className="absolute start-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--store-border)] bg-[#0c0b0b]/90 text-[var(--store-fg)] shadow-sm transition-all hover:bg-[var(--store-bg)] disabled:pointer-events-none disabled:opacity-20"
              >
                <ChevronRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedImage((c) => (c < views.length - 1 ? c + 1 : c))}
                disabled={selectedImage === views.length - 1}
                aria-label="تصویر بعدی"
                className="absolute end-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--store-border)] bg-[#0c0b0b]/90 text-[var(--store-fg)] shadow-sm transition-all hover:bg-[var(--store-bg)] disabled:pointer-events-none disabled:opacity-20"
              >
                <ChevronLeft className="size-4" />
              </button>
            </>
          )}
          <div className="relative aspect-square">
            {renderView(view, "absolute inset-0 m-auto h-[86%] w-[86%] transition-transform duration-500 group-hover:scale-[1.02]", "sheet-")}
          </div>
        </div>

        {views.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {views.map((v, index) => (
              <button
                key={`${v.type}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                aria-label={`نمای ${toPersianDigits(index + 1)}`}
                aria-current={selectedImage === index ? "true" : undefined}
                className={`relative flex size-[78px] shrink-0 items-center justify-center overflow-hidden rounded-md border bg-[#121111] p-1 transition-all ${
                  selectedImage === index ? "border-[var(--store-primary)] ring-2 ring-[#dc2626]/20" : "border-[var(--store-border)] hover:border-[#dc2626]/50"
                }`}
              >
                {renderView(v, "size-full rounded-md", `thumb${index}-`)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="mt-7 flex min-w-0 flex-col">
        <span className="mb-2 text-sm font-medium text-[var(--store-primary-text)]">{product.category}</span>
        <h2 id={titleId} className="text-2xl font-bold leading-9 tracking-tight text-[var(--store-mono)] sm:text-3xl">{product.title}</h2>

        {product.rating != null && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Rating rating={Math.round(product.rating)} />
              <span className="text-sm font-semibold text-[var(--store-mono)]">{toPersianDigits(String(product.rating))}</span>
            </div>
            <span className="h-4 w-px bg-[var(--store-border)]" />
            <span className="text-sm text-[var(--store-muted)]">{toPersianDigits(String(product.reviewCount ?? 0))} نظر کاربران</span>
          </div>
        )}

        <p className="mt-4 text-[16px] leading-8 text-[var(--store-muted)]">{product.description ?? product.line}</p>

        {/* Price box */}
        <div className="mt-6 rounded-md bg-[var(--store-accent)] p-4">
          <div className="flex items-end justify-between gap-4">
            <PriceTag product={product} size="lg" />
            <DiscountBadge discount={product.discount} className="py-1" />
          </div>
        </div>

        <div className="my-7 h-px bg-[var(--store-border)]" />

        {/* Colour */}
        {colors.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--store-mono)]">رنگ:</span>
              {selectedColor && <span className="text-sm text-[var(--store-muted)]">{selectedColor.name}</span>}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  aria-label={`انتخاب رنگ ${color.name}`}
                  aria-pressed={selectedColor?.name === color.name}
                  className={`flex size-10 items-center justify-center rounded-full border-2 transition-all ${
                    selectedColor?.name === color.name ? "border-[var(--store-primary)]" : "border-[var(--store-border)] hover:border-[#dc2626]/50"
                  }`}
                >
                  <span className="size-7 rounded-full border border-white/15" style={{ backgroundColor: color.value }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size */}
        {sizes.length > 0 && (
          <div className={colors.length ? "mt-7" : ""}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-[var(--store-mono)]">سایز</span>
              {selectedSize && <span className="text-sm text-[var(--store-muted)]">{toPersianDigits(selectedSize)}</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`min-w-[52px] rounded-md border px-4 py-2.5 text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "border-[var(--store-primary)] bg-[var(--store-primary)] text-white shadow-sm shadow-black/40"
                      : "border-[var(--store-border)] bg-transparent text-[var(--store-fg)] hover:border-[var(--store-primary)] hover:text-[var(--store-primary-text)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity + cart + wishlist */}
        <div className="mt-8 flex items-center gap-2 sm:gap-3">
          <div className={`flex h-12 shrink-0 items-center rounded-md border border-[var(--store-border)] transition-opacity ${!isAddedToCart ? "opacity-50" : ""}`}>
            <button
              type="button"
              onClick={quantity === 1 ? removeProductFromCart : decreaseQuantity}
              disabled={!isAddedToCart}
              className="flex size-11 items-center justify-center text-[var(--store-muted)] transition-colors hover:text-[var(--store-fg)] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={quantity === 1 ? "حذف محصول" : "کاهش تعداد"}
            >
              {quantity === 1 ? <Trash2 className="size-4 text-red-700" /> : <Minus className="size-4" />}
            </button>
            <span className="w-8 text-center text-sm font-semibold text-[var(--store-mono)]" aria-live="polite">{toPersianDigits(quantity)}</span>
            <button
              type="button"
              onClick={increaseQuantity}
              disabled={!isAddedToCart}
              className="flex size-11 items-center justify-center text-[var(--store-muted)] transition-colors hover:text-[var(--store-fg)] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="افزایش تعداد"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={addProductToCart}
            disabled={!canBuy}
            className="inline-flex h-12 grow items-center justify-center gap-2 rounded-md bg-[var(--store-primary)] px-4 text-[15px] font-semibold text-white shadow-sm shadow-black/40 transition-all hover:bg-[var(--store-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--store-accent)] disabled:text-[var(--store-muted)]"
          >
            <ShoppingCart className="size-4" aria-hidden />
            {canBuy ? "افزودن به سبد خرید" : product.stock === 0 ? "ناموجود" : "به‌زودی"}
          </button>

          <button
            type="button"
            onClick={() => setIsFavorite((c) => !c)}
            aria-pressed={isFavorite}
            aria-label="افزودن به علاقه‌مندی‌ها"
            className={`flex size-12 shrink-0 items-center justify-center rounded-md border transition-colors ${
              isFavorite ? "border-red-900 bg-red-950/30 text-red-700" : "border-[var(--store-border)] text-[var(--store-fg)] hover:border-white/25"
            }`}
          >
            <Heart className="size-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {canBuy ? (
          <div className="mt-6 rounded-md border border-[var(--store-border)] bg-[#1b1919]/60 p-4">
            <span className="block text-sm font-semibold text-[var(--store-mono)]">ارسال به سراسر کشور</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--store-muted)]">سفارش شما پس از آماده‌سازی برای ارسال تحویل پست یا شرکت حمل‌ونقل می‌شود.</span>
          </div>
        ) : (
          <div className="mt-6 rounded-md border border-[var(--store-border)] bg-[#1b1919]/60 p-4">
            <span className="block text-sm font-semibold text-[var(--store-mono)]">{product.sample ? "محصول نمونه" : "هنوز در فروش نیست"}</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--store-muted)]">
              این محصول هنوز در فروش نیست. قیمت، سایزبندی و موجودی بعد از اتصال فروشگاه واقعی اضافه می‌شود.
            </span>
            <a href={links.telegram} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm text-[var(--store-primary-text)] underline-offset-4 hover:underline">
              خبر راه‌اندازی در تلگرام
            </a>
          </div>
        )}

        {product.sku && (
          <div className="mt-5 flex items-center justify-between border-t border-[var(--store-border)] pt-5 text-sm">
            <span className="text-[var(--store-muted)]">کد محصول</span>
            <span className="font-medium text-[var(--store-fg)]">{product.sku}</span>
          </div>
        )}
      </div>
    </div>
  );
}
