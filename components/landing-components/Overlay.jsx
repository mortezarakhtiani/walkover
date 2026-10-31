"use client";

/*
 * Modal surfaces shared by the store.
 * `Dialog` is the original merch dialog (moved here unchanged so the product sheet can share its
 * focus trap). `Sheet` is the product detail drawer: a bottom sheet on phones, a side drawer
 * on wider screens.
 */

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { EASE } from "./motion";
import { useMotionPrefs } from "./cinema/scene";

const FOCUSABLE = "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";

function useModal(open, onClose, panel) {
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector(FOCUSABLE)?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = [...panel.current.querySelectorAll(FOCUSABLE)];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open, onClose, panel]);
}

export function Dialog({ open, onClose, labelledBy, children }) {
  const panel = useRef(null);
  const reduce = useReducedMotion();
  useModal(open, onClose, panel);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80" onClick={onClose} aria-hidden />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto border border-white/[0.08] bg-[#0e0d0d]"
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <button type="button" onClick={onClose} className="absolute end-3 top-3 z-10 flex h-11 w-11 items-center justify-center text-[#EAE6DF]" aria-label="بستن">
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Sheet({ open, onClose, labelledBy, children }) {
  const panel = useRef(null);
  const { reduce, mobile } = useMotionPrefs();
  useModal(open, onClose, panel);
  // physical left = the inline end in RTL, so the drawer opens away from the reading start
  const hidden = reduce ? { opacity: 0 } : mobile ? { y: "100%" } : { x: "-100%" };
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="store-theme fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}>
          <div className="absolute inset-0 bg-black/75" onClick={onClose} aria-hidden />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className="absolute inset-x-0 bottom-0 max-h-[92svh] overflow-y-auto overscroll-contain rounded-t-md border-t border-[var(--store-border)] bg-[var(--store-bg)] md:inset-y-0 md:bottom-auto md:left-0 md:right-auto md:h-full md:max-h-none md:w-[min(560px,92vw)] md:rounded-none md:border-r md:border-t-0"
            initial={hidden}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={hidden}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="sticky top-0 z-10 flex justify-end bg-gradient-to-b from-[var(--store-bg)] to-transparent p-3">
              <button
                type="button"
                onClick={onClose}
                className="flex size-11 items-center justify-center rounded-full border border-[var(--store-border)] bg-[var(--store-card)] text-[var(--store-fg)] transition-colors hover:border-[var(--store-primary)]"
                aria-label="بستن"
              >
                <X size={18} />
              </button>
            </div>
            <span aria-hidden className="absolute inset-x-0 top-2 mx-auto h-1 w-10 rounded-full bg-white/15 md:hidden" />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
