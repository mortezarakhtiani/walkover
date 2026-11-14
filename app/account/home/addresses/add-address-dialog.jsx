
'use client';

import { useEffect, useState } from 'react';
import { provinces } from './iran-locations';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/store/components/ui/dialog';

import { Button } from '@/store/components/ui/button';
import { Input } from '@/store/components/ui/input';

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

import { toast } from 'sonner';

/* =========================
   Persian / English Digits
========================= */

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

const toPersianDigits = (value = '') => {
    return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[digit]);
};

const toEnglishDigits = (value = '') => {
    return String(value)
        .replace(/[۰-۹]/g, (digit) =>
            String(PERSIAN_DIGITS.indexOf(digit))
        )
        .replace(/[٠-٩]/g, (digit) =>
            String(ARABIC_DIGITS.indexOf(digit))
        );
};

const onlyDigits = (value, maxLength) => {
    return toEnglishDigits(value)
        .replace(/\D/g, '')
        .slice(0, maxLength);
};

/* =========================
   Shared Styles
========================= */

const INPUT_CLASS = `
    peer
    rounded-md
    font-iransans
    transition-colors
    focus-visible:border-blue-600
    focus-visible:ring-2
    focus-visible:ring-blue-600/10
`;

const LABEL_CLASS = `
    pointer-events-none
    absolute
    right-4
    top-0
    -translate-y-1/2
    bg-background
    px-1.5
    text-[11px]
    font-medium
    text-muted-foreground
    transition-colors
    peer-focus:text-blue-600
    dark:peer-focus:text-blue-400
`;

const ERROR_CLASS = `
    border-red-600
    focus-visible:border-red-600
    focus-visible:ring-red-600/10
`;

const ERROR_TEXT_CLASS = ' text-[11px] text-red-700';

/* =========================
   Main Component
========================= */

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

    /* =========================
       Fill Form When Editing
    ========================= */

    useEffect(() => {
        if (!open) return;

        if (editingAddress) {
            setTitle(editingAddress.title || '');
            setProvince(editingAddress.province || '');
            setCity(editingAddress.city || '');
            setAddress(editingAddress.address || '');
            setPlaque(onlyDigits(editingAddress.plaque || '', 4));
            setUnit(onlyDigits(editingAddress.unit || '', 4));
            setPostalCode(onlyDigits(editingAddress.postalCode || '', 10));
            setReceiverName(editingAddress.receiverName || '');
            setPhone(onlyDigits(editingAddress.phone || '', 11));
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

        setPostalCodeError('');
        setPhoneError('');
        setRequiredErrors({});
        setProvinceOpen(false);
        setCityOpen(false);
    }, [open, editingAddress]);

    /* =========================
       Province / City
    ========================= */

    const selectedProvince = provinces.find(
        (item) => item.id === Number(province)
    );

    const cities = selectedProvince?.cities || [];

    const selectedCity = cities.find(
        (item) => item.id === Number(city)
    );

    /* =========================
       Submit
    ========================= */

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

    /* =========================
       Numeric Input Handler
    ========================= */

    const handlePostalCodeChange = (e) => {
        const value = onlyDigits(e.target.value, 10);

        setPostalCode(value);

        if (value.length === 10 || value.length === 0) {
            setPostalCodeError('');
        } else {
            setPostalCodeError('کد پستی نامعتبر است.');
        }
    };

    const handlePhoneChange = (e) => {
        const value = onlyDigits(e.target.value, 11);

        setPhone(value);

        if (value.length === 0) {
            setPhoneError('');
        } else if (
            value.length === 11 &&
            value.startsWith('09')
        ) {
            setPhoneError('');
        } else {
            setPhoneError('شماره تماس نامعتبر است.');
        }
    };

    /* =========================
       Render
    ========================= */

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                dir="ltr"
                className="
        w-[calc(100%-24px)]
        max-w-[620px]
        max-h-[92vh]
        overflow-x-hidden
        overflow-y-auto
        rounded-md
        border-border/60
        bg-background
        p-0
        shadow-2xl
    "
            >
                <div dir="rtl" className="w-full text-right">
                    {/* Header */}

                    <DialogHeader
                        className="
                        relative

                        px-6
                        py-5
                        text-right
                    "
                    >
                        <div
                            className="
                            absolute
                            right-0
                            top-0
                            h-full
                            w-1
                        "
                        />

                        <div className="flex flex-col items-start gap-1.5">
                            <DialogTitle
                                className="

                                text-lg
                                font-bold
                                leading-7
                                tracking-tight
                                text-foreground
                            "
                            >
                                {editingAddress
                                    ? 'ویرایش آدرس'
                                    : 'افزودن آدرس جدید'}
                            </DialogTitle>

                            <p className=" text-xs leading-5 text-muted-foreground">
                                اطلاعات آدرس و گیرنده را وارد کنید
                            </p>
                        </div>
                    </DialogHeader>

                    {/* Form */}

                    <div className="space-y-5 px-6 py-6">

                        {/* Address Title */}

                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Input
                                    value={toPersianDigits(title)}
                                    onChange={(e) =>
                                        setTitle(
                                            toPersianDigits(
                                                e.target.value.slice(0, 30)
                                            )
                                        )
                                    }
                                    placeholder=" "
                                    maxLength={30}
                                    className={INPUT_CLASS}
                                />

                                <label className={LABEL_CLASS}>
                                    عنوان آدرس
                                </label>
                            </div>

                            <div className=" text-left text-[11px] text-muted-foreground/60">
                                {toPersianDigits(title.length)}/۳۰
                            </div>
                        </div>

                        {/* Province / City */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* Province */}

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
                                                className="
                                                h-11
                                                w-full
                                                justify-between
                                                rounded-md
                                                border-input
                                                bg-background

                                                font-normal
                                                transition-all
                                                hover:bg-muted/40
                                                focus-visible:border-blue-600
                                                focus-visible:ring-2
                                                focus-visible:ring-blue-600/10
                                                data-[state=open]:border-blue-600
                                                data-[state=open]:ring-2
                                                data-[state=open]:ring-blue-600/10
                                            "
                                            >
                                            <span className="font-iransans">
                                                {selectedProvince
                                                    ? selectedProvince.name
                                                    : 'انتخاب استان'}
                                            </span>

                                                <ChevronDown className="size-4 opacity-50"/>
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent
                                            align="start"
                                            className="
                                            w-[var(--radix-popover-trigger-width)]
                                            overflow-hidden
                                            rounded-md
                                            border-border/60
                                            p-0
                                            shadow-lg
                                        "
                                        >
                                            <Command>
                                                <CommandInput
                                                    placeholder="جستجوی استان..."
                                                    className="font-iransans"
                                                />

                                                <CommandList className="max-h-[220px] overflow-y-auto">
                                                    <CommandEmpty>
                                                        استانی پیدا نشد
                                                    </CommandEmpty>

                                                    <CommandGroup>
                                                        {provinces.map((item) => (
                                                            <CommandItem
                                                                key={item.id}
                                                                value={item.name}
                                                                className="font-iransans"
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
                                                            <span className="font-iransans">
                                                                {item.name}
                                                            </span>

                                                                {province === item.id && (
                                                                    <Check className="mr-auto size-4 text-blue-600"/>
                                                                )}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <label className={LABEL_CLASS}>
                                        استان
                                        <span className="mr-1 text-red-700">*</span>
                                    </label>
                                </div>

                                {requiredErrors.province && (
                                    <div className={ERROR_TEXT_CLASS}>
                                        {requiredErrors.province}
                                    </div>
                                )}
                            </div>

                            {/* City */}

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
                                                className="
                                                h-11
                                                w-full
                                                justify-between
                                                rounded-md
                                                border-input
                                                bg-background
                                                font-iransans
                                                font-normal
                                                transition-all
                                                hover:bg-muted/40
                                                focus-visible:border-blue-600
                                                focus-visible:ring-2
                                                focus-visible:ring-blue-600/10
                                                data-[state=open]:border-blue-600
                                                data-[state=open]:ring-2
                                                data-[state=open]:ring-blue-600/10
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                            >
                                            <span className="font-iransans">
                                                {selectedCity
                                                    ? selectedCity.name
                                                    : 'انتخاب شهر'}
                                            </span>

                                                <ChevronDown className="size-4 opacity-50"/>
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent
                                            align="start"
                                            className="
                                            w-[var(--radix-popover-trigger-width)]
                                            overflow-hidden
                                            rounded-md
                                            border-border/60
                                            p-0
                                            font-iransans
                                            shadow-lg
                                        "
                                        >
                                            <Command>
                                                <CommandInput
                                                    placeholder="جستجوی شهر..."
                                                    className="font-iransans"
                                                />

                                                <CommandList className="max-h-[220px] overflow-y-auto font-iransans">
                                                    <CommandEmpty className="font-iransans">
                                                        شهری پیدا نشد
                                                    </CommandEmpty>

                                                    <CommandGroup>
                                                        {cities.map((item) => (
                                                            <CommandItem
                                                                key={item.id}
                                                                value={item.name}
                                                                className="font-iransans"
                                                                onSelect={() => {
                                                                    setCity(item.id);
                                                                    setCityOpen(false);

                                                                    setRequiredErrors((prev) => ({
                                                                        ...prev,
                                                                        city: '',
                                                                    }));
                                                                }}
                                                            >
                                                            <span className="font-iransans">
                                                                {item.name}
                                                            </span>

                                                                {city === item.id && (
                                                                    <Check className="mr-auto size-4 text-blue-600"/>
                                                                )}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <label className={LABEL_CLASS}>
                                        شهر
                                        <span className="mr-1 text-red-700">*</span>
                                    </label>
                                </div>

                                {requiredErrors.city && (
                                    <div className={ERROR_TEXT_CLASS}>
                                        {requiredErrors.city}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Full Address */}

                        <div className="flex flex-col gap-2">
                            <div className="relative">
                            <textarea
                                value={toPersianDigits(address)}
                                onChange={(e) =>
                                    setAddress(
                                        toPersianDigits(
                                            e.target.value.slice(0, 200)
                                        )
                                    )
                                }
                                placeholder=" "
                                rows={3}
                                maxLength={200}
                                className={`
                                    peer
                                    flex
                                    w-full
                                    resize-none
                                    rounded-md
                                    border
                                    bg-background
                                    px-3
                                    py-3
                                    font-iransans
                                    text-sm
                                    leading-7
                                    text-foreground
                                    outline-none
                                    transition-all
                                    focus-visible:border-blue-600
                                    focus-visible:ring-2
                                    focus-visible:ring-blue-600/10
                                    ${requiredErrors.address
                                    ? ERROR_CLASS
                                    : 'border-input'
                                }
                                `}
                            />

                                <label className={LABEL_CLASS}>
                                    آدرس کامل
                                    <span className="mr-1 text-red-700">*</span>
                                </label>
                            </div>

                            {requiredErrors.address && (
                                <div className={ERROR_TEXT_CLASS}>
                                    {requiredErrors.address}
                                </div>
                            )}
                        </div>

                        {/* Plaque / Unit */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* Plaque */}

                            <div className="relative">
                                <Input
                                    value={toPersianDigits(plaque)}
                                    onChange={(e) =>
                                        setPlaque(
                                            onlyDigits(e.target.value, 4)
                                        )
                                    }
                                    placeholder=" "
                                    inputMode="numeric"
                                    maxLength={4}
                                    className={INPUT_CLASS}
                                />

                                <label className={LABEL_CLASS}>
                                    پلاک
                                </label>
                            </div>

                            {/* Unit */}

                            <div className="relative">
                                <Input
                                    value={toPersianDigits(unit)}
                                    onChange={(e) =>
                                        setUnit(
                                            onlyDigits(e.target.value, 4)
                                        )
                                    }
                                    placeholder=" "
                                    inputMode="numeric"
                                    maxLength={4}
                                    className={INPUT_CLASS}
                                />

                                <label className={LABEL_CLASS}>
                                    واحد
                                </label>
                            </div>
                        </div>

                        {/* Postal Code */}

                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <Input
                                    value={toPersianDigits(postalCode)}
                                    onChange={handlePostalCodeChange}
                                    placeholder=" "
                                    inputMode="numeric"
                                    maxLength={10}
                                    className={`
                                    ${INPUT_CLASS}
                                    ${postalCodeError ? ERROR_CLASS : ''}
                                `}
                                />

                                <label className={LABEL_CLASS}>
                                    کد پستی
                                    <span className="mr-1 text-red-700">*</span>
                                </label>
                            </div>

                            <div className={`h-4 leading-4 ${ERROR_TEXT_CLASS}`}>
                                {postalCodeError || '\u00A0'}
                            </div>
                        </div>

                        {/* Receiver / Phone */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* Receiver */}

                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <Input
                                        value={toPersianDigits(receiverName)}
                                        onChange={(e) =>
                                            setReceiverName(
                                                toPersianDigits(e.target.value)
                                            )
                                        }
                                        placeholder=" "
                                        className={`
                                        ${INPUT_CLASS}
                                        ${requiredErrors.receiverName ? ERROR_CLASS : ''}
                                    `}
                                    />

                                    <label className={LABEL_CLASS}>
                                        نام گیرنده
                                        <span className="mr-1 text-red-700">*</span>
                                    </label>
                                </div>

                                {requiredErrors.receiverName && (
                                    <div className={ERROR_TEXT_CLASS}>
                                        {requiredErrors.receiverName}
                                    </div>
                                )}
                            </div>

                            {/* Phone */}

                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <Input
                                        value={toPersianDigits(phone)}
                                        onChange={handlePhoneChange}
                                        placeholder=" "
                                        inputMode="tel"
                                        maxLength={11}
                                        className={`
                                        ${INPUT_CLASS}
                                        ${phoneError ? ERROR_CLASS : ''}
                                    `}
                                    />

                                    <label className={LABEL_CLASS}>
                                        شماره موبایل گیرنده
                                        <span className="mr-1 text-red-700">*</span>
                                    </label>
                                </div>

                                <div className={`h-4 leading-4 ${ERROR_TEXT_CLASS}`}>
                                    {phoneError || '\u00A0'}
                                </div>
                            </div>
                        </div>

                        {/* Description */}

                        <div className="flex flex-col gap-2">
                            <div className="relative">
                            <textarea
                                value={toPersianDigits(description)}
                                onChange={(e) =>
                                    setDescription(
                                        toPersianDigits(e.target.value)
                                    )
                                }
                                placeholder=" "
                                rows={2}
                                className="
                                    peer
                                    flex
                                    w-full
                                    resize-none
                                    rounded-md
                                    border
                                    border-input
                                    bg-background
                                    px-3
                                    py-3
                                    font-iransans
                                    text-sm
                                    leading-7
                                    text-foreground
                                    outline-none
                                    transition-all
                                    focus-visible:border-blue-600
                                    focus-visible:ring-2
                                    focus-visible:ring-blue-600/10
                                "
                            />

                                <label className={LABEL_CLASS}>
                                    توضیحات
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}

                    <DialogFooter
                        className="

                        px-6
                        py-4
                        gap-2
                        font-iransans
                    "
                    >
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="
                            h-10
                            rounded-md
                            px-5
                        "
                        >
                            انصراف
                        </Button>

                        <Button
                            type="button"
                            variant="primary"
                            onClick={handleSubmit}
                            className="
                            h-10
                            rounded-md
                            bg-blue-600
                            px-6
                            text-white
                            shadow-sm
                            shadow-blue-500/20
                            transition-all
                            hover:bg-blue-700
                            hover:shadow-md
                            hover:shadow-blue-500/20
                            active:scale-[0.98]
                        "
                        >
                            {editingAddress
                                ? 'ذخیره تغییرات'
                                : 'ذخیره آدرس'}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
);
};

export {
    AddAddressDialog };
