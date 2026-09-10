'use client';

import {useEffect, useState} from 'react';
import {provinces} from './iran-locations';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/store/components/ui/dialog';

import {Button} from '@/store/components/ui/button';
import {Input} from '@/store/components/ui/input';

import {
    Check,
    ChevronDown,
} from 'lucide-react';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/store/components/ui/command';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/store/components/ui/popover';

import {toast} from 'sonner';


const toPersianDigits = (value) => {
    return String(value)
        .replace(/0/g, '۰')
        .replace(/1/g, '۱')
        .replace(/2/g, '۲')
        .replace(/3/g, '۳')
        .replace(/4/g, '۴')
        .replace(/5/g, '۵')
        .replace(/6/g, '۶')
        .replace(/7/g, '۷')
        .replace(/8/g, '۸')
        .replace(/9/g, '۹');
};

const toEnglishDigits = (value) => {
    return String(value)
        .replace(/[۰-۹]/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
        .replace(/[٠-٩]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit));
};

const onlyDigits = (value, maxLength) => {
    return toEnglishDigits(value)
        .replace(/\D/g, '')
        .slice(0, maxLength);
};


const AddAddressDialog = ({
                              open,
                              onOpenChange,
                              onSave,
                              editingAddress,
                          }) => {

    const [title, setTitle] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [plaque, setPlaque] = useState('');
    const [unit, setUnit] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [provinceOpen, setProvinceOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [requiredErrors, setRequiredErrors] = useState({});


    // پر کردن فرم هنگام ویرایش
    useEffect(() => {
        if (!open) {
            return;
        }

        if (editingAddress) {
            setTitle(editingAddress.title || '');
            setProvince(editingAddress.province || '');
            setCity(editingAddress.city || '');
            setAddress(editingAddress.address || '');
            setPlaque(editingAddress.plaque || '');
            setUnit(editingAddress.unit || '');
            setPostalCode(editingAddress.postalCode || '');
            setReceiverName(editingAddress.receiverName || '');
            setPhone(editingAddress.phone || '');
            setDescription(editingAddress.description || '');
            setIsDefault(editingAddress.isDefault || false);
        } else {
            setTitle('');
            setProvince('');
            setCity('');
            setAddress('');
            setPlaque('');
            setUnit('');
            setPostalCode('');
            setReceiverName('');
            setPhone('');
            setDescription('');
            setIsDefault(false);
        }
    }, [open, editingAddress]);


    const handleSubmit = () => {
        const cleanPostalCode = onlyDigits(postalCode, 10);
        const cleanPhone = onlyDigits(phone, 11);

        let hasError = false;

        const newRequiredErrors = {};

        if (!province) {
            newRequiredErrors.province = 'وارد کردن استان الزامیست.';
            hasError = true;
        }

        if (!city) {
            newRequiredErrors.city = 'وارد کردن شهر الزامیست.';
            hasError = true;
        }

        if (!address.trim()) {
            newRequiredErrors.address = 'وارد کردن آدرس کامل الزامیست.';
            hasError = true;
        }

        if (!receiverName.trim()) {
            newRequiredErrors.receiverName = 'وارد کردن نام گیرنده الزامیست.';
            hasError = true;
        }

        if (cleanPostalCode.length !== 10) {
            setPostalCodeError('کد پستی نامعتبر است.');
            hasError = true;
        } else {
            setPostalCodeError('');
        }

        if (
            cleanPhone.length !== 11 ||
            !cleanPhone.startsWith('09')
        ) {
            setPhoneError('شماره تماس نامعتبر است.');
            hasError = true;
        } else {
            setPhoneError('');
        }

        setRequiredErrors(newRequiredErrors);

        if (hasError) return;

        onSave({
            title: title.trim(),
            province,
            city,
            address: address.trim(),
            plaque: onlyDigits(plaque, 4),
            unit: onlyDigits(unit, 4),
            postalCode: toPersianDigits(cleanPostalCode),
            receiverName: receiverName.trim(),
            phone: toPersianDigits(cleanPhone),
            description: description.trim(),
            isDefault,
        });

        toast.success(
            editingAddress
                ? 'آدرس با موفقیت ویرایش شد.'
                : 'آدرس با موفقیت ثبت شد.'
        );
    };


    const selectedProvince = provinces.find(
        (item) => item.id === Number(province)
    );

    const cities = selectedProvince?.cities || [];

    const selectedCity = cities.find(
        (item) => item.id === Number(city)
    );


    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent
                dir="ltr"
                className="w-[calc(100%-32px)] max-w-[600px] max-h-[90vh] overflow-y-auto"
            >

                {/* عنوان دیالوگ */}
                <DialogHeader>
                    <DialogTitle>
                        {editingAddress
                            ? 'ویرایش آدرس'
                            : 'افزودن اطلاعات گیرنده'}
                    </DialogTitle>
                </DialogHeader>


                {/* فرم */}
                <div className="space-y-4">


                    {/* عنوان آدرس */}
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="relative">
                            <Input
                                value={title}
                                onChange={(e) =>
                                    setTitle(
                                        toPersianDigits(e.target.value.slice(0, 30))
                                    )
                                }
                                placeholder=" "
                                maxLength={30}
                                className="peer"
                            />

                            <label
                                className="
                                pointer-events-none
                                absolute right-5 top-0
                                -translate-y-1/2
                                bg-background
                                px-1
                                text-xs
                                text-muted-foreground
                                transition-all duration-150
                                peer-focus:text-foreground
                                "
                            >
                                عنوان آدرس
                            </label>
                        </div>

                        <div className="text-xs text-secondary-foreground/60 text-left">
                            {toPersianDigits(title.length)}/۳۰
                        </div>
                    </div>


                    {/* استان و شهر */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                        {/* استان */}
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Popover
                                    open={provinceOpen}
                                    onOpenChange={setProvinceOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-11 w-full justify-between font-normal !bg-background hover:!bg-background active:!bg-background focus:!bg-background focus-visible:!bg-background data-[state=open]:!bg-background"
                                        >
                                            {selectedProvince
                                                ? selectedProvince.name
                                                : ''}

                                            <ChevronDown className="size-4 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        align="start"
                                        className="w-[var(--radix-popover-trigger-width)] p-0"
                                    >
                                        <Command>
                                            <CommandInput placeholder="جستجوی استان..."/>

                                            <CommandList className="max-h-[200px] overflow-y-auto">
                                                <CommandEmpty>
                                                    استانی پیدا نشد
                                                </CommandEmpty>

                                                <CommandGroup>
                                                    {provinces.map((item) => (
                                                        <CommandItem
                                                            key={item.id}
                                                            value={item.name}
                                                            onSelect={() => {
                                                                setProvince(item.id);
                                                                setCity('');
                                                                setProvinceOpen(false);

                                                                setRequiredErrors((prev) => ({
                                                                    ...prev,
                                                                    province: '',
                                                                    city: '',
                                                                }));
                                                            }}
                                                        >
                                                            {item.name}

                                                            {province === item.id && (
                                                                <Check className="mr-auto size-4"/>
                                                            )}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <label
                                    className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
            "
                                >
                                    استان
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                            </div>

                            {requiredErrors.province && (
                                <div className="text-[11px] text-red-500">
                                    {requiredErrors.province}
                                </div>
                            )}
                        </div>


                        {/* شهر */}
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Popover
                                    open={cityOpen}
                                    onOpenChange={setCityOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={!province}
                                            className="h-11 w-full justify-between font-normal bg-background hover:bg-background active:bg-background focus:bg-background focus-visible:bg-background data-[state=open]:bg-background">
                                            {selectedCity
                                                ? selectedCity.name
                                                : (
                                                    province
                                                        ? ''
                                                        : ''
                                                )}

                                            <ChevronDown className="size-4 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        align="start"
                                        className="w-[var(--radix-popover-trigger-width)] p-0"
                                    >
                                        <Command>
                                            <CommandInput placeholder="جستجوی شهر..."/>

                                            <CommandList className="max-h-[200px] overflow-y-auto">
                                                <CommandEmpty>
                                                    شهری پیدا نشد
                                                </CommandEmpty>

                                                <CommandGroup>
                                                    {cities.map((item) => (
                                                        <CommandItem
                                                            key={item.id}
                                                            value={item.name}
                                                            onSelect={() => {
                                                                setCity(item.id);
                                                                setCityOpen(false);

                                                                setRequiredErrors((prev) => ({
                                                                    ...prev,
                                                                    city: '',
                                                                }));
                                                            }}
                                                        >
                                                            {item.name}

                                                            {city === item.id && (
                                                                <Check className="mr-auto size-4"/>
                                                            )}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <label
                                    className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
            "
                                >
                                    شهر
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                            </div>

                            {requiredErrors.city && (
                                <div className="text-[11px] text-red-500">
                                    {requiredErrors.city}
                                </div>
                            )}
                        </div>

                    </div>


                    {/* آدرس کامل */}
                    <div className="flex flex-col gap-2 mt-8">
                        <div className="relative">
        <textarea
            value={address}
            onChange={(e) =>
                setAddress(
                    toPersianDigits(e.target.value.slice(0, 200))
                )
            }
            placeholder=" "
            rows={3}
            maxLength={200}
            className={`peer flex w-full resize-none rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 ${
                requiredErrors.address
                    ? 'border-red-500 focus-visible:border-red-500'
                    : 'border-input'
            }`}
        >
</textarea>

                            <label
                                className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
                transition-all duration-150
                peer-focus:text-foreground
            "
                            >
                                آدرس کامل
                                <span className="mr-1 text-red-500">*</span>
                            </label>
                        </div>

                        {requiredErrors.address && (
                            <div className="text-[11px] text-red-500">
                                {requiredErrors.address}
                            </div>
                        )}
                    </div>


                    {/* پلاک و واحد */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                        {/* پلاک */}
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Input
                                    value={toPersianDigits(plaque)}
                                    onChange={(e) =>
                                        setPlaque(
                                            onlyDigits(
                                                e.target.value,
                                                4
                                            )
                                        )
                                    }
                                    placeholder=" "
                                    inputMode="numeric"
                                    maxLength={4}
                                    className="peer"
                                />

                                <label
                                    className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
                transition-all duration-150
                peer-focus:text-foreground
            "
                                >
                                    پلاک
                                </label>
                            </div>
                        </div>


                        {/* واحد */}
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Input
                                    value={toPersianDigits(unit)}
                                    onChange={(e) =>
                                        setUnit(
                                            onlyDigits(
                                                e.target.value,
                                                4
                                            )
                                        )
                                    }
                                    placeholder=" "
                                    inputMode="numeric"
                                    maxLength={4}
                                    className="peer"
                                />

                                <label
                                    className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
                transition-all duration-150
                peer-focus:text-foreground
            "
                                >
                                    واحد
                                </label>
                            </div>
                        </div>

                    </div>


                    {/* کد پستی */}
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <Input
                                value={toPersianDigits(postalCode)}
                                onChange={(e) => {
                                    const value = onlyDigits(e.target.value, 10);

                                    setPostalCode(value);

                                    if (value.length === 10) {
                                        setPostalCodeError('');
                                    } else if (value.length > 0) {
                                        setPostalCodeError('کد پستی نامعتبر است.');
                                    } else {
                                        setPostalCodeError('');
                                    }
                                }}
                                placeholder=" "
                                inputMode="numeric"
                                maxLength={10}
                                className={`peer ${
                                    postalCodeError
                                        ? 'border-red-500 focus-visible:border-red-500'
                                        : ''
                                }`}
                            />

                            <label
                                className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
                transition-all duration-150
                peer-focus:text-foreground
            "
                            >
                                کد پستی
                                <span className="mr-1 text-red-500">*</span>
                            </label>
                        </div>

                        <div className="h-4 text-[11px] leading-4 text-red-500">
                            {postalCodeError || '\u00A0'}
                        </div>
                    </div>


                    {/* نام گیرنده و موبایل */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                        {/* نام گیرنده */}
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Input
                                    value={receiverName}
                                    onChange={(e) =>
                                        setReceiverName(e.target.value)
                                    }
                                    placeholder=" "
                                    className={`peer ${
                                        requiredErrors.receiverName
                                            ? 'border-red-500 focus-visible:border-red-500'
                                            : ''
                                    }`}
                                />

                                <label
                                    className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
                transition-all duration-150
                peer-focus:text-foreground
            "
                                >
                                    نام گیرنده
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                            </div>

                            {requiredErrors.receiverName && (
                                <div className="text-[11px] text-red-500">
                                    {requiredErrors.receiverName}
                                </div>
                            )}
                        </div>


                        {/* موبایل */}
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Input
                                    value={toPersianDigits(phone)}
                                    onChange={(e) => {
                                        const value = onlyDigits(e.target.value, 11);

                                        setPhone(value);

                                        if (
                                            value.length === 11 &&
                                            value.startsWith('09')
                                        ) {
                                            setPhoneError('');
                                        } else if (value.length > 0) {
                                            setPhoneError('شماره تماس نامعتبر است.');
                                        } else {
                                            setPhoneError('');
                                        }
                                    }}
                                    placeholder=" "
                                    inputMode="tel"
                                    maxLength={11}
                                    className={`peer ${
                                        phoneError
                                            ? 'border-red-500 focus-visible:border-red-500'
                                            : ''
                                    }`}
                                />

                                <label
                                    className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
                transition-all duration-150
                peer-focus:text-foreground
            "
                                >
                                    شماره موبایل گیرنده
                                    <span className="mr-1 text-red-500">*</span>
                                </label>
                            </div>

                            <div className="h-4 text-[11px] leading-4 text-red-500">
                                {phoneError || '\u00A0'}
                            </div>
                        </div>

                    </div>


                    {/* توضیحات */}
                    <div className="flex flex-col gap-2">
                        <div className="relative">
        <textarea
            value={description}
            onChange={(e) =>
                setDescription(
                    toPersianDigits(e.target.value)
                )
            }
            placeholder=" "
            rows={2}
            className="peer flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
        />

                            <label
                                className="
                pointer-events-none
                absolute right-5 top-0
                -translate-y-1/2
                bg-background
                px-1
                text-xs
                text-muted-foreground
                transition-all duration-150
                peer-focus:text-foreground
            "
                            >
                                توضیحات
                            </label>
                        </div>
                    </div>

                </div>


                {/* دکمه‌ها */}
                <DialogFooter className="gap-2">

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        انصراف
                    </Button>

                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        {editingAddress
                            ? 'ذخیره تغییرات'
                            : 'ذخیره آدرس'}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
};

export {AddAddressDialog};