
'use client';

import { Fragment, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Alert, AlertIcon, AlertTitle } from '@/store/components/ui/alert';
import { Badge } from '@/store/components/ui/badge';
import { Button } from '@/store/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/store/components/ui/card';

import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/store/components/ui/dialog';

import { AddressDialog } from './address-dialog';
import { addressSchema } from './forms';
import { toPersianDigits } from '@/lib/to-persian';

export function Info() {
    const [items, setItems] = useState([
        {
            default: true,
            title: 'منزل جیرون',
            addressName: 'منزل',
            name: 'جیرون',
            lastName: 'ون دایک',
            email: 'jeroen@vandijk.com',
            phone: '+31612345678',
            address: 'خیابان کیزرزگراخت، پلاک ۱۷۲',
            apartment: '',
            city: 'آمستردام',
            country: 'هلند',
            postalCode: '1016 DW',
            badge: true,
        },
        {
            default: false,
            title: 'محل کار سوفی',
            addressName: 'محل کار',
            name: 'سوفی',
            lastName: 'د وریس',
            email: 'sophie@devries.com',
            phone: '+31687654321',
            address: 'خیابان لان فان میر‌دروورت، پلاک ۸۸',
            apartment: '',
            city: 'لاهه',
            country: 'هلند',
            postalCode: '2517 AN',
            badge: false,
        },
        {
            default: false,
            title: 'منزل جیرون',
            addressName: 'سفر',
            name: 'جیرون',
            lastName: 'ون دایک',
            email: 'jeroen@vandijk.com',
            phone: '+31612345678',
            address: 'خیابان کیزرزگراخت، پلاک ۱۷۲',
            apartment: '',
            city: 'آمستردام',
            country: 'هلند',
            postalCode: '1016 DW',
            badge: false,
        },
        {
            default: false,
            title: 'آپارتمان اِما',
            addressName: 'آپارتمان',
            name: 'اِما',
            lastName: 'ون دن برگ',
            email: 'emma@vandenberg.com',
            phone: '+31623456789',
            address: 'خیابان ووندل، پلاک ۴۵',
            apartment: 'آپارتمان ۲',
            city: 'آمستردام',
            country: 'هلند',
            postalCode: '1054 GJ',
            badge: false,
        },
    ]);

    const [editOpen, setEditOpen] = useState(null);
    const [removeOpen, setRemoveOpen] = useState(null);

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
        },
        mode: 'onChange',
    });

    useEffect(() => {
        if (editOpen !== null) {
            const item = items[editOpen];

            form.reset({
                addressName: item?.addressName || '',
                name: item?.name || '',
                lastName: item?.lastName || '',
                email: item?.email || '',
                phone: item?.phone || '',
                address: item?.address || '',
                apartment: item?.apartment || '',
                city: item?.city || '',
                country: item?.country || '',
                postalCode: item?.postalCode || '',
            });
        }
    }, [editOpen, items, form]);

    function handleEditSubmit(data) {
        if (editOpen === null) return;

        setItems((prev) =>
            prev.map((item, i) =>
                i === editOpen
                    ? {
                          ...item,
                          ...data,
                          title: data.addressName,
                      }
                    : item,
            ),
        );

        setEditOpen(null);
        toast.success('نشانی با موفقیت ویرایش شد.');
    }

    function handleRemove(idx) {
        setItems((prev) => prev.filter((_, i) => i !== idx));
        setRemoveOpen(null);
        toast.success('نشانی با موفقیت حذف شد.');
    }

    const handleSelect = (idx) => {
        setItems((prev) =>
            prev.map((item, i) => ({
                ...item,
                default: i === idx,
                badge: i === idx,
            })),
        );

        toast.custom(
            (t) => (
                <Alert
                    variant="mono"
                    icon="success"
                    onClose={() => toast.dismiss(t)}
                >
                    <AlertIcon>
                        <RiCheckboxCircleFill />
                    </AlertIcon>
                    <AlertTitle>
                        نشانی مورد نظر انتخاب شد
                    </AlertTitle>
                </Alert>
            ),
            {
                duration: 5000,
            },
        );
    };

    const renderItem = (item, index) => (
        <Card key={index}>
            <CardHeader className="px-5">
                <CardTitle>{item.title}</CardTitle>

                {item.default && (
                    <Badge variant="success" appearance="light">
                        نشانی پیش‌فرض ارسال
                    </Badge>
                )}
            </CardHeader>

            <CardContent className="space-y-4 px-5">
                <div className="flex flex-col gap-1.5">
                    <span className="mb-1.5 text-sm font-semibold text-mono">
                        {item.name} {item.lastName}
                    </span>

                    <div className="flex flex-col gap-2 text-sm font-normal text-mono">
                        <span>
                            {toPersianDigits(item.postalCode)}، {item.address}
                        </span>

                        {item.apartment && (
                            <span>{item.apartment}</span>
                        )}

                        <span>{item.city}</span>
                        <span>{item.country}</span>

                        <span>
                            شماره تماس: {toPersianDigits(item.phone)}
                        </span>
                    </div>
                </div>

                <div className="flex min-h-8.5 items-center justify-between">
                    <div className="flex items-center gap-5">
                        <AddressDialog
                            open={editOpen === index}
                            onOpenChange={(val) =>
                                setEditOpen(val ? index : null)
                            }

                            initialValues={item}
                            onSubmit={handleEditSubmit}
                            title="ویرایش نشانی"
                            description="اطلاعات نشانی خود را ویرایش کنید."
                            submitLabel="ذخیره تغییرات"
                            trigger={
                                <Button mode="link" className="text-blue-500">
                                    ویرایش
                                </Button>
                            }
                        />

                        <Dialog
                            open={removeOpen === index}
                            onOpenChange={(open) =>
                                open
                                    ? setRemoveOpen(index)
                                    : setRemoveOpen(null)
                            }
                        >
                            <DialogTrigger asChild>
                                <Button mode="link">
                                    حذف
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        حذف نشانی
                                    </DialogTitle>
                                </DialogHeader>

                                <DialogBody className="text-sm">
                                    آیا از حذف این نشانی اطمینان دارید؟
                                    این عملیات قابل بازگشت نیست.
                                </DialogBody>

                                <DialogFooter>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleRemove(index)}
                                    >
                                        بله، حذف شود
                                    </Button>

                                    <DialogClose asChild>
                                        <Button variant="outline">
                                            انصراف
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {item.default === false && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSelect(index)}
                        >
                            انتخاب این نشانی
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <Fragment>
            {items.map((item, index) => renderItem(item, index))}
        </Fragment>
    );
}
