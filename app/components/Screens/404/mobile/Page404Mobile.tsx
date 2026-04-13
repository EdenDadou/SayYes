import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import MobileLayout from "~/components/Layout/Mobile";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import Button from "~/components/Button";
import ArrowFull from "~/assets/icons/ArrowFull";
import Background404Mobile from "./Background404Mobile";

export default function Page404Mobile() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <MobileLayout footer={false}>
      <main className="fixed inset-0 flex flex-col bg-black">
        <Background404Mobile />

        {/* Contenu — démarre à 55vh, là où le gif se termine */}
        <div
          className="relative z-10 flex flex-col flex-1"
          style={{ marginTop: "55vh" }}
        >
          {/* Loading bar + titre */}
          <div className="ml-10">
            <div className="h-[4px] w-[106px] holographic-bg rounded-full" />
            <div
              className="mt-3"
              style={{
                width: "77vw",
                aspectRatio: "302 / 178",
                backgroundImage: 'url("/images/404/Title404.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            />
          </div>

          {/* Bouton + réseaux — poussés en bas */}
          <div className="flex flex-col mt-auto mb-8 gap-6">
            <div className="flex justify-center">
              <Button
                type="border"
                onClick={() => navigate("/")}
                leftIcon={<ArrowFull className="w-6 h-6" />}
                label="Accueil"
                textSize="L"
              />
            </div>
            <div className="flex flex-row gap-3 ml-[45px]">
              <SvgBtnLinkedin className="w-[30px] h-[30px]" />
              <SvgBtnFacebook className="w-[30px] h-[30px]" />
              <SvgBtnInstagram className="w-[30px] h-[30px]" />
              <SvgBtnTiktok className="w-[30px] h-[30px]" />
              <SvgBtnYoutube className="w-[30px] h-[30px]" />
            </div>
          </div>
        </div>
      </main>
    </MobileLayout>
  );
}
