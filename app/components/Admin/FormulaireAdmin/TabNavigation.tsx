export type TabType = "general" | "seo";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-2 border-b border-gray-700 mb-8">
      <button
        type="button"
        onClick={() => onTabChange("general")}
        className={`px-6 py-3 font-semibold transition-all duration-200 ${
          activeTab === "general"
            ? "text-white border-b-2 border-blue-500"
            : "text-gray-400 hover:text-gray-300"
        }`}
        style={{ fontFamily: "Jakarta Semi Bold" }}
      >
        Informations générales
      </button>
      <button
        type="button"
        onClick={() => onTabChange("seo")}
        className={`px-6 py-3 font-semibold transition-all duration-200 ${
          activeTab === "seo"
            ? "text-white border-b-2 border-blue-500"
            : "text-gray-300 hover:text-gray-300"
        }`}
        style={{ fontFamily: "Jakarta Semi Bold" }}
      >
        SEO
      </button>
    </div>
  );
}
