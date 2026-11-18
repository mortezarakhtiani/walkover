import Link from 'next/link';
import {ArrowRight, Ghost} from 'lucide-react';

import {ExperienceForm} from './components/ExperienceForm';

/**
 * «تجربیات ترسناک من»: visitors submit their own real-life scary experiences.
 * Visual language follows the `/` hero: black stage, drifting blue atmospheric light, glass panels.
 */
export default function ScaryExperiencesPage() {
    return (
        <main dir="rtl" className="relative isolate min-h-[100svh] overflow-hidden bg-black text-white">
            {/* Atmosphere */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -right-[20%] -top-[10%] h-[60%] w-[70%] rounded-full bg-blue-950/60 blur-[140px]" />
                <div className="absolute -left-[15%] top-[30%] h-[50%] w-[55%] rounded-full bg-blue-800/20 blur-[140px]" />
                <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-950/30 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
            </div>

            <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-6 sm:px-6 sm:pt-8">
                <nav aria-label="مسیر" className="flex items-center justify-between gap-3">
                    <Link
                        href="/"
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-blue-300/20 bg-black/35 px-4 text-sm text-white backdrop-blur-xl transition-colors hover:border-blue-300/50 hover:bg-blue-700/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                    >
                        <ArrowRight className="size-4" aria-hidden />
                        <span>بازگشت به Walkover</span>
                    </Link>
                </nav>

                <header className="mt-14 text-center sm:mt-20">
                    <div className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.12em] text-blue-100/80 sm:text-sm">
                        <span aria-hidden className="h-px w-8 bg-gradient-to-l from-blue-300/90 to-transparent sm:w-14" />
                        <Ghost className="size-4 text-blue-300" aria-hidden />
                        <span>از زبان شما</span>
                        <span aria-hidden className="h-px w-8 bg-gradient-to-r from-blue-300/90 to-transparent sm:w-14" />
                    </div>

                    <h1 className="text-4xl font-black leading-[1.35] tracking-tight drop-shadow-[0_8px_35px_rgba(0,0,0,0.9)] sm:text-5xl md:text-6xl">
                        <span className="bg-gradient-to-b from-blue-100 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                            تجربیات ترسناک من
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-[15px] leading-8 text-white/60 sm:text-base sm:leading-9">
                        اتفاقی که هنوز براش توضیحی نداری رو بنویس. شاید روایت بعدی Walkover، تجربه‌ی تو باشه.
                    </p>
                </header>

                <section
                    aria-label="فرم ارسال تجربه"
                    className="mt-10 rounded-3xl border border-blue-300/10 bg-white/[0.025] p-5 shadow-[0_0_80px_rgba(37,99,235,0.08)] backdrop-blur-xl sm:mt-12 sm:p-8"
                >
                    <ExperienceForm />
                </section>
            </div>
        </main>
    );
}
