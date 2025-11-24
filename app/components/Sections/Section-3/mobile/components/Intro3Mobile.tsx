import AnimatedText from "~/components/AnimatedText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const text =
  "Croissance, visibilité, marque\n employeur, nous avons tout pour\n développer votre notoriété à\n tous les niveaux !";

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

export default function Intro3Mobile() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, amount: "all" });

  return (
    <div
      className="flex flex-col justify-between items-end w-full pb-10 z-20"
      ref={container}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        className="w-full px-8"
      >
        <img
          loading="lazy"
          src="images/section3/Intro3.png"
          className="w-full"
          alt="Un besoin? Decouvrez nos solutions !"
        />
      </motion.div>
      <AnimatedText
        text={text}
        className="w-full px-10 pb-4 text-center -mt-10"
      />
    </div>
  );
}
