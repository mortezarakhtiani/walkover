
'use client';

import { Fragment, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Alert, AlertIcon, AlertTitle } from '@/store/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export function Info() {
    const [items, setItems] = useState([
        {
            default: true,
            title: 'منزل رضا',
            addressName: 'منزل',
            name: 'رضا',
            lastName: 'احمدی',
            email: 'reza@example.com',
            phone: '۰۹۱۲۱۲۳۴۵۶۷',
            address: 'خیابان ولیعصر، پلاک ۱۷۲',
            apartment: '',
            city: 'تهران',
            country: 'ایران',
            postalCode: '۱۲۳۴۵۶۷۸۹۰',
            badge: true,
        },
        {
            default: false,
            title: 'محل کار',
            addressName: 'محل کار',
            name: 'رضا',
            lastName: 'احمدی',
            email: 'reza@example.com',
            phone: '۰۹۱۲۱۲۳۴۵۶۷',
            address: 'خیابان میرداماد، پلاک ۸۸',
            apartment: '',
            city: 'تهران',
            country: 'ایران',
            postalCode: '۱۲۳۴۵۶۷۸۹۱',
            badge: false,
        },
        {
            default: false,
            title: 'آدرس سفر',
            addressName: 'سفر',
            name: 'رضا',
            lastName: 'احمدی',
            email: 'reza@example.com',
            phone: '۰۹۱۲۱۲۳۴۵۶۷',
            address: 'خیابان ولیعصر، پلاک ۱۷۲',
            apartment: '',
            city: 'تهران',
            country: 'ایران',
            postalCode: '۱۲۳۴۵۶۷۸۹۰',
            badge: false,
        },
        {
            default: false,
            title: 'آپارتمان',
            addressName: 'آپارتمان',
            name: 'رضا',
            lastName: 'احمدی',
            email: 'reza@example.com',
            phone: '۰۹۱۲۱۲۳۴۵۶۷',
            address: 'خیابان ونک، پلاک ۴۵',
            apartment: 'واحد ۲',
            city: 'تهران',
            country: 'ایران',
            postalCode: '۱۲۳۴۵۶۷۸۹۲',
            badge: false,
        },
    ]);

    // وضعیت پنجره‌های ویرایش و حذف
    const [editOpen, setEditOpen] = useState(null);
    const [removeOpen, setRemoveOpen] = useState(null);

    // فرم ویرایش آدرس
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

    // به‌روزرسانی اطلاعات فرم هنگام انتخاب آدرس
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

    // ذخیره تغییرات آدرس
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
    }

    // حذف آدرس
    function handleRemove(idx) {
        setItems((prev) => prev.filter((_, i) => i !== idx));
        setRemoveOpen(null);
    }

    // انتخاب آدرس پیش‌فرض
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
                        آدرس مورد نظر با موفقیت انتخاب شد
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
                        آدرس پیش‌فرض
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
                            {item.postalCode} - {item.address}
                        </span>

                        <span>{item.city}</span>
                        <span>{item.country}</span>

                        <span>
                            شماره تماس: {item.phone}
                        </span>
                    </div>
                </div>

                <div className="flex min-h-8.5 items-center justify-between">
                    <div className="flex items-center gap-5">
                        {/* پنجره ویرایش آدرس */}

                        <AddressDialog
                            open={editOpen === index}
                            onOpenChange={(val) =>
                                setEditOpen(val ? index : null)
                            }
                            initialValues={item}
                            onSubmit={handleEditSubmit}
                            title="ویرایش آدرس"
                            description="اطلاعات آدرس خود را در قسمت‌های زیر ویرایش کنید."
                            submitLabel="ذخیره تغییرات"
                            trigger={
                                <Button mode="link" underlined="dashed">
                                    ویرایش
                                </Button>
                            }
                        />

                        {/* پنجره حذف آدرس */}

                        <Dialog
                            open={removeOpen === index}
                            onOpenChange={(open) =>
                                open
                                    ? setRemoveOpen(index)
                                    : setRemoveOpen(null)
                            }
                        >
                            <DialogTrigger asChild>
                                <Button mode="link" underlined="dashed">
                                    حذف
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        حذف آدرس
                                    </DialogTitle>
                                </DialogHeader>

                                <DialogBody className="text-sm">
                                    آیا از حذف این آدرس اطمینان دارید؟
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
                            انتخاب آدرس
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
