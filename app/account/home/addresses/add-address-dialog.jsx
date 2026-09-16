
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
    MapPin,
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
        .replace(/[۰-۹]/g, (digit) =>
            '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)
        )
        .replace(/[٠-٩]/g, (digit) =>
            '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)
        );
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


    /* =========================
       Fill form when editing
    ========================= */

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

        setPostalCodeError('');
        setPhoneError('');
        setRequiredErrors({});
        setProvinceOpen(false);
        setCityOpen(false);

    }, [open, editingAddress]);


    /* =========================
       Submit
    ========================= */

    const handleSubmit = () => {
        const cleanPostalCode = onlyDigits(postalCode, 10);
        const cleanPhone = onlyDigits(phone, 11);

        let hasError = false;

        const newRequiredErrors = {};


        if (!province) {
            newRequiredErrors.province =
                'وارد کردن استان الزامیست.';
            hasError = true;
        }


        if (!city) {
            newRequiredErrors.city =
                'وارد کردن شهر الزامیست.';
            hasError = true;
        }


        if (!address.trim()) {
            newRequiredErrors.address =
                'وارد کردن آدرس کامل الزامیست.';
            hasError = true;
        }


        if (!receiverName.trim()) {
            newRequiredErrors.receiverName =
                'وارد کردن نام گیرنده الزامیست.';
            hasError = true;
        }


        if (cleanPostalCode.length !== 10) {
            setPostalCodeError(
                'کد پستی نامعتبر است.'
            );

            hasError = true;
        } else {
            setPostalCodeError('');
        }


        if (
            cleanPhone.length !== 11 ||
            !cleanPhone.startsWith('09')
        ) {
            setPhoneError(
                'شماره تماس نامعتبر است.'
            );

            hasError = true;
        } else {
            setPhoneError('');
        }


        setRequiredErrors(newRequiredErrors);


        if (hasError) {
            return;
        }


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
       Province / City
    ========================= */

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
                dir="rtl"
                className="
                    w-[calc(100%-24px)]
                    max-w-[620px]
                    max-h-[92vh]
                    overflow-hidden
                    overflow-y-auto
                    rounded-2xl
                    border-border/60
                    bg-background
                    p-0
                    shadow-2xl
                "
            >

                {/* =========================
                    Header
                ========================= */}

                <DialogHeader
                    className="
                        relative
                        overflow-hidden
                        border-b
                        border-border/60
                        px-6
                        py-5
                    "
                >

                    {/* Tiny Indigo Accent */}

                    <div
                        className="
                            absolute
                            right-0
                            top-0
                            h-full
                            w-1
                            bg-indigo-600
                        "
                    />


                    <div className="flex items-center gap-3">

                        {/* Icon */}

                        <div
                            className="
                                flex
                                size-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-muted
                                text-indigo-600
                                dark:text-indigo-400
                            "
                        >
                            <MapPin
                                size={20}
                                strokeWidth={1.8}
                            />
                        </div>


                        {/* Title */}

                        <div>

                            <DialogTitle
                                className="
                                    text-lg
                                    font-bold
                                "
                            >
                                {editingAddress
                                    ? 'ویرایش آدرس'
                                    : 'افزودن آدرس جدید'}
                            </DialogTitle>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                اطلاعات آدرس و گیرنده را وارد کنید
                            </p>

                        </div>

                    </div>

                </DialogHeader>


                {/* =========================
                    Form
                ========================= */}

                <div
                    className="
                        space-y-5
                        px-6
                        py-6
                    "
                >

                    {/* =========================
                        Address title
                    ========================= */}

                    <div className="flex flex-col gap-2">

                        <div className="relative">

                            <Input
                                value={title}
                                onChange={(e) =>
                                    setTitle(
                                        toPersianDigits(
                                            e.target.value.slice(
                                                0,
                                                30
                                            )
                                        )
                                    )
                                }
                                placeholder=" "
                                maxLength={30}
                                className="
                                    peer
                                    rounded-lg
                                    transition-colors
                                    focus-visible:border-indigo-500
                                    focus-visible:ring-2
                                    focus-visible:ring-indigo-500/10
                                "
                            />


                            <label
                                className="
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
                                    peer-focus:text-indigo-600
                                    dark:peer-focus:text-indigo-400
                                "
                            >
                                عنوان آدرس
                            </label>

                        </div>


                        <div
                            className="
                                text-left
                                text-[11px]
                                text-muted-foreground/60
                            "
                        >
                            {toPersianDigits(title.length)}/۳۰
                        </div>

                    </div>


                    {/* =========================
                        Province / City
                    ========================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                        "
                    >

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
                                                rounded-lg
                                                border-input
                                                bg-background
                                                font-normal
                                                transition-all
                                                hover:bg-muted/40
                                                focus-visible:border-indigo-500
                                                focus-visible:ring-2
                                                focus-visible:ring-indigo-500/10
                                                data-[state=open]:border-indigo-500
                                                data-[state=open]:ring-2
                                                data-[state=open]:ring-indigo-500/10
                                            "
                                        >

                                            <span>
                                                {selectedProvince
                                                    ? selectedProvince.name
                                                    : 'انتخاب استان'}
                                            </span>


                                            <ChevronDown
                                                className="
                                                    size-4
                                                    opacity-50
                                                "
                                            />

                                        </Button>

                                    </PopoverTrigger>


                                    <PopoverContent
                                        align="start"
                                        className="
                                            w-[var(--radix-popover-trigger-width)]
                                            overflow-hidden
                                            rounded-xl
                                            border-border/60
                                            p-0
                                            shadow-lg
                                        "
                                    >

                                        <Command>

                                            <CommandInput
                                                placeholder="جستجوی استان..."
                                            />


                                            <CommandList
                                                className="
                                                    max-h-[220px]
                                                    overflow-y-auto
                                                "
                                            >

                                                <CommandEmpty>
                                                    استانی پیدا نشد
                                                </CommandEmpty>


                                                <CommandGroup>

                                                    {provinces.map(
                                                        (item) => (
                                                            <CommandItem
                                                                key={item.id}
                                                                value={item.name}
                                                                onSelect={() => {

                                                                    setProvince(
                                                                        item.id
                                                                    );

                                                                    setCity('');

                                                                    setProvinceOpen(
                                                                        false
                                                                    );

                                                                    setRequiredErrors(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            province:
                                                                                '',
                                                                            city:
                                                                                '',
                                                                        })
                                                                    );

                                                                }}
                                                            >

                                                                {item.name}


                                                                {province ===
                                                                    item.id && (
                                                                    <Check
                                                                        className="
                                                                            mr-auto
                                                                            size-4
                                                                            text-indigo-600
                                                                        "
                                                                    />
                                                                )}

                                                            </CommandItem>
                                                        )
                                                    )}

                                                </CommandGroup>

                                            </CommandList>

                                        </Command>

                                    </PopoverContent>

                                </Popover>


                                <label
                                    className="
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
                                    "
                                >
                                    استان

                                    <span
                                        className="
                                            mr-1
                                            text-red-500
                                        "
                                    >
                                        *
                                    </span>

                                </label>

                            </div>


                            {requiredErrors.province && (
                                <div
                                    className="
                                        text-[11px]
                                        text-red-500
                                    "
                                >
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
                                                rounded-lg
                                                border-input
                                                bg-background
                                                font-normal
                                                transition-all
                                                hover:bg-muted/40
                                                focus-visible:border-indigo-500
                                                focus-visible:ring-2
                                                focus-visible:ring-indigo-500/10
                                                data-[state=open]:border-indigo-500
                                                data-[state=open]:ring-2
                                                data-[state=open]:ring-indigo-500/10
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >

                                            <span>
                                                {selectedCity
                                                    ? selectedCity.name
                                                    : 'انتخاب شهر'}
                                            </span>


                                            <ChevronDown
                                                className="
                                                    size-4
                                                    opacity-50
                                                "
                                            />

                                        </Button>

                                    </PopoverTrigger>


                                    <PopoverContent
                                        align="start"
                                        className="
                                            w-[var(--radix-popover-trigger-width)]
                                            overflow-hidden
                                            rounded-xl
                                            border-border/60
                                            p-0
                                            shadow-lg
                                        "
                                    >

                                        <Command>

                                            <CommandInput
                                                placeholder="جستجوی شهر..."
                                            />


                                            <CommandList
                                                className="
                                                    max-h-[220px]
                                                    overflow-y-auto
                                                "
                                            >

                                                <CommandEmpty>
                                                    شهری پیدا نشد
                                                </CommandEmpty>


                                                <CommandGroup>

                                                    {cities.map(
                                                        (item) => (
                                                            <CommandItem
                                                                key={item.id}
                                                                value={item.name}
                                                                onSelect={() => {

                                                                    setCity(
                                                                        item.id
                                                                    );

                                                                    setCityOpen(
                                                                        false
                                                                    );

                                                                    setRequiredErrors(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            city:
                                                                                '',
                                                                        })
                                                                    );

                                                                }}
                                                            >

                                                                {item.name}


                                                                {city ===
                                                                    item.id && (
                                                                    <Check
                                                                        className="
                                                                            mr-auto
                                                                            size-4
                                                                            text-indigo-600
                                                                        "
                                                                    />
                                                                )}

                                                            </CommandItem>
                                                        )
                                                    )}

                                                </CommandGroup>

                                            </CommandList>

                                        </Command>

                                    </PopoverContent>

                                </Popover>


                                <label
                                    className="
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
                                    "
                                >
                                    شهر

                                    <span
                                        className="
                                            mr-1
                                            text-red-500
                                        "
                                    >
                                        *
                                    </span>

                                </label>

                            </div>


                            {requiredErrors.city && (
                                <div
                                    className="
                                        text-[11px]
                                        text-red-500
                                    "
                                >
                                    {requiredErrors.city}
                                </div>
                            )}

                        </div>

                    </div>


                    {/* =========================
                        Full Address
                    ========================= */}

                    <div className="flex flex-col gap-2">

                        <div className="relative">

                            <textarea
                                value={address}
                                onChange={(e) =>
                                    setAddress(
                                        toPersianDigits(
                                            e.target.value.slice(
                                                0,
                                                200
                                            )
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
                                    rounded-lg
                                    border
                                    bg-background
                                    px-3
                                    py-3
                                    text-sm
                                    leading-7
                                    text-foreground
                                    outline-none
                                    transition-all

                                    placeholder:text-muted-foreground

                                    focus-visible:border-indigo-500
                                    focus-visible:ring-2
                                    focus-visible:ring-indigo-500/10

                                    ${
                                        requiredErrors.address
                                            ? `
                                                border-red-500
                                                focus-visible:border-red-500
                                                focus-visible:ring-red-500/10
                                            `
                                            : 'border-input'
                                    }
                                `}
                            />


                            <label
                                className="
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
                                    peer-focus:text-indigo-600
                                    dark:peer-focus:text-indigo-400
                                "
                            >
                                آدرس کامل

                                <span
                                    className="
                                        mr-1
                                        text-red-500
                                    "
                                >
                                    *
                                </span>

                            </label>

                        </div>


                        {requiredErrors.address && (
                            <div
                                className="
                                    text-[11px]
                                    text-red-500
                                "
                            >
                                {requiredErrors.address}
                            </div>
                        )}

                    </div>


                    {/* =========================
                        Plaque / Unit
                    ========================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                        "
                    >

                        {/* Plaque */}

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
                                className="
                                    peer
                                    rounded-lg
                                    transition-colors
                                    focus-visible:border-indigo-500
                                    focus-visible:ring-2
                                    focus-visible:ring-indigo-500/10
                                "
                            />


                            <label
                                className="
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
                                    peer-focus:text-indigo-600
                                    dark:peer-focus:text-indigo-400
                                "
                            >
                                پلاک
                            </label>

                        </div>


                        {/* Unit */}

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
                                className="
                                    peer
                                    rounded-lg
                                    transition-colors
                                    focus-visible:border-indigo-500
                                    focus-visible:ring-2
                                    focus-visible:ring-indigo-500/10
                                "
                            />


                            <label
                                className="
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
                                    peer-focus:text-indigo-600
                                    dark:peer-focus:text-indigo-400
                                "
                            >
                                واحد
                            </label>

                        </div>

                    </div>


                    {/* =========================
                        Postal Code
                    ========================= */}

                    <div className="flex flex-col gap-2">

                        <div className="relative">

                            <Input
                                value={toPersianDigits(postalCode)}
                                onChange={(e) => {

                                    const value =
                                        onlyDigits(
                                            e.target.value,
                                            10
                                        );

                                    setPostalCode(value);


                                    if (
                                        value.length === 10
                                    ) {
                                        setPostalCodeError('');
                                    } else if (
                                        value.length > 0
                                    ) {
                                        setPostalCodeError(
                                            'کد پستی نامعتبر است.'
                                        );
                                    } else {
                                        setPostalCodeError('');
                                    }

                                }}
                                placeholder=" "
                                inputMode="numeric"
                                maxLength={10}
                                className={`
                                    peer
                                    rounded-lg
                                    transition-all

                                    focus-visible:border-indigo-500
                                    focus-visible:ring-2
                                    focus-visible:ring-indigo-500/10

                                    ${
                                        postalCodeError
                                            ? `
                                                border-red-500
                                                focus-visible:border-red-500
                                                focus-visible:ring-red-500/10
                                            `
                                            : ''
                                    }
                                `}
                            />


                            <label
                                className="
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
                                    peer-focus:text-indigo-600
                                    dark:peer-focus:text-indigo-400
                                "
                            >
                                کد پستی

                                <span
                                    className="
                                        mr-1
                                        text-red-500
                                    "
                                >
                                    *
                                </span>

                            </label>

                        </div>


                        <div
                            className="
                                h-4
                                text-[11px]
                                leading-4
                                text-red-500
                            "
                        >
                            {postalCodeError || '\u00A0'}
                        </div>

                    </div>


                    {/* =========================
                        Receiver / Phone
                    ========================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                        "
                    >

                        {/* Receiver */}

                        <div className="flex flex-col gap-2">

                            <div className="relative">

                                <Input
                                    value={receiverName}
                                    onChange={(e) =>
                                        setReceiverName(
                                            e.target.value
                                        )
                                    }
                                    placeholder=" "
                                    className={`
                                        peer
                                        rounded-lg
                                        transition-all

                                        focus-visible:border-indigo-500
                                        focus-visible:ring-2
                                        focus-visible:ring-indigo-500/10

                                        ${
                                            requiredErrors.receiverName
                                                ? `
                                                    border-red-500
                                                    focus-visible:border-red-500
                                                    focus-visible:ring-red-500/10
                                                `
                                                : ''
                                        }
                                    `}
                                />


                                <label
                                    className="
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
                                        peer-focus:text-indigo-600
                                        dark:peer-focus:text-indigo-400
                                    "
                                >
                                    نام گیرنده

                                    <span
                                        className="
                                            mr-1
                                            text-red-500
                                        "
                                    >
                                        *
                                    </span>

                                </label>

                            </div>


                            {requiredErrors.receiverName && (
                                <div
                                    className="
                                        text-[11px]
                                        text-red-500
                                    "
                                >
                                    {requiredErrors.receiverName}
                                </div>
                            )}

                        </div>


                        {/* Phone */}

                        <div className="flex flex-col gap-2">

                            <div className="relative">

                                <Input
                                    value={toPersianDigits(phone)}
                                    onChange={(e) => {

                                        const value =
                                            onlyDigits(
                                                e.target.value,
                                                11
                                            );

                                        setPhone(value);


                                        if (
                                            value.length === 11 &&
                                            value.startsWith('09')
                                        ) {
                                            setPhoneError('');
                                        } else if (
                                            value.length > 0
                                        ) {
                                            setPhoneError(
                                                'شماره تماس نامعتبر است.'
                                            );
                                        } else {
                                            setPhoneError('');
                                        }

                                    }}
                                    placeholder=" "
                                    inputMode="tel"
                                    maxLength={11}
                                    className={`
                                        peer
                                        rounded-lg
                                        transition-all

                                        focus-visible:border-indigo-500
                                        focus-visible:ring-2
                                        focus-visible:ring-indigo-500/10

                                        ${
                                            phoneError
                                                ? `
                                                    border-red-500
                                                    focus-visible:border-red-500
                                                    focus-visible:ring-red-500/10
                                                `
                                                : ''
                                        }
                                    `}
                                />


                                <label
                                    className="
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
                                        peer-focus:text-indigo-600
                                        dark:peer-focus:text-indigo-400
                                    "
                                >
                                    شماره موبایل گیرنده

                                    <span
                                        className="
                                            mr-1
                                            text-red-500
                                        "
                                    >
                                        *
                                    </span>

                                </label>

                            </div>


                            <div
                                className="
                                    h-4
                                    text-[11px]
                                    leading-4
                                    text-red-500
                                "
                            >
                                {phoneError || '\u00A0'}
                            </div>

                        </div>

                    </div>


                    {/* =========================
                        Description
                    ========================= */}

                    <div className="flex flex-col gap-2">

                        <div className="relative">

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        toPersianDigits(
                                            e.target.value
                                        )
                                    )
                                }
                                placeholder=" "
                                rows={2}
                                className="
                                    peer
                                    flex
                                    w-full
                                    resize-none
                                    rounded-lg
                                    border
                                    border-input
                                    bg-background
                                    px-3
                                    py-3
                                    text-sm
                                    leading-7
                                    text-foreground
                                    outline-none
                                    transition-all

                                    focus-visible:border-indigo-500
                                    focus-visible:ring-2
                                    focus-visible:ring-indigo-500/10
                                "
                            />


                            <label
                                className="
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
                                    peer-focus:text-indigo-600
                                    dark:peer-focus:text-indigo-400
                                "
                            >
                                توضیحات
                            </label>

                        </div>

                    </div>

                </div>


                {/* =========================
                    Footer
                ========================= */}

                <DialogFooter
                    className="
                        border-t
                        border-border/60
                        bg-muted/20
                        px-6
                        py-4
                        gap-2
                    "
                >

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                        className="
                            h-10
                            rounded-lg
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
                            rounded-lg
                            bg-indigo-600
                            px-6
                            text-white
                            shadow-sm
                            shadow-indigo-500/20
                            transition-all
                            hover:bg-indigo-700
                            hover:shadow-md
                            hover:shadow-indigo-500/20
                            active:scale-[0.98]
                        "
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

