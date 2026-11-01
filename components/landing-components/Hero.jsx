"use client";

/*
 * REEL 01 — THE OPENING (pinned, scroll-scrubbed)
 *
 *   load        darkness → corridor fades in, the torch finds the door, line 1–2 of the channel's
 *               own tagline rise out of the dark (time-based intro, the only non-scrubbed part)
 *   0.00–0.32   camera dollies down the corridor: plates scale + drift, fog layers at two speeds,
 *               door-jamb foreground slides past the lens, tagline lines lift away, CTAs leave
 *   0.26–0.62   the sentence completes: «اطرافم را می‌نگرم.» then the channel's welcome line
 *   0.50–0.75   the corridor goes black; a lit frame appears exactly where the door is
 *   0.62–1.00   the frame opens to full-bleed: it is the featured video's still, carrying the
 *               REEL 02 slate. The Screening scene begins on this same frame.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { creator, heroImage, links, videos } from "@/data/site";
import { EASE, RevealText } from "./motion";
import { useScene, visibleWhen } from "./cinema/scene";
import ScreeningSlate, { BRIDGE_DIM } from "./cinema/ScreeningSlate";

/** Camcorder counter: time since the tape started (i.e. since page load). */
function TapeCounter() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => setS(Math.floor((Date.now() - t0) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (n) => String(n).padStart(2, "0");
  return <span>{`${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`}</span>;
}

export default function Hero() {
  const scene = useRef(null);
  const stage = useRef(null);
  // rest = 0: with reduced motion the hero is the still opening frame (headline + CTAs).
  const { progress: p, reduce, mobile } = useScene(scene, { rest: 0 });
  // the load-time intro (not scroll-driven) follows Framer's own reduced-motion flag, as before
  const introReduce = useReducedMotion();
  const feature = videos[0];

  /* ── camera ── */
  const plateScale = useTransform(p, [0, 1], [1.04, mobile ? 1.22 : 1.34]);
  const plateY = useTransform(p, [0, 1], ["0%", "-3%"]);
  const fogNear = useTransform(p, [0, 1], ["0%", "-24%"]);
  const fogFar = useTransform(p, [0, 1], ["0%", "-9%"]);
  const jambR = useTransform(p, [0, 0.6], ["0%", "70%"]);
  const jambL = useTransform(p, [0, 0.6], ["0%", "-70%"]);

  /* ── opening titles leave ── */
  const headY = useTransform(p, [0.02, 0.32], [0, -110]);
  const headScale = useTransform(p, [0, 0.32], [1, 1.06]);
  const headOpacity = useTransform(p, [0.06, 0.3], [1, 0]);
  const ctaOpacity = useTransform(p, [0, 0.14], [1, 0]);
  const ctaVis = useTransform(p, visibleWhen((v) => v < 0.14));

  /* ── the sentence completes ── */
  const bOpacity = useTransform(p, [0.26, 0.36, 0.52, 0.62], [0, 1, 1, 0]);
  const bY = useTransform(p, [0.26, 0.4], [60, 0]);
  const bScale = useTransform(p, [0.5, 0.62], [1, 0.95]);
  const welcomeOpacity = useTransform(p, [0.36, 0.44, 0.52, 0.6], [0, 1, 1, 0]);

  /* ── through the door ── */
  const dark = useTransform(p, [0.46, 0.72], [0, 0.94]);
  const frameOpacity = useTransform(p, [0.54, 0.62], [0, 1]);
  const frameClip = useTransform(
    p,
    [0.54, 0.66, 1],
    mobile
      ? ["inset(45% 44% 41% 44%)", "inset(38% 36% 34% 36%)", "inset(0% 0% 0% 0%)"]
      : ["inset(43% 48% 40% 48%)", "inset(37% 43% 33% 43%)", "inset(0% 0% 0% 0%)"]
  );
  const frameImgScale = useTransform(p, [0.54, 1], [1.45, 1]);
  const frameDim = useTransform(p, [0.54, 0.7, 1], [0.8, 0.55, BRIDGE_DIM]);
  const slateOpacity = useTransform(p, [0.84, 0.95], [0, 1]);
  const slateY = useTransform(p, [0.84, 0.97], [30, 0]);

  // Flashlight: pointer-driven beam on the sticky stage, eased toward the target; drifts on its own on touch.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const setVars = (x, y, r) => {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
      el.style.setProperty("--r", `${r}px`);
    };
    const rect = () => el.getBoundingClientRect();
    let { width, height } = rect();
    const radius = () => Math.max(170, Math.min(width, height) * 0.36);
    const home = () => ({ x: width * 0.5, y: height * 0.46 }); // the door at the end of the corridor
    if (reduce) {
      const h = home();
      setVars(h.x, h.y, radius() * 1.15);
      return;
    }
    let cur = home();
    let target = { ...cur };
    let pointerActive = false;
    let raf = 0;
    let t = 0;
    let onScreen = true;
    const canHover = window.matchMedia("(hover: hover)").matches;

    const onMove = (e) => {
      const r = rect();
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
      pointerActive = true;
    };
    const onLeave = () => (pointerActive = false);
    const onResize = () => ({ width, height } = rect());

    const tick = () => {
      t += 0.006;
      if (!pointerActive || !canHover) {
        const h = home();
        target = { x: h.x + Math.sin(t * 1.3) * width * 0.16, y: h.y + Math.sin(t * 2.1) * height * 0.08 };
      }
      cur.x += (target.x - cur.x) * 0.07;
      cur.y += (target.y - cur.y) * 0.07;
      const tremor = 1 + Math.sin(t * 37) * 0.012 + Math.sin(t * 13) * 0.01;
      setVars(cur.x, cur.y, radius() * tremor);
      raf = onScreen ? requestAnimationFrame(tick) : 0;
    };
    // stop the torch loop once the hero has scrolled away
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(scene.current);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  const fade = (delay, y = 16) =>
    introReduce ? {} : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.2, ease: EASE, delay } };

  return (
    <section id="top" ref={scene} aria-label="ورود" className="scene scene-hero bg-black">
      <div ref={stage} className="scene-stage min-h-[620px] bg-black">
        {/* Background plates (camera dolly) */}
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: plateScale, y: plateY }}>
          <motion.img
            src={heroImage}
            alt=""
            aria-hidden
            fetchPriority="high"
            width={1376}
            height={768}
            className="absolute inset-0 h-full w-full object-cover [filter:brightness(0.28)_saturate(0.6)]"
            initial={introReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.6, ease: "easeOut", delay: 0.2 }}
          />
          <motion.img
            src={heroImage}
            alt="راهرویی تاریک در یک خانه‌ی متروکه، دری نیمه‌باز در انتهای آن"
            width={1376}
            height={768}
            className="flash-lit absolute inset-0 h-full w-full object-cover [filter:brightness(1.6)_contrast(1.1)_saturate(0.9)]"
            initial={introReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 1.1 }}
          />
          <div className="flash-glow absolute inset-0" aria-hidden />
        </motion.div>

        {/* Atmosphere: two fog depths + door-jamb foreground passing the lens */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <motion.div className="absolute inset-0" style={{ y: fogFar }} initial={introReduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, delay: 0.9 }}>
            <div className="fog b" />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ y: fogNear }} initial={introReduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, delay: 1.1 }}>
            <div className="fog" />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-black/55 to-transparent" />
          <motion.div className="absolute inset-y-0 right-0 w-[16vw] bg-gradient-to-l from-black via-black/80 to-transparent" style={{ x: jambR }} />
          <motion.div className="absolute inset-y-0 left-0 w-[16vw] bg-gradient-to-r from-black via-black/80 to-transparent" style={{ x: jambL }} />
        </div>

        {/* Camcorder overlay */}
        <motion.div {...fade(1.6, 0)} className="pointer-events-none absolute end-5 top-24 z-30 flex items-center gap-3 text-sm text-[#EAE6DF]/70 sm:end-10" aria-hidden>
          <span className="font-mono-l text-sm"><TapeCounter /></span>
          <span className="flex items-center gap-2 font-mono-l text-sm">
            REC <span className="rec-dot inline-block h-2 w-2 rounded-full bg-red-600" />
          </span>
        </motion.div>

        {/* SHOT 1: opening titles + CTAs */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-28 sm:px-10 sm:pb-24">
          <motion.div className="origin-[100%_100%] will-change-transform" style={{ y: headY, scale: headScale, opacity: headOpacity }}>
            {/*<motion.p {...fade(1.3, 8)} className="mb-6 flex items-center gap-3 text-[15px] text-[#BFBCB7]">*/}
            {/*  <span className="h-px w-8 bg-[#dc2626]" aria-hidden />*/}
            {/*  {creator.handle} · {creator.displayName}*/}
            {/*</motion.p>*/}
            <RevealText
              as="h1"
              animateNow
              delay={1.5}
              stagger={0.2}
              lines={[
                creator.tagline[0],
                <>
                  با چشمانی باز و <span className="text-[#dc2626]">خیره</span>
                </>,
              ]}
              className="font-display text-[clamp(2.5rem,10.5vw,10.5rem)] font-bold leading-[0.98] text-[#EAE6DF]"
            />
            {/* reduced motion has no scroll shots, so the sentence completes in place */}
            {reduce && <p className="mt-4 max-w-md font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug text-[#EAE6DF]/90">{creator.tagline[2]}</p>}
          </motion.div>

          <motion.div style={{ opacity: ctaOpacity, visibility: ctaVis }}>
            <motion.div {...fade(2.4)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={links.videos}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md group inline-flex items-center gap-3 bg-foreground px-6 py-4 text-[16px] font-medium text-background transition-colors hover:bg-red-700 hover:text-foreground"
              >
                <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden className="fill-current"><path d="M0 0l12 7-12 7z" /></svg>
                تماشای آخرین داستان
              </a>

            </motion.div>
          </motion.div>
        </div>

        {/* SHOT 2: the sentence completes */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center"
          style={{ opacity: bOpacity, y: bY, scale: bScale }}
        >
          <p className="font-display text-[clamp(2.6rem,8.5vw,8rem)] font-bold leading-[1.05] text-[#EAE6DF]">{creator.tagline[2]}</p>
          <motion.p className="mt-6 flex items-center gap-3 text-[16px] text-[#BFBCB7]" style={{ opacity: welcomeOpacity }}>
            <span className="h-px w-8 bg-red-600" aria-hidden />
            {creator.welcome}
            <span className="h-px w-8 bg-red-600" aria-hidden />
          </motion.p>
        </motion.div>

        {/* SHOT 3: corridor goes dark, the door becomes a screen */}
        <motion.div className="pointer-events-none absolute inset-0 z-20 bg-[#030303]" style={{ opacity: dark }} aria-hidden />
        <motion.div className="pointer-events-none absolute inset-0 z-20" style={{ opacity: frameOpacity, clipPath: frameClip }} aria-hidden>
          <motion.img
            src={feature.image}
            alt=""
            width={1376}
            height={768}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ scale: frameImgScale }}
          />
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: frameDim }} />
        </motion.div>
        <motion.div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5" style={{ opacity: slateOpacity, y: slateY }} aria-hidden>
          {/*<ScreeningSlate />*/}
        </motion.div>

        {/* Bottom rail: subscribe + scroll cue */}
        <motion.div style={{ opacity: ctaOpacity, visibility: ctaVis }} className="absolute inset-x-0 bottom-0 z-10">
          <motion.div {...fade(3.1, 0)} className="mx-auto flex max-w-[1440px] items-end justify-between px-5 pb-8 sm:px-10 md:pb-14">
            <a href={links.subscribe} target="_blank" rel="noopener noreferrer" className="text-sm text-[#BFBCB7] transition-colors hover:text-[#EAE6DF]">
              {/*{creator.handle} <span className="text-[#dc2626]">·</span> سابسکرایب*/}
            </a>
            {/*<a href="#screening" className="flex flex-col items-center gap-3 text-sm text-[#BFBCB7]" aria-label="رفتن به بخش بعد">*/}
            {/*  <span className="relative block h-12 w-px overflow-hidden bg-white/10" aria-hidden>*/}
            {/*    <span className="scroll-cue absolute inset-x-0 top-0 block h-1/3 bg-[#EAE6DF]" />*/}
            {/*  </span>*/}
            {/*</a>*/}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
