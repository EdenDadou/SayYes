import { motion } from "framer-motion";
import type { BlocCards, CardOffre } from "~/types/landing-page";

interface BlocOffresFrontProps {
  bloc: BlocCards;
  color: string;
}

// Icons mapping
const IconMap: Record<string, JSX.Element> = {
  starter: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  scaleup: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  surmesure: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

function OffreCard({ card, color, index }: { card: CardOffre; color: string; index: number }) {
  const iconKey = index === 0 ? "starter" : index === 1 ? "scaleup" : "surmesure";
  const lines = card.lines ? card.lines.split("\n").filter(l => l.trim()) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group h-full"
    >
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border"
          style={{
            borderColor: `${color}40`,
            backgroundColor: `${color}10`,
            color: color,
          }}
        >
          {IconMap[iconKey]}
        </div>

        {/* Title */}
        <h3
          className="text-white text-2xl md:text-3xl font-bold mb-6"
          style={{ fontFamily: "Jakarta Bold" }}
        >
          {card.titre}
        </h3>

        {/* Features list */}
        <ul className="space-y-3 flex-grow">
          {lines.map((line, lineIndex) => (
            <li key={lineIndex} className="flex items-start gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5"
                style={{ backgroundColor: `${color}30`, color }}
              >
                ✓
              </span>
              <span className="text-white/80" style={{ fontFamily: "Jakarta" }}>
                {line}
              </span>
            </li>
          ))}
        </ul>

        {/* Mention / delivery time */}
        {card.mention && (
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-white/50 text-sm" style={{ fontFamily: "Jakarta" }}>
              {card.mention}
            </span>

            {/* CTA button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm hover:bg-white/5 transition-all"
              style={{ fontFamily: "Jakarta" }}
            >
              {card.cta || "En savoir plus"}
              <span className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-xs">
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function BlocOffresFront({ bloc, color }: BlocOffresFrontProps) {
  // Parse le titre pour colorer une partie
  const titleParts = bloc.title.split(" de ");
  const mainTitle = titleParts[0] + " de";
  const coloredPart = titleParts.length > 1 ? " " + titleParts.slice(1).join(" de ") : "";

  // Filter only "offre" type cards
  const offreCards = bloc.cards.filter((card): card is CardOffre => card.type === "offre");

  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Background halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-10 blur-[150px] rounded-full"
        style={{ background: `radial-gradient(ellipse, ${color}, transparent)` }}
      />

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <span className="text-white/50 text-sm tracking-widest" style={{ fontFamily: "Jakarta" }}>
          ✦ Nos offres en création d'identité visuelle et branding ✦
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
        <span className="text-white">{mainTitle}</span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, ${color}, #a5f3fc, #fef9c3)`,
          }}
        >
          {coloredPart}
        </span>
      </motion.h2>

      {/* Cards grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offreCards.map((card, index) => (
          <OffreCard key={index} card={card} color={color} index={index} />
        ))}
      </div>
    </section>
  );
}
