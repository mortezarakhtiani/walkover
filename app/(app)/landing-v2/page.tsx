'use client';

import Header from '@/store/components/common/header';
import PopularCategories from '@/components/landing/popular-categories';
import HowItWorks from '@/components/landing/how-it-works';
import FourBanners from '@/components/landing/four-banners';
import {SpecialOffers} from '@/store/home/components/special-offers';
import {ProductSection} from '@/store/home/components/product-section';
import {getProducts} from '@/store/product/services/product-service';
import {Card3} from '@/store/components/common/card3';
import StoreFooter from '@/components/store-footer';
import Ecommerce32 from '@/store/components/common/product-card-ecommerce';

export default function LandingV2Page() {
    const products = getProducts();

    return (
        <div className="store-theme min-h-screen">

            <Header/>

            <div className="pt-[80px]  space-y-10">


                <HowItWorks/>

                <PopularCategories/>

                <SpecialOffers
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store/search-results-grid"
                    showAddButton={true}
                />

                <ProductSection
                    title="پرفروش‌ترین‌ها"
                    items={products.slice(0, 4)}
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store/search-results-grid"
                    showAddButton={true}
                />

                <FourBanners/>


                <ProductSection
                    title="هودی های خفن!"
                    items={products
                        .filter((product) => product.category === 'hoodi')
                        .slice(0, 4)}
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store/search-results-grid"
                    showAddButton={true}
                    showHeader={false}
                />

                {/*                <Ecommerce32*/}
                {/*  badge={{ label: "کالکشن برندها", variant: "secondary" }}*/}
                {/*  heading="برندهای محبوب"*/}
                {/*  description="از میان برندهای مورد علاقه‌ات انتخاب کن."*/}
                {/*/>*/}

                {/*<BrandCategory/>*/}


                {/*<SmallImages/>*/}

                {/*<TwoImages/>*/}


                {/*<Contact/>*/}
                <StoreFooter/>

            </div>

        </div>
    );
}

