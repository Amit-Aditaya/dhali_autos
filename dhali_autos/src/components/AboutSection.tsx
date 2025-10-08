import Image from 'next/image';

const pillars = [
  {
    title: 'Boutique sourcing team',
    detail: 'Negotiates directly with regional distributors and private collectors to secure scarce allocations.'
  },
  {
    title: 'Design-forward studio',
    detail: 'Purpose-built reveal lounge with configurable ambience for personalising every handover.'
  },
  {
    title: 'Data-backed assurance',
    detail: '180+ point inspection paired with provenance documentation and transparent ownership forecasting.'
  }
];

export default function AboutSection() {
  return (
    <section className="container-responsive py-24" id="about">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-sky-200">
            About DhaliAutos
          </div>
          <h2 className="section-heading">
            Born in Dhaka, engineered for those who demand nuance from every drive.
          </h2>
          <p className="text-base text-slate-200 md:text-lg">
            DhaliAutos was founded to fill the gap between mass-market showrooms and the expectations of
            Bangladesh’s discerning motorists. Our team blends global sourcing intelligence with a hospitality
            mindset, ensuring every curation reflects your personal cadence—whether it is a weekend escape or a
            daily statement.
          </p>

          <dl className="grid gap-5 sm:grid-cols-3">
            {pillars.map(pillar => (
              <div key={pillar.title} className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <dt className="text-sm font-semibold text-white">{pillar.title}</dt>
                <dd className="mt-2 text-xs leading-relaxed text-slate-300">{pillar.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-3xl border border-sky-500/30 bg-sky-500/10 p-6 text-sm leading-relaxed text-slate-100">
            “Our mission is to demystify luxury ownership in Bangladesh by pairing exceptional vehicles with
            transparent guidance and lifelong partnership.” — DhaliAutos Collective
          </div>
        </div>

        <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/5 bg-white/5">
          <Image
            src="/images/gle53-front.png"
            alt="DhaliAutos studio reveal"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/80" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-slate-950/75 p-5">
            <p className="text-sm font-semibold text-white">Studio snapshot</p>
            <p className="mt-2 text-xs text-slate-300">
              Private viewings are choreographed for every client. Expect curated lighting, fragrance, and
              hospitality tailored to your preference list.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
