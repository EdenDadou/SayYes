import { useParams } from "@remix-run/react";
import { useViewport } from "~/utils/hooks/useViewport";
import ArrowLight from "~/assets/icons/ArrowLight";
import { PortfolioData } from "~/utils/admin/manage-portfolio-types";
import LoadingBar from "~/components/LoadingBar";
import BackgroundProject1 from "~/components/Screens/PortfolioProject/BackgroundProject1";
import BackgroundProject2 from "~/components/Screens/PortfolioProject/BackgroundProject2";
import PhotoMain from "~/components/Screens/Portfolio/components/PhotoMain";
import Desktoplayout from "~/components/Layout/Desktop";
import Bento from "~/components/Screens/Portfolio/components/Bento";
import ProjectCarousel from "~/components/Screens/Portfolio/components/ProjectCarousel";
import "~/styles/tailwind.css";
import PortfolioProjectMobile from "~/components/Screens/PortfolioProject/mobile/PortfolioProjectMobile";
import Coche from "~/assets/icons/Coche";
import NoteStar from "~/assets/icons/NoteStar";
import Star from "~/assets/icons/Star";
import BackgroundProject3 from "~/components/Screens/PortfolioProject/BackgroundProject3";
import { usePortfolio } from "~/contexts/PortfolioContext";
import { useEffect, useState, useCallback } from "react";
import { useMetaData } from "~/utils/hooks/useMetaData";
import { AnimatePresence, motion } from "framer-motion";

// Variants pour les animations d'entrée
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function PortfolioSlug() {
  const { slug } = useParams();
  const { portfolio, allPortfolios, fetchPortfolioBySlug, fetchAllPortfolios } =
    usePortfolio();

  const isMobile = useViewport();
  // Update meta tags dynamically when portfolio is loaded
  useMetaData(portfolio);
  const [isLoading, setIsLoading] = useState(true);

  // États pour le chargement progressif desktop
  // Stage 0: rien
  // Stage 1: fond
  // Stage 2: hero title
  // Stage 3: photo main
  // Stage 4: reste du contenu
  const [loadStage, setLoadStage] = useState(0);

  // Callback pour quand PhotoMain est chargée
  const handlePhotoMainLoad = useCallback(() => {
    // Quand l'image est chargée, passer au stage 4
    setLoadStage(4);
  }, []);

  // Chargement progressif des éléments desktop
  useEffect(() => {
    if (isMobile === false && portfolio) {
      const timers: NodeJS.Timeout[] = [];

      // Stage 1: fond apparaît après 100ms
      timers.push(setTimeout(() => setLoadStage(1), 100));
      // Stage 2: hero title après 300ms
      timers.push(setTimeout(() => setLoadStage(2), 300));
      // Stage 3: photo main après 500ms (le stage 4 sera déclenché par onImageLoad)
      timers.push(setTimeout(() => setLoadStage((prev) => Math.max(prev, 3)), 500));
      // Fallback: si l'image prend trop de temps, passer au stage 4 après 2s
      timers.push(setTimeout(() => setLoadStage(4), 2000));

      return () => timers.forEach(clearTimeout);
    }
  }, [isMobile, portfolio]);

  useEffect(() => {
    // Attendre que tous les assets soient chargés
    const handleLoad = () => {
      // La barre de chargement gère sa propre progression
      // On attend juste que la page soit prête
      if (document.readyState === "complete") {
        // Petit délai pour une transition plus fluide
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    if (slug) {
      fetchPortfolioBySlug(slug);
    }
    fetchAllPortfolios();
  }, [slug, fetchPortfolioBySlug, fetchAllPortfolios]);

  // Attendre que le viewport soit détecté pour éviter le flash
  // Show loading or error states
  // Attendre que le viewport soit détecté pour éviter le flash
  if (isMobile === null || !portfolio) {
    return <LoadingBar />;
  }

  return (
    <>
      {isLoading && <LoadingBar />}
      {isMobile ? (
        <PortfolioProjectMobile
          portfolio={portfolio}
          allPortfolios={allPortfolios as PortfolioData[]}
        />
      ) : (
        <Desktoplayout>
          {/* Fond - Stage 1 */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loadStage >= 1 ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <BackgroundProject1
                fill={portfolio.couleur}
                className="absolute top-0 left-0 right-0 w-screen object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <motion.main
            className="w-screen h-fit relative pb-20 z-10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Main Content */}
            <div className="relative z-10 pt-12 flex flex-col">
              {/* Hero Section */}
              <section className="pt-12 px-20 flex flex-col gap-10 pb-6 justify-center items-center">
                {/* Title and Kicker - Stage 2 */}
                <motion.div
                  className="flex flex-row justify-between items-end w-[988px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    loadStage >= 2
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="flex flex-col gap-10 w-full">
                    <motion.div
                      className="h-[3px] w-24 holographic-bg"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: loadStage >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />

                    <div className="flex flex-row justify-between items-end w-full">
                      <div className="flex flex-col">
                        {/* Top Title si disponible */}
                        {portfolio.topTitle ? (
                          <motion.p
                            className="text-7xl text-white flex flex-row items-center font-jakarta-semi-bold tracking-[-2px]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                              loadStage >= 2
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 10 }
                            }
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {portfolio.topTitle}
                          </motion.p>
                        ) : null}
                        <motion.h1
                          className="text-7xl font-bold text-white flex flex-row items-center gap-6 font-jakarta leading-[60px] tracking-[-2px]"
                          style={{ color: portfolio.couleur }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={
                            loadStage >= 2
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 10 }
                          }
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <ArrowLight className="w-20 h-20" />
                          {portfolio.titre}
                        </motion.h1>
                      </div>
                      <motion.p
                        className="flex flex-row items-center gap-2 text-white text-2xl font-jakarta-semi-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: loadStage >= 2 ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <NoteStar className="w-6 h-6" fill="black" /> Sortlist
                        4.9 I 5
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                {/* Photo Main - Stage 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    loadStage >= 3
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30 }
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
                    onImageLoad={handlePhotoMainLoad}
                  />
                </motion.div>
              </section>

              {/* Content Grid - Stage 4 */}
              <motion.section
                className="flex justify-center py-12 bg-white px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="w-[990px] flex flex-row">
                  <div className="w-[487px] pr-10">
                    <p className="text-black text-[26px] font-jakarta leading-relaxed">
                      {portfolio.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 w-[495px]">
                    <p
                      className="text-black text-[14px] leading-relaxed font-jakarta"
                      dangerouslySetInnerHTML={{
                        __html: portfolio.kicker.replaceAll(
                          "<b>",
                          "<b class='font-jakarta-bold text-[18px]'>"
                        ),
                      }}
                    />
                  </div>
                </div>
              </motion.section>

              {/* Deliverables - Stage 4 */}
              <motion.div
                className="flex justify-center pb-[100px] bg-white px-8 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <div className="w-[990px] flex flex-col">
                  <h3 className=" flex flex-row items-center gap-2 text-2xl text-black mb-6 font-jakarta-semi-bold tracking-[-1px]">
                    <Star className="w-6 h-6" fill="black" />
                    Notre accompagnement
                  </h3>
                  <div className="flex flex-row gap-5 w-full">
                    {portfolio.livrable.map((item: string, index: number) => (
                      <span
                        key={index}
                        className="flex flex-row items-center gap-2 px-4 py-3 rounded-full text-[13px] border font-jakarta-bold"
                        style={{
                          color: portfolio.couleur,
                          borderColor: portfolio.couleur,
                        }}
                      >
                        <Coche className="w-4 h-4" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Bento Section 1 - Stage 4 */}
              <motion.section
                className="relative px-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                <BackgroundProject2
                  fill={portfolio.couleur}
                  className="absolute -top-[150px] left-0 right-0 w-screen z-0"
                />
                <div className="relative z-50">
                  <h2 className="flex flex-row justify-center items-center gap-2 text-[40px] font-bold text-black font-jakarta-semi-bold mb-12 z-50 tracking-[-2px]">
                    <Star className="w-5 h-5" fill={portfolio.couleur} />
                    {portfolio.sousTitre.split(" ").slice(0, 3).join(" ")}
                    <span style={{ color: portfolio.couleur }}>
                      {portfolio.sousTitre.split(" ").slice(3).join(" ")}
                    </span>
                    <Star className="w-5 h-5" fill={portfolio.couleur} />
                  </h2>
                </div>

                <div className="space-y-4">
                  {portfolio.bento[0] && <Bento bento={portfolio.bento[0]} />}
                </div>
              </motion.section>

              {/* Testimonial - Stage 4 */}
              <motion.section
                className="flex flex-col items-center justify-center py-[100px] w-[814px] self-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                <div className="h-[3px] w-28 holographic-bg" />
                {/* Témoignage */}
                {portfolio.temoignage && portfolio.temoignage.contenu ? (
                  <div className="pt-8 flex flex-col items-center justify-center gap-8 ">
                    <blockquote className="text-white text-[22px] leading-[32px] text-center font-jakarta">
                      {portfolio.temoignage.contenu}
                    </blockquote>
                    <div className="flex flex-col gap-1">
                      <cite className="text-white font-jakarta-bold text-[18px]">
                        {`${portfolio.temoignage.auteur} ${portfolio.temoignage.poste ? ` - ${portfolio.temoignage.poste}` : ""}`}
                      </cite>
                    </div>
                  </div>
                ) : null}
              </motion.section>

              {/* Bento Section 2 - Stage 4 */}
              <motion.section
                className="mb-16 relative px-32 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              >
                <div className="space-y-4">
                  {portfolio.bento[1] && <Bento bento={portfolio.bento[1]} />}
                </div>
              </motion.section>
            </div>

            {/* Carousel - Stage 4 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              <ProjectCarousel />
            </motion.div>
          </motion.main>

          {/* Background 3 - Stage 4 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loadStage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <BackgroundProject3
              fill={portfolio.couleur}
              className="absolute bottom-[620px] left-0 right-0 w-screen h-auto z-0"
            />
          </motion.div>
        </Desktoplayout>
      )}
    </>
  );
}
