import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'DhaliAutos',
  description: 'DhaliAutos | Curated luxury automobiles tailored for Dhaka city life.',
  icons: {
    icon: '/images/dhali_autos_logo.png',
    shortcut: '/images/dhali_autos_logo.png',
    apple: '/images/dhali_autos_logo.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
