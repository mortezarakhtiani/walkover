
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

import { Input } from '@/store/components/ui/input';
import { Button } from '@/store/components/ui/button';

const EditLastnameDialog = ({
    open,
    onOpenChange,
    value,
    onSave,
}) => {
    const [lastName, setLastName] = useState(value || '');

    useEffect(() => {
        if (open) {
            setLastName(value || '');
        }
    }, [open, value]);

    const trimmedLastName = lastName.trim();

    const handleSave = () => {
        if (!trimmedLastName) return;

        onSave?.(trimmedLastName);
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
                        ویرایش نام خانوادگی
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-6 text-muted-foreground">
                        نام خانوادگی خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="edit-lastname"
                        className="text-sm font-medium text-foreground"
                    >
                        نام خانوادگی
                    </label>

                    <Input
                        id="edit-lastname"
                        value={lastName}
                        onChange={(event) =>
                            setLastName(event.target.value)
                        }
                        placeholder="نام خانوادگی"
                        autoFocus
                        className="h-11"
                    />
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
                        disabled={!trimmedLastName}
                        className="flex-1 bg-red-600 px-4 text-primary-foreground hover:bg-red-700"
                    >
                        ذخیره
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { EditLastnameDialog };
