import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { cn } from "~/utils/ui/ui";
import "~/styles/tailwind.css";

interface ParallaxCardProps {
  index: number;
  totalCards: number;
  content?: React.ReactNode;
  children?: React.ReactNode;
  borderClass?: string;
  progress: any;
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
  targetScale,
  isMobile = false,
  height,
}: ParallaxCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const scrollSegments = Math.max(totalCards - 1, 1);
  const step = 1 / scrollSegments;
  const hasNextCard = index < totalCards - 1;

  const nextCardStart = hasNextCard ? Math.min(1, (index + 1) * step) : 1;
  const fadeStart = hasNextCard ? Math.max(0, nextCardStart - step * 0.3) : 1;
  const effectiveTargetScale = hasNextCard ? targetScale : 1;

  // Scale reste à 1 tant qu'aucune carte ne passe au-dessus, puis réduit au moment du chevauchement
  const scale = hasNextCard
    ? useTransform(
        progress,
        [0, fadeStart, nextCardStart],
        [1, 1, effectiveTargetScale],
        { clamp: true }
      )
    : useTransform(progress, [0, 1], [1, 1], { clamp: true });

  // Opacité qui diminue au moment où la carte suivante entre en vue (sauf pour la dernière)
  const opacityRange = hasNextCard ? [fadeStart, nextCardStart] : [0, 1];
  const opacity = useTransform(progress, opacityRange, [
    1,
    hasNextCard ? 0 : 1,
  ]);

  return (
    <div
      ref={container}
      className={cn(
        "flex items-center justify-center sticky",
        isMobile ? "h-[85vh] top-8" : "h-screen top-0"
      )}
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: 0,
          height: height || (isMobile ? undefined : "560px"),
          maxHeight: height || (isMobile ? undefined : "560px"),
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
        className={cn(
          "relative transform-origin-top",
          isMobile
            ? "w-full border-custom-mobile rounded-[20px]"
            : "w-[990px] md:border-custom-thin border-custom-mobile rounded-[28px]",
          !height && !isMobile && "h-[560px]",
          borderClass
        )}
      >
        {content || children}
      </motion.div>
    </div>
  );
}
