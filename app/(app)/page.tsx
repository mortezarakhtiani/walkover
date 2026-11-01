import type { Metadata, Viewport } from "next";
import SiteLandingPage from "@/features/site-landing/SiteLandingPage";
import "./site-landing/globals-landing.css";

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
    <div className="landing-theme w-full">
      <SiteLandingPage />
    </div>
  );
}
