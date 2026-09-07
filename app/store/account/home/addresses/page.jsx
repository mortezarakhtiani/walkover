'use client';

import {Button} from '@/store/components/ui/button';
import {MapPin, MapPinPlus} from 'lucide-react';

const AddressesPage = () => {
    return (
        <div className="border rounded-lg">
            <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6">

                {/* آیکون */}
                <div className="flex items-center justify-center size-12 rounded-full bg-primary/[0.06] mb-4">
                    <MapPin className="size-6 text-primary"/>
                </div>

                {/* عنوان */}
                <div className="text-base font-medium text-foreground">
                    هنوز آدرسی ثبت نکرده‌اید
                </div>

                {/* توضیح */}
                <div className="text-sm text-secondary-foreground/70 mt-1">
                    در حال حاضر آدرسی برای نمایش ندارید.
                </div>

                {/* افزودن آدرس */}
                <Button
                    variant="primary"
                    className="mt-5"
                >
                    <MapPinPlus className="size-4"/>
                    افزودن آدرس جدید
                </Button>

            </div>
        </div>
    );
};

export default AddressesPage;