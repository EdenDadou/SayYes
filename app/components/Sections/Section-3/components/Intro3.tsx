import SvgSection3Intro from "~/components/Sections/Section-3/components/assets/Section3Intro";
import AnimatedText from "~/components/AnimatedText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const text =
  "Conduite du changement,\n communication interne &\n externe, dotez-vous de\n supports stratégiques !";

const variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      delay: 0.2,
      ease: "easeOut",
    },
  },
  hidden: { opacity: 0, x: -100 },
};

export default function Intro3() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

  return (
    <div
      className="flex flex-row justify-between items-end gap-[10%] w-full pb-10 md:px-32 z-20"
      ref={container}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        className="w-1/2"
      >
        <SvgSection3Intro className="w-full" />
      </motion.div>
      <AnimatedText text={text} className="w-1/2 pb-4" />
    </div>
  );
}
