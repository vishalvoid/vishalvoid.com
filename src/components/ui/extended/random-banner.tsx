"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface RandomBannerProps {
  className?: string;
}

export default function RandomBanner({ className = "" }: RandomBannerProps) {
  const [n, setN] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // pick a random banner between 1 and 8 on mount
    const idx = Math.floor(Math.random() * 8) + 1;
    setN(idx);
  }, []);

  const heightClasses = "h-52 sm:h-56 md:h-72 lg:h-80 xl:h-80";

  if (n === null) {
    // show placeholder immediately to reserve space and avoid layout shift
    return (
      <div className={className}>
        <div className={`w-full ${heightClasses} rounded overflow-hidden bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]`} />
      </div>
    );
  }

  // images are in public/home_banner/1.gif .. 8.gif
  const src = `/home_banner/${n}.gif`;

  return (
    <div className={className}>
      <div className={`relative w-full ${heightClasses} rounded overflow-hidden`}>
        <div
          className={`absolute inset-0 transition-opacity duration-300 bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] ${
            loaded ? "opacity-0 pointer-events-none" : "opacity-100"
          } z-20`}
        />
        <Image
          src={src}
          alt={`Home banner ${n}`}
          width={1200}
          height={400}
          className={`w-full h-full object-cover rounded transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          priority
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
