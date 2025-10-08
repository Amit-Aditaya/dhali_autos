import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import SellSection from '@/components/SellSection';
import GallerySection from '@/components/GallerySection';
import ValueProposition from '@/components/ValueProposition';
import ConsultationBanner from '@/components/ConsultationBanner';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="w-full relative">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <SellSection />
        <GallerySection />
        <ValueProposition />
        <ConsultationBanner />
      </main>
      <Footer />
    </div>
  );
}
