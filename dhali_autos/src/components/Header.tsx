'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'About Us', href: '#about' },
  { label: 'Sell Your Car', href: '#sell' },
  { label: 'Gallery', href: '#gallery' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header fixed top-0 left-0 right-0 z-50 mx-auto mt-6 w-[92%] rounded-2xl px-6 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-wide text-white"
        >
          <Image
            src="/images/dhali_autos_logo.png"
            alt="Dhali Autos logo"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <div className="flex flex-col">
            <span className="text-lg leading-none">DHALI AUTOS</span>
            <span className="text-[11px] uppercase tracking-[0.4em] text-sky-300/70">
              Curated Luxury Fleet
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#sell"
            className="hidden rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-2 text-sm font-semibold tracking-wide text-slate-900 shadow-lg shadow-sky-500/30 transition hover:from-sky-300 hover:to-indigo-400 md:inline-flex"
          >
            Book Consultation
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10 md:hidden"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/5 bg-slate-900/90 p-5 shadow-xl shadow-sky-900/30">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-semibold text-white/90 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#sell"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-2 text-sm font-semibold tracking-wide text-slate-900"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
