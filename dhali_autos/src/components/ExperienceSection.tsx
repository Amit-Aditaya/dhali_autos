import Image from 'next/image';

const experiences = [
  {
    title: 'Immersive handover ritual',
    description:
      'Arrive to a custom soundtrack and precision lighting as our specialists unveil every detail calibrated to your preferences.',
    image: '/images/showroom-interior.jpg'
  },
  {
    title: 'Tailored aftercare blueprint',
    description:
      'We secure detailing, performance tuning, and concierge maintenance partners so your calendar stays as refined as your drive.',
    image: '/images/gle53-dashboard.jpg'
  },
  {
    title: 'Global sourcing authority',
    description:
      'DhaliAutos unlocks factory allocations and private auctions to deliver rare configurations months ahead of the market.',
    image: '/images/g63-showroom.jpg'
  }
];

export default function ExperienceSection() {
  return (
    <section className="container-responsive py-20" id="experience">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="section-heading">The Dhali Autos experience, reimagined.</h2>
        <p className="section-subtitle mx-auto mt-4">
          Ownership is a journey, not a transaction. From pre-order reconnaissance to aftercare orchestration,
          we choreograph every touchpoint so the vehicle mirrors the lifestyle you lead.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {experiences.map(item => (
          <article key={item.title} className="group overflow-hidden rounded-3xl border border-white/5 bg-white/5">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              </div>
            </div>
            <div className="px-6 pb-8 pt-4 text-left text-sm leading-relaxed text-slate-200">
              {item.description}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
