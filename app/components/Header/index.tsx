import SvgLogo from "~/assets/icons/Header/Logo";
import Button from "../Button";
import SvgFlamme from "~/assets/icons/Header/Flamme";
import SvgCoeur from "~/assets/icons/Header/Coeur";
import SvgSmile from "~/assets/icons/Header/Smile";
import SvgLight from "~/assets/icons/Header/Light";
import SvgCtaParlonsDesign from "~/assets/icons/Header/CtaParlonsDesign";
import { useEffect, useState } from "react";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`sticky top-0 w-full bg-gray-400 h-24  flex flex-row items-center justify-between px-7 shadow-3xl z-50 header-transition shadow-custom-inset drop-shadow-custom-black drop-shadow-custom-black-opacity
        ${showHeader ? "translate-y-0" : "-translate-y-[120%]"} `}
    >
      {/* Titre principal */}
      <div className="holographic-text font-jakarta-bold text-lg">
        Communication visuelle*
      </div>

      {/* Navigation avec boutons et logo */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-row gap-10 items-center">
        <Button
          label="Solutions"
          leftIcon={<SvgFlamme className="text-shadow-lg shadow-black" />}
        />
        <Button label="Portfolio" leftIcon={<SvgCoeur />} />
        <SvgLogo width={150} height={118} className="rotate-2" />
        <Button label="L’agence" leftIcon={<SvgSmile />} />
        <Button label="Ressources" leftIcon={<SvgLight />} />
      </div>

      {/* Texte à droite */}
      <SvgCtaParlonsDesign
        height={120}
        className="absolute top-0 right-0 h-24 cursor-pointer"
      />
    </div>
  );
};

export default Header;
