import type { BlocSeparator } from "~/types/landing-page";

interface BlocSeparatorEditorProps {
  bloc: BlocSeparator;
  onUpdate: (bloc: BlocSeparator) => void;
}

export default function BlocSeparatorEditor({
  bloc,
  onUpdate,
}: BlocSeparatorEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Direction
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="direction"
              value="horizontal"
              checked={bloc.direction === "horizontal"}
              onChange={() => onUpdate({ ...bloc, direction: "horizontal" })}
              className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
            />
            <span className="text-white">Horizontal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="direction"
              value="vertical"
              checked={bloc.direction === "vertical"}
              onChange={() => onUpdate({ ...bloc, direction: "vertical" })}
              className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
            />
            <span className="text-white">Vertical</span>
          </label>
        </div>
      </div>
    </div>
  );
}
