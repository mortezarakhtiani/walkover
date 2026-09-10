'use client';

import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import PopularCategories from '@/components/landing/popular-categories';
import HowItWorks from '@/components/landing/how-it-works';
import Features from '@/components/landing/features';
import Testimonials from '@/components/landing/testimonails';
import FAQ from '@/components/landing/faq';
import CallToAction from '@/components/landing/call-to-action';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import StoreProducts from '@/store/components/store-products';

export default function LandingV2Page() {
    return (
        <div className="min-h-screen px-10">
            <Header/>
            {/*<Hero />*/}
            <HowItWorks/>
            <PopularCategories/>
            {/*<PopularCategories/>*/}
            <StoreProducts/>


            <Features/>
            {/*<Testimonials/>*/}
            {/*<StoreProducts />*/}
            {/*<FAQ />*/}
            {/*<CallToAction />*/}
            {/*<Contact />*/}
            {/*<Footer />*/}
        </div>
    );
}