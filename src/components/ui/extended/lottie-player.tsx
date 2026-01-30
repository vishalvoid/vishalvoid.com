"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Image from "next/image";

type Props = {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  fallbackSrc?: string;
};

export default function LottiePlayer({
  src,
  className = "w-full h-40 md:h-48",
  loop = true,
  autoplay = true,
  fallbackSrc,
}: Props) {
  const [animationData, setAnimationData] = useState<any | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) return;
        const json = await res.json();
        if (mounted) setAnimationData(json);
      } catch (e) {
        setError(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [src]);

  return (
    <div className={`${className} relative overflow-hidden object-contain`}>
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          style={{ width: "100%" }}
        />
      ) : error && fallbackSrc ? (
        <Image src={fallbackSrc} alt="preview" fill className="object-cover" />
      ) : (
        <div className="w-full h-full bg-muted/10 animate-pulse border border-border" />
      )}
    </div>
  );
}
