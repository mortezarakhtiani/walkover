"use client";

/*
 * REEL 07 — STAY TUNED
 * The bookend: the corridor from the opening returns, pulling back instead of pushing in,
 * while the invitation is drawn by the scroll. Intensity keeps dropping: one scrubbed move,
 * then calm viewport-triggered reveals for the actions.
 */

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { heroImage, links } from "@/features/site-landing/data/site";
import { Reveal, ReelLabel, ScrubLines } from "./motion";
import { useScene } from "./cinema/scene";

export default function Community() {
  const section = useRef(null);
  const { progress: s } = useScene(section, { offset: ["start end", "end start"], rest: 0.5 });
  const { progress: h } = useScene(section, { offset: ["start 75%", "start 15%"], rest: 1 });
  const bgScale = useTransform(s, [0, 0.6], [1.3, 1]);
  const bgOpacity = useTransform(s, [0, 0.4, 1], [0, 0.24, 0.1]);
  const line = useTransform(h, [0.55, 1], [0, 1]);

  return (
    <section id="community" ref={section} aria-labelledby="community-title" className="relative overflow-hidden bg-black py-32 sm:py-48">
      <motion.img
        src={heroImage}
        alt=""
        aria-hidden
        width={1376}
        height={768}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.4)] will-change-transform"
        style={{ scale: bgScale, opacity: bgOpacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(92,10,18,0.35),transparent_60%)]" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-transparent to-[#070707]" aria-hidden />

      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center px-5 text-center sm:px-10">
        <ReelLabel reel="07" label="STAY TUNED" />
        <ScrubLines
          id="community-title"
          progress={h}
          range={[0.05, 0.7]}
          lines={["داستان بعدی را", "از دست نده."]}
          className="mt-10 font-display text-[clamp(3.2rem,9vw,8.5rem)] font-bold leading-[0.95]"
          lineClassName="text-center"
        />
        <motion.span aria-hidden className="mt-10 block h-px w-48 origin-center bg-[#dc2626]" style={{ scaleX: line }} />
        <Reveal delay={0.1} className="mt-10 max-w-xl">
          <p className="text-[17px] leading-8 text-[#EAE6DF]/75">
            سابسکرایب کن تا روایت تازه که آمد، تو اولین نفر توی تاریکی باشی. خاطره‌ی ترسناکی داری؟ برای والکور بفرستش.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={links.subscribe}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#dc2626] px-8 py-4 text-[16px] font-medium text-[#EAE6DF] transition-colors duration-500 hover:bg-[#EAE6DF] hover:text-[#070707]"
          >
            <span className="rec-dot inline-block h-2 w-2 rounded-full bg-current" aria-hidden />
            سابسکرایب در یوتیوب
          </a>
          <a
            href={links.memoryBot}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-[16px] transition-colors duration-500 hover:border-[#EAE6DF]"
          >
            ارسال خاطره‌ی ترسناک
            <ArrowUpLeft size={18} aria-hidden />
          </a>
        </Reveal>
        <Reveal delay={0.3} className="mt-8">
          <a href={links.telegram} target="_blank" rel="noopener noreferrer" className="text-sm text-[#BFBCB7] underline-offset-4 hover:text-[#EAE6DF] hover:underline">
            کانال تلگرام · t.me/saeed_walkover
          </a>
        </Reveal>
      </div>
    </section>
  );
}
