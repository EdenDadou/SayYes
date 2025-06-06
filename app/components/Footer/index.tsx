import SvgLogo from "~/components/Header/components/Logo";

import Button from "../Button";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import SvgBtnFacebook from "./components/BtnFacebook";
import SvgBtnTiktok from "./components/BtnTiktok";

export default function Footer() {
  return (
    <div className="relative w-full flex flex-col justify-center items-center filter bg-gray-500 drop-shadow-custom shadow-top">
      <div className="flex flex-col w-screen px-20 bg-gradient-gray-600 drop-shadow-custom">
        <div className="custom w-full md:h-28 top-0 left-0 right-0 flex items-center justify-between overflow-hidden gap-5 py-20">
          <div className="flex flex-row items-center gap-8 ">
            <SvgLogo width={110} height={108} className="rotate-2" />

            <div className="holographic-text font-jakarta-bold text-xl">
              Communication visuelle*
            </div>
          </div>
          <p className="text-gray-200 text-md py-2">hello@say_yes.com</p>
          <p className="text-gray-200 text-md py-2">
            40 Rue Servan - 75 011 - Paris
          </p>
        </div>

        <div className="h-[1px] w-full mb-12 holographic-bloc" />
        <div className="flex flex-row justfy-between w-full pb-8">
          <div className="flex flex-col gap-4 w-1/3">
            <p className="text-md font-jakarta-bold">
              L’agence de communication
              <br /> visuelle qui qui met tout le
              <br /> monde d’accord !
            </p>
            <div className="flex flex-row h-5 gap-3">
              <SvgBtnLinkedin className="w-8 h-8" />
              <SvgBtnFacebook className="w-8 h-8" />
              <SvgBtnInstagram className="w-8 h-8" />
              <SvgBtnTiktok className="w-8 h-8" />
              <SvgBtnYoutube className="w-8 h-8" />
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col gap-4 text-gray-200 ml-10">
              <Button label="Branding" />
              <Button label="Graphisme" />
              <Button label="Web Design" />
            </div>
            <div className="flex flex-col gap-4 text-gray-200 ml-10">
              <Button label="Identité Visuelle" />
              <Button label="Communication Print" />
              <Button label="Facilitation Graphique" />
            </div>
            <div className="flex flex-col gap-4 text-gray-200 ml-10">
              <Button label="Motion Design" />
              <Button label="Infographie" />
              <Button label="Nos Solutions" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-screen px-20 py-3">
        <p className="text-gray-200 text-sm py-2">Mentions Légales</p>
        <p className="text-gray-200 text-sm py-2">
          Say Yes ©2024. Tous droits réservés.
        </p>
        <p className="text-gray-200 text-sm py-2">From Paris With Love ♥</p>
      </div>
    </div>
  );
}
