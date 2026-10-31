
"use client";

/*
 * REEL 03 — THE ARCHIVE
 * Compact version with scroll animations and interactive dossiers.
 */

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowUpLeft, Plus } from "lucide-react";
import { series } from "@/data/site";
import { EASE, ReelLabel, fa } from "./motion";
import { useScene } from "./cinema/scene";

function RedactedLine({ progress, range, children }) {
  const bar = useTransform(progress, range, [1, 0]);

  return (
    <span className="block pb-[0.08em]">
      <span className="relative inline-block">
        {children}
        <motion.span
          aria-hidden
          className="absolute -inset-x-2 inset-y-[14%] origin-left bg-[#EAE6DF] will-change-transform"
          style={{ scaleX: bar }}
        />
      </span>
    </span>
  );
}

function Dossier({ s, index, open, onToggle }) {
  const reduce = useReducedMotion();
  const row = useRef(null);

  const { progress: r } = useScene(row, {
    offset: ["start 96%", "start 62%"],
    rest: 1,
  });

  const rule = useTransform(r, [0, 0.5], [0, 1]);

  const codeClip = useTransform(
    r,
    [0.1, 0.55],
    ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]
  );

  const titleClip = useTransform(
    r,
    [0.2, 0.95],
    ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]
  );

  const titleX = useTransform(r, [0.2, 1], [24, 0]);
  const meta = useTransform(r, [0.6, 1], [0, 1]);

  const panelId = `dossier-${s.code}`;
  const count = s.episodes.length;

  return (
    <li ref={row} className="relative last:border-b last:border-white/[0.08]">
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 block h-px origin-right bg-white/[0.12]"
        style={{ scaleX: rule }}
      />

      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group relative grid w-full grid-cols-[1fr_auto] items-center gap-3 py-4 text-start sm:grid-cols-[8rem_1fr_auto_auto] sm:gap-5 sm:py-5"
        >
          <span
            aria-hidden
            className={`absolute start-0 top-0 h-[2px] bg-[#dc2626] transition-all duration-700 ${
              open ? "w-16" : "w-0 group-hover:w-10"
            }`}
          />

          <motion.span
            style={{ clipPath: codeClip }}
            className="order-first col-span-2 justify-self-start whitespace-nowrap font-mono-l text-xs text-[#BFBCB7] sm:order-none sm:col-span-1 sm:text-sm"
          >
            FILE {String(index + 1).padStart(3, "0")} / {s.code}
          </motion.span>

          <motion.span
            style={{ clipPath: titleClip, x: titleX }}
            className={`font-display text-[clamp(1.5rem,3vw,2.8rem)] font-semibold leading-[1.15] transition-colors duration-500 ${
              open
                ? "text-[#EAE6DF]"
                : "text-[#EAE6DF]/75 group-hover:text-[#EAE6DF]"
            }`}
          >
            {s.title}
          </motion.span>

          <motion.span
            style={{ opacity: meta }}
            className="hidden text-xs text-[#BFBCB7] sm:block sm:text-sm"
          >
            {count ? `${fa(count)} روایت در آرشیو` : "پرونده‌ی باز"}
          </motion.span>

          <motion.span
            style={{ opacity: meta }}
            className={`flex h-8 w-8 items-center justify-center border transition-[transform,border-color,color] duration-500 ${
              open
                ? "rotate-45 border-[#dc2626] text-[#dc2626]"
                : "border-white/15 text-[#EAE6DF]"
            }`}
            aria-hidden
          >
            <Plus size={16} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={s.title}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-5 pb-8 sm:grid-cols-[8rem_1fr] sm:gap-5 lg:grid-cols-[8rem_minmax(0,5fr)_minmax(0,7fr)]">
              <div className="hidden sm:block" />

              <motion.div
                className="relative aspect-[4/3] overflow-hidden bg-[var(--elevated)] lg:aspect-[4/5]"
                initial={
                  reduce ? false : { clipPath: "inset(0 0 0 100%)" }
                }
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              >
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover [filter:brightness(0.75)_saturate(0.75)]"
                />

                <span className="absolute start-3 top-3 bg-[#070707]/80 px-2 py-1 font-mono-l text-xs text-[#EAE6DF]">
                  CASE {s.code}
                </span>
              </motion.div>

              <div className="flex flex-col sm:col-start-2 lg:col-start-auto">
                <p className="max-w-xl font-display text-[clamp(1.2rem,2vw,1.7rem)] leading-[1.5] text-[#EAE6DF]/90">
                  {s.blurb}
                </p>

                {count > 0 ? (
                  <>
                    <ol className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                      {s.episodes.map((ep, i) => (
                        <li key={ep.id}>
                          <a
                            href={ep.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 py-3"
                          >
                            <span className="w-7 font-mono-l text-xs text-[#dc2626]">
                              {String(i + 1).padStart(2, "0")}
                            </span>

                            <span className="flex-1">
                              <span className="block text-sm text-[#EAE6DF] transition-colors group-hover:text-white sm:text-base">
                                {ep.title}
                              </span>

                              <span className="mt-1 block text-xs text-[#BFBCB7] sm:text-sm">
                                {ep.tag}
                                {ep.host ? ` · در ${ep.host}` : ""}
                              </span>
                            </span>

                            <ArrowUpLeft
                              size={16}
                              aria-hidden
                              className="text-[#BFBCB7] transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-[#dc2626]"
                            />
                          </a>
                        </li>
                      ))}
                    </ol>

                    <a
                      href={s.episodes[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 bg-[#EAE6DF] px-5 py-3 text-sm font-medium text-[#070707] transition-colors duration-500 hover:bg-[#dc2626] hover:text-[#EAE6DF]"
                    >
                      تماشای اولین روایت
                      <ArrowUpLeft size={16} aria-hidden />
                    </a>
                  </>
                ) : (
                  s.cta && (
                    <a
                      href={s.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 border border-[#dc2626] px-5 py-3 text-sm transition-colors duration-500 hover:bg-[#dc2626]"
                    >
                      {s.cta.label}
                      <ArrowUpLeft size={16} aria-hidden />
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Archive() {
  const [open, setOpen] = useState(series[0].code);

  const section = useRef(null);
  const head = useRef(null);

  const { progress: sp } = useScene(section, {
    offset: ["start end", "end start"],
    rest: 0.5,
  });

  const { progress: h } = useScene(head, {
    offset: ["start 88%", "start 30%"],
    rest: 1,
  });

  const paperY = useTransform(sp, [0, 1], ["-6%", "6%"]);
  const stampOpacity = useTransform(h, [0.78, 0.9], [0, 1]);
  const stampScale = useTransform(h, [0.78, 0.92], [1.4, 1]);

  return (
    <section
      id="archive"
      ref={section}
      aria-labelledby="archive-title"
      className="relative overflow-hidden bg-[#0f0e0e] py-16 sm:py-24"
    >
      <motion.div
        aria-hidden
        className="dossier-bg pointer-events-none absolute -inset-y-[10%] inset-x-0"
        style={{ y: paperY }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070707] to-transparent"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10">
        <div
          ref={head}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="relative">
            <ReelLabel reel="03" label="THE ARCHIVE" fa="آرشیو" />

            <h2
              id="archive-title"
              className="mt-5 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.05]"
            >
              <RedactedLine progress={h} range={[0.05, 0.45]}>
                پرونده‌هایی
              </RedactedLine>

              <RedactedLine progress={h} range={[0.3, 0.75]}>
                که باز ماندند.
              </RedactedLine>
            </h2>

            <motion.span
              aria-hidden
              className="pointer-events-none absolute -bottom-6 end-0 border-2 border-[#dc2626] px-2.5 py-1 font-mono-l text-xs uppercase text-[#b91c1c]"
              style={{
                opacity: stampOpacity,
                scale: stampScale,
                rotate: -6,
              }}
            >
              DECLASSIFIED
            </motion.span>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#BFBCB7] sm:text-base">
            مجموعه‌های تکرارشونده‌ی کانال. یک پرونده را باز کن تا روایت‌هایش بیرون بیایند.
          </p>
        </div>

        <ul className="mt-10 sm:mt-14">
          {series.map((s, i) => (
            <Dossier
              key={s.code}
              s={s}
              index={i}
              open={open === s.code}
              onToggle={() =>
                setOpen((current) => (current === s.code ? "" : s.code))
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
