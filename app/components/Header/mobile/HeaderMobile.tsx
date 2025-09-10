import LogoSayYes from "~/components/Header/components/LogoSayYes";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { redirect, useNavigate } from "@remix-run/react";
import Button from "~/components/Button";
import Flamme from "../components/Flamme";
import Coeur from "../components/Coeur";
import Smile from "../components/Smile";
import Idea from "../components/Idea";
import ChatBuble from "../components/ChatBuble";
import BurgerMenu from "~/components/Header/components/BurgerMenu";

interface HeaderProps {
  setIsOpen: (value: boolean) => void;
  isIntroFinish: boolean;
  isOpen: boolean;
}

const HeaderMobile = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  // Listen to scroll changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    if (latest > 50 && direction === "down") {
      setIsVisible(false);
    } else if (direction === "up" || latest < 100) {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  return (
    <motion.div
      className="header-custom border-custom flex flex-row justify-between items-center mx-5 h-[60px] px-2 mb-20"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -130 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
    >
      {/* Section gauche */}
      <div className="flex justify-start">
        <Button leftIcon={<BurgerMenu color="black" />} type="mobile" />
      </div>

      {/* Logo centré */}
      <LogoSayYes
        className="cursor-pointer absolute left-1/2 -translate-x-1/2 -top-[5px]"
        onClick={() => navigate("/")}
        width={98}
        height={80}
      />

      {/* Section droite */}
      <div className="flex justify-end">
        <Button leftIcon={<ChatBuble />} type="mobile" />
      </div>
    </motion.div>
  );
};

export default HeaderMobile;
