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
      <main className="fixed inset-0 bg-black">
        <Background404Mobile />

        {/* Texte accessible pour les lecteurs d'écran (le visuel est dans bgMobile.png) */}
        <span className="sr-only">Erreur 404 — Page introuvable</span>

        {/* Bouton + réseaux — positionnés en bas, par-dessus le fond */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-6 pb-8">
          <Button
            type="border"
            onClick={() => navigate("/")}
            leftIcon={<ArrowFull className="w-6 h-6" />}
            label="Accueil"
            textSize="L"
          />
          <div className="flex flex-row gap-3 self-start ml-[45px]">
            <SvgBtnLinkedin className="w-[30px] h-[30px]" />
            <SvgBtnFacebook className="w-[30px] h-[30px]" />
            <SvgBtnInstagram className="w-[30px] h-[30px]" />
            <SvgBtnTiktok className="w-[30px] h-[30px]" />
            <SvgBtnYoutube className="w-[30px] h-[30px]" />
          </div>
        </div>
      </main>
    </MobileLayout>
  );
}
