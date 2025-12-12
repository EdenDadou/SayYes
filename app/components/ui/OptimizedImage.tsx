import { useState, useEffect, memo, type CSSProperties, type ImgHTMLAttributes } from "react";
import {
  getOptimizedImageUrl,
  generateSrcSet,
  generateSizes,
  type ImageSize,
} from "~/utils/optimizeImage";

const mobileOptimizedStyle: CSSProperties = {
  willChange: "auto",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout style paint",
};

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
  /** Taille à utiliser sur mobile (default: "mobile") */
  mobileSize?: ImageSize;
  /** Taille à utiliser sur desktop (default: "desktop") */
  desktopSize?: ImageSize;
  /** Désactiver le placeholder blur */
  noPlaceholder?: boolean;
  /** Priorité haute (eager loading) */
  priority?: boolean;
  /** Callback quand l'image est chargée */
  onImageLoad?: () => void;
  /** Forcer le mode mobile */
  forceMobile?: boolean;
  /** Rendre sans wrapper div (pour garder le layout original) */
  noWrapper?: boolean;
  /** Désactiver les optimisations GPU mobile (pour les images de fond) */
  noMobileOptimization?: boolean;
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  mobileSize = "mobile",
  desktopSize = "desktop",
  noPlaceholder = false,
  priority = false,
  onImageLoad,
  forceMobile,
  noWrapper = false,
  noMobileOptimization = false,
  className = "",
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(noPlaceholder);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(forceMobile ?? false);

  useEffect(() => {
    if (forceMobile === undefined) {
      setIsMobile(window.innerWidth < 768);
    }
  }, [forceMobile]);

  // Fallback: si l'image ne charge pas après 5s, la rendre visible quand même
  useEffect(() => {
    if (!isLoaded && !noPlaceholder) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded, noPlaceholder]);

  if (!src) return null;

  const optimizedSrc = getOptimizedImageUrl(src, isMobile ? mobileSize : desktopSize);
  const placeholderSrc = noPlaceholder ? undefined : getOptimizedImageUrl(src, "placeholder");
  const srcSet = isMobile ? undefined : generateSrcSet(src) || undefined;
  const sizes = isMobile ? undefined : (srcSet ? generateSizes() : undefined);

  // Appliquer les optimisations mobile seulement si activées
  const shouldApplyMobileStyles = isMobile && !noMobileOptimization;

  // En cas d'erreur, utiliser l'URL originale
  const finalSrc = hasError ? src : optimizedSrc;

  // Mode sans wrapper - rendu direct de l'img
  if (noWrapper || noPlaceholder) {
    return (
      <img
        src={finalSrc}
        srcSet={hasError ? undefined : srcSet}
        sizes={hasError ? undefined : sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        style={shouldApplyMobileStyles ? { ...mobileOptimizedStyle, ...style } : style}
        onLoad={() => {
          setIsLoaded(true);
          onImageLoad?.();
        }}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
        {...props}
      />
    );
  }

  // Mode avec wrapper et placeholder blur
  return (
    <div className={`relative ${className}`} style={shouldApplyMobileStyles ? { ...mobileOptimizedStyle, ...style } : style}>
      {/* Placeholder blur */}
      {placeholderSrc && !isLoaded && !hasError && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
        />
      )}

      <img
        src={finalSrc}
        srcSet={hasError ? undefined : srcSet}
        sizes={hasError ? undefined : sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => {
          setIsLoaded(true);
          onImageLoad?.();
        }}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setIsLoaded(true); // Rendre visible même en cas d'erreur avec fallback
          }
        }}
        {...props}
      />
    </div>
  );
});

export default OptimizedImage;
