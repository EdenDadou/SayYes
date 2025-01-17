import SvgSection3Intro from "~/components/Sections/Section-3/components/assets/Section3Intro";
import AnimatedText from "~/components/AnimatedText";

const text =
  "Croissance, visibilité, marque employeur, nous avons tout pour développer votre notoriété à tous les niveaux !";

export default function Intro3() {
  return (
    <div className="flex flex-row justify-end items-end gap-20 w-full pb-20 md:px-40 z-20">
      <SvgSection3Intro className="w-1/2" />
      <AnimatedText text={text} />
    </div>
  );
}
