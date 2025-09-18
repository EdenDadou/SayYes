import ArrowFull from "~/assets/icons/ArrowFull";
import Card from "~/components/Card";
import BackgroundModal from "../assets/BackgroundModal";
import Close from "~/assets/icons/Close";
import SvgArrowLight from "~/assets/icons/ArrowLight";
import Tel from "~/assets/icons/Tel";
import ChatBuble from "~/components/Header/assets/ChatBuble";
import Localisation from "~/assets/icons/Localisation";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import "~/styles/tailwind.css";

interface IContentContactProps {
  setSuccess: (success: boolean) => void;
  close: () => void;
}
export default function ContentContact({
  setSuccess,
  close,
}: IContentContactProps) {
  return (
    <Card
      borderClass="light-border flex justify-center items-center w-[90%] max-w-6xl p-3"
      height="85%"
    >
      <div className="relative w-full h-full rounded-xl flex flex-row overflow-hidden px-20">
        <BackgroundModal className="absolute inset-0 w-full h-full z-0 rounded-[20px]" />

        <button
          className="absolute top-4 right-4 text-white cursor-pointer z-30 hover:opacity-70"
          onClick={close}
        >
          <Close />
        </button>

        <div className="relative z-10 w-[55%] flex flex-col justify-center gap-10">
          <div className="flex flex-col gap-8">
            <div className="h-[3px] w-28 holographic-bg" />

            <div className="flex flex-col gap-1">
              <p className="text-5xl text-white font-jakarta-bold">
                Une idée, un projet,{" "}
              </p>
              <p className="text-5xl text-white font-jakarta-bold">
                un évènement ?
              </p>
              <h1 className="text-5xl text-white flex flex-row items-center gap-4 font-jakarta-bold leading-tight holographic-text mt-2">
                <SvgArrowLight className="w-12 h-12" />
                Contactez-nous !
              </h1>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-2 text-white">
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
          {/* Social Icons */}
          <div className="flex flex-row h-5 gap-3">
            <SvgBtnLinkedin className="w-8 h-8" />
            <SvgBtnFacebook className="w-8 h-8" />
            <SvgBtnInstagram className="w-8 h-8" />
            <SvgBtnTiktok className="w-8 h-8" />
            <SvgBtnYoutube className="w-8 h-8" />
          </div>
        </div>

        <form
          className="relative w-[45%] h-full flex flex-col gap-3 justify-center"
          method="post"
          action="https://formspree.io/f/xqknqjzp"
        >
          <label className="block">
            <span className="text-sm text-white font-bold mb-2 block">
              Nom et prénom*
            </span>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl"
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
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
              className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl"
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
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
              className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl"
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
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
              className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl"
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
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
              rows={3}
              className="w-full px-4 py-2 text-white placeholder-gray-300 rounded-3xl"
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow:
                  "inset 2px 2px 6px rgba(0, 0, 0, 0.5), inset -1px -1px 3px rgba(255, 255, 255, 0.1)",
              }}
              placeholder="Bonjour, je vous contacte pour..."
            ></textarea>
          </label>

          <div className="flex justify-between items-center mt-6">
            <p className="flex items-center gap-2 text-sm text-gray-100">
              *Champs obligatoires
            </p>

            <button
              //   type="submit"
              onClick={() => setSuccess(true)}
              type="button"
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
      </div>
    </Card>
  );
}
