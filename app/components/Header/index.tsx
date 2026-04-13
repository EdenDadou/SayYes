import { useNavigate } from "@remix-run/react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import Button from "../Button";
import LogoSayYes from "~/components/Header/assets/LogoSayYes";
import { useViewport } from "~/utils/hooks/useViewport";
import { useScrollLock } from "~/contexts/ScrollLockContext";
import ChatBuble from "./assets/ChatBuble";
import Flamme from "./assets/Flamme";
import Coeur from "./assets/Coeur";

interface IHeaderProps {
  setIsOpenModalContact: (value: boolean) => void;
}

const Header = ({ setIsOpenModalContact }: IHeaderProps) => {
  const navigate = useNavigate();
  const _isMobile = useViewport();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const { scrollY } = useScroll();
  const { isScrollLocked } = useScrollLock();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isScrollLocked) return;

    const direction = latest > lastScrollYRef.current ? "down" : "up";
    if (latest > 50 && direction === "down") {
      setIsVisible(false);
    } else if (direction === "up" || latest < 100) {
      setIsVisible(true);
    }
    lastScrollYRef.current = latest;
  });

  return (
    <motion.div
      className="header-custom border-custom flex flex-row justify-between items-center mx-auto w-[1056px] h-[74px]"
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
      <div className="flex flex-row items-center gap-8 pl-8 justify-between w-[35%] z-20">
        <div className="font-jakarta-semi-bold text-[16px]">
          Communication visuelle*
        </div>
        <Button
          label="Solutions"
          leftIcon={<Flamme />}
          onClick={() => navigate("/solutions")}
          textSize="S"
        />
      </div>

      {/* Logo centré */}
      <LogoSayYes
        className="cursor-pointer absolute left-1/2 -translate-x-1/2 -top-[6.4px]"
        onClick={() => navigate("/")}
        width={121}
        height={100}
      />

      {/* Section droite */}
      <div className="flex flex-row items-center gap-8 justify-between w-[35%] z-20">
        <Button
          label="Portfolio"
          leftIcon={<Coeur className="w-4 h-4" />}
          onClick={() => navigate("/portfolio")}
          textSize="S"
        />
        <Button
          type="plain"
          label="Parlons Design !"
          leftIcon={<ChatBuble />}
          onClick={() => setIsOpenModalContact(true)}
        />
      </div>
    </motion.div>
  );
};

export default Header;

{
  /* <Button
          label="L'agence"
          leftIcon={<Smile />}
          onClick={() => navigate("/agence")}
        />
        <Button
          label="Ressources"
          leftIcon={<Idea />}
          onClick={() => navigate("/ressources")}
        /> */
}
