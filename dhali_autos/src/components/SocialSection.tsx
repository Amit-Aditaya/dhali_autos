'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type SocialItem = {
  id: number | string;
  title: string;
  image: string;
  url: string;
  is_featured: boolean;
};

type SocialResponse = {
  data: {
    results: SocialItem[];
  };
};

const placeholder = 'https://begautos.com/images/car-placeholder.jpg';

export default function SocialSection() {
  const [items, setItems] = useState<SocialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSocials = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://author.begautos.com/api/v1/home/people-talk/?limit=100'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: SocialResponse = await response.json();
        if (!cancelled) {
          const featured = data.data.results.filter(item => item.is_featured).slice(-9);
          setItems(featured);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load social posts');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSocials();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-white">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-white">Error: {error}</div>
      </section>
    );
  }

  if (!items.length) {
    return null;
  }

  const getItem = (index: number) => items[index] ?? null;

  const renderTile = (index: number, size = 400) => {
    const item = getItem(index);
    if (!item) {
      return null;
    }

    return (
      <Link
        href={item.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10 rounded" />
        <div className="relative aspect-square rounded overflow-hidden">
          <Image
            src={item.image || placeholder}
            alt={item.title || 'BEG Social Image'}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            placeholder="blur"
            blurDataURL={placeholder}
          />
        </div>
        <div className="absolute bottom-3 left-3 text-white z-20">
          <p className="font-medium text-sm sm:text-base">{item.title || 'BEG Social Image'}</p>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <h2 className="text-[32px] sm:text-2xl md:text-3xl font-medium mb-4 text-white">
            BEG across socials
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex flex-col gap-3">
            <div className="aspect-square">{renderTile(0)}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square">{renderTile(1, 200)}</div>
              <div className="aspect-square">{renderTile(2, 200)}</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square">{renderTile(3, 200)}</div>
              <div className="aspect-square">{renderTile(4, 200)}</div>
            </div>
            <div className="aspect-square">{renderTile(5)}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="aspect-square">{renderTile(6)}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square">{renderTile(7, 200)}</div>
              <div className="aspect-square">{renderTile(8, 200)}</div>
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          <Link href="/gallery" className="py-3 px-6 bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 text-white rounded">
            See All
          </Link>
        </div>
      </div>
    </section>
  );
}
