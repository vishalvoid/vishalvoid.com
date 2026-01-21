"use client";

import React from "react";

type TypewriterProps = {
  texts: string[];
  speed?: number;
  pause?: number;
  loop?: boolean;
  className?: string;
  cursor?: string;
};

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  speed = 75,
  pause = 2000,
  loop = true,
  className = "",
  cursor = "_",
}) => {
  const [textIndex, setTextIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [cursorVisible, setCursorVisible] = React.useState(true);

  React.useEffect(() => {
    if (!texts || texts.length === 0) return;
    let mounted = true;
    const currentText = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayIndex < currentText.length) {
      timeout = setTimeout(
        () => mounted && setDisplayIndex((d) => d + 1),
        speed,
      );
    } else if (!isDeleting && displayIndex === currentText.length) {
      timeout = setTimeout(() => mounted && setIsDeleting(true), pause);
    } else if (isDeleting && displayIndex > 0) {
      timeout = setTimeout(
        () => mounted && setDisplayIndex((d) => d - 1),
        Math.max(30, Math.floor(speed / 2)),
      );
    } else if (isDeleting && displayIndex === 0) {
      timeout = setTimeout(() => {
        if (!mounted) return;
        setIsDeleting(false);
        setTextIndex((i) => {
          const next = i + 1;
          if (!loop && next >= texts.length) return i;
          return next % texts.length;
        });
      }, 200);
    }

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [texts, textIndex, displayIndex, isDeleting, speed, pause, loop]);

  React.useEffect(() => {
    const iv = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(iv);
  }, []);

  const current = (texts[textIndex] ?? "").slice(0, displayIndex);

  return (
    <div aria-live="polite" className={`inline-block ${className}`}>
      <span>{current}</span>
      <span
        className={`ml-1 inline-block transition-opacity duration-150 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
      >
        {cursor}
      </span>
    </div>
  );
};

export default Typewriter;
