import { useState } from "react";
import Coche from "../../../assets/icons/Coche";

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
  return (
    <div className="flex flex-row justify-between py-4">
      {filterList.map((filter) => (
        <button
          key={filter.value}
          className={`group flex flex-row gap-3 items-center font-jakarta text-md py-3 px-5 rounded-full border-custom border-[0.5px] transition-all duration-200 hover:bg-white hover:text-black ${selectedFilter === filter.value ? "bg-white text-black" : "text-white"}`}
          onClick={() => setSelectedFilter(filter.value)}
        >
          <Coche
            className={`transition-all duration-200 ${selectedFilter === filter.value ? "text-black" : "text-white group-hover:text-black"}`}
          />
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
