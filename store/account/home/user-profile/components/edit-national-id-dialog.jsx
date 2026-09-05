'use client';

import {useEffect, useState} from 'react';
import {toPersianDigits} from '../../../../../lib/to-persian-digits';
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


const toEnglishDigits = (value) => {
    return value
        .replace(/[۰-۹]/g, (digit) =>
            String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
        )
        .replace(/[٠-٩]/g, (digit) =>
            String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
        );
};

const validateNationalId = (value) => {
    const nationalId = value.replace(/\D/g, '');

    // دقیقاً ۱۰ رقم
    if (nationalId.length !== 10) {
        return 'کد ملی باید ۱۰ رقم باشد.';
    }

    // جلوگیری از کدهای کاملاً تکراری
    if (/^(\d)\1{9}$/.test(nationalId)) {
        return 'کد ملی وارد شده معتبر نیست.';
    }

    // الگوریتم استاندارد کد ملی ایران
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
    const [nationalId, setNationalId] = useState(value);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            setNationalId(toPersianDigits(value));
            setError('');
        }
    }, [open, value]);

    const handleChange = (e) => {
        const value = e.target.value;

        // تبدیل اعداد انگلیسی و عربی به فارسی
        const persianValue = value
            .replace(/[0-9]/g, (digit) =>
                '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]
            )
            .replace(/[٠-٩]/g, (digit) =>
                '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(digit)]
            );

        // فقط عدد و حداکثر ۱۰ رقم
        const numbersOnly = persianValue
            .replace(/[^\u06F0-\u06F9]/g, '')
            .slice(0, 10);

        setNationalId(numbersOnly);

        if (error) {
            setError('');
        }
    };

    const handleSave = () => {
        const englishNationalId = nationalId
            .replace(/[۰-۹]/g, (digit) =>
                String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
            );

        const validationError = validateNationalId(englishNationalId);

        if (validationError) {
            setError(validationError);
            return;
        }

        onSave(englishNationalId);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">

                <DialogHeader>
                    <DialogTitle className="text-right mb-5">
                        ویرایش کد ملی
                    </DialogTitle>

                    <DialogDescription className="text-right">
                        کد ملی خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="-mt-2">
                    <Input
                        value={nationalId}
                        onChange={handleChange}
                        placeholder="کد ملی"
                        inputMode="numeric"
                        maxLength={10}
                        autoFocus
                    />

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

export {EditNationalIdDialog};