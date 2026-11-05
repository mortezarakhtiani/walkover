"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useTransform } from "framer-motion";
import { creator, links, nav, socials } from "@/features/site-landing/data/site";
import { Wordmark } from "./SiteNavigation";
import { fa } from "./motion";
import { useScene } from "./cinema/scene";

export default function SiteFooter() {
  const reduce = useReducedMotion();
  const [blackout, setBlackout] = useState(false);
  // the end title card: «پایان؟» surfaces only as the last frame scrolls into view
  const ref = useRef(null);
  const { progress: p } = useScene(ref, { offset: ["start end", "end end"], rest: 1 });
  const endOpacity = useTransform(p, [0.35, 1], [0, 1]);
  const endY = useTransform(p, [0.35, 1], ["35%", "0%"]);
  const endSpacing = useTransform(p, [0.35, 1], [1.12, 1]);

  // Fade to black, cut to the top, fade back in — like a reel rewinding.
  const backToTop = () => {
    if (reduce) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    setBlackout(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      setTimeout(() => setBlackout(false), 200);
    }, 700);
  };

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/[0.06] bg-[#070707] pt-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark className="text-[22px] text-[#EAE6DF]" />
            <p className="mt-6 max-w-sm font-display text-[1.9rem] leading-snug text-[#EAE6DF]/85">{creator.welcome}</p>
          </div>

          <nav aria-label="پیوندهای پاورقی" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="font-mono-l text-sm text-[#BFBCB7]">SITE</p>
              <ul className="mt-5 space-y-3 text-[16px]">
                {nav.map((n) => (
                  <li key={n.href}><a href={n.href} className="text-[#EAE6DF]/90 transition-colors hover:text-[#EAE6DF]">{n.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono-l text-sm text-[#BFBCB7]">WATCH</p>
              <ul className="mt-5 space-y-3 text-[16px]">
                <li><a href={links.videos} target="_blank" rel="noopener noreferrer" className="text-[#EAE6DF]/90 hover:text-[#EAE6DF]">آخرین ویدیوها</a></li>
                <li><a href="#archive" className="text-[#EAE6DF]/90 hover:text-[#EAE6DF]">آرشیو داستان‌ها</a></li>
                <li><a href="#merch" className="text-[#EAE6DF]/90 hover:text-[#EAE6DF]">فروشگاه مرچ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono-l text-sm text-[#BFBCB7]">FOLLOW</p>
              <ul className="mt-5 space-y-3 text-[16px]">
                {socials.map((s) => (
                  <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[#EAE6DF]/90 hover:text-[#EAE6DF]">{s.label}</a></li>
                ))}
                <li><a href={links.memoryBot} target="_blank" rel="noopener noreferrer" className="text-[#EAE6DF]/90 hover:text-[#EAE6DF]">ارسال خاطره</a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Final frame */}
        {/*<div className="relative mt-24 flex items-end justify-between gap-6 border-t border-white/[0.06] pb-8 pt-8">*/}
        {/*  <p className="text-sm text-[#BFBCB7]">© {fa(new Date().getFullYear())} walkover · {creator.handle}</p>*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    onClick={backToTop}*/}
        {/*    className="group flex items-center gap-3 text-sm text-[#BFBCB7] transition-colors hover:text-[#EAE6DF]"*/}
        {/*  >*/}
        {/*    برگرد به ابتدای تاریکی*/}
        {/*    <span className="flex h-11 w-11 items-center justify-center border border-white/15 transition-colors group-hover:border-[#dc2626]" aria-hidden>↑</span>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>

      {/*<div aria-hidden className="pointer-events-none relative -mb-[0.22em] select-none text-center font-display text-[clamp(7rem,26vw,24rem)] font-bold leading-none text-[#EAE6DF]/[0.04]">*/}
      {/*  <motion.span className="inline-block will-change-transform" style={{ opacity: endOpacity, y: endY, scaleX: endSpacing }}>*/}
      {/*    <span className="flicker inline-block">پایان<span className="text-[#dc2626]/40">؟</span></span>*/}
      {/*  </motion.span>*/}
      {/*</div>*/}

      <AnimatePresence>
        {blackout && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            transition={{ duration: 0.6 }}
            aria-hidden
          />
        )}
      </AnimatePresence>
    </footer>
  );
}
