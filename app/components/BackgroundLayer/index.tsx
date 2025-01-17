import Halo from "../Halo";
import SvgBgGrid from "../Sections/Section-1/components/BgGrid";
import SvgSection2Bg from "../Sections/Section-2/components/assets/Section2Bg";

interface BackgroundLayerProps {
  isIntroFinish: boolean;
}

export default function BackgroundLayer({
  isIntroFinish,
}: BackgroundLayerProps) {
  return (
    <>
      {/* Section - 1 */}
      {isIntroFinish ? (
        <SvgBgGrid className="absolute w-screen top-0 inset-0" />
      ) : null}
      <Halo size={700} rotation={-30} style={{ top: "-15%", right: "-20%" }} />
      <Halo size={700} rotation={30} style={{ top: "-15%", left: "-20%" }} />

      {/* Section - 2 */}
      <SvgSection2Bg className="absolute z-0 top-[110%]" />
      <Halo size={700} rotation={30} style={{ top: "105%", left: "-10%" }} />
      <Halo size={700} rotation={30} style={{ top: "110%", right: "-10%" }} />

      {/* Section - 2 */}
    </>
  );
}
