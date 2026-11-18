import type {LucideIcon} from 'lucide-react';
import {Ellipsis, Eye, Footprints, House, Route, Sparkles} from 'lucide-react';

export const TITLE_MIN = 3;
export const TITLE_MAX = 80;
export const BODY_MIN = 50;
export const BODY_MAX = 15_000;
export const ALIAS_MAX = 40;

/** 200 KB comfortably holds ~15,000 Persian characters in UTF-8 (2 bytes each) plus line breaks. */
export const TEXT_FILE_MAX_BYTES = 200 * 1024;
export const TEXT_FILE_ACCEPT = '.txt,text/plain';

export type ExperienceCategoryValue =
    | 'paranormal'
    | 'strange-event'
    | 'home'
    | 'travel'
    | 'unknown-creatures'
    | 'other';

export type ExperienceCategory = {
    value: ExperienceCategoryValue;
    label: string;
    icon: LucideIcon;
};

export const EXPERIENCE_CATEGORIES: readonly ExperienceCategory[] = [
    {value: 'paranormal', label: 'تجربه ماورایی', icon: Sparkles},
    {value: 'strange-event', label: 'اتفاق عجیب', icon: Eye},
    {value: 'home', label: 'تجربه ترسناک در خانه', icon: House},
    {value: 'travel', label: 'تجربه ترسناک در سفر', icon: Route},
    {value: 'unknown-creatures', label: 'موجودات ناشناخته', icon: Footprints},
    {value: 'other', label: 'سایر موارد', icon: Ellipsis},
];

export function isExperienceCategory(value: string): value is ExperienceCategoryValue {
    return EXPERIENCE_CATEGORIES.some((category) => category.value === value);
}
