import { motion, MotionValue, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCardProps {
  card: string;
  i: number;
  progress: MotionValue<number>;
}

export const AnimatedCardMobile = ({ card, i }: AnimatedCardProps) => {
  const container = useRef(null);

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
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
      animate={"visible"}
      className="w-[80vw] mb-20"
    >
      <img src={card} alt="cards" className="w-screen" />
    </motion.div>
  );
};
