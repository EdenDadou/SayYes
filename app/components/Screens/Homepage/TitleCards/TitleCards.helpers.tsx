import Arrow from "~/assets/icons/Arrow";
import ArrowLight from "~/assets/icons/ArrowLight";
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
    content: (
      <div className="h-full md:w-[312px] w-full relative md:p-8 p-4 cursor-pointer shadow-lg overflow-hidden backdrop-blur-sm rounded-[40px]">
        <div
          className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover bg-center bg-no-repeat bg-cover z-0 rounded-[34px]"
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
        <div className="z-10 relative flex flex-col gap-4 h-full justify-end pt-20 px-8 text-white pb-10">
          <div className="h-[3px] w-16 holographic-bg rounded-full mb-3" />
          <p className="glassy font-jakarta-semi-bold text-[33px] leading-[40px] tracking-[-1px] whitespace-pre-line">
            {title}
          </p>
          <p className="font-jakarta text-[18px] leading-[24px] tracking-[-1px] whitespace-pre-line">
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
  height: 94,
  image: "",
  borderRadius: "40px",
  borderClass: "light-border rounded-[30px]",
  content: (
    <div className="h-full w-full relative shadow-lg overflow-hidden backdrop-blur-sm rounded-[24px]">
      <div
        className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover bg-center bg-no-repeat bg-cover z-0 rounded-[20px]"
        style={{
          backgroundImage: 'url("images/homepage/bottom-card-bg.png")',
        }}
      />
      <div className="relative z-10 h-full w-full flex flex-row items-start justify-start p-6 pt-8 md:px-10 gap-2">
        <div className="w-8 mt-2">
          <ArrowLight className="w-8" />
        </div>
        <span className="glassy ml-4 text-white font-jakarta-medium md:text-[30px] text-[24px] md:leading-[34px] leading-[28px] tracking-[-1px]">
          Une roadmap claire et viable, des équipes alignées et formées !
        </span>
      </div>
    </div>
  ),
};
