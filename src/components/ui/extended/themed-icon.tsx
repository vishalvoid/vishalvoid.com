import { cn } from "@/lib/utils";
import Image from "next/image";

interface ThemedIconProps {
  src: string;
  alt: string;
  size?: number;
  hasDarkVariant?: boolean;
  className?: string;
}

const ThemedIcon = ({
  src,
  alt,
  size = 20,
  hasDarkVariant = false,
  className,
}: ThemedIconProps) => {
  const darkSrc = src.replace(".svg", "-dark.svg");

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(className, hasDarkVariant && "dark:hidden")}
      />
      {hasDarkVariant && (
        <Image
          src={darkSrc}
          alt={alt}
          width={size}
          height={size}
          className={cn(className, "hidden dark:block")}
        />
      )}
    </>
  );
};

export default ThemedIcon;
