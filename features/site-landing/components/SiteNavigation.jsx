"use client";

import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {Menu, ShoppingBag, X} from "lucide-react";
import {creator, links, nav} from "@/features/site-landing/data/site";
import {EASE, fa} from "./motion";
import {useStoreClient} from "./store/StoreContext";

/** The ¤ from the creator's "Walk¤ver" stylization, drawn so it never depends on font coverage. */
export function Mark({className = "", color = "#dc2626"}) {
    return (
        <svg viewBox="0 0 20 20" className={className} aria-hidden fill="none" stroke={color} strokeWidth="2">
            <circle cx="10" cy="10" r="4.6"/>
            <path d="M3.2 3.2l3.3 3.3M16.8 3.2l-3.3 3.3M3.2 16.8l3.3-3.3M16.8 16.8l-3.3-3.3" strokeLinecap="square"/>
        </svg>
    );
}

export function Wordmark({className = ""}) {
    return (
        <span className={`font-mono-l font-medium tracking-[0.32em] ${className}`} aria-label="walkover">
      WALK<Mark className="mx-[0.06em] inline-block h-[0.95em] w-[0.95em] -translate-y-[0.06em] align-middle"/>VER
    </span>
    );
}

export default function SiteNavigation() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("");
    const firstLink = useRef(null);
    const menuBtn = useRef(null);
    const reduce = useReducedMotion();
    const {cartCount} = useStoreClient();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Active chapter tracking
    useEffect(() => {
        const ids = nav.map((n) => n.href.slice(1));
        const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            {rootMargin: "-45% 0px -50% 0px"}
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        firstLink.current?.focus();
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
            menuBtn.current?.focus();
        };
    }, [open]);

    return (
        <>
            <header
                className={`p-2 fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
                    scrolled ? "border-b border-white/[0.06] bg-[#070707]/85 backdrop-blur-md" : "border-b border-transparent bg-gradient-to-b  to-transparent"
                }`}
            >
                <nav aria-label="ناوبری اصلی"
                     className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-10">
                    <a href="#top" className="text-[15px] text-[#EAE6DF]" aria-label="بازگشت به ابتدای صفحه">
                        <Wordmark/>
                    </a>

                    <ul className="hidden shrink-0 items-center gap-5 md:flex md:gap-8 lg:gap-10">
                        {nav.map((n) => {
                            const isActive = active === n.href.slice(1);
                            return (
                                <li key={n.href}>
                                    <a
                                        href={n.href}
                                        aria-current={isActive ? "true" : undefined}
                                        className={`group relative whitespace-nowrap py-2 text-[16px] font-medium transition-colors duration-300 ${
    isActive
        ? "text-red-400"
        : "text-[#BFBCB7] hover:text-red-400"
}`}
                                    >
                                        {n.label}
                                        <span
                                            aria-hidden
                                            className={`absolute bottom-0 right-0 h-0.5 bg-red-600 transition-all duration-[800ms] ${
                                                isActive ? "w-full" : "w-0 group-hover:w-full"
                                            }`}
                                        />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center gap-3">
                        {cartCount > 0 && (
                            <a
                                href="#merch-collection"
                                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-3 text-[14px] text-[#EAE6DF] transition-colors hover:border-[#dc2626]"
                                aria-label={`سبد خرید: ${fa(cartCount)} کالا`}
                            >
                                <ShoppingBag size={16} aria-hidden/>
                                {fa(cartCount)}
                            </a>
                        )}
                        <motion.a
                            href={links.subscribe}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"

                            transition={{duration: 0.2}}
                            className="rounded-md hidden sm:inline-flex items-center justify-center gap-2
    border border-[#dc2626]/60 px-4 py-2
    text-[14px] text-[#EAE6DF]
    transition-colors hover:bg-[#dc2626]/90"
                        >
                            <span className="rec-dot inline-block h-1.5 w-1.5 rounded-full bg-[#dc2626]" aria-hidden/>
                            سابسکرایب در یوتیوب
                        </motion.a>
                        <button
                            ref={menuBtn}
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center text-[#EAE6DF] md:hidden"
                            aria-label={open ? "بستن منو" : "باز کردن منو"}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            onClick={() => setOpen((o) => !o)}
                        >
                            {open ? <X size={22}/> : <Menu size={22}/>}
                        </button>
                    </div>
                </nav>

            </header>
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="منو"
                        className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col justify-between bg-[#070707] px-6 pb-10 pt-8 md:hidden"
                        initial={reduce ? false : {opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.4}}
                    >
                        <ul className="space-y-2">
                            {nav.map((n, i) => (
                                <motion.li
                                    key={n.href}
                                    initial={reduce ? false : {opacity: 0, y: 18}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.7, ease: EASE, delay: 0.08 * i}}
                                    className="border-b border-white/[0.07]"
                                >
                                    <a
                                        ref={i === 0 ? firstLink : undefined}
                                        href={n.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-baseline justify-between py-4 font-display text-5xl text-[#EAE6DF]"
                                    >
                                        {n.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="space-y-4">
                            <a href={links.subscribe} target="_blank" rel="noopener noreferrer"
                               className="flex w-full items-center justify-center gap-2 bg-[#dc2626] py-4 text-[16px]">
                                سابسکرایب در یوتیوب
                            </a>
                            <p className="text-center text-sm text-[#BFBCB7]">{creator.welcome}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
