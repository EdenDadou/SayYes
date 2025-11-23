import { motion, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCardProps {
  card: JSX.Element;
  i: number;
  progress: MotionValue<number>;
  isSnapped: boolean;
}

export const AnimatedCard = ({ card, i, isSnapped }: AnimatedCardProps) => {
  const container = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Déclencher l'animation quand la card est snappée
  useEffect(() => {
    if (isSnapped) {
      setShouldAnimate(true);
    }
  }, [isSnapped]);

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hidden: { opacity: 0, x: (7 - i) * 100 },
  };

  return (
    <motion.div
      ref={container}
      key={i}
      initial={{
        opacity: 0,
        x: -100,
      }}
      variants={variants}
      animate={shouldAnimate ? "visible" : "hidden"}
      className="flex-shrink-0 h-full flex justify-center items-center"
    >
      <motion.div
        animate={{
          scale: isSnapped ? 1.15 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        style={{
          transformOrigin: "center",
        }}
      >
        {card}
      </motion.div>
    </motion.div>
  );
};
