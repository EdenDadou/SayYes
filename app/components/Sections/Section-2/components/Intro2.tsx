import SvgSection2Intro from "~/components/Sections/Section-2/components/assets/Section2Intro";
import AnimatedText from "~/components/AnimatedText";

const text =
  "Du (Re)branding au développement de votre communication visuelle, Say Yes vous accompagne sur tous vos projets";

export default function Intro2() {
  return (
    <div className="flex flex-row justify-between items-end md:gap-32 2xl:gap-[8%] w-full md:px-40 pt-[130px]">
      <SvgSection2Intro className="w-2/5 h-full z-20" />
      <div className="w-3/5 pb-6">
        <AnimatedText text={text} />
      </div>
    </div>
  );
}
