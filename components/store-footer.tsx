
'use client';

import {
  ArrowUpLeft,
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
} from 'lucide-react';

import Link from 'next/link';

const footerLinks = {
  shop: [
    { label: 'همه محصولات', href: '/store' },
    { label: 'جدیدترین‌ها', href: '/store/search-results-grid' },
    { label: 'پرفروش‌ترین‌ها', href: '/store/search-results-grid' },
    { label: 'تخفیف‌ها', href: '/store/search-results-grid' },
  ],
  support: [
    { label: 'تماس با ما', href: '/#contact' },
    { label: 'درباره ما', href: '/site-landing' },
    { label: 'سؤالات متداول', href: '/#faq' },
    { label: 'قوانین و مقررات', href: '/terms' },
  ],
};

const StoreFooter = ({ tone = 'light' }: { tone?: 'light' | 'dark' }) => {
  const isDark = tone === 'dark';

  return (
    <footer
      dir="rtl"
      className={`mt-20 overflow-hidden ${isDark ? 'bg-white/5 text-[#EAE6DF]' : 'bg-muted/50 text-foreground'}`}
    >
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-black tracking-tight"
            >
              WALKOVER
              <span className="h-2 w-2 rounded-full bg-primary" />
            </Link>

            <p className={`mt-5 max-w-xs text-sm leading-8 ${isDark ? 'text-white/70' : 'text-muted-foreground'}`}>
              استایل خودت رو پیدا کن. مجموعه‌ای از پوشاک با طراحی
              مینیمال برای روزهایی که می‌خوای متفاوت باشی.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="#" label="اینستاگرام" tone={tone}>
                <Instagram size={18} />
              </SocialLink>
              <SocialLink href="#" label="تلگرام" tone={tone}>
                <Send size={18} />
              </SocialLink>
            </div>
          </div>

          {/* Shop links */}
          <FooterColumn title="خرید" tone={tone}>
            {footerLinks.shop.map((item) => (
              <FooterLink key={item.label} {...item} tone={tone} />
            ))}
          </FooterColumn>

          {/* Support links */}
          <FooterColumn title="راهنمای مشتریان" tone={tone}>
            {footerLinks.support.map((item) => (
              <FooterLink key={item.label} {...item} tone={tone} />
            ))}
          </FooterColumn>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-bold">با ما در ارتباط باش</h3>

            <ul className={`space-y-4 text-sm ${isDark ? 'text-white/70' : 'text-muted-foreground'}`}>
              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0" />
                <a
                  href="tel:+989120000000"
                  dir="ltr"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}
                >
                  ۰۹۱۲ ۰۰۰ ۰۰۰۰
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0" />
                <a
                  href="mailto:hello@example.com"
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}
                >
                  hello@example.com
                </a>
              </li>

              <li className="flex items-start gap-3 leading-7">
                <MapPin size={17} className="mt-1 shrink-0" />
                <span>تهران، ایران</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-14 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${isDark ? 'border-white/15' : 'border-border'}`}>
          <p className={`text-xs leading-6 ${isDark ? 'text-white/65' : 'text-muted-foreground'}`}>
            © {new Date().getFullYear()} تمامی حقوق برای برند محفوظ است.
          </p>

          <Link
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`group inline-flex items-center gap-2 text-xs transition-colors ${isDark ? 'text-white/65 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            بازگشت به بالا
            <ArrowUp
              size={15}
              className="transition-transform group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({
  title,
  children,
  tone,
}: {
  title: string;
  children: React.ReactNode;
  tone: 'light' | 'dark';
}) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold">{title}</h3>
      <ul className="space-y-4">{children}</ul>
    </div>
  );
}

function FooterLink({
  label,
  href,
  tone,
}: {
  label: string;
  href: string;
  tone: 'light' | 'dark';
}) {
  return (
    <li>
      <Link
        href={href}
        className={`group inline-flex items-center gap-1 text-sm transition-colors ${tone === 'dark' ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
      >
        {label}
        <ArrowUpLeft
          size={14}
          className="opacity-0 transition-all group-hover:-translate-x-1 group-hover:opacity-100"
        />
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
  tone,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  tone: 'light' | 'dark';
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${tone === 'dark' ? 'border-white/20 hover:border-white/40 hover:bg-white hover:text-[#070707]' : 'border-border hover:border-foreground hover:bg-foreground hover:text-background'}`}
    >
      {children}
    </a>
  );
}

export default StoreFooter;
