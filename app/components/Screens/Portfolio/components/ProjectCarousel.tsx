import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";
import ContentPortfolio from "~/components/Card/components/ContentPortfolio";
import Star from "~/assets/icons/Star";
import { usePortfolio } from "~/contexts/PortfolioContext";
import ArrowBig from "~/assets/icons/ArrowBig";

interface ProjectCarouselProps {
  className?: string;
}

export default function ProjectCarousel({
  className = "",
}: ProjectCarouselProps) {
  const {
    portfolio,
    allPortfolios: portfolios,
    fetchPortfolioBySlug,
    fetchAllPortfolios,
  } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerView = 4; // Affiche 4 cartes: 2 complètes au centre + 2 bouts sur les côtés

  // Fetch data on mount
  useEffect(() => {
    fetchAllPortfolios();
  }, [fetchPortfolioBySlug, fetchAllPortfolios]);

  // Filter out current portfolio first
  const filteredPortfolios =
    portfolios?.filter((project) => project.id !== portfolio?.id) ?? [];

  // If no portfolios to show, don't render anything
  if (filteredPortfolios.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredPortfolios.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredPortfolios.length - 1 : prevIndex - 1
    );
  };

  // Get items for display with infinite loop support
  // We need 4 items: 1 partial left + 2 center + 1 partial right
  const getVisibleItems = () => {
    const items = [];
    // Start from -1 to get the left partial card
    for (let i = -1; i < itemsPerView - 1; i++) {
      const index =
        (currentIndex + i + filteredPortfolios.length) %
        filteredPortfolios.length;
      items.push({ ...filteredPortfolios[index], position: i });
    }
    return items;
  };

  // Card width + gap
  const cardWidth = 490;
  const gap = 16;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? cardWidth + gap : -(cardWidth + gap),
      opacity: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? cardWidth + gap : -(cardWidth + gap),
      opacity: 0.5,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className={`relative w-full pt-16 gap-12 z-10 ${className}`}>
      {/* Title Section */}
      <div className="max-w-[990px] m-auto">
        <h2 className="flex flex-row items-center gap-4 text-3xl font-bold text-white font-jakarta mb-4">
          <Star className="w-8 h-8 text-white" /> Nos Love Stories
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        {/* Carousel Content */}
        <div className="relative h-[370px] w-full">
          {/* Navigation Arrows - centered vertically with cards */}
          <div className="absolute top-1/2 -translate-y-1/2 w-[1050px] left-1/2 -translate-x-1/2 flex flex-row justify-between items-center z-20">
            <button
              onClick={prevSlide}
              className="z-20 backdrop-blur-3xl hover:bg-white/20 rounded-full transition-all duration-300 group"
              aria-label="Projet précédent"
            >
              <ArrowBig className="w-[77px] h-[77px] text-white transition-transform rotate-180" />
            </button>

            <button
              onClick={nextSlide}
              className="z-20 backdrop-blur-3xl hover:bg-white/20 rounded-full transition-all duration-300 group"
              aria-label="Projet suivant"
            >
              <ArrowBig className="w-[77px] h-[77px] text-white transition-transform" />
            </button>
          </div>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
                opacity: { duration: 0.4, ease: "easeOut" },
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
              className="absolute flex items-center -translate-y-1/2"
              style={{
                gap: `${gap}px`,
                // 4 cards: [partial left, center1, center2, partial right]
                // To center cards 1&2: offset by (1 full card + 1.5 gaps + half of center width)
                left: `calc(50% - ${cardWidth * 2 + gap * 1.5}px)`,
              }}
            >
              {getVisibleItems().map((project) => (
                <div
                  key={`${project.id}-${project.position}`}
                  className="flex-shrink-0"
                  style={{ width: `${cardWidth}px` }}
                >
                  <Card
                    height="370px"
                    content={
                      <ContentPortfolio
                        imageUrl={project.photoCouverture}
                        titre={project.titre}
                        topTitle={portfolio?.topTitle}
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
