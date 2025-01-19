import SvgSection2Intro from "~/components/Sections/Section-2/components/assets/Section2Intro";
import AnimatedText from "~/components/AnimatedText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const text =
  "“Du Branding au développement de \n votre communication visuelle, Say Yes \n vous accompagne sur tous vos projets”";

export default function Intro2() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

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

  return (
    <div
      className="flex flex-row justify-between items-center md:px-40 gap-[7%] pt-[8%]"
      ref={container}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        className="w-[42%] h-full z-20"
      >
        <SvgSection2Intro className="w-full" />
      </motion.div>
      <AnimatedText text={text} className="w-3/5 pt-10" />
    </div>
  );
}
