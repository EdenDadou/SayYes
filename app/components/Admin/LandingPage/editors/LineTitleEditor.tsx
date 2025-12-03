import type { TitleLine, TitleElement } from "~/types/landing-page";
import type { ReactNode } from "react";
import CollapsibleCard from "./CollapsibleCard";
// Icons from assets/icons
import Star from "~/assets/icons/Star";
import NoteStar from "~/assets/icons/NoteStar";
import TwoDiamonds from "~/assets/icons/TwoDiamonds";
import ArrowLight from "~/assets/icons/ArrowLight";
import ArrowFull from "~/assets/icons/ArrowFull";
import Arrow from "~/assets/icons/Arrow";
import ArrowBig from "~/assets/icons/ArrowBig";
import Close from "~/assets/icons/Close";
import Coche from "~/assets/icons/Coche";
import Pause from "~/assets/icons/Pause";
import Play from "~/assets/icons/Play";
// Icons from Header/assets
import Coeur from "~/components/Header/assets/Coeur";
import Flamme from "~/components/Header/assets/Flamme";
import Idea from "~/components/Header/assets/Idea";
import Smile from "~/components/Header/assets/Smile";
import ChatBuble from "~/components/Header/assets/ChatBuble";

const ICON_OPTIONS = [
  { value: "heart", label: "❤️ Coeur" },
  { value: "star", label: "⭐ Étoile" },
  { value: "2 stars", label: "✨ 2 Étoiles" },
  { value: "2 diamonds", label: "💎 2 Diamants" },
  { value: "arrowLight", label: "→ Flèche légère" },
  { value: "arrowWhite", label: "➜ Flèche pleine" },
  { value: "arrow", label: "↗ Flèche simple" },
  { value: "arrowBig", label: "⇒ Grande flèche" },
  { value: "coche", label: "✓ Coche" },
  { value: "close", label: "✕ Fermer" },
  { value: "pause", label: "⏸ Pause" },
  { value: "play", label: "▶ Play" },
  { value: "flamme", label: "🔥 Flamme" },
  { value: "idea", label: "💡 Idée" },
  { value: "smile", label: "😊 Smile" },
  { value: "chat", label: "💬 Chat" },
];

// Mapping des icônes par nom (identique à AnimatedTitle)
const IconMap: Record<string, ReactNode> = {
  heart: <Coeur />,
  star: <Star />,
  "2 stars": <NoteStar />,
  "2 diamonds": <TwoDiamonds className="w-8" />,
  arrowLight: <ArrowLight className="w-8" />,
  arrowWhite: <ArrowFull />,
  arrow: <Arrow className="w-8" />,
  arrowBig: <ArrowBig className="w-8" />,
  coche: <Coche />,
  close: <Close className="w-6" />,
  pause: <Pause className="w-6" />,
  play: <Play className="w-6" />,
  flamme: <Flamme />,
  idea: <Idea />,
  smile: <Smile />,
  chat: <ChatBuble />,
};

interface LineTitleEditorProps {
  lines: TitleLine[];
  onChange: (lines: TitleLine[]) => void;
  label?: string;
}

export default function LineTitleEditor({
  lines = [],
  onChange,
  label = "Titre animé",
}: LineTitleEditorProps) {
  // Garantir que lines est toujours un tableau
  const safeLines = lines || [];

  const addLine = () => {
    onChange([...safeLines, { elements: [], titleType: "h2" }]);
  };

  const updateLine = (index: number, line: TitleLine) => {
    const newLines = [...safeLines];
    newLines[index] = line;
    onChange(newLines);
  };

  const removeLine = (index: number) => {
    onChange(safeLines.filter((_, i) => i !== index));
  };

  const moveLine = (index: number, direction: "up" | "down") => {
    const newLines = [...safeLines];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLines.length) return;
    [newLines[index], newLines[targetIndex]] = [newLines[targetIndex], newLines[index]];
    onChange(newLines);
  };

  const addElement = (lineIndex: number, type: "icon" | "text") => {
    const line = safeLines[lineIndex];
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
    const line = safeLines[lineIndex];
    const newElements = [...line.elements];
    newElements[elementIndex] = element;
    updateLine(lineIndex, { ...line, elements: newElements });
  };

  const removeElement = (lineIndex: number, elementIndex: number) => {
    const line = safeLines[lineIndex];
    updateLine(lineIndex, {
      ...line,
      elements: line.elements.filter((_, i) => i !== elementIndex),
    });
  };

  const moveElement = (lineIndex: number, elementIndex: number, direction: "left" | "right") => {
    const line = safeLines[lineIndex];
    const newElements = [...line.elements];
    const targetIndex = direction === "left" ? elementIndex - 1 : elementIndex + 1;
    if (targetIndex < 0 || targetIndex >= newElements.length) return;
    [newElements[elementIndex], newElements[targetIndex]] = [newElements[targetIndex], newElements[elementIndex]];
    updateLine(lineIndex, { ...line, elements: newElements });
  };

  // Générer un résumé pour le titre de la CollapsibleCard
  const getLineSummary = (line: TitleLine): string => {
    if (line.elements.length === 0) return "Ligne vide";
    return line.elements
      .map((el) => (el.type === "icon" ? `[${el.name || "icon"}]` : el.text))
      .join(" ");
  };

  // Fonction pour rendre le preview du titre
  const renderTitlePreview = () => {
    if (safeLines.length === 0) {
      return <span className="text-white/40 italic">Aucun titre défini</span>;
    }

    return safeLines.map((line, lineIndex) => {
      const Tag = line.titleType as keyof JSX.IntrinsicElements;
      const sizeClasses = {
        h1: "text-3xl",
        h2: "text-2xl",
        h3: "text-xl",
      };

      return (
        <Tag
          key={lineIndex}
          className={`${sizeClasses[line.titleType]} font-bold flex flex-row flex-nowrap items-center justify-center gap-2`}
          style={{ fontFamily: "Jakarta Bold" }}
        >
          {line.elements.map((el, elIndex) => {
            if (el.type === "icon") {
              return (
                <span key={elIndex} className="mx-1 opacity-80 inline-flex items-center">
                  {IconMap[el.name] || <span className="text-cyan-400">{el.name || "◆"}</span>}
                </span>
              );
            }
            return (
              <span
                key={elIndex}
                className={
                  el.color === "animed"
                    ? "holographic-text"
                    : "text-white"
                }
              >
                {el.text}
              </span>
            );
          })}
        </Tag>
      );
    });
  };

  return (
    <div className="border border-gray-700 rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-white">
          {label} ({safeLines.length} {safeLines.length > 1 ? "lignes" : "ligne"})
        </label>
        <button
          type="button"
          onClick={addLine}
          className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5 border border-blue-400/30 rounded-lg hover:bg-blue-400/10 transition-colors"
        >
          + Ajouter une ligne
        </button>
      </div>

      {/* Preview du titre */}
      <div className="bg-black rounded-lg p-4 text-center space-y-1">
        {renderTitlePreview()}
      </div>

      {/* Lignes */}
      <div className="space-y-2">
        {safeLines.map((line, lineIndex) => (
          <CollapsibleCard
            key={lineIndex}
            index={lineIndex}
            title={getLineSummary(line)}
            badge={{
              label: line.titleType.toUpperCase(),
              color: line.titleType === "h1" ? "purple" : line.titleType === "h2" ? "blue" : "green",
            }}
            itemCount={{ count: line.elements.length, label: line.elements.length > 1 ? "éléments" : "élément" }}
            onRemove={() => removeLine(lineIndex)}
            onMoveUp={() => moveLine(lineIndex, "up")}
            onMoveDown={() => moveLine(lineIndex, "down")}
            disableMoveUp={lineIndex === 0}
            disableMoveDown={lineIndex === safeLines.length - 1}
          >
            {/* Type de titre */}
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm text-white/70">Type:</label>
              <select
                value={line.titleType}
                onChange={(e) =>
                  updateLine(lineIndex, {
                    ...line,
                    titleType: e.target.value as "h1" | "h2" | "h3",
                  })
                }
                className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
              >
                <option value="h1">H1 - Grand</option>
                <option value="h2">H2 - Moyen</option>
                <option value="h3">H3 - Petit</option>
              </select>
            </div>

            {/* Éléments en row */}
            <div className="space-y-2">
              <label className="text-sm text-white/70">Éléments:</label>
              <div className="flex flex-wrap gap-2">
                {line.elements.map((element, elementIndex) => (
                  <div
                    key={elementIndex}
                    className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-lg p-2 group"
                  >
                    {/* Bouton gauche */}
                    <button
                      type="button"
                      onClick={() => moveElement(lineIndex, elementIndex, "left")}
                      disabled={elementIndex === 0}
                      className={`p-1 rounded transition-colors ${
                        elementIndex === 0
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-white/40 hover:text-white hover:bg-gray-700"
                      }`}
                      title="Déplacer à gauche"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {element.type === "icon" ? (
                      <select
                        value={element.name}
                        onChange={(e) =>
                          updateElement(lineIndex, elementIndex, {
                            ...element,
                            name: e.target.value,
                          })
                        }
                        className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm min-w-[100px]"
                      >
                        <option value="">Icône...</option>
                        {ICON_OPTIONS.map((icon) => (
                          <option key={icon.value} value={icon.value}>
                            {icon.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex items-center gap-1">
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
                          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm w-32"
                        />
                        <select
                          value={element.color}
                          onChange={(e) =>
                            updateElement(lineIndex, elementIndex, {
                              ...element,
                              color: e.target.value as "white" | "animed",
                            })
                          }
                          className={`px-2 py-1 border rounded text-sm ${
                            element.color === "animed"
                              ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-500 text-white"
                              : "bg-gray-700 border-gray-600 text-white"
                          }`}
                        >
                          <option value="white">Blanc</option>
                          <option value="animed">Animé</option>
                        </select>
                      </div>
                    )}

                    {/* Bouton droite */}
                    <button
                      type="button"
                      onClick={() => moveElement(lineIndex, elementIndex, "right")}
                      disabled={elementIndex === line.elements.length - 1}
                      className={`p-1 rounded transition-colors ${
                        elementIndex === line.elements.length - 1
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-white/40 hover:text-white hover:bg-gray-700"
                      }`}
                      title="Déplacer à droite"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Supprimer */}
                    <button
                      type="button"
                      onClick={() => removeElement(lineIndex, elementIndex)}
                      className="p-1 rounded text-red-400/60 hover:text-red-400 hover:bg-red-900/30 transition-colors"
                      title="Supprimer"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Boutons pour ajouter des éléments */}
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => addElement(lineIndex, "text")}
                    className="flex items-center gap-1 px-2 py-1.5 text-xs text-blue-400 hover:text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-400/10 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Texte
                  </button>
                  <button
                    type="button"
                    onClick={() => addElement(lineIndex, "icon")}
                    className="flex items-center gap-1 px-2 py-1.5 text-xs text-green-400 hover:text-green-300 border border-green-400/30 rounded-lg hover:bg-green-400/10 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Icône
                  </button>
                </div>
              </div>

              {line.elements.length === 0 && (
                <p className="text-white/40 text-xs italic">
                  Ajoutez des éléments texte ou icône pour construire cette ligne
                </p>
              )}
            </div>
          </CollapsibleCard>
        ))}
      </div>

      {safeLines.length === 0 && (
        <p className="text-white/40 text-sm text-center py-4">
          Aucune ligne de titre. Cliquez sur "+ Ajouter une ligne" pour commencer.
        </p>
      )}
    </div>
  );
}
