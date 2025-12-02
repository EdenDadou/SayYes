import ArrowFull from "~/assets/icons/ArrowFull";
import Card from "~/components/Card";
import Close from "~/assets/icons/Close";
import ArrowLight from "~/assets/icons/ArrowLight";
import Tel from "~/assets/icons/Tel";
import ChatBuble from "~/components/Header/assets/ChatBuble";
import Localisation from "~/assets/icons/Localisation";
import "~/styles/tailwind.css";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import { motion } from "framer-motion";
import Button from "~/components/Button";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

interface IContentContactProps {
  setSuccess: (success: boolean) => void;
  close: () => void;
}
export default function ContentContact({
  setSuccess,
  close,
}: IContentContactProps) {
  const fetcher: any = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      setSuccess(true);
    }
  }, [fetcher.state, fetcher.data, setSuccess]);

  return (
    <Card
      borderClass="light-border flex justify-center items-center w-[90%] max-w-6xl p-3 rounded-[28px]"
      height="85%"
      borderRadius="28px"
    >
      <div
        className="relative w-full h-full rounded-[16px] flex flex-row overflow-hidden px-20"
        style={{
          backgroundImage: "url(/images/ModalBg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <BackgroundModal className="absolute inset-0 w-full h-full z-0 rounded-[20px]" /> */}

        <button
          className="absolute top-4 right-4 text-white cursor-pointer z-30 hover:opacity-70"
          onClick={close}
        >
          <Close />
        </button>

        <motion.div
          className="flex flex-row justify-between size-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="relative z-10 w-[60%] flex flex-col justify-center pl-4 gap-8">
            <div className="h-[3px] w-28 holographic-bg" />

            <div className="flex flex-col gap-1">
              <p className="text-[50px] leading-[50px] text-white font-jakarta-bold tracking-[-2px]">
                Une idée, un projet,{" "}
              </p>
              <p className="text-[50px] leading-[50px] text-white font-jakarta-bold tracking-[-2px]">
                un évènement ?
              </p>
              <h1 className="text-[50px] leading-[50px] text-white flex flex-row items-center gap-2 font-jakarta-semi-bold tracking-[-2px] holographic-text">
                <ArrowLight className="w-12 h-12" />
                Contactez-nous !
              </h1>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-2 text-white">
              <div className="flex items-center gap-3">
                <Tel color="rgb(255 255 255 / 0.6)" />
                <span className="text-lg font-jakarta">07 82 45 68</span>
              </div>
              <div className="flex items-center gap-3">
                <ChatBuble color="rgb(255 255 255 / 0.6)" />
                <span className="text-lg font-jakarta">hello@say_yes.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Localisation color="rgb(255 255 255 / 0.6)" />
                <span className="text-lg font-jakarta">
                  40 Rue Sèvres - 75015 Paris
                </span>
              </div>
            </div>
            {/* Social Icons */}

            {/* TODO Add social icons */}
            <div className="flex flex-row h-5 gap-3">
              <SvgBtnLinkedin className="w-8 h-8" />
              <SvgBtnFacebook className="w-8 h-8" />
              <SvgBtnInstagram className="w-8 h-8" />
              <SvgBtnTiktok className="w-8 h-8" />
              <SvgBtnYoutube className="w-8 h-8" />
            </div>
          </div>

          <fetcher.Form
            className="relative w-[40%] h-full flex flex-col gap-3 justify-center"
            method="post"
            action="/api/contact"
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
                  borderBottom: "0.5px solid #9C9C9C",
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
                  borderBottom: "0.5px solid #9C9C9C",
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
                  borderBottom: "0.5px solid #9C9C9C",
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
                  borderBottom: "0.5px solid #9C9C9C",
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
                  borderBottom: "0.5px solid #9C9C9C",
                }}
                placeholder="Bonjour, je vous contacte pour..."
              ></textarea>
            </label>

            <div className="flex justify-between items-center mt-6">
              <p className="flex items-center gap-2 text-sm text-gray-100">
                *Champs obligatoires
              </p>

              <Button
                type="border"
                label={
                  fetcher.state === "submitting"
                    ? "Envoi en cours..."
                    : "Envoyer ma demande"
                }
                htmlType="submit"
                textSize="S"
                disabled={fetcher.state === "submitting"}
                leftIcon={<ArrowFull className="w-6 h-6" />}
              />
            </div>
          </fetcher.Form>
        </motion.div>
      </div>
    </Card>
  );
}
