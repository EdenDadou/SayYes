import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, memo, type CSSProperties } from "react";
import {
  getOptimizedImageUrl,
  generateSrcSet,
  generateSizes,
} from "~/utils/optimizeImage";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(isMobileProp ?? false);

  // Détecter le device côté client
  useEffect(() => {
    if (isMobileProp === undefined) {
      setIsMobile(window.innerWidth < 768);
    }
  }, [isMobileProp]);

  // Si l'image est déjà cachée (preload HTTP LCP), le `load` event peut se
  // déclencher avant que React n'attache son listener. On vérifie `complete`
  // au montage pour ne pas rester bloqué sur le placeholder flou.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
      onImageLoad?.();
    }
  }, [onImageLoad]);

  // Fallback de sécurité : si onLoad n'a pas été reçu après 5s, on révèle
  // l'image quand même pour éviter un blur permanent (cf. OptimizedImage).
  useEffect(() => {
    if (isLoaded) return;
    const timeout = setTimeout(() => {
      setIsLoaded(true);
      onImageLoad?.();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isLoaded, onImageLoad]);

  // Désactiver l'effet parallax sur mobile pour éviter les recalculs coûteux
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Sur mobile, pas d'effet scale (cause des saccades au scroll up)
  const scale = useTransform(
    scrollYProgress,
    [0.2, 1],
    isMobile ? [1, 1] : [1, 1.5]
  );

  if (!photo) {
    return null;
  }

  // Baseline mobile en "tablet" (1024px) pour rester net sur écran Retina DPR2-3.
  // srcSet fourni dans tous les cas : le navigateur choisit la meilleure taille selon le DPR.
  const optimizedSrc = getOptimizedImageUrl(
    photo,
    isMobile ? "tablet" : "desktop"
  );

  // Placeholder ultra léger (20px, très compressé) pour effet blur pendant le chargement
  const placeholderSrc = getOptimizedImageUrl(photo, "placeholder");

  // Mobile : srcSet restreint à mobile+tablet pour éviter que le DPR pousse le navigateur
  // à télécharger la version 1920w (~670 KB) sur un écran de 375px.
  const srcSet = generateSrcSet(photo, { mobileOnly: isMobile }) || undefined;
  const sizes = srcSet
    ? generateSizes({ mobileOnly: isMobile })
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden ${isMobile ? "h-[500px]" : "h-[650px]"} ${className}`}
      style={isMobile ? mobileOptimizedStyle : undefined}
    >
      {/* Placeholder flou en arrière-plan — reste monté pour un cross-fade propre */}
      <img
        src={placeholderSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center blur-xl scale-110 transition-opacity duration-500 ease-out"
        style={{ filter: "blur(20px)", opacity: isLoaded ? 0 : 1 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full relative"
      >
        <motion.img
          ref={imgRef}
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
