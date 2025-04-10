import { useRef, useState } from "react";
import { specialityList } from "../../components/specialityList";

export default function SpecialityLinesMobile() {
  const container = useRef(null);
  const [isSelected, setIsSelected] = useState("");

  return (
    <div className="w-full flex flex-col z-20">
      {specialityList.map(({ title, list, image }) => (
        <div
          ref={container}
          key={title}
          role="button"
          tabIndex={0}
          className="border-white/30 border-[0.35px] holographic-speciality bg-gradient-gray-400-hover flex flex-col items-start justify-start px-6 h-fit pt-4"
          onClick={() => setIsSelected(title)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsSelected(title);
            }
          }}
        >
          <div className="h-20">
            <img src={image} alt="speciality" className="w-" />
          </div>

          {title === isSelected ? (
            <div className="flex flex-wrap gap-x-2 gap-y-5 pb-8">
              {list.map((item, i) => (
                <div
                  key={i}
                  className="col-span-1 w-[48%] bg-gradient-gray-400-hover  box-shadow-custom flex justify-center items-center p-2 border-[0.5px] shadow-[0px_0.35px_0.5px_0px_#FFFFFF_inset] rounded-full holographic-border"
                >
                  <p className="text-center leading-[140%] tracking-[-0.28px] text-base font-jakarta holographic-text">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
