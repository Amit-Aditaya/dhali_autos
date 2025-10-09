import Link from 'next/link';

const stats = [
  { value: '120+', label: 'Handpicked premium vehicles delivered' },
  { value: '48hr', label: 'Swift concierge support response time' },
  { value: '15+', label: 'Years championing Dhaka motor fanatics' }
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28 md:pt-48">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-80"
          src="/images/showroom.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/60 to-slate-950" />
      </div>

      <div className="container-responsive relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-sky-200">
              Performance · Luxury · Precision
            </p>
            <h1 className="text-4xl font-semibold  text-white md:text-6xl" style={{ lineHeight: '1.25' }}>
              Finest Luxury Car Studio in Bangladesh
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-200 md:text-lg">
              From sourcing rare imports to maintaining pristine condition, Dhali Autos pairs curated
              vehicles with concierge-style ownership. Our studio elevates every handover into a tailored
              moment worth remembering - Because luxury deserves experience.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-sky-900/30 transition hover:from-sky-300 hover:to-indigo-400"
              >
                Discover Our Story
              </Link>
              <Link
                href="#gallery"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10"
              >
                View the Gallery
              </Link>
            </div>

            <dl className="mt-12 grid gap-6 sm:grid-cols-3">
              {stats.map(stat => (
                <div key={stat.label} className="glass-card px-5 py-6 text-left">
                  <dt className="text-xs uppercase tracking-[0.35em] text-slate-300/70">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 text-2xl font-semibold text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* <div className="glass-card relative overflow-hidden rounded-3xl border-white/10 bg-slate-900/60 p-6 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/15 via-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300">
                  Concierge Spotlight
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Personal curators, immersive handovers, lasting confidence.
                </h2>
                <p className="mt-3 text-sm text-slate-300">
                  Our specialists audit every vehicle across 180+ checkpoints, orchestrate custom delivery
                  reveals, and secure aftercare partnerships so you only focus on the drive ahead.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Featured film</p>
                <p className="mt-2 text-sm text-slate-200">
                  Experience the DhaliAutos reveal suite with our latest Mercedes-AMG delivery vignette.
                </p>
                <Link
                  href="#gallery"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                >
                  Watch highlight reel
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
