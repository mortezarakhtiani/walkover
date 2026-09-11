'use client';

import Image from 'next/image';

export default function TwoImages() {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">

          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-muted cursor-pointer">
            <Image
              src="/images/set2.jpg"
              alt="Image 1"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-muted cursor-pointer">
            <Image
              src="/images/set1.jpg"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>


        </div>
      </div>
    </section>
  );
}