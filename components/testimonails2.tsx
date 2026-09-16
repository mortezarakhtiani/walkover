
'use client';

import { motion } from 'framer-motion';
import Marquee from '@/components/ui/marquee';
import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'محمد',

            content:
                'اونجایی که داستانو تعریف می‌کنی و کم‌کم جزئیات عجیب پرونده رو رو می‌کنی واقعاً آدم میخکوب میشه! مخصوصاً آخر ویدیو که تازه می‌فهمی ماجرا چی بوده 😳🔥',
        },
        {
            name: 'سارا',

            content:
                'من معمولاً ویدیوهای داستان ترسناک زیاد می‌بینم ولی چیزی که توی ویدیوهای Walkover دوست دارم اینه که فقط داستان تعریف نمی‌شه، فضاسازی و جزئیاتش هم آدمو وارد ماجرا می‌کنه 👀🖤',
        },
        {
            name: 'آرین',

            content:
                'پرونده‌هایی که انتخاب می‌کنی واقعاً عجیبن! بعضی وقتا بعد از تموم شدن ویدیو میرم خودم درباره‌ش سرچ می‌کنم ببینم واقعاً چی به چی بوده 😂🔎',
        },
        {
            name: 'نگار',

            content:
                'چیزی که بیشتر از همه دوست دارم اینه که جواب همه چیز رو از قبل به مخاطب تحمیل نمی‌کنی. داستان رو تعریف می‌کنی و می‌ذاری خودمون هم درباره‌ش فکر کنیم.',
        },
        {
            name: 'امیر',

            content:
                'اون ویدیوهایی که آخر شب می‌بینم و بعدش برای رفتن تا آشپزخونه چراغ همه جا رو روشن می‌کنم 😂😭 واقعاً بعضی داستانات زیادی واقعی به نظر می‌رسن!',
        },
        {
            name: 'مریم',

            content:
                'مرچ‌های Walkover هم خیلی باحال شدن 😍 مخصوصاً اینکه حس نمی‌کنن یه محصول معمولی با لوگوی کاناله؛ واقعاً انگار بخشی از فضای خود Walkover هستن.',
        },
        {
            name: 'پارسا',

            content:
                'کیفیت تدوین و فضاسازی ویدیوها خیلی خوبه. مخصوصاً وقتی موسیقی و تصویر دقیقاً همون جایی تغییر می‌کنه که داستان وارد قسمت ترسناکش میشه 😨🎧',
        },
        {
            name: 'الهام',

            content:
                'من با داستان‌های پرونده‌های مرموز اومدم سراغ Walkover ولی الان حتی ویدیوهای مربوط به اتفاقات عجیب و ناشناخته رو هم از دست نمی‌دم 👌🏻✨',
        },
        {
            name: 'رضا',

            content:
                'بعضی از داستان‌ها چند روز توی ذهنم می‌مونه و هی به جزئیاتش فکر می‌کنم. به نظرم همین باعث میشه ویدیوها فقط یه محتوای چند دقیقه‌ای نباشن 🧠',
        },
        {
            name: 'کیانا',

            content:
                'یه چیزی که توی Walkover خیلی دوست دارم اینه که حس می‌کنی داری با یکی از دوستات درباره یه داستان عجیب حرف می‌زنی 😂 نه اینکه فقط یه متن آماده رو برات بخونن.',
        },
    ];

    const TestimonialCard = ({
        testimonial,
    }: {
        testimonial: (typeof testimonials)[0];
    }) => (
        <div
            className="
                flex
                w-[320px]
                flex-shrink-0
                rounded-xl
                border
                border-border/50
                bg-gradient-to-br
                from-indigo-50/60
                to-purple-50/60
                p-4
                shadow-sm
                dark:from-indigo-950/15
                dark:to-purple-950/15
                sm:w-[370px]
                sm:p-5
                md:w-[400px]
            "
        >
            <div className="flex w-full flex-col">

                <p
                    className="
                        mb-3
                        text-right
                        text-xs
                        font-medium
                        leading-6
                        text-muted-foreground
                        sm:text-sm
                        sm:leading-6
                    "
                >
                    «{testimonial.content}»
                </p>

                <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                    </div>
                </div>

            </div>
        </div>
    );

    const firstColumn = testimonials.slice(0, 5);
    const secondColumn = testimonials.slice(5, 10);

    return (
        <section className="mt-16 overflow-hidden border-b border-border/50 bg-background py-12 sm:py-16">

            <div className="container mx-auto mb-10 px-6 sm:mb-12 lg:px-12">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="flex flex-col items-center justify-center gap-4 text-center"
                >

                    <CustomTitle>
                        کامنت‌های شما
                    </CustomTitle>


                </motion.div>
            </div>

            <div className="mx-auto w-full px-2 sm:px-6">

                <motion.div
                    className="relative mx-auto flex w-full flex-col items-center justify-center gap-1.5 overflow-hidden"
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    viewport={{
                        once: true,
                    }}
                >

                    <Marquee
                        pauseOnHover
                        className="[--duration:40s] grow"
                    >
                        {firstColumn.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                            />
                        ))}
                    </Marquee>

                    <Marquee
                        reverse
                        pauseOnHover
                        className="[--duration:40s] grow"
                    >
                        {secondColumn.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                            />
                        ))}
                    </Marquee>

                    <div
                        className="pointer-events-none absolute inset-y-0 start-0 w-1/12 bg-gradient-to-r from-background"/>

                    <div
                        className="pointer-events-none absolute inset-y-0 end-0 w-1/12 bg-gradient-to-l from-background"/>

                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;

