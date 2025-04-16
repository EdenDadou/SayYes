import IntroSection5Mobile from "./IntroSection5Mobile";
import OutroSection5Mobile from "./OutroSection5Mobile";

interface Section5Props {
  setIsOpen: (value: boolean) => void;
}

export default function Section5Mobile({ setIsOpen }: Section5Props) {
  return (
    <div
      className="w-screen h-full flex flex-col justify-center items-center relative z-10 pt-24 gap-20 overflow-hidden  bg-gray-500"
      id="section5ClipPath"
      style={{
        backgroundImage: 'url("images/section5/bg.png")',
        backgroundSize: "cover",
        backgroundPositionY: "-100px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <IntroSection5Mobile />
      <OutroSection5Mobile setIsOpen={setIsOpen} />
    </div>
  );
}
