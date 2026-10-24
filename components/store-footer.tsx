
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
    { label: 'جدیدترین‌ها', href: '/store/new' },
    { label: 'پرفروش‌ترین‌ها', href: '/store/bestsellers' },
    { label: 'تخفیف‌ها', href: '/store/sale' },
  ],
  support: [
    { label: 'تماس با ما', href: '/contact' },
    { label: 'درباره ما', href: '/about' },
    { label: 'سؤالات متداول', href: '/faq' },
    { label: 'قوانین و مقررات', href: '/terms' },
  ],
};

const StoreFooter = () => {
  return (
    <footer
      dir="rtl"
      className="mt-20 overflow-hidden text-foreground bg-foreground/3  "
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
              BRAND
              <span className="h-2 w-2 rounded-full bg-primary" />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-8 text-muted-foreground">
              استایل خودت رو پیدا کن. مجموعه‌ای از پوشاک با طراحی
              مینیمال برای روزهایی که می‌خوای متفاوت باشی.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="#" label="اینستاگرام">
                <Instagram size={18} />
              </SocialLink>
              <SocialLink href="#" label="تلگرام">
                <Send size={18} />
              </SocialLink>
            </div>
          </div>

          {/* Shop links */}
          <FooterColumn title="خرید">
            {footerLinks.shop.map((item) => (
              <FooterLink key={item.label} {...item} />
            ))}
          </FooterColumn>

          {/* Support links */}
          <FooterColumn title="راهنمای مشتریان">
            {footerLinks.support.map((item) => (
              <FooterLink key={item.label} {...item} />
            ))}
          </FooterColumn>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-bold">با ما در ارتباط باش</h3>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0" />
                <a
                  href="tel:+989120000000"
                  dir="ltr"
                  className="transition-colors hover:text-foreground"
                >
                  ۰۹۱۲ ۰۰۰ ۰۰۰۰
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0" />
                <a
                  href="mailto:hello@example.com"
                  className="transition-colors hover:text-foreground"
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
        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-muted-foreground">
            © {new Date().getFullYear()} تمامی حقوق برای برند محفوظ است.
          </p>

          <Link
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
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
}: {
  title: string;
  children: React.ReactNode;
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
}: {
  label: string;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-foreground hover:bg-foreground hover:text-background"
    >
      {children}
    </a>
  );
}

export default StoreFooter;
