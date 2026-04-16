import ArrowLight from "~/assets/icons/ArrowLight";
import { getOptimizedImageUrl } from "~/utils/optimizeImage";
export const CardsIdentiteVisuelle = ({
  title,
  desc,
  img,
  isMobile,
}: {
  title: string;
  desc: string;
  img: string;
  isMobile: boolean;
}) => {
  return {
    height: isMobile ? 410 : 373,
    image: img,
    borderRadius: "40px",
    borderClass: "light-border rounded-[40px]",
    content: isMobile ? (
      <div className="h-full w-full relative p-4 cursor-pointer shadow-lg overflow-hidden backdrop-blur-sm bg-white/5 rounded-[40px]">
        <div
          className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover bg-center bg-no-repeat bg-cover z-0 rounded-[34px] opacity-50"
          style={{
            backgroundImage: `url(${getOptimizedImageUrl(img, "mobile")})`,
          }}
        />
        <div className="z-10 relative flex flex-col gap-4 h-full justify-start px-8 pt-20 text-white">
          <div className="h-[3px] w-20 holographic-bg rounded-full mb-3" />
          <p className="glassy font-jakarta-semi-bold text-[33px] leading-[36px] tracking-[-1px] whitespace-pre-line">
            {title}
          </p>
          <p className="font-jakarta text-[18px] leading-[26px] tracking-[0.5px] whitespace-pre-line">
            {desc}
          </p>
        </div>
      </div>
    ) : (
      // Desktop : card 318×373, interior 294×349 (inset 12px). Width à 316 = 2px de marge pour la pseudo-bordure dans le container 988px
      <div className="relative w-[316px] h-[373px] cursor-pointer shadow-lg overflow-hidden backdrop-blur-sm bg-white/5 rounded-[40px]">
        <div
          className="absolute inset-3 bg-center bg-no-repeat bg-cover z-0 rounded-[34px]"
          style={{
            backgroundImage: `url(${getOptimizedImageUrl(img, "desktop")})`,
          }}
        />
        <div className="absolute inset-3 z-10 text-white">
          <div
            className="absolute h-[4px] w-[60px] holographic-bg rounded-full"
            style={{ top: "95px", left: "34px" }}
          />
          <p
            className="absolute glassy font-jakarta-semi-bold text-[33px] leading-[40px] tracking-[-1px] whitespace-pre-line"
            style={{ top: "122px", left: "34px" }}
          >
            {title}
          </p>
          <p
            className="absolute font-jakarta text-[18px] leading-[22px] whitespace-pre-line"
            style={{ top: "253px", left: "34px", width: "226px" }}
          >
            {desc}
          </p>
        </div>
      </div>
    ),
  };
};

export const contentIdentiteVisuelle = [
  {
    title: "Prenez\nsoin de\nvotre image",
    desc: "De l'identité aux supports,\ndu print au digital, tout\ns'aligne",
    img: "./images/homepage/identite-visuelle-1.png",
  },
  {
    title: "Centralisez\net gagnez\ndu temps",
    desc: "Le même interlocuteur,\nune équipe complète,\ndes délais tenus.",
    img: "./images/homepage/identite-visuelle-2.png",
  },
  {
    title: "Gardez\n le contrôle\n de votre projet",
    desc: "Co-création, validation à\nchaque étape, montée en\ncompétence des équipes.",
    img: "./images/homepage/identite-visuelle-3.png",
  },
];

export const CardBottomIdentiteVisuelle = {
  height: 118,
  image: "",
  borderRadius: "30px",
  borderClass: "light-border rounded-[30px]",
  content: (
    <div className="h-full w-full relative shadow-lg overflow-hidden backdrop-blur-sm rounded-[24px]">
      <div
        className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover bg-center bg-no-repeat bg-cover z-0 rounded-[20px]"
        style={{
          backgroundImage: `url(${getOptimizedImageUrl("./images/homepage/bottom-card-bg.png", "mobile")})`,
        }}
      />
      <div className="relative z-10 h-full w-full flex flex-row md:items-center items-start justify-start md:justify-center md:px-10 gap-4 p-6 pt-8 md:p-6 md:gap-4">
        <div className="w-8 md:w-12 shrink-0">
          <ArrowLight className="md:w-12 w-8" />
        </div>
        <span className="glassy text-white font-jakarta-medium md:text-[30px] text-[24px] md:leading-[34px] leading-[28px] tracking-[-1px]">
          Une roadmap claire et viable, des équipes alignées et formées !
        </span>
      </div>
    </div>
  ),
};
