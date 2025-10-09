import SellForm from './SellForm';

const steps = [
  {
    title: 'Submit your vehicle profile',
    description:
      'Share service history, customisations, and a short visual walkaround. Our curators evaluate market desirability within 24 hours.',
    accent: '01'
  },
  {
    title: 'Receive a strategic exit plan',
    description:
      'We compare outright offers, consignment projections, and international buyer interest to recommend the optimal path for you.',
    accent: '02'
  },
  {
    title: 'Effortless handover & settlement',
    description:
      'Dhali Autos handles detailing, photography, buyer screenings, and documentation so funds are cleared without disrupting your schedule.',
    accent: '03'
  }
];

export default function SellSection() {
  return (
    <section className="container-responsive py-24" id="sell">
      <div className="glass-card flex flex-col gap-12 overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-900/60 px-6 py-12 sm:px-8 sm:py-14 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:px-10 lg:py-16">
        <div className="relative h-full">
          <div className="absolute inset-0 -left-10 rounded-full bg-gradient-to-br from-sky-500/30 to-indigo-500/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-md space-y-5 text-center sm:text-left">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-sky-200">
              Sell your car
            </span>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Premium exits for extraordinary machines.
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Whether you are upgrading or rebalancing your collection, Dhali Autos activates a global network of
              qualified buyers while protecting your privacy. We engineer outcomes that honour the care you invested
              in your vehicle.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              <strong className="text-white">Fast-track option:</strong> we can table verified offers within 72 hours for
              vehicles that meet Dhali Autos provenance standards.
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-3xl">
          <div className="absolute -top-16 -right-20 hidden h-48 w-48 rounded-full bg-sky-500/20 blur-3xl md:block" />
          <div className="relative grid gap-6 sm:grid-cols-2">
            {steps.map(step => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/40">
                <span className="text-sm font-semibold uppercase tracking-[0.5em] text-sky-200/90">{step.accent}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:-mb-10 sm:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
          <Image
            src="/images/c200-detail.jpg"
            alt="DhaliAutos consignment detail"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-between gap-4 px-8 py-6 text-sm text-slate-200">
            <p>
              Ready to begin? Reach the DhaliAutos concierge at
              <a className="ml-2 font-semibold text-sky-300 hover:text-sky-200" href="mailto:concierge@dhaliautos.com">
                concierge@dhaliautos.com
              </a>
            </p>
            <a
              href="mailto:concierge@dhaliautos.com?subject=Sell%20with%20DhaliAutos"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10"
            >
              Start valuation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div> */}

        <div className="sm:col-span-2">
          <div className="rounded-[2.25rem] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40 sm:p-8 lg:mt-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center text-slate-200">
              <h3 className="text-2xl font-semibold text-white md:text-3xl">Share your vehicle with our concierge</h3>
              <p className="text-sm leading-relaxed md:text-base">
                Submit the details below and our team will review your vehicle profile before contacting you with the best
                consignment strategy.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-3xl">
              <SellForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
