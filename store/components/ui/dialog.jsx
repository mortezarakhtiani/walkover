'use client';

import * as React from 'react';
import {cva} from 'class-variance-authority';
import {X} from 'lucide-react';
import {Dialog as DialogPrimitive} from 'radix-ui';
import {cn} from '@/lib/utils';

const dialogContentVariants = cva(
    'flex flex-col fixed outline-0 z-50 w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto border border-border bg-background p-5 sm:p-6 shadow-lg shadow-black/5 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-md',
    {
        variants: {
            variant: {
                default:
                    'left-[50%] top-[50%] max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-md',
                fullscreen: 'inset-4 h-auto w-auto max-w-none max-h-none translate-x-0 translate-y-0 rounded-md',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Dialog({...props}) {
    return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({...props}) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({...props}) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({...props}) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({className, ...props}) {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                'fixed inset-0 z-50 bg-black/30 [backdrop-filter:blur(4px)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                className,
            )}
            {...props}
        />
    );
}

function DialogContent({
                           className,
                           children,
                           showCloseButton = true,
                           overlay = true,
                           variant,
                           ...props
                       }) {
    return (
        <DialogPortal>
            {overlay && <DialogOverlay/>}
            <DialogPrimitive.Content
    dir="rtl"
    data-slot="dialog-content"
    className={cn(
        dialogContentVariants({variant}),
        'overflow-x-hidden',
        className
    )}
    {...props}
>
    {children}

    {showCloseButton && (
        <DialogClose
            className="absolute end-4 top-4 inline-flex size-9 items-center justify-center cursor-pointer rounded-md opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
            <X className="size-4"/>
            <span className="sr-only">Close</span>
        </DialogClose>
    )}
</DialogPrimitive.Content>
        </DialogPortal>
    );
}

export default DialogContent;

const DialogHeader = ({className, ...props}) => (
    <div
        data-slot="dialog-header"
        className={cn(
            'flex flex-col gap-1 text-start mb-5',
            className,
        )}
        {...props}
    />
);

const DialogFooter = ({className, ...props}) => (
    <div
        data-slot="dialog-footer"
        className={cn(
            'flex flex-col-reverse gap-2 pt-5 sm:flex-row sm:justify-end',
            className,
        )}
        {...props}
    />
);

function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        'pe-10 text-lg font-semibold leading-6 tracking-tight text-start',
        className,
      )}
      {...props}
    />
  );
}

const DialogBody = ({className, ...props}) => (
    <div data-slot="dialog-body" className={cn('grow', className)} {...props} />
);

function DialogDescription({className, ...props}) {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};
