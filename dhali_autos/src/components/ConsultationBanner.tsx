import Link from 'next/link';

export default function ConsultationBanner() {
  return (
    <section className="container-responsive pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900/60 to-slate-900/20 px-10 py-16">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)] blur-3xl lg:block" />
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-sky-200">
              Private viewing
            </span>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Let&apos;s script your Dhali Autos delivery moment.
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 md:text-base">
              Tell us about your next acquisition or collection goals. Our concierge will curate a bespoke preview,
              complete with vehicle sourcing insights, finance options, and an immersive handover rehearsal scheduled
              at your convenience.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 text-sm text-slate-200">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-sky-200">Concierge desk</p>
              <p className="mt-2 font-semibold text-white">+880 1788-550550</p>
              <p className="text-slate-300">Daily · 10:00–20:00 GMT+6</p>
            </div>
            <Link
              href="mailto:hello@dhaliautos.com?subject=Schedule%20a%20DhaliAutos%20consultation"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-900 shadow-lg shadow-sky-900/40 transition hover:from-sky-300 hover:to-indigo-400"
            >
              Schedule consultation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-xs text-slate-400">
              Prefer WhatsApp? Message us at <span className="font-semibold text-sky-200">+880 1717-880088</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
