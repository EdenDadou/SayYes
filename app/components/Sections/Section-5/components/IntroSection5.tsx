import SvgCard1 from "~/assets/icons/IconsSection5/Card1";
import SvgCard2 from "~/assets/icons/IconsSection5/Card2";
import SvgCard3 from "~/assets/icons/IconsSection5/Card3";
import SvgIntroSection5 from "~/assets/icons/IconsSection5/IntroSection5";
import SvgSection5IntroBg from "~/assets/icons/IconsSection5/Section5IntroBg";
import "~/styles/index";

export default function IntroSection5() {
  return (
    <div className="relative flex flex-col justify-center items-center gap-14">
      <SvgIntroSection5 className="z-[20]" />
      <div className="w-fit flex flex-row justify-between item-center h-fit  gap-0">
        <SvgCard1 className="z-[20]" />
        <SvgCard1 className="z-[20]" />
        <SvgCard2 className="z-[20]" />
        <SvgCard3 className="z-[20]" />
        <SvgCard3 className="z-[20]" />
      </div>
      {/* <SvgSection5IntroBg className="absolute w-screen -bottom-[200px] -z-[10]" /> */}
    </div>
  );
}
