"use client";

/*
 * REEL 04 — THE FEATURE (pinned, scroll-scrubbed)
 *
 *   0.00–0.34   the lid opens: the still is exposed through a narrow vertical slit that widens
 *               (clip-path), while the camera settles from a close push-in
 *   0.12–0.50   «این جعبه / هرگز نباید / باز می‌شد.» lands line by line
 *   0.40–0.44   the bulb flickers once (a scrubbed dip in the light, not a timer)
 *   0.55–0.72   teaser + watch link
 *   0.86–1.00   the room fades toward the creator's section
 */

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { featuredStory as f } from "@/features/site-landing/data/site";
import { PlayMark } from "./Screening";
import { ScrubLines } from "./motion";
import { useScene, visibleWhen } from "./cinema/scene";

export default function FeaturedStory() {
  const ref = useRef(null);
  const { progress: p, mobile } = useScene(ref, { rest: 0.8 });

  const slit = useTransform(
    p,
    [0, 0.34],
    mobile ? ["inset(0% 40% 0% 40%)", "inset(0% 0% 0% 0%)"] : ["inset(0% 47% 0% 47%)", "inset(0% 0% 0% 0%)"]
  );
  const scale = useTransform(p, [0, 1], [1.35, 1]);
  // darkness over the still: opens up, one flicker of the bulb, then the scene fades out
  const dim = useTransform(p, [0, 0.34, 0.4, 0.41, 0.42, 0.44, 0.6, 0.86, 1], [0.8, 0.45, 0.4, 0.82, 0.5, 0.32, 0.25, 0.25, 0.75]);
  const kicker = useTransform(p, [0.06, 0.16], [0, 1]);
  const tail = useTransform(p, [0.55, 0.72], [0, 1]);
  const tailY = useTransform(p, [0.55, 0.72], [24, 0]);
  const tailVis = useTransform(p, visibleWhen((v) => v > 0.52));
  const textOut = useTransform(p, [0.86, 1], [1, 0.35]);

  return (
    <section id="story" ref={ref} aria-labelledby="story-title" className="scene scene-story bg-black">
      <div className="scene-stage min-h-[600px]">
        <motion.div className="absolute inset-0" style={{ clipPath: slit }}>
          <motion.img
            src={f.image}
            alt="جعبه‌ای مقوایی زیر یک لامپ آویزان در زیرزمینی تاریک"
            width={1376}
            height={768}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[70%_50%] will-change-transform"
            style={{ scale }}
          />
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: dim }} aria-hidden />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" aria-hidden />

        <motion.div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-end px-5 sm:px-10" style={{ opacity: textOut }}>
          <div className="max-w-2xl">
            <motion.p className="flex items-center gap-3 text-[15px] text-[#BFBCB7]" style={{ opacity: kicker }}>
              <span className="rec-dot inline-block h-2 w-2 rounded-full bg-red-600" aria-hidden />
              {/*<span className="font-mono-l text-sm">REEL 04 — FEATURE</span>*/}
              <span>· {f.label}</span>
            </motion.p>
            <ScrubLines
              id="story-title"
              progress={p}
              range={[0.12, 0.5]}
              lines={f.lines.map((l, i) => (i === f.lines.length - 1 ? <span key={i} className="text-[#dc2626]">{l}</span> : l))}
              className="mt-8 font-display text-[clamp(3.2rem,9vw,8.5rem)] font-bold leading-[0.98] text-[#EAE6DF]"
            />
            <motion.div style={{ opacity: tail, y: tailY, visibility: tailVis }}>
              <p className="mt-8 max-w-md text-[17px] leading-8 text-[#EAE6DF]/90">{f.teaser}</p>
              <div className="mt-5 flex flex-wrap items-center gap-6">
<a
    href={f.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-4 text-[16px] text-[#EAE6DF]"
> <PlayMark size={56} />
                  تماشای این پرونده
                </a>
                {/*<span className="text-sm text-[#BFBCB7]">{f.hashtag}</span>*/}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
