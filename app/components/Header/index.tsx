import SvgLogo from "~/components/Header/components/Logo";
import Button from "../Button";
import SvgFlamme from "~/components/Header/components/Flamme";
import SvgCoeur from "~/components/Header/components/Coeur";
import SvgSmile from "~/components/Header/components/Smile";
import SvgLight from "~/components/Header/components/Light";
import SvgCtaParlonsDesign from "~/components/Header/components/CtaParlonsDesign";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  setIsOpen: (value: boolean) => void;
}

const Header = ({ setIsOpen }: HeaderProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setShowHeader(false);
      setLastScrollY(currentScrollY);
    } else if (lastScrollY - currentScrollY > 200 || currentScrollY < 100) {
      setLastScrollY(currentScrollY);
      setShowHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ translateY: "-180%" }}
      animate={{ translateY: "0%" }}
      transition={{ duration: 0.5, delay: 7.8 }}
      className={`sticky top-0 w-full  shadow-3xl z-50 shadow-custom-inset drop-shadow-custom`}
    >
      <div
        className={`w-full bg-gray-400 h-24 flex flex-row items-center justify-between px-7 shadow-3xl shadow-custom-inset drop-shadow-custom
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
          onClick={() => setIsOpen(true)}
          height={120}
          className="absolute top-0 right-0 h-24 cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

export default Header;
