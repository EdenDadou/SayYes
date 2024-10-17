import SvgSection4Outro from "~/assets/icons/IconsSection4/Section4Outro";
import "~/styles/index";
import { motion } from "framer-motion";
import SvgCheckHolo from "~/assets/icons/IconsSection4/CheckHolo";
import SvgCheck from "~/assets/icons/IconsSection4/Check";

const engagementsL1 = [
  "Indépendant & agile",
  "Indépendant & agile",
  "Validation à chaque étape du projet",
  "Obligation de résultat & des délais",
  "Indépendant & agile",
];
const engagementsL2 = [
  "+15 d’XP en design",
  "+15 d’XP en design",
  "Livraison des fichier sources",
  "Prestation au forfait & tarif transparents",
  "+15 d’XP en design",
];
const engagementsL3 = [
  "Rapide & réactif",
  "Rapide & réactif",
  "Équipement & coaching des équipes",
  "Gestion de projet & des intervenants",
  "Rapide & réactif",
];

const engagements = [engagementsL1, engagementsL2, engagementsL3];

export default function Section4Outro() {
  return (
    <div className="flex justify-center flex-col items-center gap-24 w-full px-10 z-20 bg-white">
      <SvgSection4Outro className="z-10" />

      <div className="flex flex-col gap-4 w-[200%] justify-center items-center overflow-hidden h-max">
        {engagements.map((array, index) => (
          <div
            key={index}
            className="flex flex-row justify-center gap-4 w-full bg-red-full mb-5"
          >
            {array.map((item, i) => (
              <motion.div
                key={`${item}-${i}`}
                initial={{ scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "100px" }}
                className={`p-3 px-5 rounded-full flex flex-row items-start justify-center shadow-lg gap-2 ${
                  [1, 2, 3].includes(i)
                    ? "bg-gradient-gray-400"
                    : "bg-gradient-gray-200 border-custom"
                }`}
              >
                <div className="w-[40px] h-[35px] flex items-center justify-center">
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
