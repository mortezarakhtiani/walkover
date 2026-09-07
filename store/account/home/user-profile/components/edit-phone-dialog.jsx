'use client';

import {useEffect, useState} from 'react';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/store/components/ui/dialog';

import {Input} from '@/store/components/ui/input';
import {Button} from '@/store/components/ui/button';

import {toPersianDigits} from '../../../../../lib/to-persian-digits';

const EditPhoneDialog = ({
                             open,
                             onOpenChange,
                             value,
                             onSave,
                         }) => {
    const [phone, setPhone] = useState(value);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [codeSent, setCodeSent] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            setPhone(value);
            setCode(['', '', '', '', '', '']);
            setCodeSent(false);
            setError('');
        }
    }, [open, value]);

    const normalizePhone = (value) => {
        return value
            .replace(/[۰-۹]/g, (digit) =>
                '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)
            )
            .replace(/[٠-٩]/g, (digit) =>
                '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)
            )
            .replace(/\D/g, '');
    };

    const normalizedPhone = normalizePhone(phone);
    const normalizedCurrentPhone = normalizePhone(value);

    const isSamePhone =
        normalizedPhone === normalizedCurrentPhone;

    const isValidPhone =
        /^09\d{9}$/.test(normalizedPhone);

    const canSendCode =
        !isSamePhone && isValidPhone;

    // دریافت کد تأیید
    const handleSendCode = () => {
        if (!isValidPhone) {
            setError('لطفاً یک شماره موبایل معتبر وارد کنید.');
            return;
        }

        if (isSamePhone) {
            return;
        }

        setError('');
        setCodeSent(true);

        // کد نمادین
        console.log('Verification code: 123456');
    };

    // تأیید کد
    const handleVerifyCode = () => {
        if (code !== '123456') {
            setError('کد تأیید صحیح نیست.');
            return;
        }

        setError('');

        // ذخیره شماره جدید
        onSave(normalizedPhone);

        // بستن دیالوگ
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">

                <DialogHeader>
                    <DialogTitle className="text-right mb-5">
                        ویرایش شماره موبایل
                    </DialogTitle>

                    <DialogDescription className="text-right">
                        شماره موبایل جدید خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="-mt-2">
                    <Input
                        dir="rtl"
                        inputMode="numeric"
                        maxLength={11}
                        disabled={codeSent}
                        value={toPersianDigits(phone)}
                        onChange={(e) => {
                            const value = e.target.value;

                            const normalized = value
                                .replace(/[۰-۹]/g, (digit) =>
                                    '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)
                                )
                                .replace(/[٠-٩]/g, (digit) =>
                                    '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)
                                );

                            const digitsOnly = normalized.replace(/\D/g, '');

                            setPhone(digitsOnly.slice(0, 11));
                            setError('');
                        }}
                        placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                        autoFocus
                    />
                </div>

            </DialogContent>
        </Dialog>
    );
};

export {EditPhoneDialog};
