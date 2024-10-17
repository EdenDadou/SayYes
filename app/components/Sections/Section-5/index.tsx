import IntroSection5 from "./components/IntroSection5";
import OutroSection5 from "./components/OutroSection5";
import "~/styles/index";

interface Section5Props {
  setIsOpen: (value: boolean) => void;
}

export default function Section5({ setIsOpen }: Section5Props) {
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center relative z-10 pt-36 gap-20 overflow-hidden">
      <IntroSection5 />
      <OutroSection5 setIsOpen={setIsOpen} />
    </div>
  );
}
