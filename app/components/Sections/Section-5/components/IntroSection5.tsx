import SvgCard1 from "~/components/Sections/Section-5/components/assets/Card1";
import SvgCard2 from "~/components/Sections/Section-5/components/assets/Card2";
import SvgCard3 from "~/components/Sections/Section-5/components/assets/Card3";
import SvgIntroSection5 from "~/components/Sections/Section-5/components/assets/IntroSection5";
import SvgSection5IntroBg from "./assets/Section5IntroBg";
import Halo from "~/components/BackgroundLayer/components/Halo";

export default function IntroSection5() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-14 w-full">
      <SvgIntroSection5 className="z-[20] w-[76%] mz-[12%]" />
      <SvgSection5IntroBg className="absolute -top-22" />
      <Halo size={700} rotation={30} style={{ top: "-20%", right: "-10%" }} />
      <Halo size={700} rotation={-30} style={{ top: "5%", left: "-5%" }} />

      <div className="w-fit flex flex-row justify-between item-center h-fit  gap-0">
        <SvgCard1 className="z-[20]" />
        <SvgCard1 className="z-[20]" />
        <SvgCard2 className="z-[20]" />
        <SvgCard3 className="z-[20]" />
        <SvgCard3 className="z-[20]" />
      </div>
    </div>
  );
}
