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

const EditLastnameDialog = ({open, onOpenChange, value, onSave}) => {
    const [lastName, setLastName] = useState(value);

    useEffect(() => {
        if (open) {
            setLastName(value);
        }
    }, [open, value]);

    const handleSave = () => {
        const trimmedLastName = lastName.trim();

        if (!trimmedLastName) {
            return;
        }

        onSave(trimmedLastName);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">

                <DialogHeader>
                    <DialogTitle className="text-right mb-5">
                        ویرایش نام خانوادگی
                    </DialogTitle>

                    <DialogDescription className="text-right">
                        نام خانوادگی خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="-mt-2">
                    <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="نام خانوادگی"
                        autoFocus
                    />
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

export {EditLastnameDialog};