import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, memo } from "react";

interface PhotoMainProps {
  photo: string;
  title: string;
  alt?: string;
  className?: string;
}

const PhotoMain = memo(function PhotoMain({
  photo,
  title,
  alt,
  className = "",
}: PhotoMainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.2, 1], [1, 1.5]);

  if (!photo) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden h-[650px] ${className}`}
    >
      {/* Placeholder skeleton pendant le chargement */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full"
      >
        <motion.img
          src={photo}
          alt={alt || `${title} - Photo principale`}
          className="w-full h-full object-cover object-center"
          style={{ scale }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </motion.div>
    </div>
  );
});

export default PhotoMain;
