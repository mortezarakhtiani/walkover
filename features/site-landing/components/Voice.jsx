"use client";

/*
 * REEL 05 — THE VOICE
 * The intensity starts to come down here. One scrubbed move (the portrait opens upward while the
 * image drifts inside its frame, and the heading lines are drawn by the scroll), then the quote,
 * genres and link use short viewport-triggered reveals.
 */

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { creator, links } from "@/features/site-landing/data/site";
import { Reveal, ReelLabel, ScrubLines } from "./motion";
import { useScene } from "./cinema/scene";

export default function Voice() {
  const section = useRef(null);
  const head = useRef(null);
  const { progress: s, mobile } = useScene(section, { offset: ["start end", "end start"], rest: 0.5 });
  const { progress: h } = useScene(head, { offset: ["start 90%", "start 45%"], rest: 1 });
  const clip = useTransform(s, [0.02, 0.3], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const imgY = useTransform(s, [0, 1], mobile ? ["-6%", "6%"] : ["-12%", "12%"]);
  const imgScale = useTransform(s, [0.05, 0.5], [1.22, 1.08]);

  return (
    <section id="voice" ref={section} aria-labelledby="voice-title" className="relative overflow-hidden  py-28 sm:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <motion.div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--elevated)]" style={{ clipPath: clip }}>
            <motion.img
              src={creator.portrait}
              alt="میکروفونی در اتاقی تاریک؛ تصویر نمادین جای پرتره‌ی سازنده"
              width={928}
              height={1152}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ y: imgY, scale: imgScale }}
            />
          </motion.div>
          <p className="mt-4 text-sm text-[#BFBCB7]">تصویر نمادین · جای پرتره‌ی واقعی</p>
        </div>

        <div ref={head} className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <ReelLabel reel="05" label="THE VOICE" fa="صدای پشت روایت‌ها" />
          <ScrubLines
            id="voice-title"
            progress={h}
            range={[0.1, 0.9]}
            lines={["صدایی که", "از تاریکی می‌آید."]}
            className="mt-8 font-display text-[clamp(2.8rem,6.5vw,6rem)] font-bold leading-[0.98]"
          />
          <Reveal delay={0.1} className="mt-10">
            {/*<p className="text-[17px] text-[#BFBCB7]">*/}
            {/*  <span className="text-[#EAE6DF]">{creator.displayName}</span> · {creator.handle}*/}
            {/*</p>*/}
            <blockquote className="mt-6 border-s-2 border-[#dc2626] ps-6">
              <p className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.5] text-[#EAE6DF]/90">«{creator.philosophy}»</p>
              <p className="mt-4 text-[16px] text-[#BFBCB7]">{creator.philosophyCoda}</p>
              {/*<footer className="mt-4 text-sm text-[#BFBCB7]">از توضیحات کانال</footer>*/}
            </blockquote>
          </Reveal>
          {/*<Reveal delay={0.25} className="mt-10">*/}
          {/*  <p className="text-[16px] text-[#EAE6DF]/90" aria-label="ژانرهای کانال">*/}
          {/*    {creator.topics.map((t, i) => (*/}
          {/*      <span key={t}>*/}
          {/*        {t}*/}
          {/*        {i < creator.topics.length - 1 && <span className="mx-2 text-[#dc2626]">/</span>}*/}
          {/*      </span>*/}
          {/*    ))}*/}
          {/*  </p>*/}
          {/*  <a*/}
          {/*    href={links.channel}*/}
          {/*    target="_blank"*/}
          {/*    rel="noopener noreferrer"*/}
          {/*    className="group mt-10 inline-flex items-center gap-3 border-b border-[#EAE6DF]/30 pb-2 text-[16px] transition-colors duration-500 hover:border-[#dc2626]"*/}
          {/*  >*/}
          {/*    رفتن به کانال یوتیوب*/}
          {/*    <ArrowUpLeft size={18} aria-hidden className="transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" />*/}
          {/*  </a>*/}
          {/*</Reveal>*/}
        </div>
      </div>
    </section>
  );
}
