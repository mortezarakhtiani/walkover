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

import {Button} from '@/store/components/ui/button';


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
        onSave(gender);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">

                <DialogHeader>
                    <DialogTitle className="text-right mb-5">
                        ویرایش جنسیت
                    </DialogTitle>

                    <DialogDescription className="text-right">
                        جنسیت خود را انتخاب کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="-mt-2 grid grid-cols-2 gap-3">

                    {/* مرد */}
                    <button
                        type="button"
                        onClick={() => setGender('مرد')}
                        className={`w-full flex items-center justify-between rounded-lg border p-4 transition-colors ${
                            gender === 'مرد'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:bg-accent'
                        }`}
                    >
                        <span className="flex items-center gap-3">
                            {/* آیکون مرد */}
                            <div className="flex size-8 items-center justify-center">
                                {/* آیکون را اینجا قرار بده */}

                            </div>

                            <span className="text-sm text-foreground">
                                مرد
                            </span>
                        </span>

                        <span
                            className={`flex size-4 items-center justify-center rounded-full border ${
                                gender === 'مرد'
                                    ? 'border-primary'
                                    : 'border-muted-foreground'
                            }`}
                        >
                            {gender === 'مرد' && (
                                <span className="size-2 rounded-full bg-primary"/>
                            )}
                        </span>
                    </button>

                    {/* زن */}
                    <button
                        type="button"
                        onClick={() => setGender('زن')}
                        className={`w-full flex items-center justify-between rounded-lg border p-4 transition-colors ${
                            gender === 'زن'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:bg-accent'
                        }`}
                    >
                        <span className="flex items-center gap-3">
                            {/* آیکون زن */}
                            <div className="flex size-8 items-center justify-center">
                                {/* آیکون را اینجا قرار بده */}
                            </div>

                            <span className="text-sm text-foreground">
                                زن
                            </span>
                        </span>

                        <span
                            className={`flex size-4 items-center justify-center rounded-full border ${
                                gender === 'زن'
                                    ? 'border-primary'
                                    : 'border-muted-foreground'
                            }`}
                        >
                            {gender === 'زن' && (
                                <span className="size-2 rounded-full bg-primary"/>
                            )}
                        </span>
                    </button>

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

export {EditGenderDialog};