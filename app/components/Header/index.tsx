import { useNavigate } from "@remix-run/react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Button from "../Button";
import LogoSayYes from "~/components/Header/components/LogoSayYes";
import { useViewport } from "~/utils/hooks/useViewport";
import HeaderMobile from "./mobile/HeaderMobile";
import ChatBuble from "./components/ChatBuble";
import Flamme from "./components/Flamme";
import Coeur from "./components/Coeur";
import Smile from "./components/Smile";
import Idea from "./components/Idea";

interface IHeaderProps {
  setIsOpenModalContact: (value: boolean) => void;
}

const Header = ({ setIsOpenModalContact }: IHeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useViewport();
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

  return isMobile ? (
    <HeaderMobile />
  ) : (
    <motion.div
      className="header-custom border-custom flex flex-row justify-between items-center mx-24 h-[74px]"
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
      <div className="flex flex-row items-center gap-8 flex-1 pl-8">
        <div className="font-jakarta text-lg">Communication visuelle*</div>
        <Button
          label="Solutions"
          leftIcon={<Flamme className="text-shadow-lg shadow-black" />}
          onClick={() => navigate("/solutions")}
        />
        <Button
          label="Portfolio"
          leftIcon={<Coeur />}
          onClick={() => navigate("/portfolio")}
        />
      </div>

      {/* Logo centré */}
      <LogoSayYes
        className="cursor-pointer absolute left-1/2 -translate-x-1/2 -top-[5px]"
        onClick={() => navigate("/")}
        width={120}
        height={95}
      />

      {/* Section droite */}
      <div className="flex flex-row items-center gap-8 flex-1 justify-end">
        <Button
          label="L'agence"
          leftIcon={<Smile />}
          onClick={() => navigate("/agence")}
        />
        <Button
          label="Ressources"
          leftIcon={<Idea />}
          onClick={() => navigate("/ressources")}
        />
        <Button
          label="Parlons Design !"
          leftIcon={<ChatBuble />}
          type="plain"
          onClick={() => setIsOpenModalContact(true)}
        />
      </div>
    </motion.div>
  );
};

export default Header;
