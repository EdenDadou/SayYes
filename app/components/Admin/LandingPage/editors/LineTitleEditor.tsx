import { useState } from "react";
import type { TitleLine, TitleElement } from "~/types/landing-page";

interface LineTitleEditorProps {
  lines: TitleLine[];
  onChange: (lines: TitleLine[]) => void;
  label?: string;
}

export default function LineTitleEditor({
  lines,
  onChange,
  label = "Titre animé",
}: LineTitleEditorProps) {
  const addLine = () => {
    onChange([...lines, { elements: [], titleType: "h2" }]);
  };

  const updateLine = (index: number, line: TitleLine) => {
    const newLines = [...lines];
    newLines[index] = line;
    onChange(newLines);
  };

  const removeLine = (index: number) => {
    onChange(lines.filter((_, i) => i !== index));
  };

  const addElement = (lineIndex: number, type: "icon" | "text") => {
    const line = lines[lineIndex];
    const newElement: TitleElement =
      type === "icon"
        ? { type: "icon", name: "" }
        : { type: "text", text: "", color: "white" };
    updateLine(lineIndex, {
      ...line,
      elements: [...line.elements, newElement],
    });
  };

  const updateElement = (
    lineIndex: number,
    elementIndex: number,
    element: TitleElement
  ) => {
    const line = lines[lineIndex];
    const newElements = [...line.elements];
    newElements[elementIndex] = element;
    updateLine(lineIndex, { ...line, elements: newElements });
  };

  const removeElement = (lineIndex: number, elementIndex: number) => {
    const line = lines[lineIndex];
    updateLine(lineIndex, {
      ...line,
      elements: line.elements.filter((_, i) => i !== elementIndex),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
        <button
          type="button"
          onClick={addLine}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          + Ajouter une ligne
        </button>
      </div>

      {lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="border border-gray-700 rounded-lg p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-white/70 text-sm">Ligne {lineIndex + 1}</span>
            <div className="flex items-center gap-2">
              <select
                value={line.titleType}
                onChange={(e) =>
                  updateLine(lineIndex, {
                    ...line,
                    titleType: e.target.value as "h1" | "h2" | "h3",
                  })
                }
                className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
              </select>
              <button
                type="button"
                onClick={() => removeLine(lineIndex)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>

          {/* Elements */}
          <div className="space-y-2">
            {line.elements.map((element, elementIndex) => (
              <div
                key={elementIndex}
                className="flex items-center gap-2 bg-gray-800 p-2 rounded"
              >
                {element.type === "icon" ? (
                  <>
                    <span className="text-white/70 text-xs w-12">Icon:</span>
                    <input
                      type="text"
                      value={element.name}
                      onChange={(e) =>
                        updateElement(lineIndex, elementIndex, {
                          ...element,
                          name: e.target.value,
                        })
                      }
                      placeholder="Nom de l'icône"
                      className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                    />
                  </>
                ) : (
                  <>
                    <span className="text-white/70 text-xs w-12">Texte:</span>
                    <input
                      type="text"
                      value={element.text}
                      onChange={(e) =>
                        updateElement(lineIndex, elementIndex, {
                          ...element,
                          text: e.target.value,
                        })
                      }
                      placeholder="Texte"
                      className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                    />
                    <select
                      value={element.color}
                      onChange={(e) =>
                        updateElement(lineIndex, elementIndex, {
                          ...element,
                          color: e.target.value as "white" | "animed",
                        })
                      }
                      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                    >
                      <option value="white">Blanc</option>
                      <option value="animed">Animé</option>
                    </select>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => removeElement(lineIndex, elementIndex)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Boutons pour ajouter des éléments */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addElement(lineIndex, "text")}
              className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-400/30 rounded"
            >
              + Texte
            </button>
            <button
              type="button"
              onClick={() => addElement(lineIndex, "icon")}
              className="text-xs text-green-400 hover:text-green-300 px-2 py-1 border border-green-400/30 rounded"
            >
              + Icône
            </button>
          </div>
        </div>
      ))}

      {lines.length === 0 && (
        <p className="text-white/60 text-sm text-center py-4">
          Aucune ligne de titre. Cliquez sur "Ajouter une ligne" pour commencer.
        </p>
      )}
    </div>
  );
}
