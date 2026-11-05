
'use client';

import { useEffect, useRef, useState } from 'react';

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

export function EditEmailDialog({
    open,
    onOpenChange,
    value = '',
    onSave,
}) {
    const [email, setEmail] = useState(value);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [codeSent, setCodeSent] = useState(false);
    const [error, setError] = useState('');

    const codeInputRefs = useRef([]);

    useEffect(() => {
        if (open) {
            setEmail(value || '');
            setCode(['', '', '', '', '', '']);
            setCodeSent(false);
            setError('');
        }
    }, [open, value]);

    const normalizeDigit = (input = '') => {
        return String(input)
            .replace(/[۰-۹]/g, (digit) =>
                String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
            )
            .replace(/[٠-٩]/g, (digit) =>
                String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
            )
            .replace(/\D/g, '');
    };

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCurrentEmail = (value || '').trim().toLowerCase();

    const isSameEmail = normalizedEmail === normalizedCurrentEmail;

    const isValidEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    const enteredCode = code.join('');

    const canSendCode = !isSameEmail && isValidEmail;
    const canVerifyCode = enteredCode.length === 6;

    const handleSendCode = () => {
        if (!isValidEmail) {
            setError('لطفاً یک ایمیل معتبر وارد کنید.');
            return;
        }

        if (isSameEmail) {
            setError('ایمیل جدید با ایمیل فعلی یکسان است.');
            return;
        }

        setError('');
        setCodeSent(true);
        setCode(['', '', '', '', '', '']);

        // کد آزمایشی؛ در نسخه واقعی باید کد از سرور ارسال شود.
        console.log('Verification code: 123456');

        setTimeout(() => {
            codeInputRefs.current[0]?.focus();
        }, 100);
    };

    const handleCodeChange = (index, inputValue) => {
        const normalized = normalizeDigit(inputValue);

        if (!normalized) {
            const newCode = [...code];
            newCode[index] = '';
            setCode(newCode);
            setError('');
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

        const nextIndex = Math.min(index + digits.length, 5);

        setTimeout(() => {
            codeInputRefs.current[nextIndex]?.focus();
        }, 0);
    };

    const handleCodeKeyDown = (index, event) => {
        if (event.key === 'Backspace') {
            if (code[index]) {
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
                setError('');
                return;
            }

            if (index > 0) {
                const newCode = [...code];
                newCode[index - 1] = '';

                setCode(newCode);
                setError('');

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

    const handleCodePaste = (event) => {
        event.preventDefault();

        const pastedText = event.clipboardData.getData('text');
        const normalized = normalizeDigit(pastedText);

        if (!normalized) return;

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

    const handleVerifyCode = () => {
        if (enteredCode !== '123456') {
            setError('کد تأیید صحیح نیست.');
            return;
        }

        setError('');

        onSave?.(normalizedEmail);
        onOpenChange?.(false);
    };

    const handleOpenChange = (nextOpen) => {
        onOpenChange?.(nextOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                dir="rtl"
                className="w-[calc(100%-24px)] max-w-md gap-0 p-6 sm:p-7"
            >
                <DialogHeader className="mb-6 space-y-2 text-right">
                    <DialogTitle className="text-lg font-semibold text-foreground">
                        ویرایش ایمیل
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-6 text-muted-foreground">
                        ایمیل جدید خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-5">
                    {/* ایمیل */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="edit-email"
                            className="text-sm font-medium text-foreground"
                        >
                            آدرس ایمیل
                        </label>

                        <Input
                            id="edit-email"
                            type="email"
                            dir="ltr"
                            value={email}
                            disabled={codeSent}
                            onChange={(event) => {
                                const inputValue = event.target.value;

                                const filteredValue = inputValue
                                    .replace(/[\u0600-\u06FF\u0750-\u077F]/g, '')
                                    .replace(/\s/g, '');

                                setEmail(filteredValue);
                                setError('');
                            }}
                            placeholder="example@gmail.com"
                            autoFocus
                            className="h-11 text-left"
                        />
                    </div>

                    {/* کد تأیید */}
                    {codeSent && (
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-foreground">
                                کد تأیید
                            </label>

                            <div
                                dir="ltr"
                                className="flex justify-center gap-2"
                            >
                                {code.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={(element) => {
                                            codeInputRefs.current[index] = element;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete={
                                            index === 0 ? 'one-time-code' : 'off'
                                        }
                                        maxLength={6}
                                        value={toPersianDigits(digit)}
                                        onChange={(event) =>
                                            handleCodeChange(
                                                index,
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={(event) =>
                                            handleCodeKeyDown(index, event)
                                        }
                                        onPaste={handleCodePaste}
                                        className="h-11 w-11 p-0 text-center text-base"
                                    />
                                ))}
                            </div>

                            <p className="text-center text-xs leading-5 text-muted-foreground">
                                کد ۶ رقمی ارسال‌شده را وارد کنید.
                            </p>
                        </div>
                    )}

                    {/* خطا */}
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


                    {!codeSent ? (
                        <Button
                            type="button"
                            onClick={handleSendCode}
                            disabled={!canSendCode}
                            className="flex-1 bg-red-600 px-4 text-primary-foreground hover:bg-red-700"
                        >
                            ارسال کد تأیید
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={handleVerifyCode}
                            disabled={!canVerifyCode}
                            className="flex-1 bg-red-600 px-4 text-primary-foreground hover:bg-red-700"
                        >
                            تأیید کد
                        </Button>
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOpenChange(false)}
                        className="flex-1 p-5"
                    >
                        انصراف
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
