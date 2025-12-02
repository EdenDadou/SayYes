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

export default function MenuMobile({ isOpen, close }: MenuMobileProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleNaviation(path: string) {
    close();
    setTimeout(() => {
      navigate(path);
    }, 200);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-20 flex flex-col items-center w-full h-screen overflow-y-auto pt-20 px-4 bg-black/90"
          style={{ transformOrigin: "top center" }}
        >
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full inset-0 absolute z-0"
            style={{ transformOrigin: "top center" }}
          >
            <BackgroundMenuMobile className="w-full h-full" />
          </motion.div>
          <motion.div
            initial={{ scaleY: 0.95 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0.95 }}
            transition={{ duration: 0.1, delay: 0.1, ease: "easeOut" }}
            className="w-full h-full flex flex-col items-center gap-8 px-5 pt-20 z-10"
          >
            <div className="font-jakarta-bold text-[14px]">
              Communication visuelle*
            </div>
            <button
              onClick={() => handleNaviation("/solutions")}
              className={`text-[28px] font-jakarta ${
                location.pathname === "/solutions" ? "holographic-text" : ""
              }`}
            >
              Solutions
            </button>
            <button
              onClick={() => handleNaviation("/portfolio")}
              className={`text-[28px] font-jakarta${
                location.pathname === "/portfolio" ? "holographic-text" : ""
              }`}
            >
              Portfolio
            </button>
            <div className="h-[3px] w-20 holographic-bg mb-6 rounded-full" />
            <div className="flex items-center gap-2">
              <Localisation
                color="rgb(255 255 255 / 0.6)"
                className="w-4 h-4"
              />
              <span className="text-[14px] font-jakarta">
                40 Rue Sèvres - 75015 Paris
              </span>
            </div>
            <div className="flex flex-row h-5 gap-3">
              <SvgBtnLinkedin className="w-8 h-8" />
              <SvgBtnFacebook className="w-8 h-8" />
              <SvgBtnInstagram className="w-8 h-8" />
              <SvgBtnTiktok className="w-8 h-8" />
              <SvgBtnYoutube className="w-8 h-8" />
            </div>
            <div className="mt-8">
              <Button
                label="Parlons design !"
                // onClick={() => navigate("/portfolio")}
                type="plain"
                leftIcon={<ChatBuble />}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
