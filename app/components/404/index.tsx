import { useEffect } from "react";
import Desktoplayout from "../Layout/Desktop";
import SvgBtnFacebook from "../Footer/components/BtnFacebook";
import SvgBtnTiktok from "../Footer/components/BtnTiktok";
import SvgBtnLinkedin from "../Footer/components/BtnLinkedin";
import SvgBtnYoutube from "../Footer/components/BtnYoutube";
import SvgBtnInstagram from "../Footer/components/BtnInstagram";
import Background404 from "./Background404";

export default function Page404() {
  // Block vertical scrolling when component mounts
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    // Cleanup: restore scrolling when component unmounts
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <Desktoplayout footer={false}>
      <main className="relative w-screen h-screen flex items-center justify-start px-36 -mt-10">
        <div
          className="absolute right-0 w-[55vw] h-full z-0"
          style={{
            backgroundImage: 'url("images/404/404.gif")',
            backgroundSize: "60vw 60vh",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
        />

        {/* Container for image overlays - matches the actual visible image area */}
        <div
          className="absolute z-10"
          style={{
            right: 0,
            top: "20vh", // Center vertically: (100vh - 70vh) / 2
            width: "55vw", // Match the parent container width
            height: "70vh",
          }}
        >
          {/* Left side blur overlay */}
          <div
            className="absolute left-0 top-0 w-20 h-full"
            style={{
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 1), transparent)",
            }}
          />

          {/* Right side blur overlay */}
          <div
            className="absolute right-0 top-0 w-56 h-full"
            style={{
              background:
                "linear-gradient(to left, rgba(0, 0, 0, 1), transparent)",
            }}
          />

          {/* Top blur overlay */}
          <div
            className="absolute top-0 left-0 w-full h-56"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent)",
            }}
          />

          {/* Bottom blur overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-48"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
            }}
          />
        </div>
        <Background404 className="absolute inset-0 w-full h-screen z-10" />

        <div className="flex flex-row items-center justify-center gap-8 z-20">
          <div className="self-stretch w-[3px] holographic-bg-vertical" />
          <div className="flex flex-col items-start justify-center gap-4">
            <div
              className="w-[600px] h-[330px]"
              style={{
                backgroundImage: 'url("images/404/Title404.png")',
                backgroundSize: "600px 300px",
                backgroundRepeat: "no-repeat",
              }}
            />
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
