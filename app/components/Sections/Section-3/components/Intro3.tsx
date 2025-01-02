import SvgSection3Intro from "public/icons/IconsSection3/Section3Intro";
import AnimatedText from "~/components/AnimatedText";
import "~/styles/index";

const text =
  "Croissance, visibilité, marque employeur, nous avons tout pour développer votre notoriété à tous les niveaux !";

export default function Intro3() {
  return (
    <div className="flex flex-row justify-between items-end gap-20 w-full pb-20 px-10 max-w-[1200px] z-20">
      <div className="w-1/3 h-fit">
        <SvgSection3Intro />
      </div>
      <div className="w-2/5">
        <AnimatedText text={text} />
      </div>
    </div>
  );
}
