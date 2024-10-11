import SvgLogoAllClients from "~/assets/icons/IconsSection2/LogoAllClients";

const ScrollingBanner = () => {
  return (
    <div className="bg-gradient-gray-400 filter drop-shadow-custom shadow-inset-custom w-full md:h-28  top-0 left-0 right-0 flex items-center overflow-hidden">
      <div className="inline-flex animate-scroll whitespace-nowrap scroll-right gap-10">
        <SvgLogoAllClients className="inline-block" />
        <SvgLogoAllClients className="inline-block" />
      </div>
    </div>
  );
};

export default ScrollingBanner;
