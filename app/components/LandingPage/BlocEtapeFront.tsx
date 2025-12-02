import { motion } from "framer-motion";
import type { BlocEtape } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";

interface BlocEtapeFrontProps {
  bloc: BlocEtape;
  color: string;
}

export default function BlocEtapeFront({ bloc, color }: BlocEtapeFrontProps) {
  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Background media */}
      {bloc.media && bloc.media.url && (
        <div className="absolute inset-0 opacity-20">
          {bloc.media.type === "video" ? (
            <video
              src={bloc.media.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={bloc.media.url}
              alt={bloc.media.alt || "Background"}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Subtitle */}
        {bloc.subTitle && (
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

        {/* Description text */}
        {bloc.text && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/70 text-lg max-w-2xl mx-auto mb-12"
            style={{ fontFamily: "Jakarta" }}
          >
            {bloc.text}
          </motion.p>
        )}

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bloc.stepLines.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full hover:border-white/20 transition-all duration-300">
                {/* Step number */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-4"
                  style={{
                    backgroundColor: `${color}20`,
                    color: color,
                    border: `2px solid ${color}40`,
                  }}
                >
                  {index + 1}
                </div>

                {/* Step title */}
                <h3
                  className="text-white text-xl font-semibold mb-2"
                  style={{ fontFamily: "Jakarta Semi Bold" }}
                >
                  {step.title}
                </h3>

                {/* Step subtitle */}
                <p className="text-white/60" style={{ fontFamily: "Jakarta" }}>
                  {step.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        {bloc.cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: color,
                fontFamily: "Jakarta Semi Bold",
              }}
            >
              {bloc.cta}
              <span>→</span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
