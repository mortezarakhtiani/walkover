"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

const faDigits = "۰۱۲۳۴۵۶۷۸۹";
export const fa = (n) => String(n).replace(/\d/g, (d) => faDigits[d]);

/** Line-by-line masked reveal. The parent observes the viewport; each line rises out of its own clip. */
export function RevealText({ lines, as = "h2", id, className = "", lineClassName = "", delay = 0, stagger = 0.12, once = true, animateNow = false }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = animateNow ? { animate: "show" } : { whileInView: "show", viewport: { once, amount: 0.4 } };
  return (
    <Tag id={id} className={className} initial={reduce ? false : "hide"} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              hide: { y: "105%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Opacity + slight rise, the default entrance for blocks. */
export function Reveal({ children, className = "", delay = 0, y = 24, as = "div", amount = 0.25 }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Image that opens like a shutter (clip-path) while settling from a slight zoom.
 *  The un-clipped wrapper observes the viewport (a clipped element can't be seen by IntersectionObserver). */
export function CinematicImage({ src, alt, className = "", imgClassName = "", from = "inset(0 0 100% 0)", delay = 0, eager = false }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : "hide"} whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <motion.div
        className="h-full w-full overflow-hidden"
        variants={{ hide: { clipPath: from }, show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.4, ease: EASE, delay } } }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
          variants={{ hide: { scale: 1.18 }, show: { scale: 1, transition: { duration: 2.2, ease: EASE, delay } } }}
        />
      </motion.div>
    </motion.div>
  );
}

/** Chapter slate: reel number + Latin label + a thin red mark that draws in. */
export function ReelLabel({ reel, label, fa: faLabel }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-4 text-sm text-[#BFBCB7]">
      <motion.span
        aria-hidden
        className="block h-px w-10 origin-[100%_50%] bg-[#dc2626]"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <span className="font-mono-l text-sm uppercase">REEL {reel} — {label}</span>
      {faLabel && <span className="hidden text-sm sm:inline">· {faLabel}</span>}
    </div>
  );
}

/* ───────────────────────── Scroll-scrubbed typography ───────────────────────── */

function ScrubLine({ progress, enter, exit, className, children }) {
  const hasExit = Array.isArray(exit);
  const inR = [enter[0], enter[1]];
  const range = hasExit ? [...inR, exit[0], exit[1]] : inR;
  const y = useTransform(progress, range, hasExit ? ["108%", "0%", "0%", "-60%"] : ["108%", "0%"]);
  const opacity = useTransform(progress, range, hasExit ? [0, 1, 1, 0] : [0, 1]);
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span className={`block will-change-transform ${className}`} style={{ y, opacity }}>
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Line-by-line masked reveal whose progress IS the scroll position (scrubbed, reversible).
 * `range` is the slice of `progress` over which all lines enter; `exit` (optional) the slice where they leave.
 * Text is always in the DOM, so it stays readable to assistive tech and search.
 */
export function ScrubLines({ lines, progress, range = [0, 1], exit, as = "h2", id, className = "", lineClassName = "", overlap = 0.55 }) {
  const Tag = as;
  const [a, b] = range;
  const n = lines.length;
  const d = n > 1 ? (b - a) * overlap : b - a;
  const step = n > 1 ? (b - a - d) / (n - 1) : 0;
  const ex = exit && [exit[0], exit[1]];
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <ScrubLine
          key={i}
          progress={progress}
          enter={[a + i * step, a + i * step + d]}
          exit={ex && [ex[0] + i * ((ex[1] - ex[0]) * 0.15), ex[1]]}
          className={lineClassName}
        >
          {line}
        </ScrubLine>
      ))}
    </Tag>
  );
}
