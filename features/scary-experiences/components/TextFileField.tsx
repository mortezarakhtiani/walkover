'use client';

import {useId, useRef, useState} from 'react';
import type {ChangeEvent, DragEvent, ReactNode} from 'react';
import {FileText, LoaderCircle, RefreshCw, Upload, X} from 'lucide-react';

import {cn} from '@/lib/utils';

import {TEXT_FILE_ACCEPT, TEXT_FILE_MAX_BYTES} from '../lib/constants';
import {formatFileSize} from '../lib/format';

export type AttachedTextFile = {
    name: string;
    size: number;
};

type TextFileFieldProps = {
    file: AttachedTextFile | null;
    error: string | null;
    notice: ReactNode;
    isReading: boolean;
    disabled?: boolean;
    onSelect: (file: File) => void;
    onRemove: () => void;
};

export function TextFileField({
    file,
    error,
    notice,
    isReading,
    disabled = false,
    onSelect,
    onRemove,
}: TextFileFieldProps) {
    const inputId = useId();
    const labelId = `${inputId}-label`;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0];
        // Reset so choosing the same file again still fires `change`.
        event.target.value = '';
        if (selected) onSelect(selected);
    };

    const handleDrop = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        setIsDragging(false);
        if (disabled) return;
        const dropped = event.dataTransfer.files?.[0];
        if (dropped) onSelect(dropped);
    };

    const dragHandlers = {
        onDragOver: (event: DragEvent<HTMLElement>) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: handleDrop,
    };

    const describedBy = [hintId, error ? errorId : null].filter(Boolean).join(' ');

    return (
        <div role="group" aria-labelledby={labelId} className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
                <span id={labelId} className="text-sm font-medium text-white/90">
                    فایل متنی
                    <span className="ms-2 text-xs font-normal text-white/40">اختیاری</span>
                </span>
                <span id={hintId} className="text-xs text-white/40">
                    فقط ‎.txt‎ · حداکثر {formatFileSize(TEXT_FILE_MAX_BYTES)}
                </span>
            </div>

            {/* The real input stays in the accessibility tree and keyboard order; the label is its visual face. */}
            <input
                ref={inputRef}
                id={inputId}
                type="file"
                accept={TEXT_FILE_ACCEPT}
                className="peer sr-only"
                onChange={handleChange}
                disabled={disabled || isReading}
                aria-labelledby={labelId}
                aria-describedby={describedBy}
                aria-invalid={error ? true : undefined}
            />

            {file ? (
                <div
                    {...dragHandlers}
                    className={cn(
                        'flex items-center gap-3 rounded-xl border bg-blue-950/25 px-3 py-3 transition-colors sm:px-4',
                        isDragging ? 'border-blue-400/60' : 'border-blue-300/15',
                        'peer-focus-visible:border-blue-400/60 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400/40',
                    )}
                >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                        {isReading ? <LoaderCircle className="size-5 animate-spin" /> : <FileText className="size-5" />}
                    </span>

                    <span className="min-w-0 flex-1">
                        <span dir="ltr" className="block truncate text-start text-sm font-medium text-white" title={file.name}>
                            {file.name}
                        </span>
                        <span className="block text-xs text-white/45">{formatFileSize(file.size)}</span>
                    </span>

                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={disabled || isReading}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-blue-200 transition-colors hover:bg-blue-500/10 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 sm:px-3"
                    >
                        <RefreshCw className="size-3.5" aria-hidden />
                        <span>جایگزینی</span>
                    </button>

                    <button
                        type="button"
                        onClick={onRemove}
                        disabled={disabled || isReading}
                        aria-label={`حذف فایل ${file.name}`}
                        className="inline-flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                    >
                        <X className="size-4" aria-hidden />
                    </button>
                </div>
            ) : (
                <label
                    htmlFor={inputId}
                    {...dragHandlers}
                    className={cn(
                        'group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors',
                        isDragging
                            ? 'border-blue-400/70 bg-blue-500/10'
                            : 'border-white/15 bg-white/[0.02] hover:border-blue-300/40 hover:bg-blue-500/[0.04]',
                        'peer-focus-visible:border-blue-400/70 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400/40',
                        (disabled || isReading) && 'pointer-events-none opacity-60',
                    )}
                >
                    <span className="flex size-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-300 transition-colors group-hover:bg-blue-500/15">
                        {isReading ? <LoaderCircle className="size-5 animate-spin" /> : <Upload className="size-5" />}
                    </span>
                    <span className="text-sm text-white/80">
                        {isReading ? 'در حال خوندن فایل…' : 'فایل ‎.txt‎ رو اینجا رها کن یا برای انتخاب کلیک کن'}
                    </span>
                    <span className="text-xs text-white/40">متن فایل داخل کادر «متن تجربه» قرار می‌گیره و قابل ویرایشه.</span>
                </label>
            )}

            {error ? (
                <p id={errorId} role="alert" className="text-sm text-destructive">
                    {error}
                </p>
            ) : null}

            <div aria-live="polite" className="text-xs leading-6 text-blue-200/75">
                {notice}
            </div>
        </div>
    );
}
