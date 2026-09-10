'use client';

import * as React from 'react';
import {useStoreClient} from '@/store/components/context';
import {getCartItems} from '@/store/cart/services/cart-service';

import {StoreClientCartSheet} from '@/store/components/sheets/cart-sheet';
import {StoreClientProductDetailsSheet} from '@/store/components/sheets/product-details-sheet';
import {StoreClientWishlistSheet} from '@/store/components/sheets/wishlist-sheet';

export function StoreClientWrapper({children}) {
    const [cartItems, setCartItems] = React.useState([]);

    const handleRemoveFromCart = (itemId) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.id !== itemId)
        );
    };

    React.useEffect(() => {
        async function loadCart() {
            const items = await getCartItems();
            setCartItems(items);
        }

        loadCart();
    }, []);

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
                items={cartItems}
                onRemoveItem={handleRemoveFromCart}
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