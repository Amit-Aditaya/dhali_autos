import Image from 'next/image';
import Link from 'next/link';

const preferences = [
  {
    href: '/cars/brand-new',
    title: 'Reconditioned Unit',
    image: 'https://begautos.com/images/car-image-left.jpg'
  },
  {
    href: '/cars/pre-owned',
    title: 'Pre-owned Unit',
    image: 'https://begautos.com/images/car-image-right.jpg'
  }
];

export default function PreferenceGrid() {
  return (
    <section className="py-8 px-6">
      <div className="max-w-7xl mx-auto mb-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[32px] sm:text-2xl md:text-3xl font-medium text-white">
            Choose per your preference
          </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {preferences.map(preference => (
            <div key={preference.title} className="relative w-full md:w-1/2 aspect-[16/9] overflow-hidden group">
              <Link href={preference.href}>
                <Image
                  src={preference.image}
                  alt={preference.title}
                  fill
                  className="object-cover border-2 rounded-3xl"
                />
                <div className="absolute inset-0 bg-black/10 flex items-end p-6">
                  <div className="flex items-center justify-between w-full text-white">
                    <div>
                      <h3 className="text-xl md:text-3xl font-semibold mb-2 transition duration-300 group-hover:translate-x-1">
                        {preference.title}
                      </h3>
                    </div>
                    <svg
                      className="w-8 h-8 text-gray-600 rounded bg-white p-1 ml-4 group-hover:translate-x-1 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
