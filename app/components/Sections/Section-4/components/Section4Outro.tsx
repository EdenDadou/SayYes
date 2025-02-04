import SvgSection4Outro from "~/components/Sections/Section-4/components/assets/Section4Outro";
import { motion, useInView } from "framer-motion";
import SvgCheckHolo from "~/components/Sections/Section-4/components/assets/CheckHolo";
import SvgCheck from "~/components/Sections/Section-4/components/assets/Check";
import Halo from "~/components/BackgroundLayer/components/Halo";
import { useRef } from "react";

const engagementsL1 = [
  "Indépendant & agile",
  "Indépendant & agile",
  "Validation à chaque étape",
  "Culture du résultat",
  "Indépendant & agile",
];
const engagementsL2 = [
  "+15 d’XP en design",
  "+15 d’XP en design",
  "Livraison des fichier sources",
  "Prestation au forfait",
  "+15 d’XP en design",
];
const engagementsL3 = [
  "Équipe réactive",
  "Équipe réactive",
  "Coaching des collaborateurs",
  "Gestion de projet",
  "Équipe réactive",
];

const engagements = [engagementsL1, engagementsL2, engagementsL3];
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

export default function Section4Outro() {
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
        <SvgSection4Outro className="-ml-[5%] z-50" />
      </motion.div>
      <Halo
        size={700}
        rotation={30}
        style={{ bottom: "-10%", right: "-20%" }}
      />
      <div className="flex flex-col gap-4 w-[200%] justify-center items-center overflow-hidden h-max pb-10">
        {engagements.map((array, index) => (
          <div
            key={index}
            className="flex flex-row justify-center gap-4 w-full mb-1"
          >
            {array.map((item, i) => (
              <motion.div
                key={`${item}-${i}`}
                initial={{ scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "100px" }}
                className={`p-3 px-20 rounded-full flex flex-row items-start justify-center shadow-lg gap-2 relative cursor-default ${
                  [1, 2, 3].includes(i)
                    ? "bg-gradient-gray-500 holographic-speciality"
                    : "bg-gradient-gray-200 border-custom"
                }`}
              >
                <div className="w-[40px] h-[35px] flex items-center justify-center absolute left-3">
                  {[1, 2, 3].includes(i) ? (
                    <SvgCheckHolo className="w-full" />
                  ) : (
                    <SvgCheck className="w-[28px] h-[28px]" />
                  )}
                </div>
                <p
                  className={`text-lg font-jakarta ${
                    [1, 2, 3].includes(i) ? "holographic-text" : "text-gray-200"
                  }`}
                >
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
