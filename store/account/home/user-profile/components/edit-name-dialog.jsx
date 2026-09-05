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

const EditNameDialog = ({open, onOpenChange, value, onSave}) => {
    const [name, setName] = useState(value);

    useEffect(() => {
        if (open) {
            setName(value);
        }
    }, [open, value]);

    const handleSave = () => {
        const trimmedName = name.trim();

        if (!trimmedName) {
            return;
        }

        onSave(trimmedName);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-right mb-5">
                        ویرایش نام
                    </DialogTitle>

                    <DialogDescription className="text-right">
                        نام خود را وارد کنید.
                    </DialogDescription>
                </DialogHeader>

                <div className="-mt-2">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="نام"
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

export {EditNameDialog};