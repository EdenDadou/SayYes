import SvgLogo from "~/assets/icons/Header/Logo";
import "~/styles/index";
import Button from "../Button";
import SvgBtnInstagram from "~/assets/icons/Footer/BtnInstagram";
import SvgBtnLinkedin from "~/assets/icons/Footer/BtnLinkedin";
import SvgBtnYoutube from "~/assets/icons/Footer/BtnYoutube";

export default function Footer() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <div className="bg-gradient-gray-400 filter drop-shadow-custom shadow-inset-custom w-full md:h-28  top-0 left-0 right-0 flex items-center justify-between overflow-hidden gap-5 px-20">
        <SvgLogo width={110} height={108} className="rotate-2" />

        <div className="holographic-text font-jakarta-bold text-lg">
          Communication visuelle*
        </div>

        <Button label="Solutions" />
        <Button label="Portfolio" />
        <Button label="L’agence" />
        <Button label="Ressources" />
        <div className="flex flex-row ">
          <SvgBtnInstagram />
          <SvgBtnLinkedin />
          <SvgBtnYoutube />
        </div>
      </div>
      <p className="text-gray-200 text-sm py-2">
        Say Yes ©2024. Tous droits réservés.
      </p>
    </div>
  );
}
