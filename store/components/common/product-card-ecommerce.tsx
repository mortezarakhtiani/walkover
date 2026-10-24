"use client";

import Image from "next/image";
import Marquee from "@/components/ui/marquee";

const images = Array.from(
  { length: 16 },
  (_, i) => `/media/store/client/600x600/${i + 1}.png`
);

export default function Ecommerce32() {
  return (
    <section className="w-full overflow-hidden py-6">
      <Marquee pauseOnHover className="[--duration:40s]">
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="flex w-[180px] shrink-0 items-center justify-center px-3 sm:w-[220px]"
          >
            <Image
              src={src}
              alt=""
              width={300}
              height={300}
              className="h-[180px] w-full object-contain sm:h-[220px]"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}