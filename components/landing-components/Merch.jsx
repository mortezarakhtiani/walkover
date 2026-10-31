"use client";

/*
 * REEL 06 — ARTIFACTS (the merch showcase)
 *
 * Scene (pinned, scrubbed): the creator's room has gone dark.
 *   0.04–0.35   a spotlight opens; a black silhouette of the featured piece is standing in it
 *   0.24–0.50   the light finds it: the lit render fades up over the silhouette, camera settles
 *   0.40–0.66   the piece slides into its final layout slot (left on desktop, up on phones)
 *   0.48–0.72   «تکه‌ای از شب را / به خانه ببر.» is drawn in
 *   0.64–0.86   copy, price and the real actions (details sheet, store) arrive
 * Then normal browsing: the whole collection as store cards (previous storefront's card
 * language) with a short staggered entrance, the product detail sheet, and the store dialog.
 */

import { useCallback, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { links } from "@/data/site";
import { getProducts } from "./store/product-service";
import ProductArt from "./ProductArt";
import ProductCard from "./store/ProductCard";
import ProductDetail from "./store/ProductDetail";
import PriceTag from "./store/PriceTag";
import { Dialog, Sheet } from "./Overlay";
import { EASE, ReelLabel, ScrubLines } from "./motion";
import { useScene, visibleWhen } from "./cinema/scene";
// import {SpecialOffers} from "../../store/home/components";
import {SpecialOffers} from '@/store/home/components/special-offers';
import { useStoreClient } from "@/store/components/context";


function ShowcaseScene({ product, onOpen, onStore }) {
  const scene = useRef(null);
  const { progress: p, mobile } = useScene(scene, { rest: 1 });

  const spotOpacity = useTransform(p, [0.04, 0.3], [0, 1]);
  const spotScale = useTransform(p, [0.04, 0.4], [0.45, 1]);
  const pieceOpacity = useTransform(p, [0.06, 0.22], [0, 1]);
  const litOpacity = useTransform(p, [0.24, 0.5], [0, 1]);
  const pieceScale = useTransform(p, [0.06, 0.5, 0.66], mobile ? [1.2, 1, 0.74] : [1.3, 1, 0.94]);
  const pieceX = useTransform(p, [0.4, 0.66], ["0vw", mobile ? "0vw" : "-23vw"]);
  const pieceY = useTransform(p, [0.4, 0.66], ["0%", mobile ? "-19%" : "0%"]);
  const copyOpacity = useTransform(p, [0.64, 0.76], [0, 1]);
  const copyY = useTransform(p, [0.64, 0.76], [20, 0]);
  const actOpacity = useTransform(p, [0.72, 0.86], [0, 1]);
  const actY = useTransform(p, [0.72, 0.86], [20, 0]);
  const actVis = useTransform(p, visibleWhen((v) => v > 0.7));
  const labelOpacity = useTransform(p, [0.46, 0.56], [0, 1]);

  return (
    <div ref={scene} className="scene scene-merch">
      <div className="scene-stage min-h-[640px] bg-[#070707]">
        {/* spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{ opacity: spotOpacity, scale: spotScale, x: pieceX, y: pieceY }}
        >
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(234,230,223,0.13)_0%,rgba(163,13,24,0.10)_22%,transparent_46%)]" />
        </motion.div>

        {/* the piece: silhouette first, then lit */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
          style={{ opacity: pieceOpacity, scale: pieceScale, x: pieceX, y: pieceY }}
          aria-hidden
        >
          <div className="relative flex h-[min(60svh,560px)] w-full items-center justify-center">
            {/* سایه‌ی محصول */}
            <img
                src="/assets/cloth%20(4).png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 m-auto h-full w-full object-contain [filter:brightness(0)_drop-shadow(0_0_1px_rgba(234,230,223,0.45))]"
            />

            {/* تصویر اصلی محصول */}
            <motion.img
                src="/assets/cloth%20(4).png"
                alt={product.title}
                className="absolute inset-0 m-auto h-full w-full object-contain"
                style={{opacity: litOpacity}}
            />
          </div>
        </motion.div>

        {/* copy, in the reading-start half */}
        <div className="relative mx-auto flex h-full max-w-[1440px] px-5 sm:px-10">
          <div className="flex w-full flex-col justify-end pb-10 md:w-1/2 md:justify-center md:pb-0">
            {/*<motion.div style={{opacity: labelOpacity}}>*/}
            {/*  <ReelLabel reel="06" label="ARTIFACTS" fa="فروشگاه مرچ"/>*/}
            {/*</motion.div>*/}
            <ScrubLines
                id="merch-title"
                progress={p}
                range={[0.48, 0.72]}
                lines={["تکه‌ای از شب را", "به خانه ببر."]}
              className=" mt-6 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-bold leading-[0.98] md:mt-8"
            />
            <motion.p className="mt-6 hidden max-w-md text-[16px] leading-8 text-[#BFBCB7] md:block" style={{ opacity: copyOpacity, y: copyY }}>
              اشیایی از دنیای روایت‌ها؛ هر طرح از یک پرونده آمده. این مجموعه پیشنهادی است و هنوز فروش آنلاین فعال نیست.
            </motion.p>
            <motion.div className="store-theme mt-6 md:mt-10" style={{ opacity: actOpacity, y: actY, visibility: actVis }}>
              <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
                <div>
                  <span className="text-sm text-[var(--store-primary-text)]">{product.category} · نمونه</span>
                  <p className="font-display text-[2rem] font-semibold leading-tight text-[#EAE6DF]">{product.title}</p>
                </div>
                <PriceTag product={product} />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={onOpen}
                    className="inline-flex h-12 cursor-pointer items-center rounded-md bg-red-600 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-red-700"
                >
                  جزئیات محصول
                </button>
                {/*<a href="#merch-collection" className="inline-flex h-12 items-center rounded-md border border-[var(--store-border)] px-6 text-[15px] text-[#EAE6DF] transition-colors hover:border-white/30">*/}
                {/*  همه‌ی اشیا*/}
                {/*</a>*/}
                <button type="button" onClick={onStore} className="cursor-pointer hidden h-12 items-center px-2 text-[15px] text-[#BFBCB7] hover:text-[#EAE6DF] hover:underline sm:inline-flex">
                  ورود به فروشگاه
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Merch() {
  const products = getProducts();
const [storeOpen, setStoreOpen] = useState(false);

const { showProductDetailsSheet } = useStoreClient();

const openStoreProduct = useCallback(() => {
  // شناسه اولین محصول واقعی فروشگاه
  showProductDetailsSheet(101);
}, [showProductDetailsSheet]);

const closeStore = useCallback(() => setStoreOpen(false), []);
  const enter = (i) => ({
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 },
  });

  return (
    <section id="merch" aria-labelledby="merch-title" className="relative bg-[#070707]">
      <ShowcaseScene
  product={products[0]}
  onOpen={openStoreProduct}
  onStore={() => setStoreOpen(true)}
/>

      <div id="merch-collection" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-28 pt-16 sm:px-0 sm:pb-40 sm:pt-0">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          {/*<h3 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none">همه‌ی اشیا</h3>*/}
          {/*<p className="max-w-sm text-[16px] leading-8 text-[#BFBCB7]">محصولات، نام‌ها و طرح‌ها نمونه‌اند و پیش از راه‌اندازی جایگزین می‌شوند.</p>*/}
        </div>

        {/*<ul className="store-theme mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-3">*/}
        {/*  {products.map((p, i) => (*/}
        {/*    <motion.li key={p.slug} {...enter(i)} data-reveal>*/}
        {/*      <ProductCard product={p} onOpen={setSelected} />*/}
        {/*    </motion.li>*/}
        {/*  ))}*/}
        {/*</ul>*/}

        <SpecialOffers
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store/search-results-grid"
                    showAddButton={true}
                />

        <div className="mt-16 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => setStoreOpen(true)}
            className="rounded-md bg-[#EAE6DF] px-10 py-4 text-[16px] font-medium text-[#070707] transition-colors hover:bg-red-700 hover:text-[#EAE6DF]"
          >
            ورود به فروشگاه مرچ
          </button>
        </div>
      </div>

      {/*<Sheet open={!!selected} onClose={closeSheet} labelledBy="product-title">*/}
      {/*  {selected && <ProductDetail key={selected.slug} product={selected} />}*/}
      {/*</Sheet>*/}

      {/*<Dialog open={storeOpen} onClose={closeStore} labelledBy="store-title">*/}
      {/*  <div className="p-8 sm:p-12">*/}
      {/*    <p className="font-mono-l text-sm text-[#BFBCB7]">STORE — CLOSED</p>*/}
      {/*    <h3 id="store-title" className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-tight">در فروشگاه هنوز قفل است.</h3>*/}
      {/*    <p className="mt-5 max-w-lg text-[16px] leading-8 text-[#BFBCB7]">*/}
      {/*      فروشگاه آنلاین هنوز راه نیفتاده و هیچ سفارشی ثبت نمی‌شود. برای خبرهای تازه، کانال تلگرام والکور را دنبال کن.*/}
      {/*    </p>*/}
      {/*    <div className="mt-8 flex flex-wrap gap-4">*/}
      {/*      <a href={links.telegram} target="_blank" rel="noopener noreferrer" className="bg-[#dc2626] px-6 py-3.5 text-[16px]">کانال تلگرام والکور</a>*/}
      {/*      <button type="button" onClick={closeStore} className="border border-white/15 px-6 py-3.5 text-[16px]">برگشت به صفحه</button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Dialog>*/}
    </section>
  );
}
