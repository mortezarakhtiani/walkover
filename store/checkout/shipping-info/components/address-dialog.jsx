
'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/store/components/ui/button';

import {
  Dialog,
  DialogBody,
  DialogClose,
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

import { Input } from '@/store/components/ui/input';
import { addressSchema } from './forms';
import { toPersianDigits } from '@/lib/to-persian';

const defaultValues = {
  addressName: '',
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
};

const numericFields = ['phone', 'postalCode'];

const toEnglishDigits = (value) =>
  String(value ?? '').replace(/[۰-۹]/g, (digit) =>
    String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
  );

function AddressInput({ field, id, type = 'text', required = false }) {
  const isNumeric = numericFields.includes(field.name);

  return (
    <Input
      {...field}
      id={id}
      type={type}
      required={required}
      className="font-iransans text-right"
      dir={field.name === 'email' ? 'ltr' : 'rtl'}
      value={
        isNumeric
          ? toPersianDigits(field.value ?? '')
          : field.value ?? ''
      }
      onChange={
        isNumeric
          ? (event) => field.onChange(toEnglishDigits(event.target.value))
          : field.onChange
      }
      inputMode={isNumeric ? 'numeric' : undefined}
    />
  );
}

export function AddressDialog({
  open,
  onOpenChange,
  initialValues = {},
  onSubmit,
  title = 'ویرایش نشانی',
  description = '',
  submitLabel = 'ذخیره تغییرات',
  trigger,
}) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (open) {
      form.reset({
        ...defaultValues,
        ...initialValues,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, JSON.stringify(initialValues)]);

  const handleSubmit = (data) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const renderField = (name, label, required = false, type = 'text') => (
    <FormField
      control={form.control}
      name={name}
      key={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <AddressInput
              field={field}
              id={name}
              required={required}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent dir="ltr">
        <div dir="rtl" className="w-full text-right">
          <DialogHeader className="text-right">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <DialogBody>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="block w-full space-y-5"
                dir="rtl"
              >
                {renderField('addressName', 'نام نشانی', true)}

                <div className="grid grid-cols-2 gap-4">
                  {renderField('lastName', 'نام خانوادگی', true)}
                  {renderField('name', 'نام', true)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {renderField('phone', 'شماره تماس', true)}
                  {renderField('email', 'ایمیل', true, 'email')}
                </div>

                {renderField('address', 'نشانی', true)}

                <div className="grid grid-cols-2 gap-4">
                  {renderField('city', 'شهر', true)}
                  {renderField('postalCode', 'کد پستی', true)}
                </div>

                <DialogFooter className="flex flex-row flex-wrap justify-start gap-3 pt-4">
                  <Button type="submit" variant="primary">
                    {submitLabel}
                  </Button>

                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      منصرف شدم
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogBody>
        </div>
      </DialogContent>
    </Dialog>
  );
}
