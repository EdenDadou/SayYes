import Section4Intro from "./components/Section4Intro";
import Section4Outro from "./components/Section4Outro";

export default function Section4() {
  return (
    <div className="w-screen flex justify-center items-center relative z-80 -top-20 bg-white">
      <div className="flex flex-col justify-center items-center gap-24 w-full px-10 relative z-80">
        <Section4Intro />
        <Section4Outro />
      </div>
    </div>
  );
}
