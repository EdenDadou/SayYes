import SvgLogoAllClients from "~/assets/icons/LogoAllClients";
import SvgStars from "../../assets/icons/Stars";

const ScrollingBannerMobile = () => {
  return (
    <div className="relative bg-drop-grey filter w-full bottom-0 left-0 right-0 flex items-center overflow-hidden">
      {/* Overlay sombre à gauche */}
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[rgba(10,10,10,1)] via-[rgba(10,10,10,1)]/100 to-transparent pointer-events-none z-10"></div>

      {/* Dégradé sombre à droite */}
      {/* <div className="absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-[rgba(10,10,10,1)] via-[rgba(10,10,10,1)]/50 to-transparent pointer-events-none z-10"></div> */}

      <div className="w-full flex flex-col z-20 items-start py-2 px-3">
        <p className="font-jakarta-semi-bold text-xl w-[300px] pl-1 glassy">
          4.9 <span className="font-jakarta font-extralight">I</span> 5
          Shortlist
        </p>
        <div className="flex flex-row items-center justify-center">
          <SvgStars className="w-14" />
          <p className="font-jakarta text-xs holographic-text">
            Clients conquis
          </p>
        </div>
      </div>
      <div className="inline-flex animate-scroll whitespace-nowrap scroll-right gap-10 z-24">
        <SvgLogoAllClients className="inline-block" />
        <SvgLogoAllClients className="inline-block" />
      </div>
    </div>
  );
};

export default ScrollingBannerMobile;
