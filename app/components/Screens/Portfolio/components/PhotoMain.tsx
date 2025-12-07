import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";
import { getOptimizedImageUrl, generateSrcSet, generateSizes } from "~/utils/optimizeImage";

interface PhotoMainProps {
  photo: string;
  title: string;
  alt?: string;
  className?: string;
  isMobile?: boolean;
}

const PhotoMain = memo(function PhotoMain({
  photo,
  title,
  alt,
  className = "",
  isMobile: isMobileProp,
}: PhotoMainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(isMobileProp ?? false);

  // Détecter le device côté client
  useEffect(() => {
    if (isMobileProp === undefined) {
      setIsMobile(window.innerWidth < 768);
    }
  }, [isMobileProp]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.2, 1], [1, 1.5]);

  if (!photo) {
    return null;
  }

  // Sur mobile, charger "mobile" (640px), sinon "desktop" (1920px)
  const optimizedSrc = getOptimizedImageUrl(photo, isMobile ? "mobile" : "desktop");
  const srcSet = generateSrcSet(photo);
  const sizes = generateSizes();

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden h-[650px] ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          filter: isLoaded ? "blur(0px)" : "blur(10px)"
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full"
      >
        <motion.img
          src={optimizedSrc}
          srcSet={srcSet || undefined}
          sizes={srcSet ? sizes : undefined}
          alt={alt || `${title} - Photo principale`}
          className="w-full h-full object-cover object-center"
          style={{ scale }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </motion.div>
    </div>
  );
});

export default PhotoMain;
