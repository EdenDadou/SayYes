import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "~/utils/ui/ui";
import "~/styles/tailwind.css";

interface ParallaxCardProps {
  index: number;
  totalCards: number;
  content?: React.ReactNode;
  children?: React.ReactNode;
  borderClass?: string;
  progress: any;
  range: [number, number];
  targetScale: number;
  isMobile?: boolean;
  height?: string;
}

export default function ParallaxCard({
  index,
  totalCards,
  content,
  children,
  borderClass,
  progress,
  range,
  targetScale,
  isMobile = false,
  height,
}: ParallaxCardProps) {
  const container = useRef<HTMLDivElement>(null);

  useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Scale de la carte basé sur la progression globale du scroll
  const scale = useTransform(progress, range, [1, targetScale]);

  // Opacité qui diminue quand la carte suivante arrive (sauf pour la dernière carte)
  const nextCardStart = (index + 1) * 0.2;
  const opacityRange = [nextCardStart, nextCardStart + 0.15];
  const opacity = useTransform(progress, opacityRange, [
    1,
    index === totalCards - 1 ? 1 : 0,
  ]);

  const topOffset = isMobile
    ? `calc(5vh + ${index * 15}px)`
    : `calc(-5vh + ${index * 25}px)`;

  return (
    <div
      ref={container}
      className={cn(
        "flex items-center justify-center sticky top-0",
        isMobile ? "h-[85vh]" : "h-screen"
      )}
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: 0,
          height: isMobile ? height : undefined,
        }}
        className={cn(
          "relative transform-origin-top",
          isMobile
            ? "w-full border-custom-mobile rounded-[20px]"
            : "w-[988px] h-[560px] md:border-custom-thin border-custom-mobile rounded-[28px]",
          borderClass
        )}
      >
        {content || children}
      </motion.div>
    </div>
  );
}
