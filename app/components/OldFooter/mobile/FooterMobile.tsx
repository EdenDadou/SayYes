import SvgLogo from "~/components/OldHeader/components/Logo";

import SvgBtnInstagram from "~/components/OldFooter/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/OldFooter/components/BtnLinkedin";
import SvgBtnYoutube from "~/components/OldFooter/components/BtnYoutube";
import SvgBtnFacebook from "../components/BtnFacebook";
import SvgBtnTiktok from "../components/BtnTiktok";
import Button from "~/components/Button";

export default function FooterMobile() {
  return (
    <div className="relative w-full flex flex-col justify-center items-center filter bg-gray-500 drop-shadow-custom shadow-top">
      <div className="flex flex-col w-screen px-16 bg-gradient-gray-600 drop-shadow-custom gap-8 py-8">
        <div className="w-full top-0 left-0 right-0 flex items-center justify-between overflow-hidden gap-5 flex-col">
          <div className="flex flex-col items-center gap-8 ">
            <SvgLogo width={110} height={108} className="rotate-2" />
            <div className="holographic-text font-jakarta-bold text-xl">
              Communication visuelle*
            </div>
            <div className="h-[1px] w-full holographic-bloc" />
            <p className="text-md font-jakarta-bold">
              L’agence de communication visuelle
              <br /> qui qui met tout le monde d’accord !
            </p>
            <p className="text-gray-200 text-md">hello@say_yes.com</p>
            <p className="text-gray-200 text-md">
              40 Rue Servan - 75 011 - Paris
            </p>
          </div>
        </div>

        <div className="flex flex-col justfy-between items-center w-full gap-4">
          <div className="flex flex-row h-16 gap-3">
            <SvgBtnLinkedin className="w-10 h-10" />
            <SvgBtnFacebook className="w-10 h-10" />
            <SvgBtnInstagram className="w-10 h-10" />
            <SvgBtnTiktok className="w-10 h-10" />
            <SvgBtnYoutube className="w-10 h-10" />
          </div>
          <div className="flex flex-col justify-between items-center w-full gap-8">
            <Button label="Branding" />
            <Button label="Graphisme" />
            <Button label="Web Design" />
            <Button label="Identité Visuelle" />
            <Button label="Communication Print" />
            <Button label="Facilitation Graphique" />
            <Button label="Motion Design" />
            <Button label="Infographie" />
            <Button label="Nos Solutions" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 justify-between w-screen px-20 py-6">
        <p className="text-gray-200 text-sm py-2">Mentions Légales</p>
        <p className="text-gray-200 text-sm py-2">
          Say Yes ©2024. Tous droits réservés.
        </p>
        <p className="text-gray-200 text-sm py-2">From Paris With Love ♥</p>
      </div>
    </div>
  );
}
