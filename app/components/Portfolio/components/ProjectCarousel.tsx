import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";
import ContentPortfolio from "~/components/Card/components/ContentPortfolio";
import ArrowLight from "~/assets/icons/ArrowLight";
import Star from "~/assets/icons/Star";

interface Portfolio {
  id: string;
  titre: string;
  slug: string;
  photoCouverture: string;
}

interface ProjectCarouselProps {
  portfolios: Portfolio[];
  className?: string;
}

export default function ProjectCarousel({
  portfolios,
  className = "",
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerView = 4; // Affiche 4 cartes: 2 complètes au centre + 2 bouts sur les côtés

  // If no portfolios, don't render anything
  if (!portfolios || portfolios.length === 0) {
    return null;
  }

  const maxIndex = Math.max(0, portfolios.length - itemsPerView);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className={`relative w-full py-16 gap-12 ${className}`}>
      {/* Title Section */}
      <h2 className="flex flex-row items-center gap-4 text-3xl font-bold text-white font-jakarta mb-4 px-32">
        <Star className="w-8 h-8 text-white" /> Nos Love Stories
      </h2>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group"
          aria-label="Projet précédent"
        >
          <ArrowLight className="w-12 h-12 text-white rotate-180 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group"
          aria-label="Projet suivant"
        >
          <ArrowLight className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Carousel Content */}
        <div className="relative h-[400px] overflow-visible">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevSlide();
                }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {portfolios
                .slice(currentIndex, currentIndex + itemsPerView)
                .map((project, index) => (
                  <div key={project.id} className="w-[490px] flex-shrink-0">
                    <Card
                      height="370px"
                      content={
                        <ContentPortfolio
                          imageUrl={project.photoCouverture}
                          titre={project.titre}
                          slug={project.slug}
                        />
                      }
                      borderClass="card-hover"
                    />
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
