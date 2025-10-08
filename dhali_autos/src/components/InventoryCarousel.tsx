'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type FeaturedCar = {
  id: number | string;
  name: string;
  feature_image?: string;
};

type InventoryResponse = {
  success: boolean;
  data?: FeaturedCar[];
};

export default function InventoryCarousel() {
  const [cars, setCars] = useState<FeaturedCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://author.begautos.com/api/v1/inventory/featured'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }

        const data: InventoryResponse = await response.json();
        if (!cancelled) {
          if (data.success && data.data) {
            setCars(data.data);
          } else {
            setError('Invalid data received');
          }
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError('An error occurred while loading cars');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCars();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading cars...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!cars.length) {
    return <div className="text-center py-10">No cars available</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {cars.map(car => (
          <div key={car.id} className="px-3">
            <div className="group">
              <Link href={`/car-details/${car.id}`}>
                <div className="aspect-[292/400] rounded-lg overflow-hidden mb-3">
                  <Image
                    src={car.feature_image ?? 'https://begautos.com/images/car-placeholder.jpg'}
                    alt={car.name}
                    width={292}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL="https://begautos.com/images/car-placeholder.jpg"
                  />
                </div>
                <h3 className="font-medium text-sm text-white">{car.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
