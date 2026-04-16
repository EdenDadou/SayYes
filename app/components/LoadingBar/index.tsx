import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingBarProps {
  onComplete?: () => void;
  /** Si true, la barre reste en chargement indéfini jusqu'au démontage du composant */
  indefinite?: boolean;
}

export default function LoadingBar({
  onComplete,
  indefinite = false,
}: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Mode indéfini : la barre progresse jusqu'à 90% et reste là
    if (indefinite) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          const increment =
            prev < 60 ? 3 + Math.random() * 4 : 1 + Math.random() * 2;
          return Math.min(prev + increment, 90);
        });
      }, 50);

      return () => clearInterval(interval);
    }

    // Mode normal : timeout maximum 400ms pour ne pas bloquer sur les assets lourds (vidéo)
    const completeBar = () => {
      setProgress(100);
      setTimeout(() => {
        setIsComplete(true);
        onComplete?.();
      }, 300);
    };

    // Si la page est déjà chargée, compléter immédiatement
    if (document.readyState === "complete") {
      setProgress(90);
      setTimeout(completeBar, 200);
      return;
    }

    // Progression visuelle fluide
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // Plafonner à 95% en attendant la complétion
        const increment =
          prev < 70 ? 2 + Math.random() * 3 : 0.5 + Math.random() * 1;
        return Math.min(prev + increment, 95);
      });
    }, 50);

    // Forcer la complétion après 400ms maximum (ne pas attendre la vidéo)
    const forceComplete = setTimeout(() => {
      clearInterval(interval);
      completeBar();
    }, 400);

    // Complétion anticipée si la page charge avant 400ms
    const handleLoad = () => {
      clearInterval(interval);
      clearTimeout(forceComplete);
      setProgress(95);
      setTimeout(completeBar, 200);
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearInterval(interval);
      clearTimeout(forceComplete);
      window.removeEventListener("load", handleLoad);
    };
  }, [onComplete, indefinite]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full h-1 z-[9999] bg-black/20"
        >
          <motion.div
            className="h-full holographic-bg relative overflow-hidden"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Effet de brillance animé */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
