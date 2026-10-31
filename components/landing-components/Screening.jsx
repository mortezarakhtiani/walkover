"use client";

/*
 * REEL 02 — THE SCREENING ROOM
 *
 * Scene (pinned, scrubbed). It opens on the frame the hero ended on: the featured still,
 * full-bleed, with the «چراغ‌ها را روشن نکن.» slate.
 *   0.04–0.22   slate lifts away
 *   0.08–0.50   the camera pulls back: the still shrinks into a screen (clip-path mask) and brightens
 *   0.42–0.62   the episode title is projected line by line under the screen
 *   0.56–0.68   metadata (tag · video ID · source)
 *   0.62–0.78   teaser + play link; the "NOW SHOWING" note on the far side
 * The whole screen is a real link to the video at every frame.
 *
 * After the scene, in normal flow: the supporting posters, with a light scrubbed parallax per
 * column and a short viewport-triggered entrance (secondary content).
 */

import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { links, videos } from "@/data/site";
import { EASE, ScrubLines } from "./motion";
import { useScene, visibleWhen } from "./cinema/scene";
import ScreeningSlate, { BRIDGE_DIM } from "./cinema/ScreeningSlate";

export function PlayMark({ size = 64 }) {
  return (
    <span
      className="flex items-center justify-center rounded-full border border-[#EAE6DF]/50 bg-black/30 backdrop-blur-[2px] transition-all  group-hover:border-red-600 group-hover:bg-red-700"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg width={size * 0.22} height={size * 0.26} viewBox="0 0 12 14" className="ms-[3px] fill-[#EAE6DF]"><path d="M0 0l12 7-12 7z" /></svg>
    </span>
  );
}

/** Poster-style video card. The whole card is one link to the real YouTube page. */
export function VideoCard({ video, ratio = "aspect-[4/5]", titleClass = "text-[1.75rem]", priority = false, showTeaser = false }) {
  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`${video.title}، تماشا در یوتیوب`}>
      <div className={`relative overflow-hidden rounded-md bg-[var(--elevated)] ${ratio}`}>
        <img
            src={video.image}
            alt=""
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] [filter:brightness(0.62)_saturate(0.7)] group-hover:scale-[1.06] group-hover:[filter:brightness(0.85)_saturate(0.95)] group-focus-visible:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" aria-hidden/>
        <div
            className="absolute inset-x-0 top-0 h-[2px] origin-[100%_50%] scale-x-0 bg-red-600 transition-transform duration-700 group-hover:scale-x-100"
            aria-hidden/>
        <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100">
          <PlayMark/>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <span
              className="rounded-md border border-[#EAE6DF]/25 px-2.5 py-1 text-sm text-[#EAE6DF]/90">{video.tag}</span>
          {/*<span className="translate-y-2 font-mono-l text-sm text-[#BFBCB7] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">*/}
          {/*  ID {video.id}*/}
          {/*</span>*/}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
        <h3 className={`font-display font-semibold leading-[1.15] text-[#EAE6DF] transition-colors duration-500 group-hover:text-white ${titleClass}`}>{video.title}</h3>
          {showTeaser && <p className="mt-3 max-w-xl text-[16px] leading-8 text-[#BFBCB7]">{video.teaser}</p>}
        </div>
        {/*<ArrowUpLeft size={18} className="mt-2 shrink-0 text-[#BFBCB7] transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-[#dc2626]" aria-hidden />*/}
      </div>
    </a>
  );
}

/** Splits a title into two balanced projection lines at the nearest space to the middle. */
function splitTitle(title) {
  const words = title.split(" ");
  if (words.length < 3) return [title];
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) (bestDiff = diff), (best = i);
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

function ProjectionScene({ video }) {
  const scene = useRef(null);
  const { progress: p, mobile } = useScene(scene, { rest: 1 });

  const slateOpacity = useTransform(p, [0.04, 0.2], [1, 0]);
  const slateY = useTransform(p, [0.04, 0.22], [0, -70]);
  const screenClip = useTransform(
    p,
    [0.08, 0.5],
    mobile ? ["inset(0% 0% 0% 0%)", "inset(15% 5% 47% 5%)"] : ["inset(0% 0% 0% 0%)", "inset(11% 8% 35% 8%)"]
  );
  const imgScale = useTransform(p, [0.08, 0.6], [1, 0.94]);
  const imgY = useTransform(p, [0.08, 0.6], ["0%", mobile ? "-16%" : "-12%"]);
  const dim = useTransform(p, [0, 0.5], [BRIDGE_DIM, 0.12]);
  const beam = useTransform(p, [0.3, 0.6], [0, 1]);
  const metaOpacity = useTransform(p, [0.56, 0.68], [0, 1]);
  const metaY = useTransform(p, [0.56, 0.68], [16, 0]);
  const tailOpacity = useTransform(p, [0.62, 0.76], [0, 1]);
  const tailY = useTransform(p, [0.62, 0.76], [24, 0]);
  const tailVis = useTransform(p, visibleWhen((v) => v > 0.6));

  return (
    <div ref={scene} className="scene scene-screening">
      <div className="scene-stage min-h-[620px] bg-[#070707]">
        {/* projector light spilling onto the room */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_30%,rgba(234,230,223,0.07),transparent_70%)]"
          style={{ opacity: beam }}
        />

        {/* the screen */}
        <motion.a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${video.title}، تماشا در یوتیوب`}
          className="group absolute inset-0 block"
          style={{ clipPath: screenClip }}
        >
          <motion.img
            src={video.image}
            alt=""
            width={1376}
            height={768}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ scale: imgScale, y: imgY }}
          />
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: dim }} aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden />
          <motion.span
            className={`absolute inset-x-0 flex -translate-y-1/2 justify-center ${mobile ? "top-[34%]" : "top-[38%]"}`}
            style={{ opacity: metaOpacity }}
            aria-hidden
          >
            <PlayMark size={mobile ? 56 : 72} />
          </motion.span>
        </motion.a>

        {/* slate carried over from the hero */}
        <motion.div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5" style={{ opacity: slateOpacity, y: slateY }}>
          <ScreeningSlate as="h2" id="screening-title" />
        </motion.div>

        {/* projected credits */}
        <div className={`absolute inset-x-0 bottom-0 ${mobile ? "h-[47%]" : "h-[35%]"}`}>
          <div className="mx-auto grid h-full max-w-[1440px] content-start gap-5 px-5 pt-6 sm:px-10 md:grid-cols-12 md:gap-10 md:pt-8">
            <div className="md:col-span-7">
              <motion.p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#BFBCB7]" style={{ opacity: metaOpacity, y: metaY }}>
                <span className="rec-dot inline-block h-2 w-2 rounded-full bg-[#dc2626]" aria-hidden />
                {/*<span className="font-mono-l text-sm">NOW SHOWING</span>*/}
                <span> {video.tag}</span>
                {/*<span className="font-mono-l text-sm text-[#BFBCB7]/80">ID {video.id}</span>*/}
              </motion.p>
              <ScrubLines
                as="h3"
                progress={p}
                range={[0.42, 0.62]}
                lines={splitTitle(video.title)}
                className="mt-3 font-display text-[clamp(2.1rem,4.4vw,4.2rem)] font-bold leading-[1.02] text-[#EAE6DF]"
              />
            </div>
            <motion.div className="md:col-span-5 md:pt-8" style={{ opacity: tailOpacity, y: tailY, visibility: tailVis }}>
              <p className="max-w-md text-[16px] leading-8 text-[#BFBCB7]">{video.teaser}</p>
              <p className="mt-2 hidden text-sm text-[#BFBCB7]/80 md:block">«به هیچ عنوان فیک نیست.» · از توضیحات ویدیو در تلگرام والکور</p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md mt-5 inline-flex items-center gap-3 bg-[#EAE6DF] px-6 py-3.5 text-[16px] font-medium text-[#070707] transition-colors  hover:bg-red-700 hover:text-[#EAE6DF]"
              >
                <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden className="fill-current"><path d="M0 0l12 7-12 7z" /></svg>
                تماشا در یوتیوب
              </a>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SupportingReel({ items }) {
  const grid = useRef(null);
  // const { progress, mobile } = useScene(grid, { offset: ["start end", "end start"], rest: 0.5 });
  // const near = useTransform(progress, [0, 1], mobile ? [0, 0] : [70, -70]);
  // const far = useTransform(progress, [0, 1], mobile ? [0, 0] : [20, -20]);
  // viewport-triggered entrance (secondary content); reduced motion is neutralised in CSS via [data-reveal]
  const enter = (i) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.1 },
  });

  return (
      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-20 sm:px-10 sm:pb-40 sm:pt-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h3 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none">در همین قفسه</h3>
          {/*<p className="max-w-sm text-[16px] leading-8 text-[#BFBCB7]">منتخبی از روایت‌های کانال. هر کارت مستقیم به ویدیوی اصلی در یوتیوب می‌رود.</p>*/}
        </div>

        {/* horizontal reel on mobile, staggered row with parallax on desktop */}

        <div
            ref={grid}
            className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:items-start"
        >
          {items.map((v, i) => (
              <motion.div
                  key={v.id}
                  className="w-[78%] shrink-0 snap-start sm:w-auto sm:min-w-0"
              >
                <motion.div {...enter(i)} data-reveal>
                  <VideoCard video={v}/>
                </motion.div>
              </motion.div>
          ))}
        </div>


        {/*<div className="mt-20 flex justify-center sm:mt-28">*/}
        {/*  <a*/}
        {/*      href={links.videos}*/}
        {/*      target="_blank"*/}
        {/*      rel="noopener noreferrer"*/}
        {/*      className="group inline-flex items-center gap-4 border border-white/15 px-8 py-4 text-[16px] transition-colors duration-500 hover:border-[#dc2626] hover:bg-[#dc2626]"*/}
        {/*  >*/}
        {/*    همه‌ی ویدیوها در یوتیوب*/}
        {/*    <ArrowUpLeft size={18} aria-hidden/>*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
  );
}

export default function Screening() {
  const [feature, ...rest] = videos;
  return (
      <section id="screening" aria-labelledby="screening-title" className="relative bg-[#070707]">
        <ProjectionScene video={feature}/>
        <SupportingReel items={rest}/>
      </section>
  );
}
