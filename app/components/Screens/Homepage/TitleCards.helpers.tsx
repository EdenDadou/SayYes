import ArrowLight from "~/assets/icons/ArrowLight";

export const CardsIdentiteVisuelle = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return {
    height: 373,
    image: "./images/homepage/identite-visuelle-1.png",
    borderRadius: "40px",
    borderClass: "light-border rounded-[40px]",
    content: (
      <div className="h-full w-[312px] relative md:p-8 p-4 cursor-pointer shadow-lg overflow-hidden backdrop-blur-sm bg-white/5 rounded-[40px]">
        <div
          className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover bg-center bg-no-repeat bg-cover z-0 rounded-[34px]"
          style={{
            backgroundImage: 'url("images/homepage/identite-visuelle-1.png")',
          }}
        />
        <div className="z-10 relative flex flex-col gap-4 h-full justify-start py-10 text-white">
          <div className="h-[3px] md:w-16 w-20 holographic-bg rounded-full" />
          <p className="glassy font-jakarta-semi-bold text-[33px] leading-[36px] tracking-[-1px] whitespace-pre-line">
            {title}
          </p>
          <p className="font-jakarta text-[18px] leading-[24px] tracking-[-1px]">
            {desc}
          </p>
        </div>
      </div>
    ),
  };
};

export const contentIdentiteVisuelle = [
  {
    title: "Prenez\n soin de\n votre image",
    desc: "De l'identité aux supports, du print  au digital, tout s'aligne",
  },
  {
    title: "Centralisez\n et gagnez\n du temps",
    desc: "Le même interlocuteur, une équipe complète, des délais tenus.",
  },
  {
    title: "Gardez\n le contrôle\n de votre projet",
    desc: "Co-création, validation à chaque étape, montée en compétence des équipes.",
  },
];

export const CardBottomIdentiteVisuelle = {
  height: 94,
  image: "",
  borderRadius: "40px",
  borderClass: "light-border rounded-[30px]",
  content: (
    <div className="h-full w-full relative shadow-lg overflow-hidden backdrop-blur-sm bg-white/5 rounded-[24px]">
      <div
        className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover bg-center bg-no-repeat bg-cover z-0 rounded-[20px]"
        style={{
          backgroundImage: 'url("images/homepage/bottom-card-bg.png")',
        }}
      />
      <div className="relative z-10 h-full w-full flex flex-row items-center justify-start px-10 gap-2">
        <ArrowLight className="w-12" />
        <span className="glassy ml-4 text-white font-jakarta-medium text-[30px] leading-[34px] tracking-[-1px]">
          Une roadmap claire et viable, des équipes alignées et formées !
        </span>
      </div>
    </div>
  ),
};
