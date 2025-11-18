import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import Background404 from "./Background404";
import ArrowFull from "~/assets/icons/ArrowFull";
import MasqueGif from "./MasqueGif";
import Desktoplayout from "~/components/Layout/Desktop";
import Button from "~/components/Button";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";

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
        <Background404 className="absolute inset-0 w-full h-screen z-10 " />

        <div className="flex flex-row items-center justify-center gap-8 z-20">
          <div className="self-stretch w-[3px] holographic-bg-vertical rounded-full" />
          <div className="flex flex-col items-start justify-center gap-4 relative">
            <div
              className="w-[608px] h-[359px]"
              style={{
                backgroundImage: 'url("images/404/Title404.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "608px 359px",
              }}
            />
            <div className="absolute bottom-10 right-0">
              <Button
                type="border"
                onClick={() => navigate(`/`)}
                leftIcon={<ArrowFull className="w-6 h-6" />}
                label="Accueil"
                textSize="L"
              />
            </div>

            <div className="flex flex-row gap-3">
              <SvgBtnLinkedin className="w-8 h-8" />
              <SvgBtnFacebook className="w-8 h-8" />
              <SvgBtnInstagram className="w-8 h-8" />
              <SvgBtnTiktok className="w-8 h-8" />
              <SvgBtnYoutube className="w-8 h-8" />
            </div>
          </div>
        </div>
      </main>
    </Desktoplayout>
  );
}
