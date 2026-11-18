import * as z from 'zod';

import {ALIAS_MAX, BODY_MAX, BODY_MIN, EXPERIENCE_CATEGORIES, TITLE_MAX, TITLE_MIN} from './constants';
import {formatCount} from './format';

// Refinements deliberately avoid type-guard predicates so the form's input and output types stay
// identical (required by the shared `FormField` wrapper in components/ui/form.tsx).
export const experienceFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'عنوان تجربه رو بنویس.')
        .min(TITLE_MIN, `عنوان باید حداقل ${formatCount(TITLE_MIN)} کاراکتر باشه.`)
        .max(TITLE_MAX, `عنوان نباید بیشتر از ${formatCount(TITLE_MAX)} کاراکتر باشه.`),
    body: z
        .string()
        .trim()
        .min(1, 'متن تجربه رو بنویس یا یه فایل متنی بارگذاری کن.')
        .min(BODY_MIN, `متن تجربه خیلی کوتاهه؛ حداقل ${formatCount(BODY_MIN)} کاراکتر بنویس.`)
        .max(BODY_MAX, `متن تجربه نباید بیشتر از ${formatCount(BODY_MAX)} کاراکتر باشه.`),
    alias: z
        .string()
        .trim()
        .max(ALIAS_MAX, `نام مستعار نباید بیشتر از ${formatCount(ALIAS_MAX)} کاراکتر باشه.`),
    category: z
        .string()
        .min(1, 'یه دسته‌بندی برای تجربه‌ت انتخاب کن.')
        .refine(
            (value) => EXPERIENCE_CATEGORIES.some((category) => category.value === value),
            'دسته‌بندی انتخاب‌شده معتبر نیست.',
        ),
    consent: z
        .boolean()
        .refine((value) => Boolean(value), 'برای ارسال، باید تأیید کنی که این تجربه مال خودته یا اجازه انتشارش رو داری.'),
});

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

export const EMPTY_EXPERIENCE_FORM: ExperienceFormValues = {
    title: '',
    body: '',
    alias: '',
    category: '',
    consent: false,
};
