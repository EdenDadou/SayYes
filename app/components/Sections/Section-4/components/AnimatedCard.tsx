import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import useDetectScroll from "@smakss/react-scroll-direction";

interface AnimatedCardProps {
  svg: JSX.Element;
  index: number;
  inView: boolean;
}

export const AnimatedCard = ({ svg, index, inView }: AnimatedCardProps) => {
  const controls = useAnimation();
  const { scrollDir } = useDetectScroll();

  useEffect(() => {
    const width = window.innerWidth;
    if (inView) {
      controls.start({
        x: scrollDir === "up" ? width / 2 - 200 : -width / 2, // Adjust the values as needed
        transition: {
          duration: scrollDir === "up" ? 4 : 9,
          delay: index * 0.1,
        },
      });
    }
  }, [scrollDir, inView, controls]);

  return (
    <motion.div animate={controls} initial={{ x: 200 }}>
      {svg}
    </motion.div>
  );
};
