import { useEffect } from "react";
import SvgArrowLight from "~/assets/icons/ArrowLight";
import Close from "~/assets/icons/Close";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import ChatBuble from "../Header/components/ChatBuble";
import Localisation from "~/assets/icons/Localisation";
import Tel from "~/assets/icons/Tel";
import ArrowFull from "~/assets/icons/ArrowFull";
import Card from "../Card";
import BackgroundModalMobile from "./components/BackgroundModalMobile";

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
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function pour restaurer le scroll quand le component se démonte
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center w-full h-screen overflow-y-auto pt-20 px-4
    ${isOpen ? "block" : "hidden"}`}
      style={{
        background: "rgba(0, 0, 0, 0.30)",
        backdropFilter: "blur(25px)",
      }}
    >
      <button
        className="absolute top-4 right-4 text-white cursor-pointer z-30 hover:opacity-70"
        onClick={close}
      >
        <Close />
      </button>
      <div className="flex flex-col items-center justify-start gap-8 z-20 pb-8">
        <div className="h-[3px] w-20 holographic-bg" />
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-4xl text-white font-jakarta-bold">
            Une idée, un projet,{" "}
          </p>
          <p className="text-4xl text-white font-jakarta-bold ">
            un évènement ?
          </p>
          <h1 className="text-4xl text-white flex flex-row items-center gap-2 font-jakarta holographic-text tracking-tighter">
            <SvgArrowLight className="w-10 h-10" />
            Contactez-nous !
          </h1>
        </div>
        {/* Contact Information */}
        <div className="flex flex-col gap-2 text-white items-center">
          <div className="flex items-center gap-3">
            <Tel color="white" />
            <span className="text-lg font-jakarta">07 82 45 68</span>
          </div>
          <div className="flex items-center gap-3">
            <ChatBuble color="white" />
            <span className="text-lg font-jakarta">hello@say_yes.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Localisation color="white" />
            <span className="text-lg font-jakarta">
              40 Rue Sèvres - 75015 Paris
            </span>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center gap-8 px-5">
          <div className="flex flex-row h-5 gap-3">
            <SvgBtnLinkedin className="w-8 h-8" />
            <SvgBtnFacebook className="w-8 h-8" />
            <SvgBtnInstagram className="w-8 h-8" />
            <SvgBtnTiktok className="w-8 h-8" />
            <SvgBtnYoutube className="w-8 h-8" />
          </div>
        </div>
        <Card height="85%" borderClass="p-8 bg-black">
          <BackgroundModalMobile className="absolute inset-0 w-full h-full z-0 rounded-[20px] object-cover" />

          <form className="relative w-full h-full flex flex-col gap-6 justify-center text-center">
            <label className="block">
              <span className="text-sm text-white font-bold mb-2 block">
                Nom et prénom*
              </span>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0, 0, 0, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.1)",
                }}
                placeholder="Nom et prénom"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white font-bold mb-2 block">
                Mail*
              </span>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0, 0, 0, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.1)",
                }}
                placeholder="exemple@gmail.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white font-bold mb-2 block">
                Mobile
              </span>
              <input
                type="tel"
                name="mobile"
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0, 0, 0, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.1)",
                }}
                placeholder="+33 6 00 00 00"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white font-bold mb-2 block">
                Entreprise
              </span>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0, 0, 0, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.1)",
                }}
                placeholder="Entreprise"
              />
            </label>

            <label className="block">
              <span className="text-sm text-white font-bold mb-2 block">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  boxShadow:
                    "inset 2px 2px 6px rgba(0, 0, 0, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.1)",
                }}
                placeholder="Bonjour, je vous contacte pour..."
              ></textarea>
            </label>

            <div className="flex justify-between items-center mt-6">
              <p className="flex items-center gap-2 text-sm text-gray-100 text-center">
                *Champs obligatoires
              </p>

              <button
                type="submit"
                className="text-white px-6 py-3 font-jakarta flex items-center gap-3 text-lg rounded-full hover:scale-105 transition-all"
                style={{
                  border: "0.3px solid rgba(255, 255, 255, 0.30)",
                  boxShadow:
                    "0 2px 10px 0 rgba(0, 0, 0, 0.20), 0 0 2px 0 rgba(255, 255, 255, 0.50) inset",
                }}
              >
                <ArrowFull className="w-6 h-6" />
                Envoyer ma demande
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
