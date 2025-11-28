import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";
import ContentPortfolio from "~/components/Card/components/ContentPortfolio";
import ArrowLight from "~/assets/icons/ArrowLight";
import Star from "~/assets/icons/Star";
import { usePortfolio } from "~/contexts/PortfolioContext";
import Coeur from "~/components/Header/assets/Coeur";
import Button from "~/components/Button";
import ArrowFull from "~/assets/icons/ArrowFull";
import Arrow from "~/assets/icons/Arrow";
import CardHomePagePortfolio from "./components/CardHomePagePortfolio";
import { useNavigate } from "@remix-run/react";

interface ProjectCarouselProps {
  className?: string;
}

export default function HomeProjectCarousel({
  className = "",
}: ProjectCarouselProps) {
  const {
    portfolio,
    allPortfolios: portfolios,
    fetchPortfolioBySlug,
    fetchAllPortfolios,
  } = usePortfolio();

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dynamicPadding, setDynamicPadding] = useState(128); // 32 * 4 = 128px (fallback initial)
  const itemsPerView = 4; // Affiche 4 cartes: 2 complètes au centre + 2 bouts sur les côtés

  // Fetch data on mount
  useEffect(() => {
    fetchAllPortfolios();
  }, [fetchPortfolioBySlug, fetchAllPortfolios]);

  // Calculate dynamic padding based on viewport width
  useEffect(() => {
    const calculatePadding = () => {
      const viewportWidth = window.innerWidth;
      const calculatedPadding = Math.max(0, (viewportWidth - 990) / 2);
      setDynamicPadding(calculatedPadding);
    };

    // Calculate initial padding
    calculatePadding();

    // Add resize listener
    window.addEventListener("resize", calculatePadding);

    // Cleanup
    return () => window.removeEventListener("resize", calculatePadding);
  }, []);

  // If no portfolio or portfolios, don't render anything
  if (!portfolios || portfolios.length === 0) {
    return null;
  }

  const maxIndex = Math.max(0, portfolios.length - itemsPerView);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
    <div
      className={`relative w-full flex flex-col items-center pt-16 gap-12 z-10 ${className}`}
    >
      <img
        src="./images/homepage/bg-halo-2.png"
        alt="background"
        className="absolute right-0 left-0 h-auto z-0 w-full top-0"
      />
      {/* Title Section */}
      <div className="max-w-[990px] m-auto flex flex-col items-center gap-4">
        <div className="h-[3px] md:w-36 w-20 holographic-bg rounded-full my-8" />
        <div className="flex flex-row font-jakarta-semibold text-[27px] leading-[30px] text-white items-center gap-2">
          <Coeur className="w-6 h-6 flex-shrink-0" />
          <span>Love stories</span>
        </div>
        <h2 className="font-jakarta-semi-bold text-[48px] leading-[65px] text-center glassy tracking-[-1px] whitespace-pre-line">
          La preuve en image !
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden flex items-center">
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
              className={`absolute inset-0 flex items-center gap-4 ${
                currentIndex === 0
                  ? ""
                  : currentIndex >= maxIndex
                    ? "justify-end"
                    : "justify-center"
              }`}
              style={{
                paddingLeft:
                  currentIndex === 0 ? `${dynamicPadding}px` : undefined,
                paddingRight:
                  currentIndex >= maxIndex ? `${dynamicPadding}px` : undefined,
              }}
            >
              {portfolios
                .slice(currentIndex, currentIndex + itemsPerView)
                .filter((project) => project.id !== portfolio?.id)
                .map((project, index) => (
                  <div key={project.id} className="w-[490px] flex-shrink-0">
                    <Card
                      height="370px"
                      content={
                        <CardHomePagePortfolio
                          imageUrl={project.photoCouverture}
                          titre={project.titre}
                          topTitle={project?.topTitle}
                          slug={project.slug}
                        />
                      }
                      borderClass="light-border rounded-[45px]"
                      borderRadius="45px"
                    />
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="w-full flex flex-row justify-center items-center z-20 gap-8">
        <button
          onClick={prevSlide}
          className={`z-20 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group`}
          aria-label="Projet précédent"
        >
          <ArrowLight className="w-[70px] h-[70px] text-white rotate-180 group-hover:scale-110 transition-transform" />
        </button>

        <Button
          type="border"
          label="Voir tous nos projets"
          leftIcon={<Arrow className="w-6 h-6" />}
          textSize="M"
          className="py-2 px-1"
          onClick={() => {
            navigate("/portfolio");
          }}
        />
        <button
          onClick={nextSlide}
          className={`z-20 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group`}
          aria-label="Projet suivant"
        >
          <ArrowLight className="w-[70px] h-[70px] text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
