import Halo from "./components/Halo";
import SvgBgGrid from "./components/BgGrid";
import SvgSection2Bg from "./components/Section2Bg";
import SvgBgSection3 from "./components/BgSection3";

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
      <Halo size={700} rotation={30} style={{ top: "120%", left: "-10%" }} />
      <Halo size={700} rotation={30} style={{ top: "150%", right: "-10%" }} />
      <Halo size={700} rotation={30} style={{ top: "400%", right: "-10%" }} />

      {/* Section - 3 */}
      <SvgBgSection3 className="absolute z-0 top-[460%]" />
      <Halo size={700} rotation={-30} style={{ top: "450%", left: "2%" }} />

      {/* Section - 4 => Directement dans la section */}

      {/* Section - 5 => Directement dans la section */}
    </>
  );
}
