
'use client';

import { useEffect, useState } from 'react';
import { toPersianDigits } from '../../../../../lib/to-persian';

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

const toEnglishDigits = (value = '') => {
    return String(value)
        .replace(/[۰-۹]/g, (digit) =>
            String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
        )
        .replace(/[٠-٩]/g, (digit) =>
            String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
        );
};

const validateNationalId = (value) => {
    const nationalId = toEnglishDigits(value).replace(/\D/g, '');

    if (nationalId.length !== 10) {
        return 'کد ملی باید ۱۰ رقم باشد.';
    }

    if (/^(\d)\1{9}$/.test(nationalId)) {
        return 'کد ملی وارد شده معتبر نیست.';
    }

    const checkDigit = Number(nationalId[9]);

    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += Number(nationalId[i]) * (10 - i);
    }

    const remainder = sum % 11;

    const calculatedCheckDigit =
        remainder < 2 ? remainder : 11 - remainder;

    if (checkDigit !== calculatedCheckDigit) {
        return 'کد ملی وارد شده معتبر نیست.';
    }

    return '';
};

const EditNationalIdDialog = ({
    open,
    onOpenChange,
    value,
    onSave,
}) => {
    const [nationalId, setNationalId] = useState(
        toPersianDigits(value || '')
    );
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            setNationalId(toPersianDigits(value || ''));
            setError('');
        }
    }, [open, value]);

    const handleChange = (event) => {
        const inputValue = event.target.value;

        const persianValue = inputValue
            .replace(/[0-9]/g, (digit) =>
                '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]
            )
            .replace(/[٠-٩]/g, (digit) =>
                '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(digit)]
            );

        const numbersOnly = persianValue
            .replace(/[^\u06F0-\u06F9]/g, '')
            .slice(0, 10);

        setNationalId(numbersOnly);
        setError('');
    };

    const handleSave = () => {
        const englishNationalId = toEnglishDigits(nationalId);

        const validationError = validateNationalId(englishNationalId);

        if (validationError) {
            setError(validationError);
            return;
        }

        onSave?.(englishNationalId);
        onOpenChange?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                dir="rtl"
                className="w-[calc(100%-24px)] max-w-md gap-0 p-6 sm:p-7"
            >
                <DialogHeader className="mb-6 space-y-2 text-right">
                    <DialogTitle className="text-lg font-semibold text-foreground">
                        ویرایش کد ملی
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-6 text-muted-foreground">
                        کد ملی خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="edit-national-id"
                        className="text-sm font-medium text-foreground"
                    >
                        کد ملی
                    </label>

                    <Input
                        id="edit-national-id"
                        value={nationalId}
                        onChange={handleChange}
                        placeholder="کد ملی"
                        inputMode="numeric"
                        maxLength={10}
                        autoFocus
                        dir="ltr"
                        className="h-11 text-center"
                    />

                    {error && (
                        <div
                            role="alert"
                            className="mt-1 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
                        >
                            {error}
                        </div>
                    )}
                </div>

                <DialogFooter className="mt-7 flex-row gap-3 sm:justify-start">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 p-5"
                    >
                        انصراف
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSave}
                        className="flex-1 bg-red-600 px-4 text-primary-foreground hover:bg-red-700"
                    >
                        ذخیره
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { EditNationalIdDialog };
