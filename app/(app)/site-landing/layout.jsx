
import "./globals-landing.css";

export const metadata = {
  title: "walkover · به قسمت تاریک یوتیوب خوش آمدید",
  description:
    "روایت‌های ترسناک، پرونده‌های جنایی و تجربه‌های ماورایی؛ وب‌سایت کانال یوتیوب walkover (@swalkover).",
};

export const viewport = {
  themeColor: "#070707",
};

export default function SiteLandingLayout({ children }) {
  return <div className="landing-theme w-full">{children}</div>;
}
