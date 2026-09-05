'use client';

import Link from 'next/link';
import {SquarePen} from 'lucide-react';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/store/components/ui/card';

import {toPersianDigits} from '../../../../../lib/to-persian-digits';
import {useState} from "react";
import {EditNameDialog} from './edit-name-dialog';
import {EditLastnameDialog} from './edit-lastname-dialog';
import {EditNationalIdDialog} from './edit-national-id-dialog';
import {EditBirthdateDialog} from './edit-birthdate-dialog';
import {EditGenderDialog} from './edit-gender-dialog';

const PersonalInfo = () => {
    const [name, setName] = useState('رضا');
    const [editNameOpen, setEditNameOpen] = useState(false);
    const [lastName, setLastName] = useState('حسن زاده');
    const [editLastNameOpen, setEditLastNameOpen] = useState(false);
    const [nationalId, setNationalId] = useState('0670738921');
    const [editNationalIdOpen, setEditNationalIdOpen] = useState(false);
    const [birthDate, setBirthDate] = useState('۲۸ اردیبهشت ۱۳۷۵');
    const [editBirthDateOpen, setEditBirthDateOpen] = useState(false);
    const [gender, setGender] = useState('مرد');
    const [editGenderOpen, setEditGenderOpen] = useState(false);
    return (
        <Card className="min-w-full" dir="rtl">

            {/* عنوان اصلی */}


            <CardContent className="space-y-0">

                <CardHeader className="border-0">
                    <CardTitle className="text-right text-lg">
                        مشخصات شخصی
                    </CardTitle>
                </CardHeader>

                {/* مشخصات شخصی */}
                <div className="border rounded-lg">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* نام */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b md:border-e">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    نام
                                </div>

                                <div className="text-base text-foreground">
                                    {name}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                onClick={() => setEditNameOpen(true)}
                            >
                                <SquarePen
                                    size={16}
                                    className="text-blue-500"
                                />
                            </Button>
                        </div>

                        {/* نام خانوادگی */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    نام خانوادگی
                                </div>

                                <div className="text-base text-foreground">
                                    {lastName}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                onClick={() => setEditLastNameOpen(true)}
                            >
                                <SquarePen
                                    size={16}
                                    className="text-blue-500"
                                />
                            </Button>
                        </div>

                        {/* کد ملی */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b md:border-e">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    کد ملی
                                </div>

                                <div className="text-base text-foreground">
                                    {toPersianDigits(nationalId)}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                onClick={() => setEditNationalIdOpen(true)}
                            >
                                <SquarePen
                                    size={16}
                                    className="text-blue-500"
                                />
                            </Button>
                        </div>

                        {/* تاریخ تولد */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    تاریخ تولد
                                </div>

                                <div className="text-base text-foreground">
                                    {birthDate}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                onClick={() => setEditBirthDateOpen(true)}
                            >
                                <SquarePen
                                    size={16}
                                    className="text-blue-500"
                                />
                            </Button>
                        </div>

                        {/* جنسیت */}
                        <div className="flex items-center justify-between gap-4 p-4 md:border-e">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    جنسیت
                                </div>

                                <div className="text-base text-foreground">
                                    {gender}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                onClick={() => setEditGenderOpen(true)}
                            >
                                <SquarePen
                                    size={16}
                                    className="text-blue-500"
                                />
                            </Button>
                        </div>

                        {/* رمز عبور */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    رمز عبور
                                </div>

                                <div className="text-base text-foreground">
                                    *****
                                </div>
                            </div>

                            <Button variant="ghost" mode="icon">
                                <SquarePen
                                    size={16}
                                    className="text-blue-500"
                                />
                            </Button>
                        </div>


                    </div>

                </div>

                {/* عنوان اطلاعات تماس */}
                <CardHeader className="border-0 mt-5">
                    <CardTitle className="text-right text-lg">
                        اطلاعات تماس
                    </CardTitle>
                </CardHeader>

                {/* اطلاعات تماس */}
                <div className="border rounded-lg">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* شماره موبایل */}
                        <div className="flex items-center justify-between gap-4 p-4 md:border-e">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    شماره موبایل
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-base text-foreground">
                                        ۰۹۱۲۱۲۳۴۵۶۷
                                    </div>

                                    <Badge
                                        size="md"
                                        variant="success"
                                        appearance="light"
                                    >
                                        تأیید شده
                                    </Badge>
                                </div>
                            </div>

                            <Button variant="ghost" mode="icon">
                                <SquarePen
                                    size={16}
                                    className="text-blue-500"
                                />
                            </Button>
                        </div>

                        {/* ایمیل */}
                        <div className="flex items-center justify-between gap-4 p-4">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    ایمیل
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-base text-foreground">
                                        reza@gmail.com
                                    </div>

                                    <Badge
                                        size="md"
                                        variant="success"
                                        appearance="light"
                                    >
                                        تأیید شده
                                    </Badge>
                                </div>
                            </div>

                            <Button variant="ghost" mode="icon">
                                <SquarePen
                                    size={16}
                                    className="text-blue-500"
                                />
                            </Button>
                        </div>

                    </div>

                </div>

            </CardContent>

            <EditNameDialog
                open={editNameOpen}
                onOpenChange={setEditNameOpen}
                value={name}
                onSave={setName}
            />

            <EditLastnameDialog
                open={editLastNameOpen}
                onOpenChange={setEditLastNameOpen}
                value={lastName}
                onSave={setLastName}
            />

            <EditNationalIdDialog
                open={editNationalIdOpen}
                onOpenChange={setEditNationalIdOpen}
                value={nationalId}
                onSave={setNationalId}
            />

            <EditBirthdateDialog
                open={editBirthDateOpen}
                onOpenChange={setEditBirthDateOpen}
                value={birthDate}
                onSave={setBirthDate}
            />

            <EditGenderDialog
                open={editGenderOpen}
                onOpenChange={setEditGenderOpen}
                value={gender}
                onSave={setGender}
            />

        </Card>
    );
};

export {PersonalInfo};