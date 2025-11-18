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
import "~/styles/tailwind.css";

export default function PortfolioProjectMobile({
  portfolio,
  allPortfolios,
}: {
  allPortfolios: PortfolioData[];
  portfolio: PortfolioData;
}) {
  return (
    <MobileLayout>
      <BackgroundProject1
        fill={portfolio.couleur}
        className="absolute top-0 left-0 right-0 w-screen h-[1200px] object-cover"
      />
      <main className="w-screen h-fit relative overflow-hidden py-8">
        {/* Main Content */}
        <div className="relative z-10 flex flex-col gap-0">
          {/* Hero Section */}
          <section className="flex flex-col gap-12">
            {/* Title and Kicker */}
            <div className="flex flex-row justify-center items-end">
              <div className="flex flex-col gap-8 items-center justify-center">
                <div className="h-[3px] w-28 holographic-bg" />

                <div className="flex flex-col items-center">
                  {portfolio.topTitle ? (
                    <p
                      className="text-white flex flex-row items-center
                  font-jakarta-semi-bold gap-4 tracking-[-2px] text-[40px] leading-[40px]"
                    >
                      {portfolio.topTitle}
                      <ArrowLight className="w-10 h-10 rotate-90" />
                    </p>
                  ) : null}
                  <h1
                    className="text-[40px] leading-[40px] text-white font-jakarta-semi-bold tracking-[-2px]"
                    style={{ color: portfolio.couleur }}
                  >
                    {portfolio.titre}
                  </h1>
                  <p className="flex flex-row items-center gap-1 text-white text-sm font-jakarta-semi-bold mt-4">
                    <NoteStar className="w-4 h-4" /> Sortlist 4.9 I 5
                  </p>
                </div>
              </div>
            </div>

            {/* Photo Main */}
            <div className="px-4">
              <PhotoMain
                photo={portfolio.photoMain || portfolio.photoCouverture}
                title={portfolio.titre}
              />
            </div>
          </section>

          {/* Content Grid */}
          <section className="flex flex-col gap-8 py-16 bg-white px-8">
            {/* Description */}
            <p className="text-black text-[24px] font-jakarta leading-relaxed">
              {portfolio.description}
            </p>
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
          </section>
          {/* Deliverables */}
          <section className="flex flex-col items-start justify-between w-full px-8 bg-white  -my-1 gap-5 pb-64">
            <h3 className=" flex flex-row items-center gap-2 text-[20px] text-black  font-jakarta-semi-bold tracking-[-1px]">
              <Star className="w-4 h-4" fill="black" />
              Notre accompagnement
            </h3>
            <div className="flex flex-row flex-nowrap gap-2 w-screen overflow-x-scroll scrollbar-hide">
              {portfolio.livrable.map((item: string, index: number) => (
                <span
                  key={index}
                  className="flex flex-row items-center justify-center gap-2 px-3 py-3 rounded-full text-sm border font-jakarta-semi-bold whitespace-nowrap"
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
          </section>

          <section className="relative px-4 flex flex-col gap-6">
            <BackgroundProject2
              fill={portfolio.couleur}
              className="absolute left-0 right-0 w-screen"
            />
            <div className="relative z-50 bg-white -mt-40">
              <h2 className="flex flex-col justify-center items-center text-[26px] font-bold text-black font-jakarta-bold z-50">
                <span className="flex flex-row items-center justify-center gap-2 font-jakarta-semi-bold tracking-[-1px] leading-[30px]">
                  <Star className="w-4 h-4" fill={portfolio.couleur} />
                  {portfolio.sousTitre.split(" ").slice(0, 3).join(" ")}
                  <Star className="w-4 h-4" fill={portfolio.couleur} />
                </span>
                <span
                  style={{ color: portfolio.couleur }}
                  className="font-jakarta-semi-bold tracking-[-1px] "
                >
                  {portfolio.sousTitre.split(" ").slice(3).join(" ")}
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {portfolio.bento[0] && <BentoMobile bento={portfolio.bento[0]} />}
            </div>
          </section>

          <section className="flex flex-col items-center justify-center pt-16 pb-8">
            <div className="h-[3px] w-28 holographic-bg" />
            {/* Témoignage */}
            {portfolio.temoignage && portfolio.temoignage.contenu ? (
              <div className="p-8 flex flex-col items-center justify-center gap-6">
                <blockquote className="text-white text-[16px] leading-relaxed text-center font-jakarta">
                  {portfolio.temoignage.contenu}
                </blockquote>
                <div className="flex flex-col gap-1">
                  <cite className="text-white font-jakarta-bold">
                    {`${portfolio.temoignage.auteur}  ${portfolio.temoignage.poste ? `- ${portfolio.temoignage.poste}` : ""}`}
                  </cite>
                </div>
              </div>
            ) : null}
          </section>
          <section className="mb-16 relative px-4 z-10">
            <div className="space-y-6">
              {portfolio.bento[1] && <BentoMobile bento={portfolio.bento[1]} />}
            </div>
          </section>
        </div>
        <div className="absolute left-0 right-0 -bottom-28 h-[120vh] w-screen z-0 object-cover">
          <BackgroundProject3
            fill={portfolio.couleur}
            className="w-screen h-full"
          />
        </div>
        <ProjectCarouselMobile portfolios={allPortfolios} />
      </main>
    </MobileLayout>
  );
}
