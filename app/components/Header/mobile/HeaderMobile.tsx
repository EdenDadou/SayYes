import SvgLogo from "~/components/Header/components/Logo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { redirect } from "@remix-run/react";
import SvgContactMobile from "./components/ContactMobile";
import SvgMenuMobile from "./components/MenuMobile";

interface HeaderProps {
  setIsOpen: (value: boolean) => void;
  isIntroFinish: boolean;
}

const HeaderMobile = ({ setIsOpen, isIntroFinish }: HeaderProps) => {
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
      className={`sticky top-0 w-full shadow-3xl z-[100] shadow-custom-inset drop-shadow-custom`}
    >
      <div
        className={`w-full bg-gray-400 h-16 flex flex-row items-center justify-between px-7 shadow-3xl shadow-custom-inset drop-shadow-custom
              ${showHeader ? "translate-y-0" : "-translate-y-[120%]"} `}
      >
        {/* Navigation avec boutons et logo */}
        <div className="absolute top-0 left-0 h-full w-auto">
          <SvgMenuMobile />
        </div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-row gap-10 items-center">
          <SvgLogo
            width={150}
            height={80}
            className="rotate-2 cursor-pointer"
            onClick={() => redirect("/")}
          />
        </div>
        <div className="absolute top-0 right-0 h-full w-auto">
          <SvgContactMobile
            onClick={() => setIsOpen(true)}
            className="h-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderMobile;
