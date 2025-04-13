import { motion, useInView } from "framer-motion";
import SvgCheckHolo from "~/components/Sections/Section-4/components/assets/CheckHolo";
import Halo from "~/components/BackgroundLayer/components/Halo";
import { useRef } from "react";

const engagements = [
  "Indépendant & agile",
  "Validation à chaque étape",
  "Culture du résultat",
  "+15 d’XP en design",
  "Livraison des fichier sources",
  "Prestation au forfait",
  "Équipe réactive",
  "Coaching des collaborateurs",
  "Gestion de projet",
];

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

export default function Section4OutroMobile() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

  return (
    <div
      className="flex justify-center flex-col items-center gap-12 w-full px-10 mb-40"
      ref={container}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
      >
        <img
          loading="lazy"
          src="images/section4/Outro4.png"
          alt="L'agence qui met tout le monde d'accord !"
          className="w-full"
        />
      </motion.div>
      <Halo
        size={700}
        rotation={30}
        style={{ bottom: "-10%", right: "-20%", position: "absolute" }}
      />
      <div className="flex flex-col gap-4 w-screen justify-center items-center overflow-hidden h-max pb-10 px-5">
        {engagements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "100px" }}
            className="p-2 px-3 rounded-full flex flex-row items-center justify-start shadow-lg gap-2 relative cursor-default bg-gradient-gray-500 holographic-speciality w-full"
          >
            <SvgCheckHolo className="w-10 h-10" />
            <p className="text-sm font-jakarta holographic-text">{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
