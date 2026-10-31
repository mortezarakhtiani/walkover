"use client";

/*
 * Scroll-scene primitives.
 *
 * Every cinematic scene on the page is a tall wrapper with a `position: sticky` stage inside
 * (see `.scene` / `.scene-stage` in globals-landing.css). Framer Motion's `useScroll` maps the wrapper's
 * scroll range to a 0→1 MotionValue, and every layer derives its transform/opacity from it with
 * `useTransform`. That is a true scrub: scrolling forward advances the timeline, scrolling back
 * reverses it, and nothing plays on its own.
 *
 * Why sticky instead of a JS pin: the browser keeps native scrolling, there are no pin spacers,
 * anchors land where they should, and RTL is untouched. Reduced motion is handled in CSS
 * (scenes collapse to a single screen) plus here (progress is frozen at the scene's `rest` frame),
 * so the server markup and the first client render are identical: no hydration mismatch.
 */

import { useEffect, useState } from "react";
import { useMotionValue, useScroll, useTransform } from "framer-motion";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Client-only motion preferences. Both start `false` so SSR and hydration agree. */
export function useMotionPrefs() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useMediaQuery("(max-width: 767px)");
  return { reduce, mobile };
}

/**
 * Scroll progress for a scene.
 * @param {React.RefObject<HTMLElement>} ref   the tall scene wrapper (or any element for in-flow scrubs)
 * @param {{ offset?: any[], rest?: number }} opts
 *        offset: Framer `useScroll` offsets (default: wrapper top hits viewport top → wrapper bottom hits viewport bottom)
 *        rest:   the frame shown when the visitor prefers reduced motion
 */
export function useScene(ref, { offset = ["start start", "end end"], rest = 1 } = {}) {
  const prefs = useMotionPrefs();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  // Pass-through keeps every derived value on Framer's JS frame loop. Newer Framer/Motion
  // versions may otherwise hand range transforms to a native ScrollTimeline, which behaves
  // differently from v11 (the version this project pins) and from clip-path/visibility values.
  const live = useTransform(scrollYProgress, (v) => v);
  const still = useMotionValue(rest);
  return { progress: prefs.reduce ? still : live, ...prefs };
}

/** Hide an element from pointer + keyboard while it is visually faded out of the shot. */
export const visibleWhen = (test) => (v) => (test(v) ? "visible" : "hidden");
