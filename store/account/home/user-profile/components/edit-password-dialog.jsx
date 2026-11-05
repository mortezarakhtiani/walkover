
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { toast } from 'sonner';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/store/components/ui/dialog';

import { Input } from '@/store/components/ui/input';
import { Button } from '@/store/components/ui/button';

const PASSWORD_REQUIREMENTS = [
    {
        regex: /.{8,}/,
        text: 'حداقل ۸ کاراکتر',
    },
    {
        regex: /[0-9]/,
        text: 'حداقل یک عدد',
    },
    {
        regex: /[a-z]/,
        text: 'حداقل یک حرف کوچک انگلیسی',
    },
    {
        regex: /[A-Z]/,
        text: 'حداقل یک حرف بزرگ انگلیسی',
    },
    {
        regex: /[@#$!*&%^]/,
        text: 'حداقل یک علامت خاص (@ # $ ! * & % ^)',
    },
];

const STRENGTH_LABELS = [
    'رمز عبور را وارد کنید',
    'بسیار ضعیف',
    'ضعیف',
    'متوسط',
    'قوی',
    'بسیار قوی',
];

const STRENGTH_COLORS = [
    '#e5e7eb',
    '#ef4444',
    '#f97316',
    '#eab308',
    '#84cc16',
    '#16a34a',
];

export default function EditPasswordDialog({
    open,
    onOpenChange,
    onSave,
    hasPassword = true,
    currentPasswordValue,
}) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const requirements = useMemo(
        () =>
            PASSWORD_REQUIREMENTS.map((requirement) => ({
                ...requirement,
                met: requirement.regex.test(newPassword),
            })),
        [newPassword],
    );

    const strength = useMemo(
        () => requirements.filter((requirement) => requirement.met).length,
        [requirements],
    );

    const passwordsMatch =
        confirmPassword.length > 0 && newPassword === confirmPassword;

    useEffect(() => {
        if (open) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');

            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    }, [open]);

    const handleOpenChange = (nextOpen) => {
        if (!isSaving) {
            onOpenChange?.(nextOpen);
        }
    };

    const renderPasswordField = ({
        id,
        label,
        value,
        onChange,
        showPassword,
        setShowPassword,
        autoComplete,
    }) => (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-foreground"
                >
                    {label}
                </label>

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword((previous) => !previous)
                    }
                    disabled={isSaving}
                    aria-label={
                        showPassword ? 'مخفی کردن رمز عبور' : 'نمایش رمز عبور'
                    }
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                >
                    {showPassword ? (
                        <EyeOff className="size-4" />
                    ) : (
                        <Eye className="size-4" />
                    )}
                </button>
            </div>

            <Input
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={(event) => {
                    onChange(event.target.value);
                    setError('');
                }}
                autoComplete={autoComplete}
                dir="ltr"
                className="h-11 text-left"
                disabled={isSaving}
            />
        </div>
    );

    const handleSave = async (event) => {
        event.preventDefault();

        if (isSaving) return;

        setError('');

        if (hasPassword && !currentPassword.trim()) {
            setError('لطفاً رمز عبور فعلی خود را وارد کنید.');
            return;
        }

        if (
            hasPassword &&
            typeof currentPasswordValue === 'string' &&
            currentPasswordValue.length > 0 &&
            currentPassword !== currentPasswordValue
        ) {
            setError('رمز عبور فعلی صحیح نیست.');
            return;
        }

        if (newPassword.length < 8 || newPassword.length > 32) {
            setError('رمز عبور جدید باید بین ۸ تا ۳۲ کاراکتر باشد.');
            return;
        }

        if (!requirements.every((requirement) => requirement.met)) {
            setError('لطفاً تمام شرایط رمز عبور را رعایت کنید.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('رمز عبور جدید و تکرار آن یکسان نیستند.');
            return;
        }

        if (hasPassword && newPassword === currentPassword) {
            setError('رمز عبور جدید باید با رمز عبور فعلی متفاوت باشد.');
            return;
        }

        setIsSaving(true);

        try {
            await onSave?.({
                currentPassword,
                newPassword,
            });

            toast.success('رمز عبور با موفقیت تغییر کرد.');
            onOpenChange?.(false);
        } catch (saveError) {
            const message =
                saveError instanceof Error
                    ? saveError.message
                    : 'تغییر رمز عبور با خطا مواجه شد.';

            setError(message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                dir="rtl"
                className="w-[calc(100%-24px)] max-w-md gap-0 p-6 sm:p-7"
            >
                <DialogHeader className="mb-6 space-y-2 text-right">
                    <DialogTitle className="text-lg font-semibold text-foreground">
                        تغییر رمز عبور
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSave} className="flex flex-col gap-5">
                    {hasPassword &&
                        renderPasswordField({
                            id: 'current-password',
                            label: 'رمز عبور فعلی',
                            value: currentPassword,
                            onChange: setCurrentPassword,
                            showPassword: showCurrentPassword,
                            setShowPassword: setShowCurrentPassword,
                            autoComplete: 'current-password',
                        })}

                    {renderPasswordField({
                        id: 'new-password',
                        label: 'رمز عبور جدید',
                        value: newPassword,
                        onChange: setNewPassword,
                        showPassword: showNewPassword,
                        setShowPassword: setShowNewPassword,
                        autoComplete: 'new-password',
                    })}

                    <div className="rounded-md border border-border bg-muted/40 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <span className="text-sm text-muted-foreground">
                                قدرت رمز عبور
                            </span>

                            <span
                                className={
                                    newPassword
                                        ? 'text-sm font-semibold'
                                        : 'text-sm font-medium text-muted-foreground'
                                }
                                style={
                                    newPassword
                                        ? {
                                              color: STRENGTH_COLORS[strength],
                                          }
                                        : undefined
                                }
                            >
                                {STRENGTH_LABELS[
                                    newPassword ? strength : 0
                                ]}
                            </span>
                        </div>

                        <div
                            className="flex gap-1.5"
                            role="progressbar"
                            aria-label="قدرت رمز عبور"
                            aria-valuemin={0}
                            aria-valuemax={5}
                            aria-valuenow={newPassword ? strength : 0}
                        >
                            {Array.from({ length: 5 }).map((_, index) => {
                                const isActive =
                                    Boolean(newPassword) && index < strength;

                                return (
                                    <div
                                        key={index}
                                        className="h-1.5 flex-1 rounded-full bg-border"
                                        style={
                                            isActive
                                                ? {
                                                      backgroundColor:
                                                          STRENGTH_COLORS[
                                                              strength
                                                          ],
                                                  }
                                                : undefined
                                        }
                                    />
                                );
                            })}
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            {requirements.map((requirement) => (
                                <div
                                    key={requirement.text}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    {requirement.met ? (
                                        <Check className="size-4 shrink-0 text-foreground" />
                                    ) : (
                                        <X className="size-4 shrink-0 text-muted-foreground" />
                                    )}

                                    <span
                                        className={
                                            requirement.met
                                                ? 'text-foreground'
                                                : 'text-muted-foreground'
                                        }
                                    >
                                        {requirement.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {renderPasswordField({
                        id: 'confirm-password',
                        label: 'تکرار رمز عبور جدید',
                        value: confirmPassword,
                        onChange: setConfirmPassword,
                        showPassword: showConfirmPassword,
                        setShowPassword: setShowConfirmPassword,
                        autoComplete: 'new-password',
                    })}

                    {confirmPassword.length > 0 && (
                        <div
                            className={`flex items-center gap-2 text-sm ${
                                passwordsMatch
                                    ? 'text-primary'
                                    : 'text-destructive'
                            }`}
                        >
                            {passwordsMatch ? (
                                <Check className="size-4 shrink-0" />
                            ) : (
                                <X className="size-4 shrink-0" />
                            )}

                            <span>
                                {passwordsMatch
                                    ? 'رمزهای عبور یکسان هستند.'
                                    : 'رمزهای عبور یکسان نیستند.'}
                            </span>
                        </div>
                    )}

                    {error && (
                        <div
                            role="alert"
                            className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
                        >
                            {error}
                        </div>
                    )}

                    <DialogFooter className="mt-2 flex-row gap-3 sm:justify-start">


                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 bg-red-600 px-4 text-primary-foreground hover:bg-red-700"
                        >
                            {isSaving
                                ? 'در حال ذخیره...'
                                : 'ذخیره رمز عبور'}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={isSaving}
                            className="flex-1 p-5"
                        >
                            انصراف
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
