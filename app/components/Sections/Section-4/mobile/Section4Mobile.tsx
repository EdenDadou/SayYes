import Section4IntroMobile from "./components/Section4IntroMobile";
import Section4OutroMobile from "./components/Section4OutroMobile";

export default function Section4Mobile() {
  return (
    <div className="w-screen flex justify-center items-center relative z-80 -top-20 bg-white">
      <div className="flex flex-col justify-center items-center gap-24 w-full px-10 relative z-80">
        <Section4IntroMobile />
        <Section4OutroMobile />
      </div>
    </div>
  );
}
