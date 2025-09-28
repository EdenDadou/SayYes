import Close from "~/assets/icons/Close";
import Card from "../../Card";
import BackgroundModal from "../assets/BackgroundModal";
import ArrowLight from "~/assets/icons/ArrowLight";
import "~/styles/tailwind.css";
import Coche from "~/assets/icons/Coche";
import ArrowFull from "~/assets/icons/ArrowFull";
import Masque from "~/components/Card/components/Solution/Masque";
import MasqueGif from "~/components/404/MasqueGif";

interface ContentSuccessProps {
  close: () => void;
  setSuccess: (success: boolean) => void;
}

export default function ContentSuccess({
  setSuccess,
  close,
}: ContentSuccessProps) {
  const handleClose = () => {
    setSuccess(false);
    close();
  };

  return (
    <Card
      borderClass="light-border flex justify-center items-center w-[90%] max-w-6xl p-3"
      height="85%"
    >
      <div
        className="absolute right-4 w-[753px] h-[489px]"
        style={{
          backgroundImage: 'url("images/404/404.gif")',
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
        }}
      />
      <MasqueGif height="96%" width="800px" right={12} rounded bold />

      <div className="relative w-full h-full rounded-xl flex flex-row overflow-hidden px-20">
        <Masque className="absolute inset-0 w-full h-full object-cover rounded-xl z-10 bg-black/10" />
        <button
          className="absolute top-4 right-4 text-white cursor-pointer z-30 hover:opacity-70"
          onClick={handleClose}
        >
          <Close />
        </button>

        <div className="relative z-10 w-[70%] flex flex-col justify-center gap-10">
          <div className="flex flex-col gap-8">
            <div className="h-[3px] w-28 holographic-bg" />
            <div className="flex flex-col gap-6">
              <p className="flex flex-row items-center gap-3 text-white font-jakarta-bold holographic-text text-lg">
                <Coche />
                Message envoyé !
              </p>
              <div>
                <p className="text-5xl text-white font-jakarta-bold leading-6">
                  Nous vous rappelons
                </p>
                <h1 className="text-5xl text-white flex flex-row items-center gap-4 font-jakarta-bold leading-tight holographic-text mt-2">
                  dans les plus bref délais !
                </h1>
              </div>
              <p className="flex flex-row items-center gap-3 text-2xl">
                <ArrowLight className="w-10 h-10" />
                Bonne journée et à très vite.
              </p>
            </div>
            <button
              //   type="submit"
              onClick={close}
              type="button"
              className="text-white px-6 py-3 font-jakarta flex items-center gap-3 text-lg rounded-full hover:scale-105 transition-all w-fit"
              style={{
                border: "0.3px solid rgba(255, 255, 255, 0.30)",
                boxShadow:
                  "0 2px 10px 0 rgba(0, 0, 0, 0.20), 0 0 2px 0 rgba(255, 255, 255, 0.50) inset",
              }}
            >
              <ArrowFull className="w-6 h-6" />
              Acceuil
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
