'use client';

import Header from '@/store/components/common/header';
import PopularCategories from '@/components/landing/popular-categories';
import HowItWorks from '@/components/landing/how-it-works';
import FourBanners from '@/components/landing/four-banners';

import {SpecialOffers} from '@/store/home/components/special-offers';
import {ProductSection} from '@/store/home/components/product-section';
import {getProducts} from '@/store/product/services/product-service';
// import SmallImages from "@/components/landing/small-images";
// import TwoImages from "@/components/landing/two-images";
// import Footer from "@/components/landing/footer";
// import Contact from "@/components/landing/contact";
// import HowItWorks from "@/components/how-it-works.tsx"


export default function LandingV2Page() {
    const products = getProducts();

    return (
        <div className="min-h-screen">

            <Header/>

            <div className="space-y-10">


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
                    items={products}
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store/search-results-grid"
                    showAddButton={true}
                />

                <FourBanners/>


                <ProductSection
                    title="محبوب‌ترین محصولات"
                    items={products}
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store/search-results-grid"
                    showAddButton={true}
                />


                {/*<SmallImages/>*/}

                {/*<TwoImages/>*/}



                {/*<Contact/>*/}

            </div>

        </div>
    );
}

