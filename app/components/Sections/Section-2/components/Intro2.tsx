import SvgSection2Intro from "~/components/Sections/Section-2/components/assets/Section2Intro";
import AnimatedText from "~/components/AnimatedText";
import "~/styles/index";

const text =
  "Du (Re)branding au développement de votre communication visuelle, Say Yes vous accompagne sur tous vos projets";

export default function Intro2() {
  return (
    <div className="flex flex-row justify-between items-end md:gap-36 2xl:gap-[8%] w-full md:px-40 2xl:px-[15%] md:mt-40 2xl:mt-[10%]">
      <div className="w-1/3 h-fit">
        <SvgSection2Intro />
      </div>
      <div className="w-3/5">
        <AnimatedText text={text} />
      </div>
    </div>
  );
}
