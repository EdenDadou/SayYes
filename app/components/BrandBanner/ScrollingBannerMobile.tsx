import SvgLogoAllClients from "~/assets/icons/LogoAllClients";

const ScrollingBannerMobile = () => {
  return (
    <div className="absolute bottom-12 bg-gradient-gray-400 filter drop-shadow-custom shadow-inset-custom w-full h-14 left-0 right-0 flex items-center overflow-hidden">
      {/* Overlay sombre à gauche */}
      <div className="absolute -left-10 top-0 h-full w-[200px] bg-gradient-to-r from-[rgba(27,27,27,1)] via-[rgba(27,27,27,1)]/50 to-transparent pointer-events-none z-10" />

      {/* Dégradé sombre à droite */}
      <div className="absolute -right-10 top-0 h-full w-[200px] bg-gradient-to-l from-[rgba(27,27,27,1)] via-[rgba(27,27,27,1)]/50 to-transparent pointer-events-none z-10" />

      <div className="inline-flex animate-scroll whitespace-nowrap scroll-right gap-10 z-24">
        <SvgLogoAllClients className="inline-block h-8" />
        <SvgLogoAllClients className="inline-block h-8" />
      </div>
    </div>
  );
};

export default ScrollingBannerMobile;
