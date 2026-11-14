'use client';

import {motion} from 'framer-motion';
import Link from 'next/link';
import InfoCard from '@/components/ui/info-card';
import {SCARY_EXPERIENCES_PATH} from '@/features/scary-experiences/routes';



type Feature = {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  borderBg: string;
  effect: string;
  href?: string;
};

const features: Feature[] = [
  {
    id: 'about',
    title: 'من کیم ؟!',
    description:
      'پشت Walkover یک علاقه ساده به داستان‌های عجیب و ناشناخته وجود داره؛ علاقه‌ای به کشف ماجراهایی که شاید کمتر شنیده شده باشن و روایت کردنشون به شکلی که حس کنی خودت هم بخشی از اون اتفاقی. اینجا قراره با هم سراغ داستان‌ها بریم و چیزهایی رو کشف کنیم که شاید کمتر جایی درباره‌شون شنیده باشی.',
    image: '/screens/saeed.jpg',
    color: '#A78BFA',
    borderBg: '#29213D',
    effect: '#8B5CF6',
  },
  {
    id: 'scary-experiences',
    title: 'تجربیات ترسناک من',
    description:
      'اگه خودت اتفاقی عجیب یا ترسناک رو تجربه کردی که هنوز براش توضیحی نداری، اینجا می‌تونی روایتش کنی و برای Walkover بفرستی.',
    image: '/screens/scaryStory.jpg',
    href: SCARY_EXPERIENCES_PATH,
    color: '#5EEAD4',
    borderBg: '#1D3433',
    effect: '#14B8A6',
  },
  {
    id: 'store',
    title: 'فروشگاه',
    description:
      'فروشگاه Walkover جاییه که می‌تونید بخشی از حال‌وهوای Walkover رو با خودتون همراه داشته باشید.',
    image: '/screens/store.png',
    color: '#818CF8',
    borderBg: '#25243A',
    effect: '#6366F1',
  },
  {
  id: 'videos',
  title: 'ویدیوها',
  description:
    'در بخش ویدیوهای Walkover می‌تونید جدیدترین محتواها و روایت‌های تصویری رو دنبال کنید.',
  image: '/screens/thumbnail.jpg',
  color: '#F87171',
  borderBg: '#441A1A',
  effect: '#EF4444',
},
];



function renderCard(feature: Feature) {
    return (
        <InfoCard
            image={feature.image}
            title={feature.title}
            width="100%"
            height="100%"
            imageHeight={220}
            borderColor={feature.color}
            borderBgColor={feature.borderBg}
            effectBgColor={feature.effect}
            borderWidth={3}
            borderPadding={10}
            contentPadding="10px 16px 16px"
            rtlFontFamily="inherit"
            className="min-h-[260px] flex-1"
        />
    );
}

export default function Features() {
    return (
        <section
            id="features"
            dir="rtl"
            className="relative overflow-hidden  py-24 sm:py-28 lg:py-32"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 bg-black">
                <div
                    className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/[0.045] blur-[140px]"/>

                <div
                    className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-violet-500/[0.025] blur-[120px]"/>

                <div
                    className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/[0.025] blur-[120px]"/>
            </div>

            <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.6}}
                    className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
                >



                </motion.div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {/* About card */}

{/* About Section */}
<motion.div
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="md:col-span-3 mb-6"
>
  <div className="relative isolate overflow-hidden rounded-[28px]">

    {/* Ambient Glow */}

{/* Ambient Glow */}
<div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-violet-600/[0.10] blur-[230px]" />
<div className="pointer-events-none absolute -bottom-40 left-0 h-[350px] w-[350px] rounded-full bg-indigo-500/[0.07] blur-[220px]" />

{/* Main Content */}

{/* Main Content */}
    <div className="relative flex flex-row items-stretch gap-10 p-6 sm:p-9 lg:p-12">

      {/* Image - Right */}
      <motion.div
          initial={{opacity: 0, scale: 0.96}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{duration: 0.9}}
          className="relative w-[350px] shrink-0"
      >
        <div className="relative aspect-[4/4.5] overflow-hidden rounded-2xl">
          <img
              src="/screens/profile.jpg"
              alt="سازنده Walkover"
              className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>

        </div>
      </motion.div>

      {/* Text - Left */}
      <div className="flex min-w-0 flex-1 flex-col items-start justify-end text-right">

        <h3 className="mb-6 text-3xl font-black leading-[1.5] tracking-tight text-white sm:text-4xl lg:text-5xl">
          من کیم؟
        </h3>

        <p className="max-w-xl text-[15px] leading-9 text-white/65 sm:text-base sm:leading-10 font-iransans">
          من سازنده Walkover هستم؛ جایی که علاقه‌ام به داستان‌های عجیب،
          اتفاقات مرموز و ناشناخته‌ها شکل یک ماجراجویی مشترک گرفته.
          همیشه برام جذاب بوده بدونم پشت اتفاقاتی که کمتر درباره‌شون
          صحبت می‌شه چه چیزی پنهان شده.
        </p>


      </div>

    </div>


  </div>
</motion.div>


                  {/* Stories, Store, Videos */}
                  {features.slice(1).map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{opacity: 0, y: 28}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, amount: 0.2}}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                            }}
                            className="flex min-w-0"
                        >
                            {feature.href ? (
                                <Link
                                    href={feature.href}
                                    aria-label={feature.title}
                                    className="flex min-w-0 flex-1 rounded-[1em] outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                                >
                                    {renderCard(feature)}
                                </Link>
                            ) : (
                                renderCard(feature)
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
