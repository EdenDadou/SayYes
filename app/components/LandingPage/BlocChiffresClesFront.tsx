import { motion } from "framer-motion";
import type { BlocChiffresCles } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";
import Coche from "~/assets/icons/Coche";
import TwoDiamonds from "~/assets/icons/TwoDiamonds";

interface BlocChiffresClesFrontProps {
  bloc: BlocChiffresCles;
  color: string;
}

export default function BlocChiffresClesFront({
  bloc,
  color,
}: BlocChiffresClesFrontProps) {
  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden flex flex-col gap-2">
      <img
        src="images/landingpage/bgChiffreCle.png"
        className="absolute -top-32"
      />
      {/* Punchline */}
      {bloc.punchline && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span
            className="text-white/50 text-sm tracking-widest"
            style={{ fontFamily: "Jakarta" }}
          >
            ✦ {bloc.punchline} ✦
          </span>
        </motion.div>
      )}

      {/* Title */}
      {bloc.lineTitle && bloc.lineTitle.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AnimatedTitle lines={bloc.lineTitle} color={color} />
        </motion.div>
      )}

      {/* Numbers row */}
      <div className="mx-auto">
        <div className="flex flex-row justify-center items-center">
          {bloc.numbers.map((item, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center px-6 md:px-10 py-4"
              >
                {/* Number with holographic effect */}
                <motion.span
                  className="text-[60px] leading-[78px] font-jakarta holographic-text font-[600]"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                >
                  {item.title}
                </motion.span>

                {/* Subtitle */}
                <span className="text-white/60 text-[20px] font-jakarta whitespace-nowrap">
                  {item.subtitle}
                </span>
              </motion.div>

              {/* Holographic separator (not for last item) */}
              {index < bloc.numbers.length - 1 && (
                <div className="w-px h-24 holographic-bg opacity-50" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional features list */}
      {bloc.lines && bloc.lines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="w-full mx-auto mt-12 space-y-3"
        >
          {bloc.lines.map((line, index) => (
            <FeatureRow key={index} text={line} color={color} />
          ))}
        </motion.div>
      )}
    </section>
  );
}

function FeatureRow({ text, color }: { text: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm rounded-full p-4  border-custom-thin flex items-center justify-between w-full"
    >
      <div className="flex items-center justify-between w-full  gap-3">
        <div className="flex flex-row items-center gap-2">
          <Coche holographic className="w-5" />
          <span className="text-white/80" style={{ fontFamily: "Jakarta" }}>
            {text}
          </span>
        </div>
        <TwoDiamonds className="w-6" holographic />
      </div>
    </motion.div>
  );
}
