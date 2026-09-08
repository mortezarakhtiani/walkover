'use client';

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
import {EditPasswordDialog} from './edit-password-dialog';
import {EditPhoneDialog} from './edit-phone-dialog';
import {EditEmailDialog} from './edit-email-dialog';

import {PhoneIcon} from '@/store/components/icons/phone-icon';
import {EditIcon} from '@/store/components/icons/edit-icon';
import {UserRound} from 'lucide-react';

const persianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
];

const formatBirthDate = (date) => {
    if (!date) return '';

    const parts = date.split('/');

    if (parts.length !== 3) {
        return date;
    }

    const [day, month, year] = parts;

    const monthNumber = Number(
        month.replace(
            /[۰-۹]/g,
            (digit) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)
        )
    );

    if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
        return date;
    }

    return `${day} ${persianMonths[monthNumber - 1]} ${year}`;
};

const PersonalInfo = () => {
    const [name, setName] = useState('رضا');
    const [editNameOpen, setEditNameOpen] = useState(false);
    const [lastName, setLastName] = useState('حسن زاده');
    const [editLastNameOpen, setEditLastNameOpen] = useState(false);
    const [nationalId, setNationalId] = useState('0670738921');
    const [editNationalIdOpen, setEditNationalIdOpen] = useState(false);
    const [birthDate, setBirthDate] = useState('۲۸/۰۲/۱۳۷۵');
    const [editBirthDateOpen, setEditBirthDateOpen] = useState(false);
    const [gender, setGender] = useState('مرد');
    const [editGenderOpen, setEditGenderOpen] = useState(false);
    const [editPasswordOpen, setEditPasswordOpen] = useState(false);
    const [hasPassword, setHasPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('09121234567');
    const [phoneVerified, setPhoneVerified] = useState(true);
    const [editPhoneOpen, setEditPhoneOpen] = useState(false);
    const [email, setEmail] = useState('reza@example.com');
    const [emailVerified, setEmailVerified] = useState(true);
    const [editEmailOpen, setEditEmailOpen] = useState(false);

    return (
        <Card className="min-w-full" dir="rtl">

            <CardContent className="space-y-0">

                <CardHeader className="border-0">
                    <CardTitle className="flex items-center gap-2 text-right text-lg">
                        <UserRound size={22}/>
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
                                    نام<span className="text-red-500">*</span>
                                </div>

                                <div className="text-base text-foreground">
                                {name}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                className="hover:bg-white/10"
                                onClick={() => setEditNameOpen(true)}
                            >
                                <EditIcon className="size-4 text-foreground"/>
                            </Button>
                        </div>

                        {/* نام خانوادگی */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    نام خانوادگی<span className="text-red-500">*</span>
                                </div>

                                <div className="text-base text-foreground">
                                    {lastName}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                className="hover:bg-white/10"
                                onClick={() => setEditLastNameOpen(true)}
                            >
                                <EditIcon className="size-4 text-foreground"/>
                            </Button>
                        </div>

                        {/* کد ملی */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b md:border-e">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    کدملی<span className="text-red-500">*</span>
                                </div>

                                <div className="text-base text-foreground">
                                    {toPersianDigits(nationalId)}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                className="hover:bg-white/10"
                                onClick={() => setEditNationalIdOpen(true)}
                            >
                                <EditIcon className="size-4 text-foreground"/>
                            </Button>
                        </div>

                        {/* تاریخ تولد */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    تاریخ تولد
                                </div>

                                <div className="text-base text-foreground">
                                    {formatBirthDate(birthDate)}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                className="hover:bg-white/10"
                                onClick={() => setEditBirthDateOpen(true)}
                            >
                                <EditIcon className="size-4 text-foreground"/>
                            </Button>
                        </div>

                        {/* جنسیت */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b md:border-b-0 md:border-e">
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
                                className="hover:bg-white/10"
                                onClick={() => setEditGenderOpen(true)}
                            >
                                <EditIcon className="size-4 text-foreground"/>
                            </Button>
                        </div>

                        {/* رمز عبور */}
                        <div className="flex items-center justify-between gap-4 p-4">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    رمز عبور
                                </div>

                                {hasPassword ? (
                                    <Badge
                                        size="md"
                                        variant="success"
                                        appearance="light"
                                    >
                                        <span
                                            className="size-2 rounded-full bg-[var(--color-success-accent,var(--color-green-800))]"/>
                                        <span
                                            className="size-2 rounded-full bg-[var(--color-success-accent,var(--color-green-800))]"/>
                                        <span
                                            className="size-2 rounded-full bg-[var(--color-success-accent,var(--color-green-800))]"/>
                                        <span
                                            className="size-2 rounded-full bg-[var(--color-success-accent,var(--color-green-800))]"/>
                                    </Badge>
                                ) : (
                                    <Badge
                                        size="md"
                                        variant="destructive"
                                        appearance="light"
                                    >
                                        تعیین نشده
                                    </Badge>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                className="hover:bg-white/10"
                                onClick={() => setEditPasswordOpen(true)}
                            >
                                <EditIcon className="size-4 text-foreground"/>
                            </Button>
                        </div>


                    </div>

                </div>

                {/* عنوان اطلاعات تماس */}
                <CardHeader className="border-0 mt-10">
                    <CardTitle className="flex items-center gap-2 text-right text-lg">
                        <PhoneIcon className="size-6 text-foreground"/>
                        اطلاعات تماس
                    </CardTitle>
                </CardHeader>

                {/* اطلاعات تماس */}
                <div className="border rounded-lg">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* شماره موبایل */}
                        <div className="flex items-center justify-between gap-4 p-4 border-b md:border-b-0 md:border-e">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    شماره موبایل<span className="text-red-500">*</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-base text-foreground">
                                        {toPersianDigits(phone)}
                                    </div>

                                    {phoneVerified && (
                                        <Badge
                                            size="md"
                                            variant="success"
                                            appearance="light"
                                        >
                                            تأیید شده
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                onClick={() => setEditPhoneOpen(true)}
                                className="hover:bg-white/10"
                            >
                                <EditIcon className="size-4 text-foreground"/>
                            </Button>
                        </div>

                        {/* ایمیل */}
                        <div className="flex items-center justify-between gap-4 p-4">
                            <div>
                                <div className="text-xs text-secondary-foreground/70 mb-1">
                                    ایمیل
                                </div>

                                <div className="flex items-center gap-3">
                                    <div
                                        className="text-base text-foreground"
                                        dir="ltr"
                                    >
                                        {email}
                                    </div>

                                    {emailVerified && (
                                        <Badge
                                            size="md"
                                            variant="success"
                                            appearance="light"
                                        >
                                            تأیید شده
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                mode="icon"
                                className="hover:bg-white/10"
                                onClick={() => setEditEmailOpen(true)}
                            >
                                <EditIcon className="size-4 text-foreground"/>
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

            <EditPasswordDialog
                open={editPasswordOpen}
                onOpenChange={setEditPasswordOpen}
                hasPassword={hasPassword}
                currentPasswordValue={password}
                onSave={(data) => {
                    console.log('Password change:', data);
                    setPassword(data.newPassword);
                    setHasPassword(true);
                }}
            />

            <EditPhoneDialog
                open={editPhoneOpen}
                onOpenChange={setEditPhoneOpen}
                value={phone}
                onSave={(newPhone) => {
                    setPhone(newPhone);
                    setPhoneVerified(false);
                }}
            />

            <EditEmailDialog
                open={editEmailOpen}
                onOpenChange={setEditEmailOpen}
                value={email}
                onSave={(newEmail) => {
                    setEmail(newEmail);
                    setEmailVerified(true);
                }}
            />

        </Card>
    );
};

export {PersonalInfo};