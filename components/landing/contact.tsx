'use client';

import Header from '@/store/components/common/header';
import PopularCategories from '@/components/landing/popular-categories';
import HowItWorks from '@/components/landing/how-it-works';
import FourBanners from '@/components/landing/four-banners';

import {SpecialOffers} from '@/store/home/components/special-offers';
import {ProductSection} from '@/store/home/components/product-section';
import {getProducts} from '@/store/product/services/product-service';

import SmallImages from '@/components/landing/small-images';
import TwoImages from '@/components/landing/two-images';

import Contact from '@/components/landing/contact';


export default function LandingV2Page() {
    const products = getProducts();

    return (
        <div className="min-h-screen">

            <Header />

            <div className="space-y-10">

                {/* نحوه کار */}
                <HowItWorks />

                {/* دسته‌بندی‌های محبوب */}
                <PopularCategories />

                {/* پیشنهادهای ویژه */}
                <SpecialOffers
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store"
                    showAddButton={true}
                />

                {/* پرفروش‌ترین محصولات */}
                <ProductSection
                    title="پرفروش‌ترین‌ها"
                    items={products}
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store"
                    showAddButton={true}
                />

                {/* بنرها */}
                <FourBanners />

                {/* محبوب‌ترین محصولات */}
                <ProductSection
                    title="محبوب‌ترین محصولات"
                    items={products}
                    showSeeAll={true}
                    moreButton="نمایش بیشتر"
                    moreButtonHref="/store"
                    showAddButton={true}
                />

                {/* تصاویر کوچک */}
                <SmallImages />

                {/* دو تصویر */}
                <TwoImages />

                {/* ارتباط با ما */}
                <Contact />

            </div>

        </div>
    );
}