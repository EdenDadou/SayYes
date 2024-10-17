import SvgBtnFaq from "~/assets/icons/IconsSection5/BtnFaq";
import SvgBtnHautPage from "~/assets/icons/IconsSection5/BtnHautPage";
import SvgBtnSayYes from "~/assets/icons/IconsSection5/BtnSayYes";
import SvgSection5Bg from "~/assets/icons/IconsSection5/Section5Bg";
import SvgSection5Outro from "~/assets/icons/IconsSection5/Section5Outro";
import "~/styles/index";

interface Section5Props {
  setIsOpen: (value: boolean) => void;
}

export default function OutroSection5({ setIsOpen }: Section5Props) {
  return (
    <div className="relative w-full flex flex-col justify-center items-center gap-5">
      <SvgSection5Outro className="z-20" />
      <div className="relative flex flex-row w-full justify-between item-center h-full">
        <SvgBtnFaq className="w-[6%] cursor-pointer" />
        <SvgBtnSayYes
          className="w-[35%] cursor-pointer"
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
      <SvgSection5Bg className="absolute w-full h-full -bottom-5 z-0" />
    </div>
  );
}
