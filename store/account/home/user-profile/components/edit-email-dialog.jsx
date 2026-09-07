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

export function EditEmailDialog({
                                    open,
                                    onOpenChange,
                                    value,
                                    onSave,
                                }) {
    const [email, setEmail] = useState(value);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [codeSent, setCodeSent] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            setEmail(value);
            setCode(['', '', '', '', '', '']);
            setCodeSent(false);
            setError('');
        }
    }, [open, value]);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCurrentEmail = value.trim().toLowerCase();

    const isSameEmail =
        normalizedEmail === normalizedCurrentEmail;

    const isValidEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    const canSendCode =
        !isSameEmail && isValidEmail;

    const handleSendCode = () => {
        if (!isValidEmail) {
            setError('لطفاً یک ایمیل معتبر وارد کنید.');
            return;
        }

        if (isSameEmail) {
            return;
        }

        setError('');
        setCodeSent(true);

        // فعلاً کد ثابت است
        console.log('Verification code: 123456');
    };

    const handleVerifyCode = () => {
        const enteredCode = code.join('');

        if (enteredCode !== '123456') {
            setError('کد تأیید صحیح نیست.');
            return;
        }

        setError('');

        onSave(normalizedEmail);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">

                <DialogHeader>
                    <DialogTitle className="text-right mb-5">
                        ویرایش ایمیل
                    </DialogTitle>

                    <DialogDescription className="text-right">
                        ایمیل جدید خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="-mt-2">
                    <Input
                        id="email"
                        type="email"
                        dir="ltr"
                        value={email}
                        disabled={codeSent}
                        onChange={(e) => {
                            const value = e.target.value;

                            const filteredValue = value
                                .replace(/[\u0600-\u06FF\u0750-\u077F]/g, '')
                                .replace(/\s/g, '');

                            setEmail(filteredValue);
                            setError('');
                        }}
                        placeholder="example@gmail.com"
                        autoFocus
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}