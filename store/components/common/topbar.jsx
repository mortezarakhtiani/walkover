'use client';

import {UserDropdownMenu} from '@/store/components/ui/user-dropdown-menu';
import {
    Heart,
    Search,
    ShoppingCart,
    UserCircle,
} from 'lucide-react';

import {Badge} from '@/store/components/ui/badge';
import {Button} from '@/store/components/ui/button';
import {Input} from '@/store/components/ui/input';
import {useStoreClient} from '@/store/components/context';

export function StoreClientTopbar() {
    const {showCartSheet, showWishlistSheet} = useStoreClient();

    return (
        <div className="flex items-center justify-between w-full">

            {/* LEFT - User / Wishlist / Cart */}
            <div className="flex items-center gap-1">

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="lg"
                        mode="icon"
                        shape="circle"
                        onClick={showCartSheet}
                        className="relative hover:text-primary"
                    >
                        <ShoppingCart className="size-5!"/>

                        <Badge
                            className="absolute top-0.5 end-0.5"
                            variant="success"
                            size="xs"
                            shape="circle"
                        >
                            3
                        </Badge>
                    </Button>

                    <div className="flex flex-col">
            <span className="text-xs font-medium text-secondary-foreground">
              Total
            </span>

                        <span className="text-xs font-medium text-dark">
              $94.56
            </span>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="lg"
                    mode="icon"
                    shape="circle"
                    onClick={showWishlistSheet}
                    className="hover:text-primary"
                >
                    <Heart className="size-5!"/>
                </Button>

                <UserDropdownMenu
                    trigger={
                        <Button
                            variant="ghost"
                            size="lg"
                            mode="icon"
                            shape="circle"
                            className="hover:text-primary"
                        >
                            <UserCircle className="size-5!"/>
                        </Button>
                    }
                />


            </div>

            {/* RIGHT - Search */}
            {/* RIGHT - Search */}
            <div className="relative w-[240px]">
                <Search className="size-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 end-2"/>

                <Input
                    id="search-input"
                    type="text"
                    className="pe-9 text-right"
                    placeholder="Search shop"
                />
            </div>

        </div>
    );
}