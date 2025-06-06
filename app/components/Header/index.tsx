import SvgLogo from "~/components/Header/components/Logo";
import Button from "../Button";
import SvgFlamme from "~/components/Header/components/Flamme";
import SvgCoeur from "~/components/Header/components/Coeur";
import SvgSmile from "~/components/Header/components/Smile";
import SvgLight from "~/components/Header/components/Light";
import SvgCtaParlonsDesign from "~/components/Header/components/CtaParlonsDesign";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { redirect } from "@remix-run/react";

interface HeaderProps {
  setIsOpen: (value: boolean) => void;
  isIntroFinish: boolean;
}

const Header = ({ setIsOpen, isIntroFinish }: HeaderProps) => {
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

  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}
      variants={variants}
      animate={isIntroFinish ? "visible" : "hidden"}
      className="sticky top-0 w-screen shadow-3xl z-[100] shadow-custom-inset drop-shadow-custom"
    >
      <div
        className={`w-full bg-gray-400 h-20 flex flex-row items-center justify-between px-7 shadow-3xl shadow-custom-inset drop-shadow-custom
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
          <SvgLogo
            width={150}
            height={100}
            className="rotate-2 cursor-pointer"
            onClick={() => redirect("/")}
          />
          <Button label="L’agence" leftIcon={<SvgSmile />} />
          <Button label="Ressources" leftIcon={<SvgLight />} />
        </div>

        {/* Texte à droite */}
        <SvgCtaParlonsDesign
          onClick={() => setIsOpen(true)}
          height={80}
          className="absolute top-0 right-0 h-24 cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

export default Header;
