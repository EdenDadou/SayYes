import SvgBtnFaq from "~/assets/icons/IconsSection5/BtnFaq";
import SvgBtnHautPage from "~/assets/icons/IconsSection5/BtnHautPage";
import SvgBtnSayYes from "~/assets/icons/IconsSection5/BtnSayYes";
import SvgCard1 from "~/assets/icons/IconsSection5/Card1";
import SvgCard2 from "~/assets/icons/IconsSection5/Card2";
import SvgCard3 from "~/assets/icons/IconsSection5/Card3";
import SvgIntroSection5 from "~/assets/icons/IconsSection5/IntroSection5";
import SvgSection5Outro from "~/assets/icons/IconsSection5/Section5Outro";
import "~/styles/index";

interface Section5Props {
  setIsOpen: (value: boolean) => void;
}

export default function Section5({ setIsOpen }: Section5Props) {
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center relative z-10 pt-36 gap-20 overflow-hidden">
      <SvgIntroSection5 />
      <div className="w-fit flex flex-row justify-between item-center h-fit  gap-0">
        <SvgCard1 />
        <SvgCard1 />
        <SvgCard2 />
        <SvgCard3 />
        <SvgCard3 />
      </div>
      <SvgSection5Outro />
      <div className="flex flex-row w-full justify-between item-center h-fit">
        <SvgBtnFaq className="w-[6%] cursor-pointer" />
        <SvgBtnSayYes
          className="w-[25%] cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
        <SvgBtnHautPage
          className="w-[6%] cursor-pointer"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="bg-gradient-gray-400 filter drop-shadow-custom shadow-inset-custom w-full md:h-28  top-0 left-0 right-0 flex items-center overflow-hidden"></div>
        <p className="text-gray-200 text-sm py-2">
          Say Yes ©2024. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
