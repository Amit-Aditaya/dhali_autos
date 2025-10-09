import Image from 'next/image';

const galleryImages = [
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
            <div className="relative h-full w-full min-h-[16rem] sm:min-h-[18rem]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-5 right-5 text-sm font-medium text-slate-200">
                {image.alt}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
