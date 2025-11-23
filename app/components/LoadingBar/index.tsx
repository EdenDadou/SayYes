import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingBarProps {
  onComplete?: () => void;
}

export default function LoadingBar({ onComplete }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Détection du chargement réel de la page
    const checkPageLoad = () => {
      if (document.readyState === "complete") {
        // Si la page est déjà chargée, on accélère la progression
        setProgress(90);
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 300);
        }, 200);
        return;
      }
    };

    // Vérifier immédiatement
    checkPageLoad();

    // Simulation du chargement avec une progression fluide
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        // Accélération progressive puis ralentissement vers la fin
        const increment = prev < 70 ? 2 + Math.random() * 3 : 0.5 + Math.random() * 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    // Écouter le chargement de la page
    window.addEventListener("load", () => {
      setProgress(95);
      setTimeout(() => {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          onComplete?.();
        }, 300);
      }, 200);
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", () => {});
    };
  }, [onComplete]);

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

