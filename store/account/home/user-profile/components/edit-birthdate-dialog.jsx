'use client';

import {useEffect, useState} from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/store/components/ui/dialog';

import {Input} from '@/store/components/ui/input';
import {Button} from '@/store/components/ui/button';
import {toPersianDigits} from '../../../../../lib/to-persian-digits';


const formatTwoDigits = (value) => {
    const englishValue = toEnglishDigits(value);

    if (!englishValue) {
        return '';
    }

    return toPersianInput(
        englishValue.padStart(2, '0')
    );
};


const toEnglishDigits = (value) => {
    return value
        .replace(/[۰-۹]/g, (digit) =>
            String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
        )
        .replace(/[٠-٩]/g, (digit) =>
            String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
        );
};


const toPersianInput = (value) => {
    return value.replace(/[0-9]/g, (digit) =>
        '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]
    );
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

    // بررسی ماه
    if (monthNumber < 1 || monthNumber > 12) {
        return 'ماه تولد باید بین ۱ تا ۱۲ باشد.';
    }

    // بررسی روز
    if (dayNumber < 1) {
        return 'روز تولد باید حداقل ۱ باشد.';
    }

    // ماه‌های ۱ تا ۶ → حداکثر ۳۱ روز
    if (monthNumber <= 6 && dayNumber > 31) {
        return 'این ماه حداکثر ۳۱ روز دارد.';
    }

    // ماه‌های ۷ تا ۱۱ → حداکثر ۳۰ روز
    if (monthNumber >= 7 && monthNumber <= 11 && dayNumber > 30) {
        return 'این ماه حداکثر ۳۰ روز دارد.';
    }

    // اسفند
    if (monthNumber === 12) {
        const isLeapYear =
            (yearNumber % 33 === 1) ||
            (yearNumber % 33 === 5) ||
            (yearNumber % 33 === 9) ||
            (yearNumber % 33 === 13) ||
            (yearNumber % 33 === 17) ||
            (yearNumber % 33 === 22) ||
            (yearNumber % 33 === 26) ||
            (yearNumber % 33 === 30);

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

    useEffect(() => {
        if (open) {
            const parts = value?.split('/') || [];

            setDay(parts[0] || '/');
            setMonth(parts[1] || '/');
            setYear(parts[2] || '/');

            setError('');
        }
    }, [open, value]);

    const handleNumberChange = (setter, maxLength) => (e) => {
        const value = toPersianInput(e.target.value)
            .replace(/[^\u06F0-\u06F9]/g, '')
            .slice(0, maxLength);

        setter(value);
        setError('');
    };

    const handleSave = () => {
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

    const newBirthDate = `${formattedDay}/${formattedMonth}/${year}`;

    onSave(newBirthDate);
    onOpenChange(false);
};

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">

                <DialogHeader>
                    <DialogTitle className="text-right mb-5">
                        ویرایش تاریخ تولد
                    </DialogTitle>

                    <DialogDescription className="text-right">
                        تاریخ تولد خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="-mt-2">

                    <div className="grid grid-cols-3 gap-3">

                        {/* روز */}
                        <div>
                            <Input
                                value={day}
                                onChange={handleNumberChange(setDay, 2)}
                                onBlur={() => setDay(formatTwoDigits(day))}
                                placeholder="روز"
                                inputMode="numeric"
                                maxLength={2}
                                autoFocus
                            />
                        </div>

                        {/* ماه */}
                        <div>
                            <Input
                                value={month}
                                onChange={handleNumberChange(setMonth, 2)}
                                onBlur={() => setMonth(formatTwoDigits(month))}
                                placeholder="ماه"
                                inputMode="numeric"
                                maxLength={2}
                            />
                        </div>

                        {/* سال */}
                        <div>
                            <Input
                                value={year}
                                onChange={handleNumberChange(setYear, 4)}
                                placeholder="سال"
                                inputMode="numeric"
                                maxLength={4}
                            />
                        </div>

                    </div>

                    {error && (
                        <div className="text-xs text-destructive mt-2">
                            {error}
                        </div>
                    )}

                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        انصراف
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleSave}
                    >
                        ذخیره
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};

export {EditBirthdateDialog};