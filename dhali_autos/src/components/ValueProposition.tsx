const ICONS: Record<string, JSX.Element> = {
  handshake: (
    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 10l2.5 2 3.5-6 4.5 6 3.5-2 1 10H3l1-10zM12 3l1.09 2.26L15.5 6l-2 1.94L14 11l-2-1.5L10 11l.5-3.06L9 6l2.41-.74L12 3z" />
    </svg>
  ),
  checkmark: (
    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l7 4v6c0 5.25-3.33 10-7 10s-7-4.75-7-10V6l7-4zm3.3 7.7l-4 4a1 1 0 01-1.4 0l-2-2a1 1 0 111.4-1.4l1.3 1.3 3.3-3.3a1 1 0 011.4 1.4z" />
    </svg>
  ),
  trading: (
    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 .34-.03.67-.08 1H20c.05-.33.08-.66.08-1 0-4.42-3.58-8-8-8zm-6 6c0-.34.03-.67.08-1H4c-.05.33-.08.66-.08 1 0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z" />
    </svg>
  ),
  transparent: (
    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2h-5l-4 4-4-4H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm2 5h12v2H6V9zm0-3h12v2H6V6z" />
    </svg>
  )
};

const features = [
  {
    icon: 'handshake',
    title: 'Off-market network',
    description:
      'Access limited builds and collector-grade imports through DhaliAutos relationships across the Gulf, Europe, and Japan.'
  },
  {
    icon: 'checkmark',
    title: 'Certified provenance',
    description:
      'Every vehicle is delivered with digital inspection dossiers, ECU health scans, and verifiable ownership lineage.'
  },
  {
    icon: 'trading',
    title: 'Lifecycle concierge',
    description:
      'From bespoke detailing to performance upgrades, we orchestrate trusted partners who uphold the Dhali Autos standard.'
  },
  {
    icon: 'transparent',
    title: 'Transparent valuations',
    description:
      'Real-time market intelligence ensures your acquisition or sale aligns with global benchmarks and future desirability.'
  }
];

export default function ValueProposition() {
  return (
    <section className="container-responsive pb-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="section-heading">The Dhali Autos promises.</h2>
        <p className="section-subtitle mx-auto mt-4">
          Four commitments anchor every proposal we share—ensuring confidence before keys exchange hands
          and long after the first drive.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map(feature => (
            <div
              key={feature.title}
              className="glass-card flex flex-col items-center gap-3 rounded-3xl p-8 text-center transition hover:translate-y-[-4px] hover:border-sky-500/40"
            >
              <div className="mb-6">{ICONS[feature.icon]}</div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <div className="h-px w-16 bg-gradient-to-r from-sky-300 to-indigo-400" />
              <p className="text-sm leading-relaxed text-slate-300">{feature.description}</p>
            </div>
          ))}
      </div>
    </section>
  );
}
