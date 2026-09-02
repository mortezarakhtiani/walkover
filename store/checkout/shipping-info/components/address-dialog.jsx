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
import CountryCombobox from './country-combobox';
import { addressSchema } from './forms';

export function AddressDialog({
  open,
  onOpenChange,
  initialValues = {},
  onSubmit,
  title = 'Add Address',
  description = 'Fill in the address details below.',
  submitLabel = 'Save Address',
  trigger,
}) {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressName: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      country: '',
      postalCode: '',
      ...initialValues,
    },
    mode: 'onChange',
  });

  // Reset form when dialog opens/closes or initialValues change
  useEffect(() => {
    if (open) {
      form.reset({
        addressName: '',
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        country: '',
        postalCode: '',
        ...initialValues,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, JSON.stringify(initialValues)]);

  const handleSubmit = (data) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="block w-full space-y-5"
            >
              {/* Address Name */}
              <FormField
                control={form.control}
                name="addressName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام نشانی</FormLabel>
                    <FormControl>
                      <Input {...field} id="addressName" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* First Name / Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام</FormLabel>
                      <FormControl>
                        <Input {...field} id="name" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام خانوادگی</FormLabel>
                      <FormControl>
                        <Input {...field} id="lastName" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Email / Phone */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ایمیل</FormLabel>
                      <FormControl>
                        <Input {...field} id="email" required type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره تماس</FormLabel>
                      <FormControl>
                        <Input {...field} id="phone" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Address / Address Line 2 */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نشانی</FormLabel>
                      <FormControl>
                        <Input {...field} id="address" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        نشانی دوم{' '}
                        <span className="text-xs text-muted-foreground">
                          (اختیاری)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} id="apartment" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* City / Country */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شهر</FormLabel>
                      <FormControl>
                        <Input {...field} id="city" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>کشور</FormLabel>
                      <FormControl>
                        <CountryCombobox
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Zip/Postal Code */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip/Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} id="postalCode" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
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
      </DialogContent>
    </Dialog>
  );
}
