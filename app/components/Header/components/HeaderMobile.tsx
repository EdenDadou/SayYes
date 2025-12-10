import LogoSayYes from "~/components/Header/assets/LogoSayYes";
import { useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useNavigate } from "@remix-run/react";
import Button from "~/components/Button";
import ChatBuble from "../assets/ChatBuble";
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
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  // Listen to scroll changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (latest > 100 && direction === "down") {
      setIsVisible(false);
    } else if (direction === "up" || latest < 100) {
      setIsVisible(true);
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.div
      className="header-custom border-custom flex flex-row justify-between items-center mx-4 h-[60px] px-2 mb-20"
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -130,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
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
