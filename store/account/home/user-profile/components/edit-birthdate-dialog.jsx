
'use client';

import { useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/store/components/ui/dialog';

import { Input } from '@/store/components/ui/input';
import { Button } from '@/store/components/ui/button';
import { toPersianDigits } from '../../../../../lib/to-persian';

const toEnglishDigits = (value = '') => {
    return String(value)
        .replace(/[۰-۹]/g, (digit) =>
            String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
        )
        .replace(/[٠-٩]/g, (digit) =>
            String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
        );
};

const toPersianInput = (value = '') => {
    return value.replace(/[0-9]/g, (digit) =>
        '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]
    );
};

const formatTwoDigits = (value) => {
    const englishValue = toEnglishDigits(value);

    if (!englishValue) return '';

    return toPersianInput(englishValue.padStart(2, '0'));
};

const validateBirthDate = (day, month, year) => {
    const englishDay = toEnglishDigits(day);
    const englishMonth = toEnglishDigits(month);
    const englishYear = toEnglishDigits(year);

    if (!/^\d{1,2}$/.test(englishDay)) {
        return 'روز تولد را صحیح وارد کنید.';
    }

    if (!/^\d{1,2}$/.test(englishMonth)) {
        return 'ماه تولد را صحیح وارد کنید.';
    }

    if (!/^\d{4}$/.test(englishYear)) {
        return 'سال تولد باید ۴ رقم باشد.';
    }

    const dayNumber = Number(englishDay);
    const monthNumber = Number(englishMonth);
    const yearNumber = Number(englishYear);

    if (monthNumber < 1 || monthNumber > 12) {
        return 'ماه تولد باید بین ۱ تا ۱۲ باشد.';
    }

    if (dayNumber < 1) {
        return 'روز تولد باید حداقل ۱ باشد.';
    }

    if (monthNumber <= 6 && dayNumber > 31) {
        return 'این ماه حداکثر ۳۱ روز دارد.';
    }

    if (monthNumber >= 7 && monthNumber <= 11 && dayNumber > 30) {
        return 'این ماه حداکثر ۳۰ روز دارد.';
    }

    if (monthNumber === 12) {
        const isLeapYear = [
            1, 5, 9, 13, 17, 22, 26, 30,
        ].includes(yearNumber % 33);

        const maxDays = isLeapYear ? 30 : 29;

        if (dayNumber > maxDays) {
            return isLeapYear
                ? 'اسفند این سال حداکثر ۳۰ روز دارد.'
                : 'اسفند این سال حداکثر ۲۹ روز دارد.';
        }
    }

    return '';
};

const EditBirthdateDialog = ({
    open,
    onOpenChange,
    value,
    onSave,
}) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (open) {
            const parts = value?.split('/') || [];

            setDay(parts[0] || '');
            setMonth(parts[1] || '');
            setYear(parts[2] || '');
            setError('');
        }
    }, [open, value]);

    const handleNumberChange = (setter, maxLength) => (event) => {
        const nextValue = toPersianInput(event.target.value)
            .replace(/[^\u06F0-\u06F9]/g, '')
            .slice(0, maxLength);

        setter(nextValue);
        setError('');
    };

    const handleSave = async () => {
        if (isSaving) return;

        const validationError = validateBirthDate(
            day,
            month,
            year
        );

        if (validationError) {
            setError(validationError);
            return;
        }

        const formattedDay = formatTwoDigits(day);
        const formattedMonth = formatTwoDigits(month);
        const formattedYear = toPersianDigits(
            toEnglishDigits(year)
        );

        const newBirthDate =
            `${formattedDay}/${formattedMonth}/${formattedYear}`;

        setIsSaving(true);

        try {
            await onSave?.(newBirthDate);
            onOpenChange?.(false);
        } catch (saveError) {
            setError(
                saveError instanceof Error
                    ? saveError.message
                    : 'ذخیره تاریخ تولد با خطا مواجه شد.'
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleOpenChange = (nextOpen) => {
        if (!isSaving) {
            onOpenChange?.(nextOpen);
        }
    };

    const renderDateField = ({
        id,
        label,
        value,
        onChange,
        onBlur,
        placeholder,
        maxLength,
        autoFocus = false,
    }) => (
        <div className="flex min-w-0 flex-col gap-2">
            <label
                htmlFor={id}
                className="text-right text-sm font-medium text-foreground"
            >
                {label}
            </label>

            <Input
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                inputMode="numeric"
                maxLength={maxLength}
                autoFocus={autoFocus}
                dir="ltr"
                className="h-11 text-center"
                disabled={isSaving}
            />
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                dir="rtl"
                className="w-[calc(100%-24px)] max-w-md gap-0 p-6 sm:p-7"
            >
                <DialogHeader className="mb-6 space-y-2 text-right">
                    <DialogTitle className="text-lg font-semibold text-foreground">
                        ویرایش تاریخ تولد
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-6 text-muted-foreground">
                        تاریخ تولد خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-3">
                        {renderDateField({
                            id: 'birth-day',
                            label: 'روز',
                            value: day,
                            onChange: handleNumberChange(setDay, 2),
                            onBlur: () => setDay(formatTwoDigits(day)),
                            placeholder: 'مثلاً ۲۸',
                            maxLength: 2,
                            autoFocus: true,
                        })}

                        {renderDateField({
                            id: 'birth-month',
                            label: 'ماه',
                            value: month,
                            onChange: handleNumberChange(setMonth, 2),
                            onBlur: () => setMonth(formatTwoDigits(month)),
                            placeholder: 'مثلاً ۰۲',
                            maxLength: 2,
                        })}

                        {renderDateField({
                            id: 'birth-year',
                            label: 'سال',
                            value: year,
                            onChange: handleNumberChange(setYear, 4),
                            placeholder: 'مثلاً ۱۳۷۵',
                            maxLength: 4,
                        })}
                    </div>

                    {error && (
                        <div
                            role="alert"
                            className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
                        >
                            {error}
                        </div>
                    )}
                </div>

                <DialogFooter className="mt-7 flex-row gap-3 sm:justify-start">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOpenChange(false)}
                        disabled={isSaving}
                        className="flex-1 p-5"
                    >
                        انصراف
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="text-primary-foreground hover:bg-red-700 bg-red-600 flex-1 p-5"
                    >
                        {isSaving ? 'در حال ذخیره...' : 'ذخیره'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { EditBirthdateDialog };
