import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import "~/styles/tailwind.css";
import Button from "~/components/Button";
import { useLocation, useNavigate } from "@remix-run/react";
import BackgroundMenuMobile from "../assets/BackgroundMenuMobile";
import Localisation from "~/assets/icons/Localisation";
import ChatBuble from "../assets/ChatBuble";

interface MenuMobileProps {
  isOpen: boolean;
  close: () => void;
}

const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 15,
    scale: 0.98,
    transition: {
      delay: (6 - i) * 0.04,
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.2,
    },
  },
};

const backgroundVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.1,
    },
  },
};

export default function MenuMobile({ isOpen, close }: MenuMobileProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  function handleNaviation(path: string) {
    close();
    setTimeout(() => {
      navigate(path);
    }, 550);
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[50] flex flex-col items-center w-full h-screen overflow-y-auto pt-20 px-4 bg-black/90"
        >
          <motion.div
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full inset-0 absolute z-0"
          >
            <img
              src="/images/bg-menu-mobile.png"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="w-full h-full flex flex-col items-center gap-8 px-5 pt-20 z-10" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}>
            <motion.div
              custom={0}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="font-jakarta-bold text-[14px]"
            >
              Communication visuelle*
            </motion.div>
            <motion.button
              custom={1}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => handleNaviation("/solutions")}
              className={`text-[28px] font-jakarta ${
                location.pathname === "/solutions" ? "holographic-text" : ""
              }`}
              whileTap={{ scale: 0.95 }}
            >
              Solutions
            </motion.button>
            <motion.button
              custom={2}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => handleNaviation("/portfolio")}
              className={`text-[28px] font-jakarta${
                location.pathname === "/portfolio" ? "holographic-text" : ""
              }`}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.button>
            <motion.div
              custom={3}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-[3px] w-20 holographic-bg mb-6 rounded-full"
            />
            <motion.div
              custom={4}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center gap-2"
            >
              <Localisation
                color="rgb(255 255 255 / 0.6)"
                className="w-4 h-4"
              />
              <span className="text-[14px] font-jakarta">
                40 Rue Sèvres - 75015 Paris
              </span>
            </motion.div>
            <motion.div
              custom={5}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-row h-5 gap-3"
            >
              <SvgBtnLinkedin className="w-8 h-8" />
              <SvgBtnFacebook className="w-8 h-8" />
              <SvgBtnInstagram className="w-8 h-8" />
              <SvgBtnTiktok className="w-8 h-8" />
              <SvgBtnYoutube className="w-8 h-8" />
            </motion.div>
            <motion.div
              custom={6}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-8"
            >
              <Button
                label="Parlons design !"
                type="plain"
                leftIcon={<ChatBuble />}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
