import { motion } from "framer-motion";
import type { BlocUseCase } from "~/types/landing-page";

interface Portfolio {
  id: string;
  titre: string;
  imageCover: string;
  description?: string;
}

interface BlocUseCaseFrontProps {
  bloc: BlocUseCase;
  color: string;
  portfolios?: Portfolio[];
}

export default function BlocUseCaseFront({ bloc, color, portfolios = [] }: BlocUseCaseFrontProps) {
  // Parse le titre pour colorer une partie
  const titleParts = bloc.title.split(",");
  const mainTitle = titleParts[0];
  const coloredPart = titleParts.length > 1 ? titleParts.slice(1).join(",") : "";

  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12"
        style={{ fontFamily: "Jakarta Bold" }}
      >
        <span className="text-white">{mainTitle}</span>
        {coloredPart && (
          <span style={{ color }}>
            {coloredPart}
          </span>
        )}
      </motion.h2>

      {/* Portfolio grid */}
      {portfolios && portfolios.length > 0 ? (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio, index) => (
              <motion.a
                key={portfolio.id}
                href={`/portfolio/${portfolio.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={portfolio.imageCover}
                  alt={portfolio.titre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-white text-xl font-semibold mb-2"
                    style={{ fontFamily: "Jakarta Semi Bold" }}
                  >
                    {portfolio.titre}
                  </h3>
                  {portfolio.description && (
                    <p className="text-white/60 text-sm line-clamp-2" style={{ fontFamily: "Jakarta" }}>
                      {portfolio.description}
                    </p>
                  )}
                </div>

                {/* Hover arrow */}
                <div
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                  style={{ backgroundColor: color }}
                >
                  <span className="text-white">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-white/50" style={{ fontFamily: "Jakarta" }}>
          Aucun projet à afficher
        </div>
      )}

      {/* View all button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <a
          href="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all"
          style={{ fontFamily: "Jakarta Semi Bold" }}
        >
          Voir tous nos projets
          <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}
