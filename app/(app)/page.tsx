'use client';

import Header from '@/store/components/common/header';
import Hero from '@/components/hero2';
// import PopularCategories from '@/components/popular-categories';
import HowItWorks from '@/components/how-it-works2';
import Features from '@/components/features2';
import Testimonials from '@/components/testimonails2';
import FAQ from '@/components/faq';
import CallToAction from '@/components/call-to-action';
import Contact from '@/components/contact2';
import Footer from '@/components/footer2';
import {ProductSection, SpecialOffers} from "@/store/home/components";
import {getProducts} from '@/store/product/services/product-service';
import FourBanners from "@/components/landing/four-banners";

export default function LandingV2Page() {
    const products = getProducts();
    return (
        <div className="min-h-screen">
            {/*<Header/>*/}
            <Hero />

            <HowItWorks/>

            <Features/>

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
            <Testimonials/>
            {/*<StoreProducts />*/}
            {/*<FAQ />*/}
            {/*<CallToAction />*/}
            <Contact />
            <Footer />
        </div>
    );
}