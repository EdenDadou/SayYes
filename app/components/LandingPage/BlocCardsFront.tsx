import { motion } from "framer-motion";
import type { BlocCards, Card } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";

interface BlocCardsFrontProps {
  bloc: BlocCards;
  color: string;
}

function CardItem({ card, color, index }: { card: Card; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
        {/* Gradient top accent */}
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Card content */}
        <h3
          className="text-white text-lg md:text-xl font-semibold mb-4 leading-tight"
          style={{ fontFamily: "Jakarta Semi Bold" }}
        >
          {card.titre}
        </h3>

        {card.type === "concurrence" && card.blocs && (
          <div className="space-y-4">
            {card.blocs.map((bloc, blocIndex) => (
              <div key={blocIndex}>
                {bloc.sousTitre && (
                  <p className="text-white/60 text-sm mb-2" style={{ fontFamily: "Jakarta" }}>
                    {bloc.sousTitre}
                  </p>
                )}
                <ul className="space-y-2">
                  {bloc.lines.map((line, lineIndex) => (
                    <li key={lineIndex} className="flex items-start gap-2">
                      <span className={bloc.linesType === "coche" ? "text-green-400" : "text-red-400"}>
                        {bloc.linesType === "coche" ? "✓" : "✗"}
                      </span>
                      <span className="text-white/80 text-sm" style={{ fontFamily: "Jakarta" }}>
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {card.lines && (
          <p className="text-white/70 text-sm mt-2" style={{ fontFamily: "Jakarta" }}>
            {card.lines}
          </p>
        )}

        {card.mention && (
          <p className="text-white/50 text-xs mt-4 italic" style={{ fontFamily: "Jakarta" }}>
            {card.mention}
          </p>
        )}

        {/* Bottom line accent */}
        <div className="absolute bottom-6 left-6 w-12 h-0.5 rounded-full" style={{ backgroundColor: color }} />
      </div>
    </motion.div>
  );
}

export default function BlocCardsFront({ bloc, color }: BlocCardsFrontProps) {
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
          ✦ Expert en création d'identité visuelle et charte graphique ✦
        </span>
      </motion.div>

      {/* Title */}
      {bloc.lineTitle && bloc.lineTitle.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <AnimatedTitle lines={bloc.lineTitle} color={color} />
        </motion.div>
      )}

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bloc.cards.map((card, index) => (
          <CardItem key={index} card={card} color={color} index={index} />
        ))}
      </div>

      {/* Conclusion bar */}
      {bloc.cta && bloc.cta.label && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mt-8"
        >
          <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center justify-center gap-3">
            <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
              <span className="text-white">→</span>
            </span>
            <span className="text-white/90" style={{ fontFamily: "Jakarta Semi Bold" }}>
              {bloc.cta.label}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
