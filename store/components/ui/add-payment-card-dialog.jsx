
'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CreditCard, ShieldCheck, X } from 'lucide-react';

import { Button } from '@/store/components/ui/button';
import { Input } from '@/store/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/store/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/store/components/ui/form';

import { Checkbox } from '@/store/components/ui/checkbox';

// اعتبارسنجی اطلاعات کارت
const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(19, 'شماره کارت باید ۱۶ رقم باشد')
    .max(19, 'شماره کارت نامعتبر است')
    .regex(/^(\d{4} ){3}\d{4}$/, 'شماره کارت معتبر نیست'),

  name: z.string().min(3, 'نام دارنده کارت را وارد کنید'),

  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'تاریخ انقضا را به‌صورت ماه/سال وارد کنید'),

  cvc: z
    .string()
    .regex(/^\d{3,4}$/, 'کد امنیتی باید ۳ یا ۴ رقم باشد'),

  isDefault: z.boolean(),
});

export function AddPaymentCardDialog({ onAdd }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: '',
      name: '',
      expiry: '',
      cvc: '',
      isDefault: false,
    },
    mode: 'onChange',
  });

  // قالب‌بندی شماره کارت
  const handleCardNumberChange = (value, onChange) => {
    const numbers = value.replace(/\D/g, '').slice(0, 16);
    const formatted = numbers.match(/.{1,4}/g)?.join(' ') || '';
    onChange(formatted);
  };

  // قالب‌بندی تاریخ انقضا
  const handleExpiryChange = (value, onChange) => {
    const numbers = value.replace(/\D/g, '').slice(0, 4);

    const formatted =
      numbers.length > 2
        ? `${numbers.slice(0, 2)}/${numbers.slice(2)}`
        : numbers;

    onChange(formatted);
  };

  const handleSubmit = (data) => {
    const newCard = {
      ...data,
      id: Date.now(),
      brandLogo: 'visa.svg',
      title: `کارت ${data.name}`,
      subTitle: data.name,
      badge: data.isDefault,
      cardNumber: data.cardNumber,
    };

    onAdd?.(newCard);

    toast.success('کارت بانکی با موفقیت اضافه شد');

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CreditCard className="size-4 ml-2" />
          افزودن کارت جدید
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
              <CreditCard className="size-5" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-base">
                افزودن کارت بانکی
              </DialogTitle>

              <DialogDescription className="text-xs">
                اطلاعات کارت بانکی خود را وارد کنید.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          {/* پیش‌نمایش کارت */}
          <div
            className="relative mb-6 overflow-hidden rounded-md bg-gradient-to-br from-red-700 via-red-600 to-violet-800 p-5 text-white shadow-lg"
            dir="rtl"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">کارت بانکی</span>
              <CreditCard className="size-7 opacity-80" />
            </div>

            <div className="mt-8 text-lg font-semibold tracking-[3px] text-center" dir="ltr">
              {form.watch('cardNumber') || '•••• •••• •••• ••••'}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="mb-1 text-[10px] text-white/60">
                  نام دارنده کارت
                </p>
                <p className="text-sm font-medium">
                  {form.watch('name') || 'نام و نام خانوادگی'}
                </p>
              </div>

              <div>
                <p className="mb-1 text-[10px] text-white/60">
                  تاریخ انقضا
                </p>
                <p className="text-sm" dir="ltr">
                  {form.watch('expiry') || 'MM/YY'}
                </p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
              dir="rtl"
            >
              {/* شماره کارت */}
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره کارت</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        dir="ltr"
                        inputMode="numeric"
                        placeholder="۶۰۳۷ - ۹۹۱۸ - ۱۲۳۴ - ۵۶۷۸"
                        className="text-left tracking-wider"
                        onChange={(e) =>
                          handleCardNumberChange(e.target.value, field.onChange)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* نام دارنده کارت */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام دارنده کارت</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="نام و نام خانوادگی"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                {/* تاریخ انقضا */}
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاریخ انقضا</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          dir="ltr"
                          inputMode="numeric"
                          placeholder="MM/YY"
                          className="text-center"
                          maxLength={5}
                          onChange={(e) =>
                            handleExpiryChange(e.target.value, field.onChange)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* کد امنیتی */}
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>کد امنیتی (CVV2)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          dir="ltr"
                          inputMode="numeric"
                          placeholder="123"
                          maxLength={4}
                          className="text-center"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.replace(/\D/g, '').slice(0, 4),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* کارت پیش‌فرض */}
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3 rounded-md border p-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <div className="space-y-1">
                      <FormLabel className="cursor-pointer">
                        انتخاب به‌عنوان کارت پیش‌فرض
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        برای پرداخت‌های بعدی از این کارت استفاده شود.
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex items-start gap-2 rounded-md bg-muted/50 p-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-green-600" />
                <p className="text-xs leading-6 text-muted-foreground">
                  اطلاعات کارت خود را فقط در درگاه پرداخت معتبر وارد کنید.
                  اطلاعات حساس کارت نباید در سرور فروشگاه ذخیره شوند.
                </p>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!form.formState.isValid}
                >
                  ثبت کارت بانکی
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
