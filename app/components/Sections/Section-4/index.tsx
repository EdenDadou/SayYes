import SvgSection3Bg from "~/assets/icons/Section3/Section3Bg";
import "~/styles/index";
import Intro3 from "./components/Intro3";
import SpecialityLines from "./components/SpecialityLines";
import SvgFooterSection3 from "~/assets/icons/Section3/FooterSection3";
import { projetList } from "./components/projetList";

export default function Section4() {
  function shuffleArray(array: string[]) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  return (
    <div className="w-screen flex justify-center items-center bg-white">
      Section 4
    </div>
  );
}
