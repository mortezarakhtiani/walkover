
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { CustomBadge } from '@/components/custom/badge';
import { CustomSubtitle } from '@/components/custom/subtitle';
import { CustomTitle } from '@/components/custom/title';

const formSchema = z.object({
  name: z.string().min(2, 'اسم‌ت رو حداقل دو حرف وارد کن'),
  email: z.string().email('یه ایمیل معتبر وارد کن'),
  subject: z.string().min(5, 'موضوع باید حداقل ۵ حرف داشته باشه'),
  message: z.string().min(10, 'پیامت خیلی کوتاهه! حداقل ۱۰ حرف بنویس'),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);

    // شبیه‌سازی ارسال فرم
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast('پیامت با موفقیت ارسال شد! ممنون که برامون نوشتی ❤️');

    form.reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'ایمیل',
      content: 'hello@walkover.ir',
    },
    {
      icon: Phone,
      title: 'شماره تماس',
      content: '۰۹۱۲ ۱۲۳ ۴۵۶۷',
    },
    {
      icon: MapPin,
      title: 'آدرس',
      content: 'ایران\nدفتر Walkover',
    },
  ];

  return (
    <section
      id="contact"
      dir="rtl"
      className="border-b border-border/50 bg-zinc-50 py-24 dark:bg-zinc-950"
    >
      <div className="container mx-auto px-6">

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">

          {/* اطلاعات تماس */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-right"
          >
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                بیا با هم حرف بزنیم 👋
              </h3>

              <p className="mb-8 leading-8 text-muted-foreground">
                اگه درباره ویدیوها، داستان‌ها، پرونده‌های مرموز،
                فروشگاه یا هر چیز دیگه‌ای سوالی داری، راحت باش و برامون بنویس.
                حتی اگه فقط یه پیشنهاد کوچیک داری، خوشحال می‌شیم بشنویمش.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 text-right"
                >
                  <info.icon className="mt-1 size-5 shrink-0 text-muted-foreground" />

                  <div>
                    <h4 className="mb-1 font-semibold text-foreground">
                      {info.title}
                    </h4>

                    {info.icon === Mail ? (
                      <a
                        href={`mailto:${info.content}`}
                        className="whitespace-pre-line text-muted-foreground transition-colors hover:text-purple-500"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="whitespace-pre-line leading-7 text-muted-foreground">
                        {info.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* فرم تماس */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50">
              <CardContent className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 text-right"
                    dir="rtl"
                  >

                    {/* نام و ایمیل */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>اسمت</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="مثلاً رضا"
                                className="text-right"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ایمیلت</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="your@email.com"
                                type="email"
                                dir="ltr"
                                className="text-left"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    </div>

                    {/* موضوع */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>موضوع</FormLabel>

                          <FormControl>
                            <Input
                              placeholder="مثلاً یه پیشنهاد برای ویدیوهای بعدی"
                              className="text-right"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* پیام */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>پیامت</FormLabel>

                          <FormControl>
                            <Textarea
                              placeholder="هرچی دوست داری بهمون بگی اینجا بنویس..."
                              className="min-h-[120px] resize-none text-right leading-7"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* دکمه */}
                    <Button
                      size="lg"
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'داریم می‌فرستیم...' : 'ارسال پیام 💌'}
                    </Button>

                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

