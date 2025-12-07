import { useState, useCallback } from "react";
import Coche from "~/assets/icons/Coche";
import { useViewport } from "~/utils/hooks/useViewport";
import { usePortfolio } from "~/contexts/PortfolioContext";

const filterList = [
  { value: "all", label: "Tous" },
  { value: "Identité visuelle", label: "Identité visuelle" },
  { value: "Print", label: "Print" },
  { value: "Digital", label: "Digital" },
  { value: "Event", label: "Event" },
  { value: "Facilitation graphique", label: "Facilitation graphique" },
  { value: "Motion Design", label: "Motion design" },
];

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const isMobile = useViewport();
  const { setActiveFilters } = usePortfolio();

  const handleFilterClick = useCallback(
    (filterValue: string) => {
      if (filterValue === "all") {
        setSelectedFilters([]);
        setActiveFilters([]);
      } else {
        setSelectedFilters((prev) => {
          const newFilters = prev.includes(filterValue)
            ? prev.filter((f) => f !== filterValue)
            : [...prev, filterValue];
          setActiveFilters(newFilters);
          return newFilters;
        });
      }
    },
    [setActiveFilters]
  );

  const isSelected = (filterValue: string) => {
    if (filterValue === "all") {
      return selectedFilters.length === 0;
    }
    return selectedFilters.includes(filterValue);
  };

  return isMobile ? (
    <div className="w-full">
      <div className="flex flex-row justify-between overflow-x-scroll md:gap-4 gap-2 scrollbar-hide px-4">
        {filterList.map((filter) => (
          <button
            key={filter.value}
            className={`flex flex-row gap-2 items-center font-jakarta text-sm py-3 px-4 rounded-full border-[0.5px] whitespace-nowrap ${isSelected(filter.value) ? "bg-white text-dark-blue" : "text-white hover:bg-white hover:text-dark-blue"}`}
            onClick={() => handleFilterClick(filter.value)}
            style={{ transition: "none", transitionDuration: "0s" }}
          >
            <Coche
              className={`${isSelected(filter.value) ? "text-dark-blue" : ""}`}
              style={{ transition: "none" }}
            />
            <span
              className={`after:content-[attr(data-text)] after:block after:font-jakarta-semi-bold after:h-0 after:overflow-hidden after:invisible ${isSelected(filter.value) ? "font-jakarta-semi-bold" : ""}`}
              data-text={filter.label}
            >
              {filter.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-row justify-between w-full">
      {filterList.map((filter) => (
        <button
          key={filter.value}
          className={`flex flex-row gap-3 items-center font-jakarta text-sm py-2 px-3 rounded-full border-custom-thin ${isSelected(filter.value) ? "bg-white text-dark-blue" : "text-white hover:bg-white hover:text-dark-blue"}`}
          onClick={() => handleFilterClick(filter.value)}
          style={{ transition: "none", transitionDuration: "0s" }}
        >
          <Coche
            className={`w-4 ${isSelected(filter.value) ? "text-dark-blue" : ""}`}
            style={{ transition: "none" }}
          />
          <span
            className={`after:content-[attr(data-text)] after:block after:font-jakarta-semi-bold after:h-0 after:overflow-hidden after:invisible ${isSelected(filter.value) ? "font-jakarta-semi-bold" : ""}`}
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
