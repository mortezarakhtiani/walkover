
'use client';

import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/logo';

const Footer = () => {
  const socialLinks = [
    {
      href: '#',
      label: 'یوتیوب',
      icon: '/icons/youtube.svg',
    },
    {
      href: '#',
      label: 'اینستاگرام',
      icon: '/icons/instagram.svg',
    },
    {
      href: '#',
      label: 'تلگرام',
      icon: '/icons/telegram.svg',
    },
    {
      href: '#',
      label: 'ایکس',
      icon: '/icons/x-formerly-twitter.svg',
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-background" dir="rtl">
      <div className="container mx-auto border-b border-border/50 px-6 pb-6 pt-14">

        <div className="flex flex-col items-center justify-center">

          {/* لوگو و توضیحات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex w-full flex-col items-center text-center"
          >
            <div className="mb-4">
              <Logo />
            </div>

            <p className="mb-7 max-w-md text-sm leading-7 text-muted-foreground">
              داستان‌های عجیب، پرونده‌های مرموز و اتفاقاتی که شاید
              تا حالا درباره‌شون نشنیده باشی.
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm font-medium text-foreground">
                ما رو اینجاها هم دنبال کن 👀
              </p>

              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex size-10 items-center justify-center rounded-lg border border-border/60 bg-background transition-colors hover:border-border hover:bg-muted"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="size-5 object-contain"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="my-6 bg-border/50" />

        {/* پایین فوتر */}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xs text-muted-foreground">
            © ۲۰۲۶ Walkover — همه حقوق محفوظ است.
          </p>

          <p className="text-xs text-muted-foreground">
            ساخته شده با ❤️ برای عاشقای داستان‌های عجیب
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

