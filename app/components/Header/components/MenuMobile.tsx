import { useEffect } from "react";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import "~/styles/tailwind.css";
import Button from "~/components/Button";
import { useNavigate } from "@remix-run/react";
import BackgroundModalMobile from "~/components/ModalContact/assets/BackgroundModalMobile";
import BackgroundMenuMobile from "../assets/BackgroundMenuMobile";

interface MenuMobileProps {
  isOpen: boolean;
  close: () => void;
}

export default function MenuMobile({ isOpen, close }: MenuMobileProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 z-20 flex flex-col items-center w-full h-screen overflow-y-auto pt-20 px-4 bg-black/90
        ${isOpen ? "block" : "hidden"}`}
    >
      {/* <BackgroundMenuMobile className="w-full h-full inset-0 absolute z-0" /> */}
      <div className="w-full h-full flex flex-col items-center gap-8 px-5 pt-20 z-10">
        <div className="font-jakarta text-md">Communication visuelle*</div>

        <Button label="Solutions" onClick={() => navigate("/solutions")} />
        <Button label="Portfolio" onClick={() => navigate("/portfolio")} />
        <div className="h-[3px] w-20 holographic-bg mb-6 rounded-full" />

        {/* 
        TODO Add Social Icons
        <div className="flex flex-row h-5 gap-3">
          <SvgBtnLinkedin className="w-8 h-8" />
          <SvgBtnFacebook className="w-8 h-8" />
          <SvgBtnInstagram className="w-8 h-8" />
          <SvgBtnTiktok className="w-8 h-8" />
          <SvgBtnYoutube className="w-8 h-8" />
        </div> */}
      </div>
    </div>
  );
}
