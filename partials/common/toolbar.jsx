'use client';

import { usePathname } from 'next/navigation';

const Toolbar = ({ children }) => {
  return (
    <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
      {children}
    </div>
  );
};

const ToolbarActions = ({ children }) => {
  return (
    <div className="flex items-center gap-2.5">
      {children}
    </div>
  );
};

const ToolbarPageTitle = () => {
  const pathname = usePathname();

  const titles = {
    '/store/checkout/order-summary': 'Order Summary',
    '/store/checkout/shipping-info': 'Shipping Info',
    '/store/checkout/payment-method': 'Payment Method',
    '/store/checkout/order-placed': 'Order Placed',
  };

  return (
    <h1 className="text-xl font-medium leading-none text-mono">
      {titles[pathname] ?? ''}
    </h1>
  );
};

const ToolbarDescription = ({ children }) => {
  return (
    <div className="flex items-center gap-2 text-sm font-normal text-secondary-foreground">
      {children}
    </div>
  );
};

const ToolbarHeading = ({ children }) => {
  return (
    <div className="flex flex-col justify-center gap-2">
      {children}
    </div>
  );
};

export {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle,
  ToolbarHeading,
  ToolbarDescription,
};