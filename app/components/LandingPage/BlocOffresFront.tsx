import { motion } from "framer-motion";
import type { BlocCards, CardOffre } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";
import Coche from "~/assets/icons/Coche";
import ArrowLight from "~/assets/icons/ArrowLight";
import Star from "~/assets/icons/Star";

interface BlocOffresFrontProps {
  bloc: BlocCards;
  color: string;
}

function OffreCard({
  card,
  color,
  index,
}: {
  card: CardOffre;
  color: string;
  index: number;
}) {
  const lines = card.lines ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group h-full"
    >
      <div
        className="relative rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col overflow-hidden"
        style={{
          background: card.image?.url
            ? `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`
            : "linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        }}
      >
        {/* Background image */}
        {card.image?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${card.image.url})` }}
          />
        )}
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          {card.logo?.url && (
            <div className="w-20 h-20 rounded-full border border-white/30 p-6 flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={card.logo.url}
                alt={card.logo.alt || card.titre}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Title */}
          <h3
            className="text-white text-2xl md:text-3xl font-bold mb-6"
            style={{ fontFamily: "Jakarta Bold" }}
          >
            {card.titre}
          </h3>

          <div className="w-16 h-[2px] holographic-bg rounded-full mb-8" />
          {/* Features list */}
          <ul className="space-y-3 flex-grow">
            {lines.map((line, lineIndex) => (
              <li key={lineIndex} className="flex items-start gap-3">
                <Coche className="w-5 h-5 flex-shrink-0" />
                <span
                  className="text-white/80"
                  style={{ fontFamily: "Jakarta" }}
                >
                  {line}
                </span>
              </li>
            ))}
          </ul>

          {/* Mention / delivery time */}
          {card.mention && (
            <div className="mt-6 pt-6 flex items-center justify-between">
              <span
                className="holographic-text text-sm"
                style={{ fontFamily: "Jakarta" }}
              >
                {card.mention.split(" ").map((word, i, arr) => (
                  <span key={i}>
                    {word}
                    {i === 1 ? <br /> : i < arr.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>

              {/* CTA button */}
              <a
                href="#contact"
                className="light-border inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm hover:bg-white/5 transition-all"
                style={{ fontFamily: "Jakarta" }}
              >
                {card.cta || "En savoir plus"}
                <ArrowLight className="w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function BlocOffresFront({ bloc, color }: BlocOffresFrontProps) {
  // Filter only "offre" type cards
  const offreCards = bloc.cards.filter(
    (card): card is CardOffre => card.type === "offre"
  );

  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden flex flex-col items-center">
      {/* Background halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-10 blur-[150px] rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${color}, transparent)`,
        }}
      />

      {/* Subtitle */}
      {bloc.subtitle && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span
            className="text-white/50 text-sm tracking-widest flex flex-row gap-2"
            style={{ fontFamily: "Jakarta" }}
          >
            <Star className="w-3" fill="rgba(255,255,255,0.5)" />
            {bloc.subtitle}
            <Star className="w-3" fill="rgba(255,255,255,0.5)" />
          </span>
        </motion.div>
      )}

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
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offreCards.map((card, index) => (
          <OffreCard key={index} card={card} color={color} index={index} />
        ))}
      </div>
    </section>
  );
}
