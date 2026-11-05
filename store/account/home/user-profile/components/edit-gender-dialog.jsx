
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

import { Button } from '@/store/components/ui/button';

const EditGenderDialog = ({
    open,
    onOpenChange,
    value,
    onSave,
}) => {
    const [gender, setGender] = useState(value);

    useEffect(() => {
        if (open) {
            setGender(value);
        }
    }, [open, value]);

    const handleSave = () => {
        onSave?.(gender);
        onOpenChange?.(false);
    };

    const genderOptions = [
        { value: 'مرد', label: 'مرد' },
        { value: 'زن', label: 'زن' },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                dir="rtl"
                className="w-[calc(100%-24px)] max-w-md gap-0 p-6 sm:p-7"
            >
                <DialogHeader className="mb-6 space-y-2 text-right">
                    <DialogTitle className="text-lg font-semibold text-foreground">
                        ویرایش جنسیت
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-6 text-muted-foreground">
                        جنسیت خود را انتخاب کنید.
                    </DialogDescription>
                </DialogHeader>

                <div
                    role="radiogroup"
                    aria-label="انتخاب جنسیت"
                    className="grid grid-cols-2 gap-3"
                >
                    {genderOptions.map((option) => {
                        const isSelected = gender === option.value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                role="radio"
                                aria-checked={isSelected}
                                onClick={() => setGender(option.value)}
                                className={`flex min-h-14 w-full items-center justify-between rounded-md border px-4 py-3 text-sm font-medium transition-colors ${
                                    isSelected
                                        ? 'border-primary bg-primary/5 text-foreground'
                                        : 'border-border bg-background text-foreground hover:bg-muted/40'
                                }`}
                            >
                                <span>{option.label}</span>

                                <span
                                    aria-hidden="true"
                                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                                        isSelected
                                            ? 'border-primary'
                                            : 'border-muted-foreground'
                                    }`}
                                >
                                    {isSelected && (
                                        <span className="size-2 rounded-full bg-primary" />
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <DialogFooter className="mt-7 flex-row gap-3 sm:justify-start">


                    <Button
                        type="button"
                        onClick={handleSave}
                        className="flex-1 bg-red-600 px-4 text-primary-foreground hover:bg-red-700"
                    >
                        ذخیره
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 p-5"
                    >
                        انصراف
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { EditGenderDialog };
