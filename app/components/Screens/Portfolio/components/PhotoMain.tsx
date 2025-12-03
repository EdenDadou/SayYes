import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PhotoMainProps {
  photo: string;
  title: string;
  alt?: string;
  className?: string;
}

export default function PhotoMain({
  photo,
  title,
  alt,
  className = "",
}: PhotoMainProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform le scroll en valeur de scale (zoom)
  // Quand on scroll vers le bas: l'image zoom vers l'avant (agrandit)
  // Début: scale 1 (normal) -> Fin: scale 1.3 (zoomé vers l'avant)
  const scale = useTransform(scrollYProgress, [0.2, 1], [1, 1.5]);

  if (!photo) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden h-[650px] ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full"
      >
        <motion.img
          src={photo}
          alt={alt || `${title} - Photo principale`}
          className="w-full h-full object-cover object-center"
          style={{ scale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </motion.div>
    </div>
  );
}
