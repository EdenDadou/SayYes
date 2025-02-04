import { useRef, useState } from "react";
import { specialityList } from "./specialityList";

export default function SpecialityLines() {
  const container = useRef(null);
  const [isHovered, setIsHovered] = useState("");

  const handleMouseEnter = (title: string) => {
    setIsHovered(title);
  };

  const handleMouseLeave = (title: string) => {
    setIsHovered(title);
  };
  return (
    <div className="w-full flex flex-col z-20">
      {specialityList.map(({ title, list, icon, iconHover }) => (
        <div
          ref={container}
          key={title}
          className={`border-white/30 border-[0.35px] flex justify-center holographic-card ${
            isHovered === title ? "bg-gradient-gray-400-hover" : "bg-gray-600"
          }`}
          onMouseEnter={() => handleMouseEnter(title)}
          onMouseLeave={() => handleMouseLeave(title)}
        >
          <div className="relative overflow-hidden grid grid-cols-6 w-full items-center h-[100px] max-w-[1200px]">
            <div className="flex flex-row items-center justify-start col-span-1 ">
              <div className="w-[30%] flex items-center justify-center">
                <div className={`absolute`}>
                  {isHovered === title ? iconHover : icon}
                </div>
              </div>
              <p
                className={`font-jakarta-extra-bold text-xl font-bold ${
                  isHovered === title ? "holographic-text" : "text-gradient"
                }`}
              >
                {title}
              </p>
            </div>

            {list.map((item, i) => (
              <div
                key={i}
                className={`col-span-1 w-[90%] bg-gradient-gray-400 box-shadow-custom flex justify-center items-center p-2 border-[0.5px] shadow-[0px_0.35px_0.5px_0px_#FFFFFF_inset] rounded-full ${
                  isHovered === title ? "holographic-border" : "border-white/30"
                }`}
              >
                <p
                  className={`text-center leading-[140%] tracking-[-0.28px] text-base font-jakarta  ${
                    isHovered === title
                      ? "holographic-text"
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
  );
}
