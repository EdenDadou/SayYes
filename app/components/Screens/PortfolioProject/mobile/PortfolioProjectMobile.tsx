import { memo, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import ArrowLight from "~/assets/icons/ArrowLight";
import Star from "~/assets/icons/Star";
import Coche from "~/assets/icons/Coche";
import BackgroundProject1 from "~/components/Screens/PortfolioProject/BackgroundProject1";
import BackgroundProject2 from "~/components/Screens/PortfolioProject/BackgroundProject2";
import PhotoMain from "~/components/Screens/Portfolio/components/PhotoMain";
import BackgroundProject3 from "~/components/Screens/PortfolioProject/BackgroundProject3";
import MobileLayout from "~/components/Layout/Mobile";
import { PortfolioData } from "~/utils/admin/manage-portfolio-types";
import NoteStar from "~/assets/icons/NoteStar";
import BentoMobile from "~/components/Screens/Portfolio/components/BentoMobile";
import ProjectCarouselMobile from "~/components/Screens/Portfolio/components/ProjetCarrouselMobile";
import { getOptimizedImageUrl } from "~/utils/optimizeImage";
import "~/styles/tailwind.css";

// Style pour optimiser le scroll sur mobile
const mobileScrollContainerStyle: CSSProperties = {
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  WebkitOverflowScrolling: "touch",
};

// Variants d'animation réutilisables
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Composant wrapper pour les animations avec useInView
const AnimatedSection = memo(function AnimatedSection({
  children,
  className = "",
  delay = 0,
  variant = "fadeInUp",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeInUp" | "fadeIn";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variants = variant === "fadeIn" ? fadeIn : fadeInUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
});

// Utilitaire pour extraire les images du bento (first batch seulement)
const getFirstBentoImages = (bento: PortfolioData["bento"]): string[] => {
  if (!bento || !bento[0] || !bento[0].lines) return [];

  const images: string[] = [];
  for (const line of bento[0].lines.slice(0, 2)) {
    if (line.listImage) {
      images.push(...line.listImage.slice(0, 1));
    }
  }
  return images.slice(0, 2);
};

const PortfolioProjectMobile = memo(function PortfolioProjectMobile({
  portfolio,
}: {
  portfolio: PortfolioData;
}) {
  // États pour le chargement progressif
  const [loadStage, setLoadStage] = useState(0);
  // Stage 0: rien (header via MobileLayout)
  // Stage 1: fond
  // Stage 2: hero title
  // Stage 3: photo main
  // Stage 4: reste du contenu

  // Chargement progressif des éléments
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Stage 1: fond apparaît après 100ms
    timers.push(setTimeout(() => setLoadStage(1), 100));
    // Stage 2: hero title après 300ms
    timers.push(setTimeout(() => setLoadStage(2), 300));
    // Stage 3: photo main après 500ms
    timers.push(setTimeout(() => setLoadStage(3), 500));
    // Stage 4: reste du contenu après 700ms
    timers.push(setTimeout(() => setLoadStage(4), 700));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Précharger les images en arrière-plan (sans bloquer le rendu)
  useEffect(() => {
    const secondaryImages = getFirstBentoImages(portfolio.bento);

    // Précharger les images du bento en arrière-plan
    secondaryImages.forEach((src) => {
      const img = new Image();
      img.src = getOptimizedImageUrl(src, "mobile");
    });
  }, [portfolio.bento]);

  // Refs pour les animations
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const deliverablesRef = useRef<HTMLDivElement>(null);
  const deliverablesInView = useInView(deliverablesRef, {
    once: true,
    margin: "-50px",
  });

  const testimonialRef = useRef<HTMLDivElement>(null);
  const testimonialInView = useInView(testimonialRef, {
    once: true,
    margin: "-50px",
  });

  return (
    <MobileLayout>
      {/* Fond - Stage 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loadStage >= 1 ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <BackgroundProject1
          fill={portfolio.couleur}
          className="absolute inset-0 w-screen h-[1200px] object-cover"
        />
      </motion.div>
      <main
        className="w-screen h-fit relative overflow-hidden py-8 mobile-optimized-scroll"
        style={mobileScrollContainerStyle}
      >
        {/* Main Content */}
        <div className="relative z-10 flex flex-col gap-0">
          {/* Hero Section */}
          <section className="flex flex-col gap-12">
            {/* Title and Kicker - Stage 2 */}
            <motion.div
              ref={heroRef}
              className="flex flex-row justify-center items-end"
              initial={{ opacity: 0, y: 20 }}
              animate={
                loadStage >= 2 && heroInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex flex-col gap-16 items-center justify-center">
                <motion.div
                  className="h-[3px] w-28 holographic-bg"
                  initial={{ scaleX: 0 }}
                  animate={
                    loadStage >= 2 && heroInView ? { scaleX: 1 } : { scaleX: 0 }
                  }
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                <div className="flex flex-col items-center justify-center">
                  {portfolio.topTitle ? (
                    <motion.div
                      className="flex flex-row items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        loadStage >= 2 && heroInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <p className="text-white text-center font-jakarta-semi-bold tracking-[-2px] text-[40px] leading-[40px]">
                        {portfolio.topTitle}
                      </p>
                      <ArrowLight className="w-10 h-10 rotate-90" />
                    </motion.div>
                  ) : null}
                  <motion.h1
                    className="text-[40px] leading-[40px] text-white font-jakarta-semi-bold tracking-[-2px]"
                    style={{ color: portfolio.couleur }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      loadStage >= 2 && heroInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {portfolio.titre}
                  </motion.h1>
                  <motion.p
                    className="flex flex-row items-center gap-1 text-white text-sm font-jakarta-semi-bold mt-4"
                    initial={{ opacity: 0 }}
                    animate={
                      loadStage >= 2 && heroInView
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <NoteStar className="w-4 h-4" /> Sortlist 4.9 I 5
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Photo Main - Stage 3 */}
            <motion.div
              className="px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={
                loadStage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <PhotoMain
                photo={portfolio.photoMain || portfolio.photoCouverture}
                title={portfolio.titre}
                alt={
                  portfolio.photoMain
                    ? portfolio.photoMainAlt
                    : portfolio.photoCouvertureAlt
                }
                isMobile={true}
              />
            </motion.div>
          </section>

          {/* Content Grid - Stage 4 */}
          <motion.section
            className="flex flex-col gap-8 pb-16 bg-white px-8 mt-40 -mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Description */}
            <AnimatedSection>
              <p className="text-black text-[24px] font-jakarta leading-relaxed">
                {portfolio.description}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="md:col-span-1">
                <div className="flex flex-col gap-4">
                  <p
                    className="text-black text-[16px] leading-relaxed font-jakarta"
                    dangerouslySetInnerHTML={{
                      __html: portfolio.kicker.replaceAll(
                        "<b>",
                        "<b class='font-jakarta-bold mb-2'>"
                      ),
                    }}
                  />
                </div>
              </div>
            </AnimatedSection>
          </motion.section>

          {/* Deliverables - Stage 4 */}
          <motion.section
            className="flex flex-col items-start justify-between w-full px-8 bg-white gap-5 pb-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <AnimatedSection>
              <h3 className="flex flex-row items-center gap-2 text-[20px] text-black font-jakarta-semi-bold tracking-[-1px]">
                <Star className="w-4 h-4" fill="black" />
                Notre accompagnement
              </h3>
            </AnimatedSection>
            <motion.div
              ref={deliverablesRef}
              className="flex flex-row flex-nowrap gap-2 w-screen overflow-x-scroll scrollbar-hide"
              initial="hidden"
              animate={
                loadStage >= 4 && deliverablesInView ? "visible" : "hidden"
              }
              variants={staggerContainer}
            >
              {portfolio.livrable.map((item: string, index: number) => (
                <motion.span
                  key={index}
                  className="flex flex-row items-center justify-center gap-2 px-3 py-3 rounded-full text-sm border font-jakarta-semi-bold whitespace-nowrap"
                  style={{
                    color: portfolio.couleur,
                    borderColor: portfolio.couleur,
                  }}
                  variants={fadeInUp}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                >
                  <Coche className="w-4 h-4" />
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.section>

          {/* Bento Section 1 - Stage 4 */}
          <motion.section
            className="relative px-4 flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <BackgroundProject2
              fill={portfolio.couleur}
              className="absolute left-0 right-0 top-0 w-screen"
              style={{ height: "auto", minHeight: "100%" }}
              preserveAspectRatio="xMidYMin slice"
            />
            <AnimatedSection className="relative z-50 bg-white -mt-40">
              <h2 className="flex flex-col justify-center items-center text-[26px] font-bold text-black font-jakarta-bold z-50">
                <span className="flex flex-row items-center justify-center gap-2 font-jakarta-semi-bold tracking-[-1px] leading-[30px]">
                  <Star className="w-4 h-4" fill={portfolio.couleur} />
                  {portfolio.sousTitre.split(" ").slice(0, 3).join(" ")}
                  <Star className="w-4 h-4" fill={portfolio.couleur} />
                </span>
                <span
                  style={{ color: portfolio.couleur }}
                  className="font-jakarta-semi-bold tracking-[-1px]"
                >
                  {portfolio.sousTitre.split(" ").slice(3).join(" ")}
                </span>
              </h2>
            </AnimatedSection>

            <div className="space-y-4">
              {portfolio.bento[0] && <BentoMobile bento={portfolio.bento[0]} />}
            </div>
          </motion.section>

          {/* Testimonial Section - Stage 4 */}
          <motion.section
            className="flex flex-col items-center justify-center pt-16 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <AnimatedSection variant="fadeIn">
              <div className="h-[3px] w-28 holographic-bg" />
            </AnimatedSection>
            {/* Témoignage */}
            {portfolio.temoignage && portfolio.temoignage.contenu ? (
              <motion.div
                ref={testimonialRef}
                className="p-8 flex flex-col items-center justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  loadStage >= 4 && testimonialInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <blockquote className="text-white text-[16px] leading-relaxed text-center font-jakarta">
                  {portfolio.temoignage.contenu}
                </blockquote>
                <motion.div
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0 }}
                  animate={
                    loadStage >= 4 && testimonialInView
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <cite className="text-white font-jakarta-bold">
                    {`${portfolio.temoignage.auteur}  ${portfolio.temoignage.poste ? `- ${portfolio.temoignage.poste}` : ""}`}
                  </cite>
                </motion.div>
              </motion.div>
            ) : null}
          </motion.section>

          {/* Bento Section 2 - Stage 4 */}
          <motion.section
            className="mb-16 relative px-4 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <div className="space-y-6">
              {portfolio.bento[1] && <BentoMobile bento={portfolio.bento[1]} />}
            </div>
          </motion.section>
        </div>

        {/* Background 3 - Stage 4 */}
        <motion.div
          className="absolute left-0 right-0 -bottom-28 w-screen z-0"
          style={{ height: "120vh" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <BackgroundProject3
            fill={portfolio.couleur}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          />
        </motion.div>

        {/* Carousel - Stage 4 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <ProjectCarouselMobile />
        </motion.div>
      </main>
    </MobileLayout>
  );
});

export default PortfolioProjectMobile;
