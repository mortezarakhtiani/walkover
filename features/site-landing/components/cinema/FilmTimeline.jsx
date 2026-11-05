"use client";

/*
 * The page's own playhead. A 2px rail along the bottom edge is the whole page's timeline:
 * it fills right → left (reading direction) with scroll, carries a tick at every reel, and on
 * wider screens a camcorder slate names the current reel with a scroll-derived timecode.
 * Updates go straight to the DOM from Framer's scroll MotionValue (no re-render per frame).
 */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const CHAPTERS = [
  { id: "top", reel: "01", label: "OPENING" },
  { id: "screening", reel: "02", label: "SCREENING" },
  { id: "archive", reel: "03", label: "ARCHIVE" },
  { id: "story", reel: "04", label: "FEATURE" },
  { id: "voice", reel: "05", label: "VOICE" },
  { id: "merch", reel: "06", label: "ARTIFACTS" },
  { id: "community", reel: "07", label: "STAY TUNED" },
];
const RUNTIME = 47 * 60; // decorative running time of the "tape", in seconds

const pad = (n) => String(Math.floor(n)).padStart(2, "0");
const timecode = (s) => `${pad(s / 3600)}:${pad((s / 60) % 60)}:${pad(s % 60)}`;

export default function FilmTimeline() {
  const { scrollY, scrollYProgress } = useScroll();
  const [ticks, setTicks] = useState([]);
  const marks = useRef([]);
  const reelEl = useRef(null);
  const tcEl = useRef(null);

  const paint = (y) => {
    const probe = y + window.innerHeight * 0.45;
    let current = marks.current[0];
    for (const m of marks.current) if (m.top <= probe) current = m;
    if (current && reelEl.current) reelEl.current.textContent = `REEL ${current.reel} — ${current.label}`;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (tcEl.current) tcEl.current.textContent = timecode(Math.min(1, Math.max(0, y / max)) * RUNTIME);
  };

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        marks.current = CHAPTERS.map((c) => {
          const el = document.getElementById(c.id);
          if (!el) return null;
          const top = el.getBoundingClientRect().top + window.scrollY;
          return { ...c, top, at: Math.min(1, top / max) };
        }).filter(Boolean);
        setTicks(marks.current.map(({ id, at }) => ({ id, at })));
        paint(window.scrollY);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", paint);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-[55]">
      <div className="absolute bottom-3 left-5 hidden items-center gap-3 bg-[#070707]/75 px-2 py-1 font-mono-l text-sm text-[#BFBCB7] md:flex sm:left-8">
        <span ref={tcEl}>00:00:00</span>
        <span className="h-3 w-px bg-white/20" />
        <span ref={reelEl}>REEL 01 — OPENING</span>
      </div>
      <div className="relative h-[2px] bg-white/[0.06]">
        <motion.div className="absolute inset-0 origin-right bg-[#dc2626]" style={{ scaleX: scrollYProgress }} />
        {ticks.map((t) => (
          <span key={t.id} className="absolute bottom-0 h-[7px] w-px bg-[#EAE6DF]/35" style={{ right: `${t.at * 100}%` }} />
        ))}
      </div>
    </div>
  );
}
