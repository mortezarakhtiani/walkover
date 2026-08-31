'use client';

import * as React from 'react';
import {useStoreClient} from '@/store/components/context';
import {StoreClientCartSheet} from '@/store/components/sheets/cart-sheet';
import {StoreClientProductDetailsSheet} from '@/store/components/sheets/product-details-sheet';
import {StoreClientWishlistSheet} from '@/store/components/sheets/wishlist-sheet';

export function StoreClientWrapper({children}) {
    const {
        state: {
            isWishlistSheetOpen,
            isCartSheetOpen,
            isProductDetailsSheetOpen,
            productDetailsId,
        },
        closeWishlistSheet,
        closeCartSheet,
        closeProductDetailsSheet,
        handleAddToCart,
    } = useStoreClient();

    return (
        <>
                {children}
                <StoreClientWishlistSheet
                    open={isWishlistSheetOpen}
                    onOpenChange={closeWishlistSheet}
                />

                <StoreClientCartSheet
                    open={isCartSheetOpen}
                    onOpenChange={closeCartSheet}
                />

                <StoreClientProductDetailsSheet
                    open={isProductDetailsSheetOpen}
                    onOpenChange={closeProductDetailsSheet}
                    productId={productDetailsId}
                    addToCart={handleAddToCart}
                />
        </>
    );
}
