'use client';

import * as React from 'react';
import {cva} from 'class-variance-authority';
import {X} from 'lucide-react';
import {Dialog as SheetPrimitive} from 'radix-ui';
import {cn} from '@/lib/utils';

function Sheet({...props}) {
    return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({...props}) {
    return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({...props}) {
    return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({...props}) {
    return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/30 backdrop-blur-[4px]',
        'data-[state=open]:animate-[sheetFadeIn_250ms_ease-out]',
        'data-[state=closed]:animate-[sheetFadeOut_200ms_ease-in]',
        className,
      )}
      {...props}
    />
  );
}

const sheetVariants = cva(
    'flex flex-col items-strech fixed z-50 gap-4 bg-background p-6 shadow-lg',
    {
        variants: {
            side: {
                top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',

                bottom:
                    'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',

                left:
                    'inset-y-0 start-0 h-full w-3/4 border-e sm:max-w-sm ltr:data-[state=closed]:slide-out-to-left ltr:data-[state=open]:slide-in-from-left rtl:data-[state=closed]:slide-out-to-right rtl:data-[state=open]:slide-in-from-right',

                right:
                    'inset-y-0 end-0 h-full w-3/4 border-s data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',

            },
        },

        defaultVariants: {
            side: 'right',
        },
    },
);

function SheetContent({
  side = 'right',
  overlay = true,
  close = true,
  className,
  children,
  ...props
}) {
  const animations = {
    right: 'data-[state=open]:animate-[sheetSlideInRight_350ms_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[sheetSlideOutRight_250ms_ease-in]',
    left: 'data-[state=open]:animate-[sheetSlideInLeft_350ms_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[sheetSlideOutLeft_250ms_ease-in]',
    top: 'data-[state=open]:animate-[sheetSlideInTop_350ms_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[sheetSlideOutTop_250ms_ease-in]',
    bottom: 'data-[state=open]:animate-[sheetSlideInBottom_350ms_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:animate-[sheetSlideOutBottom_250ms_ease-in]',
  };

  return (
    <SheetPortal>
      {overlay && <SheetOverlay />}

      <SheetPrimitive.Content
        className={cn(
          sheetVariants({ side }),
          animations[side],
          className,
        )}
        {...props}
      >
        {children}

        {close && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            className="absolute end-5 top-4 cursor-pointer rounded-sm opacity-60 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 max-sm:hidden"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({className, ...props}) {
    return (
        <div
            data-slot="sheet-header"
            className={cn(
                'flex flex-col space-y-1 text-center sm:text-start',
                className,
            )}
            {...props}
        />
    );
}

function SheetBody({className, ...props}) {
    return (
        <div
            data-slot="sheet-body"
            className={cn('py-2.5', className)}
            {...props}
        />
    );
}

function SheetFooter({className, ...props}) {
    return (
        <div
            data-slot="sheet-footer"
            className={cn(
                'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
                className,
            )}
            {...props}
        />
    );
}

function SheetTitle({className, ...props}) {
    return (
        <SheetPrimitive.Title
            data-slot="sheet-title"
            className={cn('text-base font-semibold text-foreground', className)}
            {...props}
        />
    );
}

function SheetDescription({className, ...props}) {
    return (
        <SheetPrimitive.Description
            data-slot="sheet-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

export {
    Sheet,
    SheetBody,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetOverlay,
    SheetPortal,
    SheetTitle,
    SheetTrigger,
};



