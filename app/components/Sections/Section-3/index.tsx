import SvgSection3Bg from "~/assets/icons/Section3/Section3Bg";
import "~/styles/index";
import { specialityList } from "./specialityList";
import Intro3 from "./components/Intro3";
import { useState } from "react";

export default function Section3() {
  const [isHovered, setIsHovered] = useState("");

  const handleMouseEnter = (i: string) => {
    console.log(i);
    setIsHovered(i);
  };

  const handleMouseLeave = (i: string) => {
    setIsHovered(i);
  };

  console.log("is", isHovered);

  return (
    <div className="relative w-full h-fit overflow-hidden">
      <div className="relative w-full h-fit z-10 flex flex-col justify-center item">
        {/* Bg Layer */}
        <div className="absolute h-screen w-full top-10 right-0 left-0 z-0 ">
          {/* <SvgSection3Bg className="w-full" /> */}
        </div>
        {/* Front Layer */}
        <div className="max-w-[1200px] pb-20">{/* <Intro3 /> */}</div>

        <div className="w-full flex flex-col ">
          {specialityList.map(({ title, list }) => (
            <div
              key={title}
              className="border-white/30 border-[0.35px] flex justify-center"
            >
              <div
                className="grid grid-cols-6 w-full items-center h-[90px] max-w-[1200px]"
                onMouseEnter={() => handleMouseEnter(title)}
                onMouseLeave={() => handleMouseLeave(title)}
              >
                <p className="font-jakarta text-xl font-bold">{title}</p>
                {list.map((item, i) => (
                  <div
                    className="border-custom bg-gradient-custom box-shadow-custom m-2 flex justify-center items-center p-3 border-white/30 border-[0.35px] bg-gradient-to-[187deg] from-[#515151] to-[#202020] shadow-[0px_0.35px_0.5px_0px_#FFFFFF_inset] rounded-full"
                    key={i}
                  >
                    <p
                      className={`text-center leading-[140%] tracking-[-0.28px] text-sm font-jakarta  ${
                        isHovered === title
                          ? "text-green-600"
                          : "text-gradient text-shadow-custom"
                      }`}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
