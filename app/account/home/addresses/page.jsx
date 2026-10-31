
'use client';

import {useState} from 'react';

import {Button} from '@/store/components/ui/button';

import {
    MapPin,
    MapPinPlus,
    Pencil,
    Trash2,
    Star,
    UserRound,
    Phone,
} from 'lucide-react';

import {AddAddressDialog} from './add-address-dialog';

const AddressesPage = () => {
    const [addAddressOpen, setAddAddressOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);

    // ذخیره آدرس جدید یا ویرایش آدرس قبلی
    const handleSaveAddress = (newAddress) => {
        if (editingAddress) {
            setAddresses((prev) =>
                prev.map((address, index) =>
                    index === editingAddress.index
                        ? newAddress
                        : address
                )
            );

            setEditingAddress(null);
        } else {
            setAddresses((prev) => [
                ...prev,
                newAddress,
            ]);
        }

        setAddAddressOpen(false);
    };

    // ویرایش آدرس
    const handleEditAddress = (address, index) => {
        setEditingAddress({
            ...address,
            index,
        });

        setAddAddressOpen(true);
    };

    // حذف آدرس
    const handleDeleteAddress = (index) => {
        setAddresses((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // باز کردن فرم افزودن آدرس
    const handleAddAddress = () => {
        setEditingAddress(null);
        setAddAddressOpen(true);
    };

    return (
        <>
            <div
                dir="rtl"
                className="w-full overflow-hidden rounded-md border border-border/60 bg-background shadow-sm"
            >

                {addresses.length === 0 ? (

                    /* =========================
                       حالت بدون آدرس
                    ========================== */
                    <div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-12 text-center">

                        <div className="mb-5 flex size-16 items-center justify-center rounded-md border border-border/60 bg-muted/40">
                            <MapPin
                                className="size-7 text-muted-foreground"
                                strokeWidth={1.6}
                            />
                        </div>

                        <h2 className="text-base font-bold text-foreground">
                            هنوز آدرسی ثبت نکرده‌اید
                        </h2>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                            برای ثبت سفارش سریع‌تر، یک آدرس به حساب کاربری خود اضافه کنید.
                        </p>

                        <Button
                            variant="primary"
                            onClick={handleAddAddress}
                            className="mt-6 h-10 rounded-md bg-red-600 px-5 text-white shadow-sm shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-md hover:shadow-red-500/20 active:scale-[0.98]"
                        >
                            <MapPinPlus
                                className="size-4"
                                strokeWidth={1.8}
                            />
                            افزودن آدرس جدید
                        </Button>

                    </div>

                ) : (

                    /* =========================
                       حالت دارای آدرس
                    ========================== */
                    <div>

                        {/* هدر */}
                        <div className="flex flex-col gap-4 border-b border-border/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted/50 text-muted-foreground">
                                    <MapPin
                                        className="size-5"
                                        strokeWidth={1.7}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-foreground">
                                        آدرس‌های من
                                    </h2>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        مدیریت و ویرایش آدرس‌های شما
                                    </p>
                                </div>

                            </div>

                            <Button
                                variant="primary"
                                onClick={handleAddAddress}
                                className="h-10 rounded-md bg-red-600 px-4 text-white shadow-sm shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-md hover:shadow-red-500/20 active:scale-[0.98]"
                            >
                                <MapPinPlus
                                    className="size-4"
                                    strokeWidth={1.8}
                                />
                                افزودن آدرس جدید
                            </Button>

                        </div>

                        {/* تعداد آدرس */}
                        <div className="px-5 pt-5">

                            <div className="text-xs text-muted-foreground">
                                {addresses.length} آدرس ثبت شده
                            </div>

                        </div>

                        {/* لیست آدرس‌ها */}
                        <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2">

                            {addresses.map((item, index) => (

                                <div
                                    key={index}
                                    className="group relative flex min-h-[205px] flex-col overflow-hidden rounded-md border border-border/60 bg-background p-5 transition-all duration-200 hover:border-border hover:shadow-sm"
                                >

                                    {/* نوار ظریف بالای کارت */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-border/60" />

                                    {/* هدر کارت */}
                                    <div className="flex items-start justify-between gap-3">

                                        <div className="flex min-w-0 items-start gap-3">

                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted/50 text-muted-foreground">
                                                <MapPin
                                                    className="size-4"
                                                    strokeWidth={1.7}
                                                />
                                            </div>

                                            <div className="min-w-0">

                                                <div className="flex items-center gap-2">

                                                    <span className="text-sm font-semibold text-foreground">
                                                        آدرس {index + 1}
                                                    </span>

                                                    {item.isDefault && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-600 dark:bg-red-950/40 dark:text-red-400">
                                                            <Star
                                                                className="size-3 fill-current"
                                                                strokeWidth={1.5}
                                                            />
                                                            پیش‌فرض
                                                        </span>
                                                    )}

                                                </div>

                                                {item.title && (
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {item.title}
                                                    </p>
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                    {/* محتوای آدرس */}
                                    <div className="mt-4 rounded-md bg-muted/30 px-3.5 py-3">

                                        <p className="text-sm leading-6 text-foreground/90 break-words">

                                            {item.address}

                                            {item.plaque && (
                                                <>
                                                    ، پلاک {item.plaque}
                                                </>
                                            )}

                                            {item.unit && (
                                                <>
                                                    ، واحد {item.unit}
                                                </>
                                            )}

                                        </p>

                                    </div>

                                    {/* اطلاعات گیرنده */}
                                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">

                                        {item.receiverName && (
                                            <div className="flex items-center gap-1.5">
                                                <UserRound
                                                    className="size-3.5"
                                                    strokeWidth={1.7}
                                                />
                                                <span>
                                                    {item.receiverName}
                                                </span>
                                            </div>
                                        )}

                                        {item.phone && (
                                            <div className="flex items-center gap-1.5">
                                                <Phone
                                                    className="size-3.5"
                                                    strokeWidth={1.7}
                                                />
                                                <span dir="ltr">
                                                    {item.phone}
                                                </span>
                                            </div>
                                        )}

                                    </div>

                                    {/* دکمه‌ها */}
                                    <div className="mt-auto flex items-center justify-end gap-1 border-t border-border/50 pt-3">

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleEditAddress(item, index)
                                            }
                                            className="h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                                        >
                                            <Pencil
                                                className="size-3.5"
                                                strokeWidth={1.8}
                                            />
                                            ویرایش
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteAddress(index)
                                            }
                                            className="h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                                        >
                                            <Trash2
                                                className="size-3.5"
                                                strokeWidth={1.8}
                                            />
                                            حذف
                                        </Button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </div>

            {/* Dialog افزودن / ویرایش */}
            <AddAddressDialog
                open={addAddressOpen}
                onOpenChange={setAddAddressOpen}
                onSave={handleSaveAddress}
                editingAddress={editingAddress}
            />
        </>
    );
};

export default AddressesPage;

