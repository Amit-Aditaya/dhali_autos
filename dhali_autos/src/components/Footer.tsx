import Link from 'next/link';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Sell Your Car', href: '#sell' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Experience', href: '#experience' }
];

const socials = [
  {
    href: 'https://www.facebook.com/dhaliautosbd/',
    label: 'Facebook',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M22 12.07C22 6.51 17.52 2 11.96 2S2 6.51 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H7.9v-2.9h2.54V9.94c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.9h-2.33v7.03C18.34 21.21 22 17.07 22 12.07Z" />
      </svg>
    )
  },
  {
    href: 'https://www.instagram.com/dhaliautos/',
    label: 'Instagram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm5 4.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm6.25-2.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
      </svg>
    )
  },
  {
    href: 'https://www.tiktok.com/@dhali.autos',
    label: 'TikTok',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor">
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
      </svg>
    )
  },
  {
    href: 'https://www.youtube.com/@Dhaliautos',
    label: 'YouTube',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20.1 4.55A2.75 2.75 0 0 1 22 6.5c.18 1.34.18 4.13.18 4.13s0 2.79-.18 4.13a2.75 2.75 0 0 1-1.9 1.95c-1.67.45-8.32.45-8.32.45s-6.65 0-8.32-.45A2.75 2.75 0 0 1 2 14.76C1.82 13.42 1.82 10.63 1.82 10.63s0-2.79.18-4.13A2.75 2.75 0 0 1 3.9 4.55c1.67-.45 8.32-.45 8.32-.45s6.65 0 8.32.45ZM10.5 8.38v4.5l4.03-2.25Z" />
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="text-white pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-10 md:flex-row md:flex-wrap lg:flex-nowrap mb-12">
          <div className="basis-[20%] min-w-0">
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link className="text-white hover:text-gray-300 flex items-center" href={link.href}>
                    <span className="mr-2">-</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="basis-[25%] min-w-[180px]">
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-1 text-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span>+8801625077554</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span>dhaliautos@gmail.com</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span>
                  Dhalibari Kachabazar,
                  <br />
                  Dhaka 1212, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          <div className="basis-[29%] min-w-[200px]">
            <h3 className="text-2xl font-bold mb-6">Keep In Touch</h3>
            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter Your Mail"
                  required
                  className="bg-transparent border border-gray-600 text-white outline-none flex-grow px-4 py-2 placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="shrink-0 w-12 h-12 rounded border border-white/50 bg-charcoal text-white hover:bg-[#1a1a1a] transition"
                  aria-label="Submit email"
                >
                  Go
                </button>
              </div>
            </form>
            <p className="mb-6 text-justify text-gray-300">
              Join the Dhali Autos circle for launch previews, limited allocations, and private driving events curated for our clients.
            </p>
          </div>

          <div className="basis-[25%] min-w-[150px]">
            <div className="relative w-full h-64 rounded overflow-hidden">
              <iframe
                className="w-full h-full absolute top-0 left-0"
                frameBorder="0"
                scrolling="no"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3206804147612!2d90.42304107566154!3d23.807193178631657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7002a387749%3A0xa55f9bd682a3fca3!2sDhali%20Autos!5e0!3m2!1sen!2sbd!4v1760004262533!5m2!1sen!2sbd" 
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center border-t border-gray-800 pt-8 text-center">
          <div className="mb-5 flex items-center justify-center gap-4 text-white">
            {socials.map(social => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/30 hover:bg-white/10"
              >
                {social.icon}
              </Link>
            ))}
          </div>
          <span className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-sky-300">
            DhaliAutos
          </span>
          <p className="text-gray-400 text-sm">
            ©{new Date().getFullYear()} DhaliAutos Studio · Crafted in Dhaka for discerning drivers.
          </p>
        </div>
      </div>
    </footer>
  );
}
