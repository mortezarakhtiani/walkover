
'use client';

import { motion } from 'framer-motion';
import InfoCard from '@/components/ui/info-card';

const features = [
  {
    id: 'about',
    title: 'من کیم ؟!',
    description:
      'پشت Walkover یک علاقه ساده به داستان‌های عجیب و ناشناخته وجود داره؛ علاقه‌ای به کشف ماجراهایی که شاید کمتر شنیده شده باشن و روایت کردنشون به شکلی که حس کنی خودت هم بخشی از اون اتفاقی. اینجا قراره با هم سراغ داستان‌ها بریم و چیزهایی رو کشف کنیم که شاید کمتر جایی درباره‌شون شنیده باشی.',
    image: '/screens/saeed.jpg',
    color: '#DAFF3E',
    borderBg: '#242424',
    effect: '#DAFF3E',
  },
  {
    id: 'stories',
    title: 'داستان های مرموز',
    description:
      'در Walkover سراغ داستان‌ها و پرونده‌هایی می‌ریم که پشت هرکدومشون سؤال‌های زیادی وجود داره؛ از اتفاقات عجیب و ناشناخته گرفته تا پرونده‌هایی که بعضی از جزئیاتشون هنوز هم محل بحثه.',
    image: '/screens/scaryStory.jpg',
    color: '#ff4545',
    borderBg: '#242424',
    effect: '#ff4545',
  },
  {
    id: 'store',
    title: 'فروشگاه',
    description:
      'فروشگاه Walkover جاییه که می‌تونید بخشی از حال‌وهوای Walkover رو با خودتون همراه داشته باشید.',
    image: '/screens/store.png',
    color: '#3b82f6',
    borderBg: '#242424',
    effect: '#3b82f6',
  },
  {
    id: 'videos',
    title: 'ویدیوها',
    description:
      'در بخش ویدیوهای Walkover می‌تونید جدیدترین محتواها و روایت‌های تصویری رو دنبال کنید.',
    image: '/screens/thumbnail.jpg',
    color: '#ff4545',
    borderBg: '#242424',
    effect: '#ff4545',
  },
];

export default function Features() {
  return (
    <section
      id="features"
      dir="rtl"
      className="relative overflow-hidden border-b border-white/[0.06] bg-black py-24 sm:py-28 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/[0.035] blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-purple-500/[0.025] blur-[100px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-blue-500/[0.025] blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
        >

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            بیشتر با Walkover آشنا شو
          </h2>


        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* About card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="min-w-0 md:col-span-3"
          >
            <InfoCard
              image={features[0].image}
              title={features[0].title}
              description={features[0].description}
              width="100%"
              height="auto"
              imageHeight={320}
              borderColor={features[0].color}
              borderBgColor={features[0].borderBg}
              effectBgColor={features[0].effect}
              borderWidth={3}
              borderPadding={10}
              contentPadding="16px 20px 20px"
              className="sm:[&>div>div:first-child]:flex-row"
            />
          </motion.div>

          {/* Stories, Store, Videos */}
          {features.slice(1).map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="flex min-w-0"
            >
              <InfoCard
                image={feature.image}
                title={feature.title}
                description={feature.description}
                width="100%"
                height="100%"
                imageHeight={220}
                borderColor={feature.color}
                borderBgColor={feature.borderBg}
                effectBgColor={feature.effect}
                borderWidth={3}
                borderPadding={10}
                contentPadding="10px 16px 16px"
                className="min-h-[360px] flex-1"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
