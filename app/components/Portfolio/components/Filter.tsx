import { useState } from "react";
import Coche from "../../../assets/icons/Coche";
import { useViewport } from "~/utils/hooks/useViewport";
const filterList = [
  { value: "all", label: "Tous" },
  { value: "visual identity", label: "Identité visuelle" },
  { value: "print", label: "Print" },
  { value: "digital", label: "Digital" },
  { value: "event", label: "Event" },
  { value: "grafic faciliy", label: "Facilitation graphique" },
  { value: "motion design", label: "Motion design" },
];
const Filter = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const isMobile = useViewport();

  return isMobile ? (
    <div className="w-full">
      <div className="flex flex-row justify-between overflow-x-scroll gap-4 scrollbar-hide px-4">
        {filterList.map((filter) => (
          <button
            key={filter.value}
            className={`flex flex-row gap-2 items-center font-jakarta text-sm py-3 px-4 rounded-full border-[0.5px] whitespace-nowrap ${selectedFilter === filter.value ? "bg-white text-dark-blue" : "text-white hover:bg-white hover:text-dark-blue"}`}
            onClick={() => setSelectedFilter(filter.value)}
            style={{ transition: "none", transitionDuration: "0s" }}
          >
            <Coche
              className={`${selectedFilter === filter.value ? "text-dark-blue" : ""}`}
              style={{ transition: "none" }}
            />
            <span
              className={`after:content-[attr(data-text)] after:block after:font-jakarta-semi-bold after:h-0 after:overflow-hidden after:invisible ${selectedFilter === filter.value ? "font-jakarta-semi-bold" : ""}`}
              data-text={filter.label}
            >
              {filter.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-row justify-center gap-4">
      {filterList.map((filter) => (
        <button
          key={filter.value}
          className={`flex flex-row gap-3 items-center font-jakarta text-sm py-2 px-4 rounded-full border-[0.5px] ${selectedFilter === filter.value ? "bg-white text-dark-blue" : "text-white hover:bg-white hover:text-dark-blue"}`}
          onClick={() => setSelectedFilter(filter.value)}
          style={{ transition: "none", transitionDuration: "0s" }}
        >
          <Coche
            className={`${selectedFilter === filter.value ? "text-dark-blue" : ""}`}
            style={{ transition: "none" }}
          />
          <span
            className={`after:content-[attr(data-text)] after:block after:font-jakarta-semi-bold after:h-0 after:overflow-hidden after:invisible ${selectedFilter === filter.value ? "font-jakarta-semi-bold" : ""}`}
            data-text={filter.label}
          >
            {filter.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Filter;
