import { motion, MotionValue, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCardProps {
  card: JSX.Element;
  i: number;
  progress: MotionValue<number>;
}

export const AnimatedCard = ({ card, i }: AnimatedCardProps) => {
  const container = useRef(null);
  const margin = i !== 4 ? "-100px" : "40px";
  const delay = i !== 4 ? 0.2 * i : 0.4;
  const isInView = useInView(container, {
    once: true,
    amount: "some",
    margin: margin,
  });

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      },
    },
    hidden: { opacity: 0, x: (5 - i) * 100 },
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
      animate={isInView ? "visible" : "hidden"}
      className="flex-shrink-0 h-full flex justify-center items-center"
    >
      <div className="holographic-card">{card}</div>
    </motion.div>
  );
};
