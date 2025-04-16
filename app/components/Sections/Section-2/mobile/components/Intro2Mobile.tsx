import AnimatedText from "~/components/AnimatedText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const text =
  "“Du Branding au\n développement de votre\n communication visuelle,\n Say Yes vous accompagne\n sur tous vos projets”";

export default function Intro2Mobile() {
  const container = useRef(null);
  const isInView = useInView(container, {
    once: true,
    amount: "all",
    margin: "0px 100px",
  });

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
      className="flex flex-col justify-center items-center mt-28"
      ref={container}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        className="w-full h-full z-20 flex justify-center items-center"
      >
        <img
          loading="lazy"
          src="images/section2/Intro2.png"
          className="w-3/4"
          alt="Vous êtes unique, votre com doit l'être aussi !"
        />
      </motion.div>
      <AnimatedText text={text} className="w-full text-center pt-10" />
    </div>
  );
}
