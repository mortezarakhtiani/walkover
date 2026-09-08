'use client';

import {useEffect, useRef, useState} from 'react';

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

    const codeInputRefs = useRef([]);

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

    const normalizeDigit = (value) => {
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

    const enteredCode = code.join('');

    const canSendCode =
        !isSamePhone && isValidPhone;

    const canVerifyCode =
        enteredCode.length === 6;

    // ارسال کد تأیید
    const handleSendCode = () => {
        if (!isValidPhone) {
            setError('لطفاً یک شماره موبایل معتبر وارد کنید.');
            return;
        }

        if (isSamePhone) {
            setError('شماره موبایل جدید با شماره فعلی یکسان است.');
            return;
        }

        setError('');
        setCodeSent(true);
        setCode(['', '', '', '', '', '']);

        // کد آزمایشی
        console.log('Verification code: 123456');

        setTimeout(() => {
            codeInputRefs.current[0]?.focus();
        }, 100);
    };

    // تغییر هر خانه کد
    const handleCodeChange = (index, value) => {
        const normalized = normalizeDigit(value);

        if (!normalized) {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);
            return;
        }

        const digits = normalized.slice(0, 6).split('');

        const newCode = [...code];

        digits.forEach((digit, offset) => {
            if (index + offset < 6) {
                newCode[index + offset] = digit;
            }
        });

        setCode(newCode);
        setError('');

        const nextIndex = Math.min(
            index + digits.length,
            5
        );

        setTimeout(() => {
            codeInputRefs.current[nextIndex]?.focus();
        }, 0);
    };

    // مدیریت Backspace
    const handleCodeKeyDown = (index, event) => {
        if (event.key === 'Backspace') {
            if (code[index]) {
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
                return;
            }

            if (index > 0) {
                const newCode = [...code];
                newCode[index - 1] = '';

                setCode(newCode);

                setTimeout(() => {
                    codeInputRefs.current[index - 1]?.focus();
                }, 0);
            }
        }

        if (event.key === 'ArrowLeft' && index > 0) {
            codeInputRefs.current[index - 1]?.focus();
        }

        if (event.key === 'ArrowRight' && index < 5) {
            codeInputRefs.current[index + 1]?.focus();
        }
    };

    // Paste کردن کل کد
    const handleCodePaste = (event) => {
        event.preventDefault();

        const pastedText = event.clipboardData.getData('text');
        const normalized = normalizeDigit(pastedText);

        if (!normalized) {
            return;
        }

        const digits = normalized.slice(0, 6).split('');

        const newCode = ['', '', '', '', '', ''];

        digits.forEach((digit, index) => {
            newCode[index] = digit;
        });

        setCode(newCode);
        setError('');

        const focusIndex = Math.min(digits.length, 5);

        setTimeout(() => {
            codeInputRefs.current[focusIndex]?.focus();
        }, 0);
    };

    // تأیید کد
    const handleVerifyCode = () => {
        if (enteredCode !== '123456') {
            setError('کد تأیید صحیح نیست.');
            return;
        }

        setError('');

        onSave(normalizedPhone);
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

                <div className="-mt-2 space-y-4">

                    {/* شماره موبایل */}
                    <Input
                        dir="rtl"
                        inputMode="numeric"
                        maxLength={11}
                        disabled={codeSent}
                        value={toPersianDigits(phone)}
                        onChange={(e) => {
                            const value = e.target.value;
                            const normalized = normalizePhone(value);

                            setPhone(normalized.slice(0, 11));
                            setError('');
                        }}
                        placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                        autoFocus
                    />

                    {/* کد تأیید */}
                    {codeSent && (
                        <div className="space-y-2">

                            <div
                                dir="ltr"
                                className="flex justify-center gap-2"
                            >
                                {code.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={(element) => {
                                            codeInputRefs.current[index] =
                                                element;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={toPersianDigits(digit)}
                                        onChange={(e) =>
                                            handleCodeChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleCodeKeyDown(
                                                index,
                                                e
                                            )
                                        }
                                        onPaste={handleCodePaste}
                                        className="h-11 w-11 p-0 text-center text-lg"
                                    />
                                ))}
                            </div>

                            <p className="text-xs text-muted-foreground text-center">
                                کد ۶ رقمی ارسال‌شده را وارد کنید.
                            </p>

                        </div>
                    )}

                    {/* خطا */}
                    {error && (
                        <p className="text-xs text-destructive text-right">
                            {error}
                        </p>
                    )}

                </div>

                <DialogFooter className="mt-5">
                    {!codeSent ? (
                        <Button
                            type="button"
                            onClick={handleSendCode}
                            disabled={!canSendCode}
                            className="w-full"
                        >
                            ارسال کد تأیید
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={handleVerifyCode}
                            disabled={!canVerifyCode}
                            className="w-full"
                        >
                            تأیید کد
                        </Button>
                    )}
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};

export {EditPhoneDialog};