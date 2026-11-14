'use client';

export default function HowItWorks() {
    return (
        <section className="w-full p-0">
            <div className="w-full max-w-none">
                <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[16/4]">
                    <img
                        src="/images/store5.png"
                        alt="انتخاب محصول"
                        draggable={false}
                        className="h-full w-full select-none object-cover"
                    />
                </div>
            </div>
        </section>
    );
}