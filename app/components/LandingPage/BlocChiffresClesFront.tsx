import { motion } from "framer-motion";
import type { BlocChiffresCles } from "~/types/landing-page";

interface BlocChiffresClesFrontProps {
  bloc: BlocChiffresCles;
  color: string;
}

export default function BlocChiffresClesFront({ bloc, color }: BlocChiffresClesFrontProps) {
  // Parse le titre pour colorer une partie (mot "aimez" ou partie en italique)
  const titleWords = bloc.title.split(" ");

  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <span className="text-white/50 text-sm tracking-widest" style={{ fontFamily: "Jakarta" }}>
          ✦ L'agence qui met tout le monde d'accord ✦
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12"
        style={{ fontFamily: "Jakarta Bold" }}
      >
        {titleWords.map((word, index) => (
          <span key={index}>
            {word.toLowerCase() === "aimez" ? (
              <span className="italic" style={{ color }}>{word}</span>
            ) : (
              <span className="text-white">{word}</span>
            )}
            {index < titleWords.length - 1 && " "}
          </span>
        ))}
      </motion.h2>

      {/* Numbers grid */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-0">
          {bloc.numbers.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center px-8 py-4 relative"
            >
              {/* Separator line (not for last item) */}
              {index < bloc.numbers.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20" />
              )}

              {/* Number with gradient */}
              <motion.span
                className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(180deg, ${color}, #a5f3fc, #fef9c3)`,
                }}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                {item.title}
              </motion.span>

              {/* Subtitle */}
              <span className="text-white/60 text-sm mt-2" style={{ fontFamily: "Jakarta" }}>
                {item.subtitle}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional features list */}
      {bloc.media && bloc.media.url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12 space-y-3"
        >
          <FeatureRow
            text="Un interlocuteur unique, du brief au déploiement"
            color={color}
          />
          <FeatureRow
            text="Zéro template générique, que du sur-mesure"
            color={color}
          />
          <FeatureRow
            text="Vous êtes 100% propriétaire de vos créations > fichiers sources inclus"
            color={color}
          />
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
      className="bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
          style={{ backgroundColor: `${color}30`, color }}
        >
          ✓
        </span>
        <span className="text-white/80" style={{ fontFamily: "Jakarta" }}>
          {text}
        </span>
      </div>
      <span className="text-white/30">✦</span>
    </motion.div>
  );
}
