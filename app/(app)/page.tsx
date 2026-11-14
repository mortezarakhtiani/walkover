import type { Metadata, Viewport } from "next";
import SiteLandingPage from "@/features/site-landing/SiteLandingPage";
import Hero2 from "@/components/hero2"
import Testimonials from "@/components/testimonails2"
import HowItWorks from "@/components/how-it-works2"
import Contact from "@/components/contact2"
import StoreFooter from '@/components/store-footer';
import Footer2 from "@/components/footer2"
import Features2 from "@/components/features2"
import FourBanners from "@/components/landing/four-banners"
// import TrustedBrands from "@/components/trusted-brands"
import "./site-landing/globals-landing.css";
import Hero from "@/features/site-landing/components/Hero";
import { landingFont } from "@/features/site-landing/fonts";

export const metadata: Metadata = {
  title: "walkover · به قسمت تاریک یوتیوب خوش آمدید",
  description:
    "روایت‌های ترسناک، پرونده‌های جنایی و تجربه‌های ماورایی؛ وب‌سایت کانال یوتیوب walkover (@swalkover).",
};

export const viewport: Viewport = {
  themeColor: "#070707",
};

export default function HomePage() {
  return (
    <div className={`landing-theme landing-font ${landingFont.variable} w-full`}>
      <Hero2 />
        {/*<Hero/>*/}
      {/*<SiteLandingPage />*/}

      <HowItWorks />
      <Features2/>
      <Testimonials/>
      <Contact/>
      <Footer2/>
      {/*<StoreFooter tone="dark"/>*/}
    </div>
  );
}
