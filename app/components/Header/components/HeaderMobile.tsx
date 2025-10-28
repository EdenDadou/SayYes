import LogoSayYes from "~/components/Header/assets/LogoSayYes";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useNavigate } from "@remix-run/react";
import Button from "~/components/Button";
import ChatBuble from "../assets/ChatBuble";
import BurgerMenu from "~/components/Header/assets/BurgerMenu";
import Close from "~/assets/icons/Close";
import AnimatedBurgerMenu from "../assets/AnimatedBurgerMenu";

interface HeaderProps {
  setIsOpenModalContact: (value: boolean) => void;
  setIsOpenMenu: (value: boolean) => void;
  isOpenModalContact: boolean;
  isOpenMenu: boolean;
}

const HeaderMobile = ({
  setIsOpenModalContact,
  setIsOpenMenu,
  isOpenModalContact,
  isOpenMenu,
}: HeaderProps) => {
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
      <div className="flex justify-start z-10 relative">
        <Button
          leftIcon={
            <AnimatedBurgerMenu
              isOpen={isOpenMenu}
              className="text-black hover:text-black -m-1"
            />
          }
          type="mobile"
          onClick={() => {
            setIsOpenMenu(!isOpenMenu);
            if (!isOpenMenu) {
              setIsOpenModalContact(false); // Ferme la modal contact si on ouvre le menu
            }
          }}
        />
      </div>

      {/* Logo centré */}
      <LogoSayYes
        className="cursor-pointer absolute left-1/2 -translate-x-1/2 -top-[5px] z-0"
        onClick={() => navigate("/")}
        width={98}
        height={80}
      />

      {/* Section droite */}
      <div className="flex justify-end z-10 relative">
        <Button
          leftIcon={<ChatBuble />}
          type="mobile"
          onClick={() => {
            setIsOpenModalContact(!isOpenModalContact);
            setIsOpenMenu(false); // Ferme le menu si on ouvre la modal contact
          }}
        />
      </div>
    </motion.div>
  );
};

export default HeaderMobile;
