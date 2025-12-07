import { useEffect } from "react";
import ArrowLight from "~/assets/icons/ArrowLight";
import Close from "~/assets/icons/Close";
import Localisation from "~/assets/icons/Localisation";
import Tel from "~/assets/icons/Tel";
import ArrowFull from "~/assets/icons/ArrowFull";
import BackgroundModalMobile from "./assets/BackgroundModalMobile";
import "~/styles/tailwind.css";
import ChatBuble from "~/components/Header/assets/ChatBuble";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import Card from "~/components/Card";
import Button from "~/components/Button";

interface ModalModalContactProps {
  isOpen: boolean;
  close: () => void;
}

export default function ModalContactMobile({
  isOpen,
  close,
}: ModalModalContactProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-20 flex flex-col items-center w-full h-screen overflow-y-auto pt-20
    ${isOpen ? "block" : "hidden"}`}
      style={{
        background: "rgba(0, 0, 0, 0.30)",
        backdropFilter: "blur(25px)",
      }}
    >
      <div className="flex flex-col items-center justify-start gap-8 z-20 pb-[30px] pt-20 relative w-full px-4">
        <button
          className="absolute top-10 right-8 text-white cursor-pointer z-30 hover:opacity-70"
          onClick={close}
        >
          <Close />
        </button>

        <div className="flex flex-col items-center justify-center gap-1">
          <div className="h-[3px] w-20 holographic-bg mb-6 rounded-full" />
          <p className="text-[31px] leading-[35px] text-white font-jakarta-bold">
            Une idée, un projet,{" "}
          </p>
          <p className="text-[31px] text-white font-jakarta-bold leading-[35px]">
            un évènement ?
          </p>
          <h1 className="text-[31px] text-white flex flex-row items-center gap-2 font-jakarta-semi-bold holographic-text tracking-tighter leading-[35px]">
            <ArrowLight className="w-10 h-10" />
            Contactez-nous !
          </h1>
        </div>
        {/* Contact Information */}
        <div className="flex flex-col gap-2 text-white items-center">
          <div className="flex items-center gap-2">
            <Tel color="rgb(255 255 255 / 0.6)" className="w-4 h-4" />
            <span className="text-[14px] font-jakarta">07 82 45 68</span>
          </div>
          <div className="flex items-center gap-2">
            <ChatBuble color="rgb(255 255 255 / 0.6)" className="w-4 h-4" />
            <span className="text-[14px] font-jakarta">hello@say_yes.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Localisation color="rgb(255 255 255 / 0.6)" className="w-4 h-4" />
            <span className="text-[14px] font-jakarta">
              40 Rue Sèvres - 75015 Paris
            </span>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center gap-8 px-5 mb-5">
          <div className="flex flex-row h-5 gap-3">
            <SvgBtnLinkedin className="w-8 h-8" />
            <SvgBtnFacebook className="w-8 h-8" />
            <SvgBtnInstagram className="w-8 h-8" />
            <SvgBtnTiktok className="w-8 h-8" />
            <SvgBtnYoutube className="w-8 h-8" />
          </div>
        </div>
        <Card
          height="85%"
          borderClass="py-8 px-4 bg-gradient-to-bl from-[#000000] via-[#080809] to-[#4034EB] rounded-[15px] relative"
        >
          <BackgroundModalMobile className="absolute inset-0  w-full h-full z-0 rounded-[20px] object-contain blur-3xl" />

          <form className="relative w-full h-full flex flex-col gap-4 justify-center text-center z-20">
            <label className="block">
              <span className="text-sm text-white font-jakarta mb-2 block">
                Nom et prénom*
              </span>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  borderBottom: "1px solid #9C9C9C",
                }}
                placeholder="Nom et prénom"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white font-jakarta mb-2 block">
                Mail*
              </span>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  borderBottom: "1px solid #9C9C9C",
                }}
                placeholder="exemple@gmail.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white font-jakarta mb-2 block">
                Mobile
              </span>
              <input
                type="tel"
                name="mobile"
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  borderBottom: "1px solid #9C9C9C",
                }}
                placeholder="+33 6 00 00 00"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white font-jakarta  mb-2 block">
                Entreprise
              </span>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  borderBottom: "1px solid #9C9C9C",
                }}
                placeholder="Entreprise"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white font-jakarta mb-2 block">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  borderBottom: "1px solid #9C9C9C",
                }}
                placeholder="Bonjour, je vous contacte pour..."
              ></textarea>
            </label>

            <div className="flex flex-col gap-4 justify-between items-center">
              <p className="flex items-center gap-2 text-sm text-gray-100 text-center">
                *Champs obligatoires
              </p>

              <Button
                type="border"
                label="Envoyer ma demande"
                leftIcon={<ArrowFull className="w-6 h-6" />}
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
