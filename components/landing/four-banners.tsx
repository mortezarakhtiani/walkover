'use client';

const FourBanners = () => {
    const banners = [
        {
            src: '/images/hoodiwomanfront.webp',
            alt: 'محصولات جدید',
        },
        {
            src: '/images/hoodiwomanback.webp',
            alt: 'کفش‌های ورزشی',
        },
        {
            src: '/images/hoodimanfront.webp',
            alt: 'استایل جدید',
        },
        {
            src: '/images/hoodimanback.webp',
            alt: 'پیشنهاد ویژه',
        },
    ];

    return (
        <section className="w-full">
            <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4">
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className="
                            relative
                            aspect-[3/5]
                            overflow-hidden
                            rounded-2xl
                            border
                            border-border
                            bg-muted
                        "
                    >
                        <img
                            src={banner.src}
                            alt={banner.alt}
                            className="
                                block
                                h-full
                                w-full
                                object-cover
                                object-top
                                transition-transform
                                duration-500
                                hover:scale-105
                            "
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FourBanners;