import LogoSayYes from "~/components/Header/assets/LogoSayYes";
import { useState, useRef, useEffect } from "react";
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

const HIDE_THRESHOLD = 100;
const DIRECTION_DELTA = 5;

const HeaderMobile = ({
  setIsOpenModalContact,
  setIsOpenMenu,
  isOpenModalContact,
  isOpenMenu,
}: HeaderProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const isVisibleRef = useRef(true);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  const updateVisibility = (next: boolean) => {
    if (isVisibleRef.current === next) return;
    isVisibleRef.current = next;
    setIsVisible(next);
  };

  useEffect(() => {
    if (isOpenMenu) updateVisibility(true);
  }, [isOpenMenu]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isOpenMenu) {
      updateVisibility(true);
      return;
    }
    const delta = latest - lastScrollY.current;
    if (Math.abs(delta) < DIRECTION_DELTA) return;

    if (latest < HIDE_THRESHOLD) {
      updateVisibility(true);
    } else if (delta > 0) {
      updateVisibility(false);
    } else {
      updateVisibility(true);
    }
    lastScrollY.current = latest;
  });

  return (
    <div className="sticky top-5 z-[60] mx-4 mb-20">
      <motion.header
        className="border-custom flex flex-row justify-between items-center h-[60px] px-2 rounded-[78px]"
        initial={false}
        animate={{
          y: isVisible ? 0 : -130,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="flex justify-start z-10 relative">
          <Button
            ariaLabel={isOpenMenu ? "Fermer le menu" : "Ouvrir le menu"}
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
                setIsOpenModalContact(false);
              }
            }}
          />
        </div>

        <LogoSayYes
          className="cursor-pointer absolute left-1/2 -translate-x-1/2 -top-[5px] z-0"
          onClick={() => navigate("/")}
          width={98}
          height={80}
        />

        <div className="flex justify-end z-10 relative">
          <Button
            ariaLabel="Ouvrir le formulaire de contact"
            leftIcon={<ChatBuble />}
            type="mobile"
            onClick={() => {
              setIsOpenModalContact(!isOpenModalContact);
              setIsOpenMenu(false);
            }}
          />
        </div>
      </motion.header>
    </div>
  );
};

export default HeaderMobile;
