import { motion, MotionValue, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCardProps {
  card: JSX.Element;
  i: number;
  progress: MotionValue<number>;
}

export const AnimatedCard = ({ card, i }: AnimatedCardProps) => {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-180px" });

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.1 * i,
        ease: "easeOut",
      },
    },
    hidden: { opacity: 0, x: (5 - i) * 100 },
  };
  return (
    <motion.div
      ref={container}
      key={i}
      // style={{ scale }}
      initial={{
        opacity: 0,
        x: -100,
      }}
      variants={variants}
      animate={isInView ? "visible" : "hidden"}
      className="flex-shrink-0 h-full flex justify-center items-center"
    >
      {card}
    </motion.div>
  );
};
