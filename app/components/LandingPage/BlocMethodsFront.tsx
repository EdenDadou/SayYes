import { motion } from "framer-motion";
import type { BlocMethods } from "~/types/landing-page";

interface BlocMethodsFrontProps {
  bloc: BlocMethods;
  color: string;
}

export default function BlocMethodsFront({ bloc, color }: BlocMethodsFrontProps) {
  // Parse le titre pour colorer une partie (après ":")
  const titleParts = bloc.titre.split(":");
  const mainTitle = titleParts[0];
  const coloredPart = titleParts.length > 1 ? ":" + titleParts.slice(1).join(":") : "";

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
          ✦ {bloc.subTitle} ✦
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-16"
        style={{ fontFamily: "Jakarta Bold" }}
      >
        <span className="text-white">{mainTitle}</span>
        {coloredPart && (
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${color}, #a5f3fc, ${color})`,
            }}
          >
            {coloredPart}
          </span>
        )}
      </motion.h2>

      {/* Method cards */}
      <div className="max-w-5xl mx-auto space-y-8">
        {bloc.cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative"
          >
            {/* Card with image background */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              {/* Background image */}
              {card.media && card.media.url && (
                <div className="absolute inset-0">
                  {card.media.type === "video" ? (
                    <video
                      src={card.media.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={card.media.url}
                      alt={card.media.alt || card.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>
              )}

              {/* Content overlay */}
              <div className="relative z-10 p-8 md:p-12 min-h-[300px] flex flex-col justify-center max-w-md">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                  {card.icons && card.icons[0] ? (
                    <span className="text-white text-xl">{card.icons[0]}</span>
                  ) : (
                    <span className="text-white text-xl">◆</span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="text-white text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "Jakarta Bold" }}
                >
                  {card.title}
                </h3>

                {/* Lines */}
                <ul className="space-y-2">
                  {card.lines.map((line, lineIndex) => (
                    <li key={lineIndex} className="flex items-start gap-2">
                      <span style={{ color }} className="mt-1">✓</span>
                      <span className="text-white/80" style={{ fontFamily: "Jakarta" }}>
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div className="mt-6 w-16 h-0.5 rounded-full" style={{ backgroundColor: color }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conclusion */}
      {bloc.conclusion && bloc.conclusion.elements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p
            className="text-lg md:text-xl"
            style={{
              fontFamily: "Jakarta",
              color: bloc.conclusion.colorType === "color" ? color : "white",
            }}
          >
            {bloc.conclusion.elements.map((elem, i) =>
              elem.type === "icon" ? (
                <span key={i} className="mx-1">{elem.name}</span>
              ) : (
                <span key={i}>{elem.text}</span>
              )
            )}
          </p>
        </motion.div>
      )}
    </section>
  );
}
