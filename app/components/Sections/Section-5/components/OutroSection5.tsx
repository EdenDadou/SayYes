import SvgBtnFaq from "~/components/Sections/Section-5/components/assets/BtnFaq";
import SvgBtnHautPage from "~/components/Sections/Section-5/components/assets/BtnHautPage";
import SvgBtnSayYes from "~/components/Sections/Section-5/components/assets/BtnSayYes";
import SvgSection5Bg from "~/components/Sections/Section-5/components/assets/Section5Bg";
import SvgSection5Outro from "~/components/Sections/Section-5/components/assets/Section5Outro";
import "~/styles/index";

interface Section5Props {
  setIsOpen: (value: boolean) => void;
}

export default function OutroSection5({ setIsOpen }: Section5Props) {
  return (
    <div className="relative w-full flex flex-col justify-center items-center gap-5">
      <SvgSection5Outro className="z-20" />
      <div className="relative flex flex-row w-full justify-between item-center h-full">
        <SvgBtnFaq className="w-[6%] cursor-pointer z-20" />
        <SvgBtnSayYes
          className="w-[35%] cursor-pointer z-20"
          onClick={() => setIsOpen(true)}
        />
        <SvgBtnHautPage
          className="w-[6%] cursor-pointer z-20"
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
