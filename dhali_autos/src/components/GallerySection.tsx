'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type GalleryImage = {
  src: string;
  alt: string;
  span?: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: '/images/audi-a3-front.png',
    alt: 'Audi A3 front profile',
    span: 'row-span-2'
  },
  {
    src: '/images/nx200t-profile.jpg',
    alt: 'Lexus NX200T profile'
  },
  {
    src: '/images/gle53-dashboard.jpg',
    alt: 'Mercedes craftsmanship'
  },
  {
    src: '/images/gle53-front.png',
    alt: 'AMG GLE53 studio lighting',
    span: 'col-span-2'
  },
  {
    src: '/images/rx300-front.jpg',
    alt: 'Lexus RX front detail'
  },
  {
    src: '/images/showroom-interior.jpg',
    alt: 'DhaliAutos showroom ambience',
    span: 'col-span-2'
  }
];

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!activeImage) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeImage]);

  return (
    <section className="container-responsive pb-24" id="gallery">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="section-heading">A glimpse inside the Dhali Autos vault.</h2>
        <p className="section-subtitle mx-auto mt-4">
          Each gallery session is directed by our creative team to honour the silhouette, materials, and
          provenance of every vehicle before it meets its new custodian.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(16rem,1fr)]">
        {galleryImages.map(image => (
          <figure
            key={image.alt}
            className={`group h-full overflow-hidden rounded-3xl border border-white/5 bg-white/5 ${image.span ?? ''}`}
          >
            <button
              type="button"
              onClick={() => setActiveImage(image)}
              className="relative block h-full w-full min-h-[16rem] overflow-hidden text-left sm:min-h-[18rem]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <figcaption className="pointer-events-none absolute bottom-4 left-5 right-5 text-sm font-medium text-slate-200">
                {image.alt}
              </figcaption>
            </button>
          </figure>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-10"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label="Close gallery image"
            onClick={() => setActiveImage(null)}
          />
          <div className="relative z-10 w-full max-w-4xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-200">
              <span>{activeImage.alt}</span>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 font-semibold uppercase tracking-wide text-xs text-white transition hover:border-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
