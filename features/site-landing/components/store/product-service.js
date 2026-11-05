/*
 * Product service, same surface as the previous storefront's
 * `@/store/product/services/product-service` (getProductBySlug) plus getProducts().
 *
 * It reads the single product source, `data/site.js`, and normalizes each entry to the old
 * store's product model so the old card/detail behaviours (discount, original price, stock,
 * colours, sizes, SKU, rating) work unchanged once real values are filled in there.
 * Nothing is invented here: missing values stay null and the UI shows "coming soon".
 */

import { products as source } from "@/features/site-landing/data/site";

const KIND_LABEL = { hoodie: "هودی", tee: "تیشرت", mug: "ماگ", cap: "کلاه", poster: "پوستر", stickers: "استیکر" };

/** @typedef {{ name:string, value:string }} Color */
/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} slug
 * @property {string} kind          drives the SVG product render (ProductArt)
 * @property {string} title         old-store field
 * @property {string} name          alias kept for existing walkover components
 * @property {string} line          one-line material/print note
 * @property {string} category
 * @property {string|null} description
 * @property {string|null} art      artwork printed on the product
 * @property {string[]} images      real product photos (none yet)
 * @property {number|null} price          Toman
 * @property {number|null} originalPrice  Toman, shown struck through when set
 * @property {number} discount            percent; derived from the two prices when not given
 * @property {number|null} stock          null = store not connected, 0 = sold out
 * @property {string|null} sku
 * @property {Color[]|null} colors
 * @property {string[]|null} sizes
 * @property {number|null} rating
 * @property {number|null} reviewCount
 * @property {boolean} sample
 */

/** @returns {Product} */
export function normalizeProduct(p) {
  const price = p.price ?? null;
  const originalPrice = p.originalPrice ?? null;
  const derived = price != null && originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  return {
    id: p.id ?? p.slug,
    slug: p.slug,
    kind: p.kind,
    title: p.title ?? p.name,
    name: p.name ?? p.title,
    line: p.line ?? "",
    category: p.category ?? KIND_LABEL[p.kind] ?? "مرچ",
    description: p.description ?? null,
    art: p.art ?? null,
    images: p.images ?? [],
    price,
    originalPrice,
    discount: p.discount ?? derived,
    stock: p.stock ?? (p.available === true ? 1 : p.available === false ? 0 : null),
    sku: p.sku ?? null,
    colors: p.colors ?? null,
    sizes: p.sizes ?? null,
    rating: p.rating ?? null,
    reviewCount: p.reviewCount ?? null,
    sample: !!p.sample,
  };
}

const all = source.map(normalizeProduct);

/** @returns {Product[]} */
export const getProducts = () => all;

/** @returns {Product|null} */
export const getProductBySlug = (slug) => all.find((p) => p.slug === slug) ?? null;

/** @returns {Product|null} */
export const getProductById = (id) => all.find((p) => p.id === id) ?? null;
