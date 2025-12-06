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
import Star from "~/assets/icons/Star";
import { Link } from "@remix-run/react";

interface IFooterProps {
  setIsOpenModalContact: (value: boolean) => void;
  footerType?: "default" | "home";
}

export default function Footer({
  setIsOpenModalContact,
  footerType,
}: IFooterProps) {
  const { footerRef, opacity, opacitySecondary } = useFooterMotion();

  return (
    <div
      ref={footerRef}
      className="relative w-full flex flex-col justify-center items-center filter pt-40"
    >
      {footerType === "home" ? (
        <div className="max-w-[990px] m-auto flex flex-col items-center gap-4">
          <div className="h-[3px] md:w-28 w-20 holographic-bg rounded-full my-8" />
          <div className="flex flex-row font-jakarta-semibold text-[24px] leading-[27px] text-white items-center gap-2">
            <span>L’agence qui met tout le monde d’accord </span>
          </div>
          <h2 className="flex flex-col justify-center items-center font-jakarta-semi-bold text-[56px] leading-[56px] text-center glassy tracking-[-2.8px] whitespace-pre-line p-2">
            <span className="flex flex-row items-center gap-4">
              <Star className="w-6 h-6" />
              Dans 2 mois, votre marque
              <Star className="w-6 h-6" />
            </span>
            <span>aura changer de dimension !</span>
          </h2>
        </div>
      ) : (
        <>
          <span className="font-jakarta-semi-bold text-[70px] leading-[70px] text-center z-20">
            Ça vous inspire ? <br />
            <span className="holographic-text">Parlons design !</span>
          </span>
        </>
      )}
      <div className="relative z-10 w-full h-[230px] flex justify-center items-center overflow-hidden">
        <SayYesFooter className="w-full h-[300px] absolute pointer-events-none" />
        <Button
          label={footerType === "home" ? "Démarrer un projet" : "On en discute"}
          type="border"
          leftIcon={<ChatBuble color="white" />}
          textSize="L"
          onClick={() => setIsOpenModalContact(true)}
        />
        {footerType === "home" ? (
          <motion.img
            src="/images/footer/HaloPurple.png"
            alt="footer"
            className="w-full h-full absolute bottom-0 left-0 pointer-events-none"
            style={{ opacity }}
          />
        ) : (
          <motion.img
            src="/images/footer/Halo.png"
            alt="footer"
            className="w-full h-full absolute top-0 left-0 pointer-events-none"
            style={{ opacity }}
          />
        )}

        <motion.img
          src="/images/footer/HaloBottom.png"
          alt="footer"
          className="w-full h-full absolute -bottom-20 left-0 pointer-events-none"
          style={{ opacity: opacitySecondary }}
        />
      </div>
      <div className="flex flex-col w-screen footer">
        <div className="flex justify-center item-center flex-col w-[990px] m-auto">
          <div className="custom w-full md:h-28 top-0 left-0 right-0 flex items-center justify-between overflow-hidden gap-5 py-20">
            <div className="flex flex-row items-center gap-8 ">
              <LogoSayYesHolo width={110} height={108} />

              <div className="holographic-text font-jakarta-bold text-xl">
                Communication visuelle*
              </div>
            </div>
            <p className="text-white text-md py-2 flex flex-row items-center gap-2">
              <ChatBuble color="grey" className="w-4" />
              hello@say_yes.com
            </p>
            <p className="text-white text-md py-2 flex flex-row items-center gap-2">
              <Localisation color="grey" className="w-3" />
              40 Rue Servan - 75 011 - Paris
            </p>
          </div>

          <div className="h-[1px] w-full mb-12 holographic-bg-no-shadow" />
          <div className="flex flex-row w-full pb-12">
            <div className="flex flex-col w-1/3 justify-between self-stretch">
              <p className="text-md font-jakarta">
                L'agence de communication
                <br /> visuelle qui met tout le
                <br /> monde d'accord !
              </p>
              <div className="flex flex-row gap-3">
                <SvgBtnLinkedin className="w-8 h-8" />
                <SvgBtnFacebook className="w-8 h-8" />
                <SvgBtnInstagram className="w-8 h-8" />
                <SvgBtnTiktok className="w-8 h-8" />
                <SvgBtnYoutube className="w-8 h-8" />
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col gap-8 text-white ml-10">
                <p className="text-[14px] font-jakarta">Branding</p>
                <p className="text-[14px] font-jakarta">Graphisme</p>
                <p className="text-[14px] font-jakarta">Web Design</p>
              </div>
              <div className="flex flex-col gap-8 text-white ml-10">
                <p className="text-[14px] font-jakarta">Identité Visuelle</p>
                <p className="text-[14px] font-jakarta">Communication Print</p>
                <p className="text-[14px] font-jakarta">
                  Facilitation Graphique
                </p>
              </div>
              <div className="flex flex-col gap-8 text-white ml-10">
                <p className="text-[14px] font-jakarta">Motion Design</p>
                <p className="text-[14px] font-jakarta">Infographie</p>
                <p className="text-[14px] font-jakarta">Nos Solutions</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full py-3 bg-black">
            <Link
              to="/mention-legale"
              className="text-[#929292] text-sm py-2 hover:text-white transition-colors"
            >
              Mentions Légales
            </Link>
            <p className="text-[#929292] text-sm py-2">
              Say Yes ©2024. Tous droits réservés.
            </p>
            <p className="text-[#929292] text-sm py-2">
              From Paris With Love ♥
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
