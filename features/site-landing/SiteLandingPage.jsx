/*
 * SUBJECT: Landing site for walkover (@swalkover, سعید والکور), a Persian horror YouTube channel:
 *   true scary stories, paranormal challenges, crime cases, haunted-place visits.
 *   Audience: Persian-speaking night-owls. Single job: pull visitors into the channel.
 *
 * DESIGN PLAN
 *   Artifact stolen from: a camcorder tape found in a police case file. Reels = chapters,
 *   FILE/CASE codes = archive, REC + tape counter = found footage.
 *   Type: Markazi Text 700 (huge literary Naskh headlines) · Vazirmatn (reading) · IBM Plex Mono (Latin slates).
 *   Color: obsidian #070707 · charcoal #111 · elevated #181818 · red #DC2626 (accent only) ·
 *          deep red #991B1B (glows) · bone #EAE6DF (text) · fog #92908D (meta).
 *   Layout: film reel. 01 hero (full bleed) → 02 screening room (poster cards) → 03 dossier accordion →
 *           04 pinned trailer → 05 voice (portrait + verbatim channel quote) → 06 artifacts store →
 *           07 invitation → final frame.
 *   Signature: the flashlight. Hero corridor is near-black; a pointer-driven torch beam (drifting on
 *              touch, fixed for reduced-motion) reveals the real image. The channel's own line,
 *              «من آنم که در تاریکی، با چشمانی باز و خیره…», rises out of the dark.
 *
 * CINEMATIC TIMELINE (v2): the page is one scroll-scrubbed film. Scenes = sticky stages inside tall
 * wrappers, driven by Framer Motion useScroll/useTransform (see components/cinema/scene.js).
 *   01 Hero        pinned · dolly down the corridor → sentence completes → the door becomes a screen
 *   02 Screening   pinned · opens on the hero's last frame; still shrinks into a screen, credits project
 *   03 Archive     in-flow scrub · redacted heading retracts, DECLASSIFIED stamp, files surface by mask
 *   04 Feature     pinned · the lid opens (slit mask), lines land, one scrubbed bulb flicker, fade out
 *   05 Voice       in-flow scrub · portrait opens upward, then calm triggered reveals
 *   06 Artifacts   pinned · spotlight → silhouette → lit piece slides to its slot → store cards (browse)
 *   07 Stay tuned  in-flow scrub · the corridor returns, pulling back
 *   End            «پایان؟» surfaces with the last frame
 *   A 2px playhead along the bottom edge tracks the whole page (components/cinema/FilmTimeline.jsx).
 */
import SiteNavigation from "@/features/site-landing/components/SiteNavigation";
import Hero from "@/features/site-landing/components/Hero";
import Screening from "@/features/site-landing/components/Screening";
import Archive from "@/features/site-landing/components/Archive";
import FeaturedStory from "@/features/site-landing/components/FeaturedStory";
import Voice from "@/features/site-landing/components/Voice";
import Merch from "@/features/site-landing/components/Merch";
import Community from "@/features/site-landing/components/Community";
import SiteFooter from "@/features/site-landing/components/SiteFooter";
import FilmTimeline from "@/features/site-landing/components/cinema/FilmTimeline";
import {StoreClientProvider} from "@/features/site-landing/components/store/StoreContext";

import Testimonials from '@/components/testimonails2';
import Contact from '@/components/contact2';
import Footer from '@/components/footer2';
import StoreFooter from '@/components/store-footer';

export default function Page() {
    return (
        <div lang="fa" dir="rtl" className="relative min-h-screen bg-[#070707] font-sans text-[#EAE6DF]">
            <a href="#screening"
               className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[90] focus:bg-[#EAE6DF] focus:px-4 focus:py-2 focus:text-[#070707]">
                پرش به محتوا
            </a>
            <StoreClientProvider>
                <SiteNavigation/>
                <main>
                    <Hero/>
                    <Screening/>
                    {/*<Archive />*/}
                    <FeaturedStory/>
                    <Merch/>
                    <Voice/>

                    {/*<Community />*/}
                </main>
                <Testimonials/>
                <Contact/>
                {/*<Footer />*/}
                {/*<SiteFooter />*/}
                <StoreFooter tone="dark"/>
            </StoreClientProvider>
            {/*<FilmTimeline />*/}
            <div className="vignette" aria-hidden/>
            <div className="grain" aria-hidden/>
        </div>
    );
}
