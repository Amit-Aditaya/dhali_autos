'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Brand = {
  id: number | string;
  name: string;
  image: string;
};

type BrandResponse = {
  success: boolean;
  data?: Brand[];
  message?: string;
};

export default function BrandShowcase() {
  const [index, setIndex] = useState(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadBrands = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://author.begautos.com/api/v1/inventory/brands/'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }

        const data: BrandResponse = await response.json();
        if (!cancelled) {
          if (data.success && data.data) {
            setBrands(data.data);
          } else {
            setError(data.message ?? 'Failed to load brands');
          }
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError('Failed to load brands');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBrands();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!brands.length) {
      return undefined;
    }

    const totalSlides = Math.ceil(brands.length / 7);
    const timer = setInterval(() => {
      setIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [brands]);

  if (loading) {
    return (
      <section className="py-10 px-6 bg-[rgba(10,9,8,0.5)]">
        <div className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="max-w-7xl mx-auto">
              <div className="h-[178px] relative">
                <div className="flex items-center justify-center gap-4">
                  {Array.from({ length: 7 }).map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="w-[140px] sm:w-[160px] md:w-[178px] h-[140px] sm:h-[160px] md:h-[178px] bg-gray-800 shadow-sm flex items-center justify-center p-4 border border-gray-700 rounded animate-pulse"
                    >
                      <div className="w-[64px] sm:w-[72px] md:w-[86px] h-[64px] sm:h-[72px] md:h-[86px] bg-gray-700 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-6 bg-[rgba(10,9,8,0.5)]">
        <div className="min-h-[180px] flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-red-400 mb-2">Failed to load brand logos</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!brands.length) {
    return (
      <section className="py-10 px-6 bg-[rgba(10,9,8,0.5)]">
        <div className="min-h-[180px] flex items-center justify-center text-white">
          <p className="text-gray-400">No brand logos available</p>
        </div>
      </section>
    );
  }

  const chunkSize = 7;
  const totalSlides = Math.ceil(brands.length / chunkSize);
  const visible = brands.slice(index * chunkSize, index * chunkSize + chunkSize);

  return (
    <section className="py-10 px-6 bg-[rgba(10,9,8,0.5)]">
      <div className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="max-w-7xl mx-auto">
            <div className="h-[178px] relative">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {visible.map(brand => (
                  <div
                    key={brand.id}
                    className="w-[140px] sm:w-[160px] md:w-[178px] h-[140px] sm:h-[160px] md:h-[178px] bg-black shadow-sm flex items-center justify-center p-4 border border-gray-800 rounded"
                  >
                    <div className="relative w-[64px] sm:w-[72px] md:w-[86px] h-[64px] sm:h-[72px] md:h-[86px]">
                      <Image
                        src={brand.image}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 64px, (max-width: 768px) 72px, 86px"
                        onError={event => {
                          const target = event.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement?.insertAdjacentHTML(
                            'beforeend',
                            `<div class="flex items-center justify-center w-full h-full text-gray-400 text-xs text-center">${brand.name}</div>`
                          );
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {totalSlides > 1 && (
                <div className="flex justify-center mt-8">
                  {Array.from({ length: totalSlides }).map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => setIndex(dotIndex)}
                      className={`w-2 h-2 rounded-full mx-1 transition-colors ${
                        dotIndex === index ? 'bg-white' : 'bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${dotIndex + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
