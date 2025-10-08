import Image from 'next/image';

export default function FinalHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://begautos.com/images/footer-hero.png"
          alt="Luxury car showroom"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="transform-custom relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-3xl mt-20 px-6">
          <h1 className="text-5xl font-bold text-white mb-6">BEG AUTOS</h1>
          <p className="text-sm text-gray-200 max-w-xl">
            BEG AUTOS specializes in bringing you the finest selection of luxury cars from around the
            world. With a handpicked collection of the most prestigious brands, BEG AUTOS takes pride in
            offering only the highest quality vehicles that combine sophistication, performance, and
            innovation. Whether you&apos;re searching for a sleek sports car, a refined sedan, or an iconic
            luxury SUV, BEG AUTOS is your ultimate destination.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  );
}
