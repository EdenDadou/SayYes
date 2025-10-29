import { useNavigate } from "@remix-run/react";
import MobileLayout from "~/components/Layout/Mobile";
import SvgBtnLinkedin from "~/components/Footer/components/BtnLinkedin";
import SvgBtnFacebook from "~/components/Footer/components/BtnFacebook";
import SvgBtnInstagram from "~/components/Footer/components/BtnInstagram";
import SvgBtnTiktok from "~/components/Footer/components/BtnTiktok";
import SvgBtnYoutube from "~/components/Footer/components/BtnYoutube";
import Button from "~/components/Button";
import ArrowFull from "~/assets/icons/ArrowFull";
import Background404 from "../Background404";
import MasqueGif from "../MasqueGif";
import Background404Mobile from "./Background404Mobile";

export default function Page404Mobile() {
  const navigate = useNavigate();

  return (
    <MobileLayout footer={false}>
      <main className="w-screen h-screen flex flex-col items-start justify-center px-8">
        <Background404Mobile />

        <div className="h-[3px] w-28 holographic-bg my-8" />

        <div
          className="w-[85vw] aspect-[16/10] z-10"
          style={{
            backgroundImage: 'url("images/404/Title404.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "80vw auto",
          }}
        />
        <div className="flex flex-col items-start justify-between h-40">
          <Button
            type="border"
            onClick={() => navigate(`/`)}
            leftIcon={<ArrowFull className="w-6 h-6" />}
            label="Accueil"
            textSize="L"
          />
          <div className="flex flex-row gap-3 z-20">
            <SvgBtnLinkedin className="w-8 h-8" />
            <SvgBtnFacebook className="w-8 h-8" />
            <SvgBtnInstagram className="w-8 h-8" />
            <SvgBtnTiktok className="w-8 h-8" />
            <SvgBtnYoutube className="w-8 h-8" />
          </div>
        </div>
      </main>
    </MobileLayout>
  );
}
