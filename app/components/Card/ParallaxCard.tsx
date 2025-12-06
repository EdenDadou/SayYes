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
}: ParallaxCardProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Scale de la carte basé sur la progression globale du scroll
  const scale = useTransform(progress, range, [1, targetScale]);

  // Opacité qui diminue quand la carte suivante arrive (sauf pour la dernière carte)
  // Le fade commence quand la carte suivante commence à apparaître
  const nextCardStart = (index + 1) * 0.2;
  const opacityRange = [nextCardStart, nextCardStart + 0.15];
  const opacity = useTransform(
    progress,
    opacityRange,
    [1, index === totalCards - 1 ? 1 : 0]
  );

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className={cn(
          "relative w-[988px] h-[560px] md:border-custom-thin border-custom-mobile rounded-[28px] transform-origin-top",
          borderClass
        )}
      >
        {content || children}
      </motion.div>
    </div>
  );
}
