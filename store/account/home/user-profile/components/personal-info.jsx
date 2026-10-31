'use client';

import {useRef, useState} from 'react';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/store/components/ui/card';

import {toPersianDigits} from '../../../../../lib/to-persian';

import {EditNameDialog} from './edit-name-dialog';
import {EditLastnameDialog} from './edit-lastname-dialog';
import {EditNationalIdDialog} from './edit-national-id-dialog';
import {EditBirthdateDialog} from './edit-birthdate-dialog';
import {EditGenderDialog} from './edit-gender-dialog';
import EditPasswordDialog from './edit-password-dialog';
import {EditPhoneDialog} from './edit-phone-dialog';
import {EditEmailDialog} from './edit-email-dialog';

import {PhoneIcon} from '@/store/components/icons/phone-icon';
import {EditIcon} from '@/store/components/icons/edit-icon';

import {
    UserRound,
    Camera,
    Trash2,
    ShieldCheck,
    Mail,
    Phone,
    CalendarDays,
    BadgeCheck,
    VenusAndMars,
    LockKeyhole,
    CheckCircle2,
    Upload,
} from 'lucide-react';

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
    const fileInputRef = useRef(null);

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

    const [avatar, setAvatar] = useState(null);

    /* =====================================================
       Avatar
    ===================================================== */

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('حجم تصویر نباید بیشتر از ۲ مگابایت باشد.');
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setAvatar(imageUrl);
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    /* =====================================================
       Reusable Information Row
    ===================================================== */

    const InfoRow = ({
                         title,
                         value,
                         required = false,
                         verified = false,
                         onEdit,
                         last = false,
                     }) => {
        return (
            <div
                className={`
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-4
                    py-4
                    sm:px-5
                    ${
                    !last
                        ? 'border-b border-border/60'
                        : ''
                }
                    transition-colors
                    hover:bg-muted/[0.35]
                `}
            >
                <div className="flex min-w-0 items-center gap-3">

                    <div className="min-w-0">

                        <div
                            className="
                                mb-1
                                flex
                                items-center
                                gap-1
                                text-xs
                                text-muted-foreground
                            "
                        >
                            <span>{title}</span>

                            {required && (
                                <span className="text-destructive">
                                    *
                                </span>
                            )}
                        </div>

                        <div
                            className="
                                truncate
                                text-sm
                                font-semibold
                                text-foreground
                            "
                        >
                            {value}
                        </div>

                        {verified && (
                            <div
                                className="
                                    mt-1
                                    flex
                                    items-center
                                    gap-1
                                    text-[11px]
                                    font-medium
                                    text-emerald-600
                                    dark:text-emerald-400
                                "
                            >
                                <CheckCircle2 className="size-3.5"/>
                                تأیید شده
                            </div>
                        )}
                    </div>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    mode="icon"
                    onClick={onEdit}
                    className="
                        size-8
                        shrink-0
                        rounded-md
                        text-muted-foreground
                        opacity-50
                        transition-all
                        hover:bg-primary/10
                        hover:text-primary
                        group-hover:opacity-100
                    "
                    aria-label={`ویرایش ${title}`}
                >
                    <EditIcon className="size-4"/>
                </Button>
            </div>
        );
    };

    return (
        <div
            dir="rtl"
            className="w-full space-y-5"
        >

            {/* =====================================================
                PROFILE HEADER
            ===================================================== */}

            <Card
                className="
                    relative
                    overflow-hidden
                    border-border/70
                    shadow-sm
                "
            >
                {/* Background */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-l
                        from-primary/[0.08]
                        via-transparent
                        to-transparent
                    "
                />

                <CardContent
                    className="
                        relative
                        p-5
                        sm:p-7
                        md:p-8
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-6
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        {/* Avatar + User */}

                        <div
                            className="
                                flex
                                items-center
                                gap-5
                            "
                        >

                            {/* Avatar */}

                            <div className="relative shrink-0">

                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="
                                        group
                                        relative
                                        size-24
                                        overflow-hidden
                                        rounded-md
                                        border-4
                                        border-background
                                        bg-muted
                                        shadow-lg
                                        ring-1
                                        ring-border
                                        transition-all
                                        hover:ring-primary/40
                                        sm:size-28
                                        md:size-32
                                    "
                                    aria-label="تغییر تصویر پروفایل"
                                >

                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            alt="تصویر پروفایل"
                                            className="
                                                size-full
                                                object-cover
                                                transition-transform
                                                duration-500
                                                group-hover:scale-105
                                            "
                                        />
                                    ) : (
                                        <div
                                            className="
                                                flex
                                                size-full
                                                items-center
                                                justify-center
                                                bg-gradient-to-br
                                                from-primary/20
                                                via-primary/10
                                                to-muted
                                                text-primary
                                            "
                                        >
                                            <UserRound
                                                className="size-14"
                                                strokeWidth={1.3}
                                            />
                                        </div>
                                    )}

                                    {/* Hover */}

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            flex
                                            items-center
                                            justify-center
                                            bg-black/50
                                            opacity-0
                                            transition-opacity
                                            group-hover:opacity-100
                                        "
                                    >
                                        <Camera
                                            className="size-7 text-white"
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                </button>

                                {/* Camera */}



                            </div>

                            {/* User information */}

                            <div className="min-w-0">

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-2
                                    "
                                >
                                    <h1
                                        className="
                                            text-xl
                                            font-bold
                                            tracking-tight
                                            text-foreground
                                            sm:text-2xl
                                        "
                                    >
                                        {name} {lastName}
                                    </h1>

                                    <Badge
                                        size="sm"
                                        variant="success"
                                        appearance="light"
                                        className="gap-1"
                                    >
                                        <CheckCircle2 className="size-3"/>
                                        فعال
                                    </Badge>
                                </div>


                                <div
                                    className="
                                        mt-3
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-x-4
                                        gap-y-2
                                        text-xs
                                        text-muted-foreground
                                    "
                                >
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="size-3.5"/>
                                        {toPersianDigits(phone)}
                                    </span>

                                    <span className="hidden h-3 w-px bg-border sm:block"/>

                                    <span
                                        className="flex items-center gap-1.5"
                                        dir="ltr"
                                    >
                                        <Mail className="size-3.5"/>
                                        {email}
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Upload controls */}

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                sm:self-start
                            "
                        >

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                className="gap-2"
                            >
                                <Upload className="size-4"/>
                                تغییر تصویر
                            </Button>

                            {avatar && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemoveAvatar}
                                    className="
                                        gap-2
                                        text-destructive
                                        hover:bg-destructive/10
                                        hover:text-destructive
                                    "
                                >
                                    <Trash2 className="size-4"/>
                                    حذف
                                </Button>
                            )}

                        </div>

                    </div>

                </CardContent>
            </Card>

            {/* =====================================================
                PERSONAL INFORMATION
            ===================================================== */}

            <Card
                className="
                    overflow-hidden
                    border-border/70
                    shadow-sm
                "
            >

                <CardHeader
                    className="
                        border-b
                        border-border/60
                        px-5
                        py-5
                        sm:px-6
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex size-10
                                items-center justify-center
                                rounded-md
                                text-primary
                            "
                        >
                            <UserRound
                                className="size-5"
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>

                            <CardTitle className="text-base">
                                اطلاعات شخصی
                            </CardTitle>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                اطلاعات هویتی حساب خود را مدیریت کنید
                            </p>

                        </div>

                    </div>

                </CardHeader>

                <CardContent className="p-0">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        <div className="md:border-e">
                            <InfoRow
                                title="نام"
                                value={name}
                                required
                                onEdit={() =>
                                    setEditNameOpen(true)
                                }
                            />

                            <InfoRow
                                title="کد ملی"
                                value={toPersianDigits(nationalId)}
                                required
                                onEdit={() =>
                                    setEditNationalIdOpen(true)
                                }
                            />

                            <InfoRow
                                title="جنسیت"
                                value={gender}
                                onEdit={() =>
                                    setEditGenderOpen(true)
                                }
                                last
                            />
                        </div>

                        <div>

                            <InfoRow
                                title="نام خانوادگی"
                                value={lastName}
                                required
                                onEdit={() => setEditLastNameOpen(true)}
                            />

                            <InfoRow
                                title="تاریخ تولد"
                                value={formatBirthDate(birthDate)}
                                onEdit={() => setEditBirthDateOpen(true)}/>


                            <InfoRow
                                title="رمز عبور"
                                value={
                                    hasPassword
                                        ? '••••••••'
                                        : 'تعیین نشده'
                                }
                                onEdit={() =>
                                    setEditPasswordOpen(true)
                                }
                                last
                            />

                        </div>

                    </div>

                </CardContent>

            </Card>

            {/* =====================================================
                CONTACT INFORMATION
            ===================================================== */}

            <Card
                className="
                    overflow-hidden
                    border-border/70
                    shadow-sm
                "
            >

                <CardHeader
                    className="
                        border-b
                        border-border/60
                        px-5
                        py-5
                        sm:px-6
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex size-10
                                items-center justify-center
                                rounded-md
                                text-primary
                            "
                        >
                            <PhoneIcon className="size-5"/>
                        </div>

                        <div>

                            <CardTitle className="text-base">
                                اطلاعات تماس
                            </CardTitle>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                شماره موبایل و ایمیل حساب
                            </p>

                        </div>

                    </div>

                </CardHeader>

                <CardContent className="p-0">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        <div className="md:border-e">

                            <InfoRow
                                title="شماره موبایل"
                                value={toPersianDigits(phone)}
                                required
                                verified={phoneVerified}
                                onEdit={() =>
                                    setEditPhoneOpen(true)
                                }
                                last
                            />

                        </div>

                        <div>

                            <InfoRow
                                title="ایمیل"
                                value={email}
                                verified={emailVerified}
                                onEdit={() =>
                                    setEditEmailOpen(true)
                                }
                                last
                            />

                        </div>

                    </div>

                </CardContent>

            </Card>

            {/* =====================================================
                SECURITY
            ===================================================== */}

            <Card
                className="
                mb-8
                    overflow-hidden
                    border-emerald-500/20
                    bg-emerald-500/[0.025]
                    shadow-sm
                "
            >

                <CardContent className="p-5 sm:p-6">

                    <div className="flex items-start gap-4">

                        <div
                            className="
                                flex size-11 shrink-0
                                items-center justify-center
                                rounded-md
                                bg-emerald-500/10
                                text-emerald-600
                                dark:text-emerald-400
                            "
                        >
                            <ShieldCheck className="size-5"/>
                        </div>

                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                                <h3
                                    className="
                                        text-sm
                                        font-semibold
                                    "
                                >
                                    امنیت حساب
                                </h3>

                                <Badge
                                    size="sm"
                                    variant="success"
                                    appearance="light"
                                >
                                    امن
                                </Badge>

                            </div>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    leading-5
                                    text-muted-foreground
                                "
                            >
                                شماره موبایل و ایمیل شما برای افزایش
                                امنیت حساب تأیید شده‌اند.
                            </p>

                        </div>

                    </div>

                </CardContent>

            </Card>

            {/* =====================================================
                DIALOGS
            ===================================================== */}

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


        </div>
    );
};

export {PersonalInfo};

