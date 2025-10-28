import Button from "../Button";
import { motion } from "framer-motion";
import { useFooterMotion } from "~/utils/hooks/useFooterMotion";
import { useViewport } from "~/utils/hooks/useViewport";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import SvgBtnFacebook from "./components/BtnFacebook";
import SvgBtnTiktok from "./components/BtnTiktok";
import SayYesFooter from "./components/SayYes";
import LogoSayYes from "~/components/Header/assets/LogoSayYes";
import FooterMobile from "./mobile/FooterMobile";
import LogoSayYesHolo from "./components/LogoSayYesHolo";
import ChatBuble from "../Header/assets/ChatBuble";
import Localisation from "~/assets/icons/Localisation";

interface IFooterProps {
  setIsOpenModalContact: (value: boolean) => void;
}

export default function Footer({ setIsOpenModalContact }: IFooterProps) {
  const isMobile = useViewport();
  const { footerRef, opacity, opacitySecondary } = useFooterMotion();

  return isMobile ? (
    <FooterMobile />
  ) : (
    <div
      ref={footerRef}
      className="relative w-full flex flex-col justify-center items-center filter pt-40"
    >
      <span className="font-jakarta-semi-bold text-[60px] leading-[60px] text-center">
        Ça vous inspire ? <br />
        <span className="holographic-text">Parlons design !</span>
      </span>
      <div className="relative z-10 w-full h-[230px] flex justify-center items-center">
        <SayYesFooter className="w-full h-[300px] absolute pointer-events-none" />
        <Button
          label="On en discute"
          type="border"
          leftIcon={<ChatBuble color="white" />}
          textSize="L"
          onClick={() => setIsOpenModalContact(true)}
        />
        <motion.img
          src="/images/footer/Halo.png"
          alt="footer"
          className="w-full h-full absolute top-0 left-0 pointer-events-none"
          style={{ opacity }}
        />
        <motion.img
          src="/images/footer/HaloBottom.png"
          alt="footer"
          className="w-full h-full absolute bottom-0 left-0 pointer-events-none"
          style={{ opacity: opacitySecondary }}
        />
      </div>
      <div className="flex flex-col w-screen px-20 footer">
        <div className="custom w-full md:h-28 top-0 left-0 right-0 flex items-center justify-between overflow-hidden gap-5 py-20">
          <div className="flex flex-row items-center gap-8 ">
            <LogoSayYesHolo width={110} height={108} />

            <div className="holographic-text font-jakarta-bold text-xl">
              Communication visuelle*
            </div>
          </div>
          <p className="text-gray-200 text-md py-2 flex flex-row items-center gap-2">
            <ChatBuble color="grey" />
            hello@say_yes.com
          </p>
          <p className="text-gray-200 text-md py-2 flex flex-row items-center gap-2">
            <Localisation color="grey" />
            40 Rue Servan - 75 011 - Paris
          </p>
        </div>

        <div className="h-[1px] w-full mb-12 holographic-bg" />
        <div className="flex flex-row justfy-between w-full pb-8">
          <div className="flex flex-col gap-4 w-1/3">
            <p className="text-md font-jakarta">
              L’agence de communication
              <br /> visuelle qui met tout le
              <br /> monde d’accord !
            </p>
            {/* 
            
            TODO : Add social icons
            <div className="flex flex-row h-5 gap-3">
              <SvgBtnLinkedin className="w-8 h-8" />
              <SvgBtnFacebook className="w-8 h-8" />
              <SvgBtnInstagram className="w-8 h-8" />
              <SvgBtnTiktok className="w-8 h-8" />
              <SvgBtnYoutube className="w-8 h-8" />
            </div> */}
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col gap-6 text-gray-200 ml-10">
              <p className="text-md font-jakarta">Branding</p>
              <p className="text-md font-jakarta">Graphisme</p>
              <p className="text-md font-jakarta">Web Design</p>
            </div>
            <div className="flex flex-col gap-6 text-gray-200 ml-10">
              <p className="text-md font-jakarta">Identité Visuelle</p>
              <p className="text-md font-jakarta">Communication Print</p>
              <p className="text-md font-jakarta">Facilitation Graphique</p>
            </div>
            <div className="flex flex-col gap-6 text-gray-200 ml-10">
              <p className="text-md font-jakarta">Motion Design</p>
              <p className="text-md font-jakarta">Infographie</p>
              <p className="text-md font-jakarta">Nos Solutions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-screen px-20 py-3 bg-black">
        <p className="text-gray-200 text-sm py-2">Mentions Légales</p>
        <p className="text-gray-200 text-sm py-2">
          Say Yes ©2024. Tous droits réservés.
        </p>
        <p className="text-gray-200 text-sm py-2">From Paris With Love ♥</p>
      </div>
    </div>
  );
}
