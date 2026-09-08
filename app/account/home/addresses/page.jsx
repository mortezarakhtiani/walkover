'use client';

import {useState} from 'react';

import {Button} from '@/store/components/ui/button';

import {
    MapPin,
    MapPinPlus,
    Pencil,
    Trash2,
    Star,
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

    // انتخاب آدرس پیش‌فرض
    const handleSetDefault = (index) => {
        setAddresses((prev) =>
            prev.map((address, i) => ({
                ...address,
                isDefault: i === index,
            }))
        );
    };

    // باز کردن فرم افزودن آدرس
    const handleAddAddress = () => {
        setEditingAddress(null);
        setAddAddressOpen(true);
    };

    return (
        <>
            <div className="border rounded-lg">

                {addresses.length === 0 ? (

                    /* حالت بدون آدرس */
                    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6">

                        <div className="flex items-center justify-center size-12 rounded-full bg-primary/[0.06]">
                            <MapPin className="size-6 text-primary"/>
                        </div>

                        <div className="text-base font-medium text-foreground">
                            هنوز آدرسی ثبت نکرده‌اید
                        </div>

                        <div className="text-sm text-secondary-foreground/70 mt-1">
                            در حال حاضر آدرسی برای نمایش ندارید.
                        </div>

                        <Button
                            variant="primary"
                            className="mt-5"
                            onClick={handleAddAddress}
                        >
                            <MapPinPlus className="size-4"/>
                            افزودن آدرس جدید
                        </Button>

                    </div>

                ) : (

                    /* حالت دارای آدرس */
                    <div className="p-5">

                        {/* هدر */}
                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <h2 className="text-base font-semibold">
                                    آدرس‌های من
                                </h2>

                                <p className="text-sm text-secondary-foreground/70 mt-1">
                                    آدرس‌های ثبت‌شده شما
                                </p>
                            </div>

                            <Button
                                variant="primary"
                                onClick={handleAddAddress}
                            >
                                <MapPinPlus className="size-4"/>
                                افزودن آدرس جدید
                            </Button>

                        </div>

                        {/* لیست آدرس‌ها */}
                        <div className="space-y-3">

                            {addresses.map((item, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg border border-border p-4"
                                >

                                    <div className="flex items-start gap-3">

                                        {/* آیکون */}
                                        <div
                                            className="flex items-center justify-center size-10 shrink-0 rounded-full bg-primary/[0.06]">
                                            <MapPin className="size-5 text-primary"/>
                                        </div>

                                        {/* اطلاعات */}
                                        <div className="min-w-0 flex-1">

                                            {/* عنوان */}
                                            <div className="flex items-center gap-2">

                                                <span className="font-medium text-foreground">
                                                    {item.title}
                                                </span>

                                                {item.isDefault && (
                                                    <span
                                                        className="text-xs rounded-md bg-primary/[0.08] text-primary px-2 py-1">
                                                        پیش‌فرض
                                                    </span>
                                                )}

                                            </div>

                                            {/* آدرس */}
                                            <div className="text-sm text-secondary-foreground mt-2 leading-6">
                                                {item.province}، {item.city}، {item.address}

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
                                            </div>

                                            {/* اطلاعات گیرنده */}
                                            <div
                                                className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-secondary-foreground/70 mt-3">

                                                <span>
                                                    کد پستی: {item.postalCode}
                                                </span>

                                                <span>
                                                    گیرنده: {item.receiverName}
                                                </span>

                                                <span>
                                                    موبایل: {item.phone}
                                                </span>

                                            </div>

                                            {/* دکمه‌ها */}
                                            <div
                                                className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-border">

                                                {/* پیش‌فرض */}
                                                {!item.isDefault && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleSetDefault(index)
                                                        }
                                                    >
                                                        <Star className="size-4"/>
                                                        پیش‌فرض
                                                    </Button>
                                                )}

                                                {/* ویرایش */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEditAddress(
                                                            item,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <Pencil className="size-4"/>
                                                    ویرایش
                                                </Button>

                                                {/* حذف */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDeleteAddress(index)
                                                    }
                                                >
                                                    <Trash2 className="size-4"/>
                                                    حذف
                                                </Button>

                                            </div>

                                        </div>

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