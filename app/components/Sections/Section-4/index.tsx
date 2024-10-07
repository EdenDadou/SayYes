import SvgSection4BgBase from "~/assets/icons/Section4/Section4BgBase";
import SvgSection4BgLt from "~/assets/icons/Section4/Section4BgLt";
import SvgSection4BgRt from "~/assets/icons/Section4/Section4BgRt";
import Section4Intro from "./components/Section4Intro";
import SvgSection4Outro from "~/assets/icons/Section4/Section4Outro";
import "~/styles/index";
import SvgCheck from "~/assets/icons/Section4/Check";
import { motion } from "framer-motion";

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

export default function Section4() {
  return (
    <div className="w-screen h-full flex justify-center items-center relative z-10 py-36 ">
      {/* SVG de fond */}
      <SvgSection4BgLt className="w-[38%] absolute z-[11] -top-20 left-0" />
      <SvgSection4BgRt className="w-[38%] absolute z-[11] -top-20 right-0" />
      <SvgSection4BgBase className="w-full absolute -top-20 left-0 right-0 overflow-hidden h-" />

      <div className="w-full flex-col overflow-hidden flex justify-center items-center gap-20">
        <Section4Intro />
        <div className="flex flex-col justify-center items-center gap-24 w-full px-10 z-20 bg-white">
          <SvgSection4Outro />

          <div className="flex flex-col gap-6 w-[200%] justify-center items-center overflow-hidden h-max">
            {engagements.map((array, index) => (
              <div
                key={index}
                className="flex flex-row justify-center gap-2 w-full bg-red-full"
              >
                {array.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ scale: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, margin: "100px" }}
                    className={`p-2 px-8 rounded-full flex flex-row items-start justify-center shadow-lg gap-2 ${
                      [1, 2, 3].includes(i)
                        ? "bg-gradient-gray-400"
                        : "bg-gradient-gray-200"
                    }`}
                  >
                    <SvgCheck width={30} />
                    <p className="text-gray-200 text-lg font-jakarta">{item}</p>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
