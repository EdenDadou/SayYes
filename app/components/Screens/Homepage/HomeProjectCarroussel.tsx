import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";
import ArrowLight from "~/assets/icons/ArrowLight";
import { usePortfolio } from "~/contexts/PortfolioContext";
import Coeur from "~/components/Header/assets/Coeur";
import Button from "~/components/Button";
import Arrow from "~/assets/icons/Arrow";
import CardHomePagePortfolio from "./components/CardHomePagePortfolio";
import { useNavigate } from "@remix-run/react";
import { useViewport } from "~/utils/hooks/useViewport";

interface ProjectCarouselProps {
  className?: string;
}

interface Portfolio {
  id: string;
  photoCouverture: string;
  titre: string;
  topTitle?: string;
  slug: string;
}

// Composant Mobile - Carrousel horizontal scrollable
function HomeProjectCarouselMobile({
  filteredPortfolios,
  className = "",
}: {
  filteredPortfolios: Portfolio[];
  className?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`relative w-full flex flex-col items-center pt-8 gap-6 z-10 ${className}`}
    >
      <img
        src="./images/homepage/bg-halo-2.png"
        alt="background"
        className="absolute right-0 left-0 h-auto z-0 w-full top-0"
      />
      {/* Title Section */}
      <div className="flex flex-col items-center gap-10 px-4 mb-6">
        <div className="h-[3px] w-24 holographic-bg rounded-full" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row font-jakarta-semibold text-[18px] leading-[22px] text-white items-center gap-2">
            <Coeur className="w-5 h-5 flex-shrink-0" />
            <span>Love stories</span>
          </div>
          <h2 className="font-jakarta-semi-bold text-[34px] leading-[40px] text-center glassy tracking-[-1px]">
            La preuve en image !
          </h2>
        </div>
      </div>

      {/* Carousel scrollable horizontal */}
      <div
        className="flex gap-4 overflow-x-auto pb-4 px-5 w-full scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filteredPortfolios.map((project, index) => (
          <div
            key={`card_${index}`}
            className="flex-shrink-0"
            style={{
              scrollSnapAlign: "start",
              width: "calc(100vw - 60px)",
              maxWidth: "100%",
            }}
          >
            <Card
              height="260px"
              content={
                <CardHomePagePortfolio
                  imageUrl={project.photoCouverture}
                  titre={project.titre}
                  topTitle={project?.topTitle}
                  slug={project.slug}
                  isMobile
                />
              }
              borderClass="light-border rounded-[28px]"
              borderRadius="28px"
            />
          </div>
        ))}
      </div>

      {/* Button */}
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
    </div>
  );
}

// Composant Desktop - Carrousel animé avec navigation
function HomeProjectCarouselDesktop({
  filteredPortfolios,
  className = "",
}: {
  filteredPortfolios: Portfolio[];
  className?: string;
}) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerView = 4;

  const cardWidth = 490;
  const cardHeight = "370px";
  const gap = 16;

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

  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i < itemsPerView - 1; i++) {
      const index =
        (currentIndex + i + filteredPortfolios.length) %
        filteredPortfolios.length;
      items.push({
        ...filteredPortfolios[index],
        position: i,
      });
    }
    return items;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? cardWidth + gap : -(cardWidth + gap),
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: () => ({
      zIndex: 0,
      opacity: 1,
    }),
  };

  const swipeConfidenceThreshold = 5000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center pt-16 gap-6 z-10 ${className}`}
    >
      <img
        src="./images/homepage/bg-halo-2.png"
        alt="background"
        className="absolute right-0 left-0 h-auto z-0 w-full top-0"
      />
      {/* Title Section */}
      <div className="max-w-[990px] m-auto flex flex-col items-center gap-4 px-4">
        <div className="h-[3px] w-36 holographic-bg rounded-full my-8" />
        <div className="flex flex-row font-jakarta-semibold text-[27px] leading-[30px] text-white items-center gap-2">
          <Coeur className="w-6 h-6 flex-shrink-0" />
          <span>Love stories</span>
        </div>
        <h2 className="font-jakarta-semi-bold text-[48px] leading-[65px] text-center glassy tracking-[-1px] whitespace-pre-line">
          La preuve en image !
        </h2>
      </div>

      {/* Carousel animé */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient overlays for edge cards */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-[200px] bg-gradient-to-r from-black via-black/70 to-transparent rounded-r-[40px]" />
          <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-black via-black/70 to-transparent rounded-l-[45px]" />
        </div>
        {/* Carousel Content */}
        <div className="relative w-full z-0" style={{ height: cardHeight }}>
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
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold || offset.x < -100) {
                  nextSlide();
                } else if (swipe > swipeConfidenceThreshold || offset.x > 100) {
                  prevSlide();
                }
              }}
              className="absolute flex items-center -translate-y-1/2"
              style={{
                gap: `${gap}px`,
                left: `calc(50% - ${cardWidth * 2 + gap * 1.5}px)`,
              }}
            >
              {getVisibleItems().map((project) => (
                <div
                  key={`${project.id}-${project.position}`}
                  className="flex-shrink-0"
                  style={{ width: `${cardWidth}px`, pointerEvents: "auto" }}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Card
                    height={cardHeight}
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
          className="z-20 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group"
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
          className="z-20 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group"
          aria-label="Projet suivant"
        >
          <ArrowLight className="w-[70px] h-[70px] text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// Composant principal qui choisit entre Mobile et Desktop
export default function HomeProjectCarousel({
  className = "",
}: ProjectCarouselProps) {
  const {
    portfolio,
    allPortfolios: portfolios,
    fetchPortfolioBySlug,
    fetchAllPortfolios,
  } = usePortfolio();

  const isMobile = useViewport();

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

  return isMobile ? (
    <HomeProjectCarouselMobile
      filteredPortfolios={filteredPortfolios}
      className={className}
    />
  ) : (
    <HomeProjectCarouselDesktop
      filteredPortfolios={filteredPortfolios}
      className={className}
    />
  );
}
