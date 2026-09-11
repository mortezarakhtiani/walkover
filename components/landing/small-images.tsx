'use client';

const SmallImages = () => {
    const images = [
        {
            src: '/images/hat1.webp',
            alt: 'محصولات جدید',
        },
        {
            src: '/images/hat2.webp',
            alt: 'استایل زنانه',
        },
        {
            src: '/images/hat3.jpg',
            alt: 'محصولات مردانه',
        },
        {
            src: '/images/hat4.jpg',
            alt: 'استایل مردانه',
        },
        {
            src: '/images/hat5.webp',
            alt: 'کفش زنانه',
        },
        {
            src: '/images/hat6.webp',
            alt: 'محصولات ویژه',
        },

    ];

    return (
        <section className="w-full">
            <div className="grid grid-cols-3 gap-10 sm:grid-cols-6 px-40">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="
                            relative
                            aspect-square
                            overflow-hidden
                            rounded-xl
                            border
                            border-border
                            bg-muted
                        "
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="
                                block
                                h-full
                                w-full
                                object-cover
                                transition-transform

                            "
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SmallImages;

