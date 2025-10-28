import useFooterMotion from "~/utils/hooks/useFooterMotion";
import Button from "../../Button";
import { motion } from "framer-motion";
import LogoSayYes from "~/components/Header/assets/LogoSayYes";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import SvgBtnFacebook from "../components/BtnFacebook";
import SvgBtnTiktok from "../components/BtnTiktok";
import SayYesFooter from "../components/SayYes";
import LogoSayYesColor from "~/components/Header/assets/LogoSayYesColor";
import ChatBuble from "~/components/Header/assets/ChatBuble";

interface IFooterMobileProps {
  setIsOpenModalContact: (value: boolean) => void;
}

export default function FooterMobile({
  setIsOpenModalContact,
}: IFooterMobileProps) {
  const { footerRef, opacity, opacitySecondary } = useFooterMotion();

  return (
    <div
      ref={footerRef}
      className="relative w-full flex flex-col justify-center items-center filter mt-20 gap-6"
    >
      <span className="font-jakarta text-[36px] leading-[40px] text-center">
        Ça vous inspire ? <br />
        <span className="holographic-text">Parlons design !</span>
      </span>
      <Button
        label="On en discute"
        type="border"
        leftIcon={<ChatBuble color="white" />}
        textSize="S"
        onClick={() => setIsOpenModalContact(true)}
      />
      <div className="relative z-10 w-full h-[100px] flex justify-center items-end overflow-hidden">
        <SayYesFooter className="w-full h-fit absolute" />
        <motion.img
          src="/images/footer/Halo.png"
          alt="footer"
          className="w-screen h-full absolute inset-0 object-cover z-20"
          style={{ opacity }}
        />
        <motion.img
          src="/images/footer/HaloBottom.png"
          alt="footer"
          className="w-full h-[80px] absolute -bottom-5 left-0 object-cover"
          style={{ opacity: opacitySecondary }}
        />
      </div>
      <div className="flex flex-col w-screen justify-center items-center gap-4 footer-mobile">
        <div className="flex flex-col justify-center items-center">
          <LogoSayYesColor width={110} height={108} />
          <div className="holographic-text font-jakarta-bold text-md text-center">
            Communication visuelle*
          </div>
        </div>

        <div className="h-[1px] w-2/3 holographic-bg my-4" />
        <p className="text-[14px] font-jakarta-bold">
          L’agence de communication visuelle <br /> qui qui met tout le monde
          d’accord !
        </p>
        <p className="text-gray-200 text-md">hello@say_yes.com</p>
        <p className="text-gray-200 text-md">40 Rue Servan - 75 011 - Paris</p>
        <div className="flex flex-col justfy-between w-full pb-8 items-center gap-8 ">
          <div className="flex flex-row gap-3 pt-4">
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
        <p className="text-gray-150 text-sm py-2">
          Say Yes ©2025 - Tous droits réservés.
        </p>
        <p className="text-gray-150 text-sm py-2">Mentions Légales</p>
        <p className="text-gray-150 text-sm py-2">From Paris With Love ♥</p>
      </div>
    </div>
  );
}
