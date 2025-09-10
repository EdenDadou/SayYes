import useFooterMotion from "~/utils/hooks/useFooterMotion";
import Button from "../../Button";
import { motion } from "framer-motion";
import LogoSayYes from "~/components/Header/components/LogoSayYes";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import SvgBtnFacebook from "../components/BtnFacebook";
import SvgBtnTiktok from "../components/BtnTiktok";
import SayYesFooter from "../components/SayYes";

export default function FooterMobile() {
  const { footerRef, opacity, opacitySecondary } = useFooterMotion();

  return (
    <div
      ref={footerRef}
      className="relative w-full flex flex-col justify-center items-center filter mt-20"
    >
      <span className="font-jakarta text-[36px] leading-[40px] text-center">
        Ça vous inspire ? <br />
        <span className="holographic-text">Parlons design !</span>
      </span>
      <div className="relative z-10 w-full h-full ">
        <SayYesFooter className="w-full h-full" />
        <motion.img
          src="./images/footer/Halo.png"
          alt="footer"
          className="w-full h-full absolute top-0 left-0"
          style={{ opacity }}
        />
        <motion.img
          src="./images/footer/HaloBottom.png"
          alt="footer"
          className="w-full h-full absolute bottom-0 left-0"
          style={{ opacity: opacitySecondary }}
        />
      </div>
      <div className="flex flex-col w-screen justify-center items-center gap-8 py-8 footer-mobile">
        <LogoSayYes width={110} height={108} className="rotate-2" />
        <div className="holographic-text font-jakarta-bold text-md text-center">
          Communication visuelle*
        </div>

        <div className="h-[1px] w-2/3 holographic-bloc" />
        <p className="text-md font-jakarta-bold">
          L’agence de communication visuelle <br /> qui qui met tout le monde
          d’accord !
        </p>
        <p className="text-gray-200 text-md">hello@say_yes.com</p>
        <p className="text-gray-200 text-md">40 Rue Servan - 75 011 - Paris</p>
        <div className="flex flex-col justfy-between w-full pb-8 items-center gap-8 ">
          <div className="flex flex-row gap-3">
            <SvgBtnLinkedin className="w-8 h-8" />
            <SvgBtnFacebook className="w-8 h-8" />
            <SvgBtnInstagram className="w-8 h-8" />
            <SvgBtnTiktok className="w-8 h-8" />
            <SvgBtnYoutube className="w-8 h-8" />
          </div>

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
      <div className="flex flex-col justify-between items-center w-screen py-3 bg-black">
        <p className="text-gray-200 text-sm py-2">
          Say Yes ©2025 - Tous droits réservés.
        </p>
        <p className="text-gray-200 text-sm py-2">Mentions Légales</p>
        <p className="text-gray-200 text-sm py-2">From Paris With Love ♥</p>
      </div>
    </div>
  );
}
