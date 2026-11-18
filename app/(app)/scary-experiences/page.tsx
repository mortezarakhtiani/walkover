import type {Metadata, Viewport} from 'next';

import ScaryExperiencesPage from '@/features/scary-experiences/ScaryExperiencesPage';
import {landingFont} from '@/features/site-landing/fonts';
import '../site-landing/globals-landing.css';

export const metadata: Metadata = {
    title: {absolute: 'تجربیات ترسناک من · walkover'},
    description:
        'تجربه‌ی واقعی و ترسناک خودت رو برای Walkover بنویس: اتفاقات ماورایی، ماجراهای عجیب و لحظه‌هایی که هنوز براشون توضیحی نداری.',
};

export const viewport: Viewport = {
    themeColor: '#070707',
};

export default function ScaryExperiencesRoute() {
    return (
        <div className={`landing-theme landing-font ${landingFont.variable} w-full`}>
            <ScaryExperiencesPage />
        </div>
    );
}
