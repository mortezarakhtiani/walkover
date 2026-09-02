'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/store/components/ui/card';

export function Order() {
  const items = [
    { label: 'جمغ کل', amount: 492.0 },
    { label: 'هزینه ارسال', amount: 0.0 },
    { label: 'مالیات بر ارزش افزوده', amount: 0.0 },
  ];

  const renderItem = (item, index) => (
    <div key={index} className="flex justify-between items-center">
      <span className="text-sm font-normal text-secondary-foreground">
        {item.label}
      </span>
      <span className="text-sm font-medium text-mono">${item.amount}.0</span>
    </div>
  );

  return (
    <Card className="bg-accent/50">
      <CardHeader className="px-5">
        <CardTitle>اطلاعات سفارش شما</CardTitle>
      </CardHeader>

      <CardContent className="px-5 py-4 space-y-2">
        <h4 className="text-sm font-medium text-mono mb-3.5">جزئیات قیمت</h4>

        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </CardContent>

      <CardFooter className="flex justify-between items-center px-5">
        <span className="text-sm font-normal text-secondary-foreground">
          Total
        </span>
        <span className="text-base font-semibold text-mono">$492.00</span>
      </CardFooter>
    </Card>
  );
}
