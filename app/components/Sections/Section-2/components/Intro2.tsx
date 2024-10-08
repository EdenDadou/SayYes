import SvgSection2Intro from "~/assets/icons/IconsSection2/Section2Intro";
import AnimatedText from "~/components/AnimatedText";
import "~/styles/index";

const text =
  "Du (Re)branding au développement de votre communication visuelle, Say Yes vous accompagne sur tous vos projets";

export default function Intro2() {
  return (
    <div className="flex flex-row justify-between items-end gap-36 w-full px-40 mt-40">
      <div className="w-1/3 h-fit">
        <SvgSection2Intro />
      </div>
      <div className="w-3/5">
        <AnimatedText text={text} />
      </div>
    </div>
  );
}
