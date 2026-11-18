'use client';

import {useId, useRef, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    CircleCheck,
    Copy,
    LoaderCircle,
    Send,
    TriangleAlert,
    Unplug,
} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {useCopyToClipboard} from '@/hooks/use-copy-to-clipboard';
import {cn} from '@/lib/utils';

import {ALIAS_MAX, BODY_MAX, EXPERIENCE_CATEGORIES, TITLE_MAX, isExperienceCategory} from '../lib/constants';
import {formatCount} from '../lib/format';
import {readTextFile} from '../lib/read-text-file';
import {EMPTY_EXPERIENCE_FORM, experienceFormSchema, type ExperienceFormValues} from '../lib/schema';
import {isSubmissionConfigured, submitScaryExperience} from '../services/submission-service';
import {TextFileField, type AttachedTextFile} from './TextFileField';

type LoadedFile = AttachedTextFile & {text: string};

type SubmitStatus =
    | {kind: 'idle'}
    | {kind: 'success'}
    | {kind: 'not-configured'}
    | {kind: 'duplicate'}
    | {kind: 'error'; message: string};

const fieldClass =
    'border-white/10 bg-black/40 text-white placeholder:text-white/30 focus-visible:border-blue-400/60 focus-visible:ring-blue-500/20 dark:bg-black/40';

const fingerprintOf = (values: Pick<ExperienceFormValues, 'title' | 'body'>) =>
    `${values.title.trim()}\u241E${values.body.trim()}`;

export function ExperienceForm() {
    const form = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceFormSchema),
        defaultValues: EMPTY_EXPERIENCE_FORM,
        mode: 'onTouched',
    });

    const [status, setStatus] = useState<SubmitStatus>({kind: 'idle'});
    const [loadedFile, setLoadedFile] = useState<LoadedFile | null>(null);
    const [textBeforeFile, setTextBeforeFile] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isReadingFile, setIsReadingFile] = useState(false);

    // Guards that survive re-renders: an in-flight lock and the last accepted submission.
    const submittingRef = useRef(false);
    const lastAcceptedRef = useRef<string | null>(null);
    const readTokenRef = useRef(0);

    const {copyToClipboard, isCopied} = useCopyToClipboard();
    const categoryLabelId = useId();

    const body = useWatch({control: form.control, name: 'body'}) ?? '';
    const isSubmitting = form.formState.isSubmitting;
    const fileTextUntouched = loadedFile !== null && body === loadedFile.text;

    const setBody = (value: string) =>
        form.setValue('body', value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: value.length > 0 || form.formState.isSubmitted,
        });

    const handleFileSelect = async (file: File) => {
        const token = ++readTokenRef.current;
        setFileError(null);
        setIsReadingFile(true);

        const result = await readTextFile(file);
        if (token !== readTokenRef.current) return; // a newer file was chosen meanwhile
        setIsReadingFile(false);

        if (!result.ok) {
            // Leave the current text and any previously attached file untouched.
            setFileError(result.error);
            return;
        }

        const current = form.getValues('body');
        // When replacing a file whose text was never edited, the text to restore is the one from before the first file.
        const previous = loadedFile && current === loadedFile.text ? textBeforeFile : current;
        setTextBeforeFile(previous && previous.trim() ? previous : null);
        setLoadedFile({name: file.name, size: file.size, text: result.text});
        setBody(result.text);
        if (status.kind !== 'idle') setStatus({kind: 'idle'});
    };

    const handleFileRemove = () => {
        readTokenRef.current++;
        setIsReadingFile(false);
        setFileError(null);
        if (fileTextUntouched) setBody(textBeforeFile ?? '');
        setLoadedFile(null);
        setTextBeforeFile(null);
    };

    const onSubmit = async (values: ExperienceFormValues) => {
        if (submittingRef.current) return;

        const fingerprint = fingerprintOf(values);
        if (fingerprint === lastAcceptedRef.current) {
            setStatus({kind: 'duplicate'});
            return;
        }
        if (!isExperienceCategory(values.category)) {
            form.setError('category', {message: 'یه دسته‌بندی برای تجربه‌ت انتخاب کن.'});
            return;
        }

        submittingRef.current = true;
        setStatus({kind: 'idle'});

        try {
            const alias = values.alias.trim();
            const result = await submitScaryExperience({
                title: values.title.trim(),
                body: values.body.trim(),
                alias: alias || null,
                category: values.category,
                consent: true,
                sourceFileName: loadedFile && values.body.trim() === loadedFile.text ? loadedFile.name : null,
                submittedAt: new Date().toISOString(),
            });

            if (result.status === 'success') {
                lastAcceptedRef.current = fingerprint;
                form.reset(EMPTY_EXPERIENCE_FORM);
                setLoadedFile(null);
                setTextBeforeFile(null);
                setFileError(null);
                setStatus({kind: 'success'});
            } else if (result.status === 'not-configured') {
                setStatus({kind: 'not-configured'});
            } else {
                setStatus({kind: 'error', message: result.message});
            }
        } finally {
            submittingRef.current = false;
        }
    };

    const fileNotice = loadedFile && fileTextUntouched ? (
    <span>
        متن «<bdi>{loadedFile.name}</bdi>» داخل کادر متن تجربه قرار گرفت و می‌تونی ویرایشش کنی.
        {textBeforeFile ? ' با حذف فایل، متنی که قبلاً نوشته بودی برمی‌گرده.' : null}
    </span>
) : loadedFile ? (
    <span>
        متن رو ویرایش کردی؛ حذف فایل دیگه تغییری توی متن نمی‌ده.
    </span>
) : null;

    return (
        <Form {...form}>
            <form
                noValidate
                dir="rtl"
                onSubmit={form.handleSubmit(onSubmit)}
                aria-busy={isSubmitting}
                className="grid gap-7 text-right"
            >
                {!isSubmissionConfigured ? (
                    <div
                        role="note"
                        className="flex items-start gap-3 rounded-xl border border-blue-300/15 bg-blue-950/30 px-4 py-3 text-sm leading-7 text-blue-100/80"
                    >
                        <Unplug className="mt-1 size-4 shrink-0 text-blue-300" aria-hidden />
                        <p className="font-iransans">
                            <strong className="font-semibold text-blue-100 font-iransans">ارسال آنلاین هنوز وصل نشده.</strong>{' '}
                            فرم کامل کار می‌کنه و بررسی می‌شه، ولی فعلاً هیچ تجربه‌ای ذخیره یا ارسال نمی‌شه.
                        </p>
                    </div>
                ) : null}

                <fieldset disabled={isSubmitting} className="grid min-w-0 gap-7 disabled:opacity-90">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white/90">عنوان تجربه</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        maxLength={TITLE_MAX + 20}
                                        autoComplete="off"
                                        placeholder="مثلاً: صدای قدم‌ها توی راهروی خالی"
                                        className={cn('font-iransans h-12 text-right text-base', fieldClass)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({field, fieldState}) => (
                            <FormItem>
                                <span
                                    id={categoryLabelId}
                                    className={cn(
                                        'text-sm font-medium leading-none',
                                        fieldState.invalid ? 'text-destructive' : 'text-white/90',
                                    )}
                                >
                                    دسته‌بندی تجربه
                                </span>
                                <FormControl>
                                    <div
                                        role="radiogroup"
                                        aria-labelledby={categoryLabelId}
                                        className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-3"
                                    >
                                        {EXPERIENCE_CATEGORIES.map((category, index) => {
                                            const Icon = category.icon;
                                            return (
                                                <label
                                                    key={category.value}
                                                    className={cn(
                                                        'flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition-colors',
                                                        'border-white/10 bg-white/[0.02] text-white/70 hover:border-blue-300/30 hover:text-white',
                                                        'has-[:checked]:border-blue-400/60 has-[:checked]:bg-blue-500/10 has-[:checked]:text-white',
                                                        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400/50',
                                                        fieldState.invalid && 'border-destructive/50',
                                                    )}
                                                >
                                                    <input
                                                        ref={index === 0 ? field.ref : undefined}
                                                        type="radio"
                                                        name={field.name}
                                                        value={category.value}
                                                        checked={field.value === category.value}
                                                        onChange={() => field.onChange(category.value)}
                                                        onBlur={field.onBlur}
                                                        className="sr-only"
                                                    />
                                                    <Icon className="size-4 shrink-0 text-blue-300" aria-hidden />
                                                    <span className="font-iransans">{category.label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="body"
                        render={({field}) => (
                            <FormItem>
                                <div className="flex items-center justify-between gap-3">
                                    <FormLabel className="text-white/90">متن تجربه</FormLabel>
                                    <span
                                        className={cn(
                                            'text-xs tabular-nums',
                                            body.length > BODY_MAX ? 'text-destructive' : 'text-white/40',
                                        )}
                                        aria-live="off"
                                    >
                                        {formatCount(body.length)} / {formatCount(BODY_MAX)}
                                    </span>
                                </div>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        dir="rtl"
                                        placeholder="از همون لحظه‌ای شروع کن که حس کردی یه چیزی درست نیست… کجا بودی؟ چی دیدی یا شنیدی؟ بعدش چی شد؟"
                                        className={cn(
                                            'font-iransans min-h-[320px] resize-y px-4 py-3 text-base leading-8 md:min-h-[380px] md:text-base',
                                            fieldClass,
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <TextFileField
                        file={loadedFile}
                        error={fileError}
                        notice={fileNotice}
                        isReading={isReadingFile}
                        disabled={isSubmitting}
                        onSelect={handleFileSelect}
                        onRemove={handleFileRemove}
                    />

                    <FormField
                        control={form.control}
                        name="alias"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white/90">
                                    نام مستعار
                                    <span className="text-xs font-normal text-white/40">اختیاری</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        maxLength={ALIAS_MAX + 10}
                                        autoComplete="nickname"
                                        placeholder="مثلاً: مسافر شب"
                                        className={cn('h-12 text-right text-base font-iransans', fieldClass)}
                                    />
                                </FormControl>
                                <FormDescription className="font-iransans text-xs text-white/40">
                                    اگه خالی بمونه، تجربه‌ت به‌صورت ناشناس ثبت می‌شه.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="consent"
                        render={({field}) => (
                            <FormItem>
                                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm leading-7 text-white/75 transition-colors has-[:checked]:border-blue-400/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400/50">
                                    <FormControl>
                                        <input
                                            ref={field.ref}
                                            type="checkbox"
                                            name={field.name}
                                            checked={field.value}
                                            onChange={(event) => field.onChange(event.target.checked)}
                                            onBlur={field.onBlur}
                                            className="mt-1.5 size-4 shrink-0 cursor-pointer rounded accent-blue-500"
                                        />
                                    </FormControl>
                                    <span>
                                        تأیید می‌کنم این تجربه مال خودمه، یا از صاحبش اجازه دارم که اون رو با Walkover به اشتراک بذارم.
                                    </span>
                                </label>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </fieldset>

                <SubmitFeedback
                    status={status}
                    onCopy={() => copyToClipboard(form.getValues('body'))}
                    isCopied={isCopied}
                />

                <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-6 text-white/40">
                        قبل از ارسال، اطلاعات شخصی مثل شماره تلفن یا آدرس دقیق رو از متن حذف کن.
                    </p>
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || isReadingFile}
                        className="h-12 min-w-44 gap-2 rounded-xl text-base font-semibold shadow-[0_0_28px_rgba(37,99,235,0.35)]"
                    >
                        {isSubmitting ? (
                            <>
                                <LoaderCircle className="size-4 animate-spin" aria-hidden />
                                در حال ارسال…
                            </>
                        ) : (
                            <>
                                <Send className="size-4 -scale-x-100" aria-hidden />
                                ارسال تجربه
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

function SubmitFeedback({
    status,
    onCopy,
    isCopied,
}: {
    status: SubmitStatus;
    onCopy: () => void;
    isCopied: boolean;
}) {
    if (status.kind === 'idle') return <div aria-live="polite" className="sr-only" />;

    const tone = {
        success: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-100',
        'not-configured': 'border-blue-300/20 bg-blue-950/40 text-blue-100',
        duplicate: 'border-blue-300/20 bg-blue-950/40 text-blue-100',
        error: 'border-destructive/40 bg-destructive/10 text-red-100',
    }[status.kind];

    return (
        <div
            role={status.kind === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            className={cn('flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm leading-7', tone)}
        >
            {status.kind === 'success' ? (
                <CircleCheck className="mt-1 size-4 shrink-0 text-emerald-300" aria-hidden />
            ) : status.kind === 'error' ? (
                <TriangleAlert className="mt-1 size-4 shrink-0 text-destructive" aria-hidden />
            ) : (
                <Unplug className="mt-1 size-4 shrink-0 text-blue-300" aria-hidden />
            )}

            <div className="min-w-0 flex-1">
                {status.kind === 'success' ? (
                    <p>
                        <strong className="font-semibold">تجربه‌ت ارسال شد.</strong> ممنون که روایتش رو با Walkover به اشتراک گذاشتی.
                    </p>
                ) : null}
                {status.kind === 'duplicate' ? <p>همین تجربه چند لحظه پیش ارسال شد؛ نیازی به ارسال دوباره نیست.</p> : null}
                {status.kind === 'error' ? <p>{status.message} متنت سر جاش مونده.</p> : null}
                {status.kind === 'not-configured' ? (
                    <>
                        <p>
                            <strong className="font-semibold">تجربه‌ت ارسال یا ذخیره نشد.</strong> بخش دریافت تجربه‌ها هنوز به
                            سرور وصل نشده. متنت همین‌جا باقی مونده؛ اگه بخوای ازش یه نسخه کپی کن.
                        </p>
                        <button
                            type="button"
                            onClick={onCopy}
                            className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-blue-300/25 px-3 py-1.5 text-xs font-medium text-blue-100 transition-colors hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                        >
                            <Copy className="size-3.5" aria-hidden />
                            {isCopied ? 'کپی شد' : 'کپی متن تجربه'}
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    );
}
