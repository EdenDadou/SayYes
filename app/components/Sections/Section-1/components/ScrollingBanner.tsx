import SvgLogoAllClients from "~/assets/icons/LogoAllClients";

const ScrollingBanner = () => {
  return (
    <div className="absolute bg-gray-400 w-full h-28 bottom-0 left-0 right-0 flex items-center overflow-hidden">
      <div className="inline-flex animate-scroll whitespace-nowrap scroll-right">
        <SvgLogoAllClients className="inline-block" />
        <SvgLogoAllClients className="inline-block" />
        <SvgLogoAllClients className="inline-block" />ß
      </div>
    </div>
  );
};

export default ScrollingBanner;
