import { motion } from "framer-motion";
import type { BlocCommentaireClient } from "~/types/landing-page";

interface BlocCommentaireClientFrontProps {
  bloc: BlocCommentaireClient;
  color: string;
}

export default function BlocCommentaireClientFront({ bloc, color }: BlocCommentaireClientFrontProps) {
  return (
    <section className="relative py-16 px-4 bg-black overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
        >
          {/* Quote decoration */}
          <div className="absolute -top-4 left-8">
            <span
              className="text-6xl opacity-30"
              style={{ color }}
            >
              ❝
            </span>
          </div>

          {/* Quote text */}
          <blockquote className="relative z-10">
            <p
              className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed italic"
              style={{ fontFamily: "Jakarta" }}
            >
              {bloc.text}
            </p>
          </blockquote>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center gap-4"
          >
            {/* Author avatar placeholder */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{
                backgroundColor: `${color}30`,
                border: `2px solid ${color}`,
              }}
            >
              {bloc.author.charAt(0).toUpperCase()}
            </div>

            <div>
              <p
                className="text-white font-semibold"
                style={{ fontFamily: "Jakarta Semi Bold" }}
              >
                {bloc.author}
              </p>
              <p className="text-white/50 text-sm" style={{ fontFamily: "Jakarta" }}>
                Client satisfait
              </p>
            </div>
          </motion.div>

          {/* Stars */}
          <div className="absolute bottom-8 right-8 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color }} className="text-lg">★</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
