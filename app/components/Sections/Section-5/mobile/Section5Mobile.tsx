import IntroSection5Mobile from "./IntroSection5Mobile";
import OutroSection5Mobile from "./OutroSection5Mobile";

interface Section5Props {
  setIsOpen: (value: boolean) => void;
}

export default function Section5Mobile({ setIsOpen }: Section5Props) {
  return (
    <div
      className="w-screen h-full flex flex-col justify-center items-center relative z-10 pt-10 gap-20 overflow-hidden -mt-40"
      id="section5ClipPathMobile"
      style={{
        backgroundImage: 'url("images/section5/bg.png")',
        backgroundSize: "contain",
        backgroundPositionY: "-50px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <IntroSection5Mobile />
      <OutroSection5Mobile setIsOpen={setIsOpen} />
    </div>
  );
}
