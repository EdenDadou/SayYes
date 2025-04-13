import SvgLogo from "~/components/Header/components/Logo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { redirect } from "@remix-run/react";

interface HeaderProps {
  setIsOpen: (value: boolean) => void;
  isIntroFinish: boolean;
  isOpen: boolean;
}

const HeaderMobile = ({ setIsOpen, isOpen, isIntroFinish }: HeaderProps) => {
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
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      variants={variants}
      animate={isIntroFinish ? "visible" : "hidden"}
      className="sticky top-0 w-screen left-0 right-0 shadow-3xl z-[100] shadow-custom-inset drop-shadow-custom overflow-hidden "
    >
      <div
        className={`w-full bg-gray-400 h-14 flex flex-row items-center justify-between px-7 shadow-3xl shadow-custom-inset drop-shadow-custom
              ${showHeader ? "translate-x-0" : "-translate-x-[120%]"} `}
      >
        {/* Navigation avec boutons et logo */}
        <div className="absolute top-0 left-0 bottom-0 h-full w-auto">
          <img
            loading="lazy"
            src="images/header/menu.png"
            alt=""
            className="h-full"
          />
          {/* <SvgMenuMobile /> */}
        </div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-row gap-10 items-center">
          <SvgLogo
            height={70}
            width={200}
            className="rotate-2 cursor-pointer w-fit"
            onClick={() => redirect("/")}
          />
        </div>
        <button
          className="absolute top-0 right-0 h-full w-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open contact menu"
        >
          <img
            loading="lazy"
            src="images/header/contact.png"
            alt=""
            className="h-full "
          />
        </button>
      </div>
    </motion.div>
  );
};

export default HeaderMobile;
