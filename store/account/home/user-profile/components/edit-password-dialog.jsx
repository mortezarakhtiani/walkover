
'use client';

import {useEffect, useState} from 'react';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/store/components/ui/dialog';

import {Input} from '@/store/components/ui/input';
import {Button} from '@/store/components/ui/button';
import {Eye, EyeOff} from 'lucide-react';

import {toast} from 'sonner';

const EditPasswordDialog = ({
                                open,
                                onOpenChange,
                                hasPassword,
                                currentPasswordValue,
                                onSave,
                            }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // نمایش / مخفی کردن هر رمز به صورت جداگانه
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (open) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');

            // هر بار دیالوگ باز می‌شود، رمزها مخفی باشند
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    }, [open]);

    const handleSave = () => {
        if (hasPassword && !currentPassword) {
            setError('لطفاً رمز عبور فعلی را وارد کنید.');
            return;
        }

        if (hasPassword && currentPassword !== currentPasswordValue) {
            setError('رمز عبور فعلی صحیح نیست.');
            return;
        }

        const isValidPassword =
            newPassword.length >= 8 &&
            newPassword.length <= 32 &&
            /[A-Z]/.test(newPassword) &&
            /[a-z]/.test(newPassword) &&
            /[@#$!*&%^]/.test(newPassword) &&
            /[0-9]/.test(newPassword);

        if (!isValidPassword) {
            setError(
                'رمز عبور شما باید بین ۸ تا ۳۲ حرف باشد و شامل حروف بزرگ، کوچک، عدد و علامت باشد.'
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('رمز عبور جدید و تکرار آن یکسان نیستند.');
            return;
        }

        onSave({
            currentPassword,
            newPassword,
        });

        toast.success('رمز عبور شما با موفقیت ثبت شد');

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">

                <DialogHeader>
                    <DialogTitle className="text-right mb-5">
                        {hasPassword ? 'تغییر رمز عبور' : 'تعیین رمز عبور'}
                    </DialogTitle>

                    <div className="text-right text-xs space-y-2">

                        {/* حداقل ۸ کاراکتر */}
                        <div
                            className={`flex items-center gap-2 ${
                                newPassword.length >= 8
                                    ? 'text-green-500'
                                    : 'text-secondary-foreground/70'
                            }`}
                        >
                            <span
                                className={`size-2 rounded-full ${
                                    newPassword.length >= 8
                                        ? 'bg-green-500'
                                        : 'bg-secondary-foreground/40'
                                }`}
                            />
                            <span>حداقل ۸ کاراکتر</span>
                        </div>

                        {/* حداکثر ۳۲ کاراکتر */}
                        <div
                            className={`flex items-center gap-2 ${
                                newPassword.length > 0 && newPassword.length <= 32
                                    ? 'text-green-500'
                                    : 'text-secondary-foreground/70'
                            }`}
                        >
                            <span
                                className={`size-2 rounded-full ${
                                    newPassword.length > 0 && newPassword.length <= 32
                                        ? 'bg-green-500'
                                        : 'bg-secondary-foreground/40'
                                }`}
                            />
                            <span>حداکثر ۳۲ کاراکتر</span>
                        </div>

                        {/* حروف بزرگ و کوچک */}
                        <div
                            className={`flex items-center gap-2 ${
                                /[A-Z]/.test(newPassword) &&
                                /[a-z]/.test(newPassword)
                                    ? 'text-green-500'
                                    : 'text-secondary-foreground/70'
                            }`}
                        >
                            <span
                                className={`size-2 rounded-full ${
                                    /[A-Z]/.test(newPassword) &&
                                    /[a-z]/.test(newPassword)
                                        ? 'bg-green-500'
                                        : 'bg-secondary-foreground/40'
                                }`}
                            />
                            <span>حداقل یک حرف بزرگ و یک حرف کوچک</span>
                        </div>

                        {/* علامت خاص */}
                        <div
                            className={`flex items-center gap-2 ${
                                /[@#$!*&%^]/.test(newPassword)
                                    ? 'text-green-500'
                                    : 'text-secondary-foreground/70'
                            }`}
                        >
                            <span
                                className={`size-2 rounded-full ${
                                    /[@#$!*&%^]/.test(newPassword)
                                        ? 'bg-green-500'
                                        : 'bg-secondary-foreground/40'
                                }`}
                            />
                            <span>حداقل یک علامت از @#$!*&%^</span>
                        </div>

                        {/* عدد */}
                        <div
                            className={`flex items-center gap-2 ${
                                /[0-9]/.test(newPassword)
                                    ? 'text-green-500'
                                    : 'text-secondary-foreground/70'
                            }`}
                        >
                            <span
                                className={`size-2 rounded-full ${
                                    /[0-9]/.test(newPassword)
                                        ? 'bg-green-500'
                                        : 'bg-secondary-foreground/40'
                                }`}
                            />
                            <span>حداقل یک عدد</span>
                        </div>

                    </div>
                </DialogHeader>

                <div className="-mt-2 space-y-4">

                    {/* رمز فعلی */}
                    <div className="relative">
                        <Input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => {
                                setCurrentPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="رمز عبور فعلی"
                            disabled={!hasPassword}
                            className="pe-10"
                        />

                        <button
                            type="button"
                            disabled={!hasPassword}
                            onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label={
                                showCurrentPassword
                                    ? 'مخفی کردن رمز عبور فعلی'
                                    : 'نمایش رمز عبور فعلی'
                            }
                        >
                            {showCurrentPassword ? (
                                <EyeOff size={18}/>
                            ) : (
                                <Eye size={18}/>
                            )}
                        </button>
                    </div>

                    {/* رمز جدید */}
                    <div className="relative">
                        <Input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="رمز عبور جدید"
                            className="pe-10"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowNewPassword(!showNewPassword)
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={
                                showNewPassword
                                    ? 'مخفی کردن رمز عبور جدید'
                                    : 'نمایش رمز عبور جدید'
                            }
                        >
                            {showNewPassword ? (
                                <EyeOff size={18}/>
                            ) : (
                                <Eye size={18}/>
                            )}
                        </button>
                    </div>

                    {/* تکرار رمز جدید */}
                    <div className="relative">
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="تکرار رمز عبور جدید"
                            className="pe-10"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={
                                showConfirmPassword
                                    ? 'مخفی کردن تکرار رمز'
                                    : 'نمایش تکرار رمز'
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18}/>
                            ) : (
                                <Eye size={18}/>
                            )}
                        </button>
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
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

export {EditPasswordDialog};

