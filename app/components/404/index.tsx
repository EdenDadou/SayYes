import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import Desktoplayout from "../Layout/Desktop";
import SvgBtnFacebook from "../Footer/components/BtnFacebook";
import SvgBtnTiktok from "../Footer/components/BtnTiktok";
import SvgBtnLinkedin from "../Footer/components/BtnLinkedin";
import SvgBtnYoutube from "../Footer/components/BtnYoutube";
import SvgBtnInstagram from "../Footer/components/BtnInstagram";
import Background404 from "./Background404";
import ArrowFull from "~/assets/icons/ArrowFull";
import MasqueGif from "./MasqueGif";

export default function Page404() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <Desktoplayout footer={false}>
      <main className="relative w-screen h-screen flex items-center justify-start px-36 -mt-10">
        <div
          className="absolute right-10 w-[700px] h-[480px] z-0"
          style={{
            backgroundImage: 'url("images/404/404.gif")',
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
        />

        <MasqueGif height="480px" width="700px" right={40} />
        <Background404 className="absolute inset-0 w-full h-screen z-10" />

        <div className="flex flex-row items-center justify-center gap-8 z-20">
          <div className="self-stretch w-[3px] holographic-bg-vertical" />
          <div className="flex flex-col items-start justify-center gap-4 relative">
            <div
              className="w-[608px] h-[359px]"
              style={{
                backgroundImage: 'url("images/404/Title404.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "608px 359px",
              }}
            />
            <button
              //   type="submit"
              onClick={() => navigate(`/`)}
              type="button"
              className="absolute bottom-0 right-0 text-white px-6 py-3 font-jakarta flex items-center gap-3 text-lg rounded-full hover:scale-105 transition-all"
              style={{
                border: "0.3px solid rgba(255, 255, 255, 0.30)",
                boxShadow:
                  "0 2px 10px 0 rgba(0, 0, 0, 0.20), 0 0 2px 0 rgba(255, 255, 255, 0.50) inset",
              }}
            >
              <ArrowFull className="w-6 h-6" />
              Acceuil
            </button>
            {/* 
            //TODO : Add social icons
            <div className="flex flex-row gap-3">
              <SvgBtnLinkedin className="w-8 h-8" />
              <SvgBtnFacebook className="w-8 h-8" />
              <SvgBtnInstagram className="w-8 h-8" />
              <SvgBtnTiktok className="w-8 h-8" />
              <SvgBtnYoutube className="w-8 h-8" />
            </div> */}
          </div>
        </div>
      </main>
    </Desktoplayout>
  );
}
