import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, memo, type CSSProperties } from "react";
import { getOptimizedImageUrl, generateSrcSet, generateSizes } from "~/utils/optimizeImage";

// Styles pour forcer le caching GPU sur mobile
const mobileOptimizedStyle: CSSProperties = {
  willChange: "auto",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout style paint",
  contentVisibility: "auto" as CSSProperties["contentVisibility"],
};

interface PhotoMainProps {
  photo: string;
  title: string;
  alt?: string;
  className?: string;
  isMobile?: boolean;
  onImageLoad?: () => void;
}

const PhotoMain = memo(function PhotoMain({
  photo,
  title,
  alt,
  className = "",
  isMobile: isMobileProp,
  onImageLoad,
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

  // Désactiver l'effet parallax sur mobile pour éviter les recalculs coûteux
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Sur mobile, pas d'effet scale (cause des saccades au scroll up)
  const scale = useTransform(scrollYProgress, [0.2, 1], isMobile ? [1, 1] : [1, 1.5]);

  if (!photo) {
    return null;
  }

  // Sur mobile: image optimisée 640px sans srcSet (on sait déjà la taille)
  // Sur desktop: srcSet complet pour responsive
  const optimizedSrc = getOptimizedImageUrl(photo, isMobile ? "mobile" : "desktop");

  // Placeholder ultra léger (20px, très compressé) pour effet blur pendant le chargement
  const placeholderSrc = getOptimizedImageUrl(photo, "placeholder");

  // Sur mobile, pas besoin de srcSet - on charge directement la bonne taille
  const srcSet = isMobile ? undefined : generateSrcSet(photo) || undefined;
  const sizes = isMobile ? undefined : (srcSet ? generateSizes() : undefined);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden ${isMobile ? "h-[500px]" : "h-[650px]"} ${className}`}
      style={isMobile ? mobileOptimizedStyle : undefined}
    >
      {/* Placeholder flou en arrière-plan */}
      {!isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center blur-xl scale-110"
          style={{ filter: "blur(20px)" }}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-full"
      >
        <motion.img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt || `${title} - Photo principale`}
          className="w-full h-full object-cover object-center"
          style={{ scale }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => {
            setIsLoaded(true);
            onImageLoad?.();
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </motion.div>
    </div>
  );
});

export default PhotoMain;
