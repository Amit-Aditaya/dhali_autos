import AboutSection from '@/components/AboutSection';
import ConsultationBanner from '@/components/ConsultationBanner';
import ExperienceSection from '@/components/ExperienceSection';
import Footer from '@/components/Footer';
import GallerySection from '@/components/GallerySection';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SellSection from '@/components/SellSection';
import ValueProposition from '@/components/ValueProposition';

export default function HomePage() {
  return (
    <div className="w-full relative">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <ValueProposition />
        <SellSection />
        <GallerySection />
        <ConsultationBanner />
      </main>
      <Footer />
    </div>
  );
}
