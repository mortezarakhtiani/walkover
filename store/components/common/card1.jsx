'use client';

import { Fragment } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/store/components/ui/card';
import { useStoreClient } from '@/store/components/context';
import {getProducts} from '@/store/product/services/product-service';

export function Card1() {
  const { showProductDetailsSheet } = useStoreClient();
  const items = getProducts();


  const renderItem = (item) => (
    <Card key={item.id}>
      <CardContent className="flex flex-col items-center justify-center pb-0">
        <div
          onClick={() => showProductDetailsSheet(item.id)}
          className="hover:text-primary text-sm font-medium text-mono cursor-pointer"
        >
          {item.brand}
        </div>

        <img
          src={toAbsoluteUrl(
            `/media/store/client/600x600/${item.logo}`
          )}
          onClick={() => showProductDetailsSheet(item.id)}
          className="cursor-pointer h-[100px] shrink-0"
          alt={item.brand}
        />
      </CardContent>
    </Card>
  );

  return (
    <Fragment>
      {items.map((item) => renderItem(item))}
    </Fragment>
  );
}