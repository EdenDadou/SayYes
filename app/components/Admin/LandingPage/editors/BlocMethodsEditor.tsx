import type { BlocMethods } from "~/types/landing-page";
import MediaEditor from "./MediaEditor";
import LineTitleEditor from "./LineTitleEditor";
import CollapsibleCard from "./CollapsibleCard";

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

interface BlocMethodsEditorProps {
  bloc: BlocMethods;
  onUpdate: (bloc: BlocMethods) => void;
}

export default function BlocMethodsEditor({
  bloc,
  onUpdate,
}: BlocMethodsEditorProps) {
  const addCard = () => {
    onUpdate({
      ...bloc,
      cards: [
        ...bloc.cards,
        { media: { type: "image", url: "" }, title: "", icons: [], lines: [] },
      ],
    });
  };

  const updateCard = (
    index: number,
    card: BlocMethods["cards"][0]
  ) => {
    const newCards = [...bloc.cards];
    newCards[index] = card;
    onUpdate({ ...bloc, cards: newCards });
  };

  const removeCard = (index: number) => {
    onUpdate({
      ...bloc,
      cards: bloc.cards.filter((_, i) => i !== index),
    });
  };

  const moveCard = (index: number, direction: "up" | "down") => {
    const newCards = [...bloc.cards];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCards.length) return;
    [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
    onUpdate({ ...bloc, cards: newCards });
  };

  const addConclusionElement = (type: "icon" | "text") => {
    const newElement =
      type === "icon"
        ? { type: "icon" as const, name: "" }
        : { type: "text" as const, text: "", color: "white" as const };
    onUpdate({
      ...bloc,
      conclusion: {
        ...bloc.conclusion,
        elements: [...bloc.conclusion.elements, newElement],
      },
    });
  };

  const updateConclusionElement = (
    index: number,
    element: BlocMethods["conclusion"]["elements"][0]
  ) => {
    const newElements = [...bloc.conclusion.elements];
    newElements[index] = element;
    onUpdate({
      ...bloc,
      conclusion: { ...bloc.conclusion, elements: newElements },
    });
  };

  const removeConclusionElement = (index: number) => {
    onUpdate({
      ...bloc,
      conclusion: {
        ...bloc.conclusion,
        elements: bloc.conclusion.elements.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Sous-titre */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Sous-titre
        </label>
        <input
          type="text"
          value={bloc.subTitle}
          onChange={(e) => onUpdate({ ...bloc, subTitle: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Titre */}
      <LineTitleEditor
        lines={bloc.lineTitle}
        onChange={(lines) => onUpdate({ ...bloc, lineTitle: lines })}
        label="Titre"
      />

      {/* Cards */}
      <div className="border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Cards ({bloc.cards.length})
          </label>
          <button
            type="button"
            onClick={addCard}
            className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5 border border-blue-400/30 rounded-lg hover:bg-blue-400/10 transition-colors"
          >
            + Ajouter une card
          </button>
        </div>

        <div className="space-y-2">
          {bloc.cards.map((card, index) => (
            <CollapsibleCard
              key={index}
              index={index}
              title={card.title}
              previewImage={card.media?.type === "image" ? card.media.url : undefined}
              itemCount={{ count: card.lines.length, label: card.lines.length > 1 ? "lignes" : "ligne" }}
              onRemove={() => removeCard(index)}
              onMoveUp={() => moveCard(index, "up")}
              onMoveDown={() => moveCard(index, "down")}
              disableMoveUp={index === 0}
              disableMoveDown={index === bloc.cards.length - 1}
            >
              <input
                type="text"
                value={card.title}
                onChange={(e) =>
                  updateCard(index, { ...card, title: e.target.value })
                }
                placeholder="Titre"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <MediaEditor
                media={card.media}
                onChange={(media) => updateCard(index, { ...card, media })}
                label={`Média Card ${index + 1}`}
              />

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Icônes
                </label>
                <div className="flex flex-wrap gap-2">
                  {ICON_OPTIONS.map((icon) => (
                    <label
                      key={icon.value}
                      className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-sm transition-colors ${
                        card.icons.includes(icon.value)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-white/70 hover:bg-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={card.icons.includes(icon.value)}
                        onChange={(e) => {
                          const newIcons = e.target.checked
                            ? [...card.icons, icon.value]
                            : card.icons.filter((i) => i !== icon.value);
                          updateCard(index, { ...card, icons: newIcons });
                        }}
                        className="sr-only"
                      />
                      {icon.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Lignes */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Lignes ({card.lines.length})
                </label>
                <div className="space-y-2">
                  {card.lines.map((line, lineIndex) => (
                    <div key={lineIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => {
                          const newLines = [...card.lines];
                          newLines[lineIndex] = e.target.value;
                          updateCard(index, { ...card, lines: newLines });
                        }}
                        placeholder={`Ligne ${lineIndex + 1}`}
                        className="flex-1 px-3 py-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          updateCard(index, {
                            ...card,
                            lines: card.lines.filter((_, i) => i !== lineIndex),
                          });
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateCard(index, { ...card, lines: [...card.lines, ""] });
                  }}
                  className="mt-2 text-xs text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-400/30 rounded"
                >
                  + Ajouter une ligne
                </button>
              </div>
            </CollapsibleCard>
          ))}
        </div>

        {bloc.cards.length === 0 && (
          <p className="text-white/40 text-sm text-center py-6">
            Aucune card ajoutée. Cliquez sur "+ Ajouter une card" pour commencer.
          </p>
        )}
      </div>

      {/* Conclusion */}
      <div className="border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Conclusion
          </label>
          <select
            value={bloc.conclusion.colorType}
            onChange={(e) =>
              onUpdate({
                ...bloc,
                conclusion: {
                  ...bloc.conclusion,
                  colorType: e.target.value as "white" | "color",
                },
              })
            }
            className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
          >
            <option value="white">Blanc</option>
            <option value="color">Couleur</option>
          </select>
        </div>

        <div className="space-y-2">
          {bloc.conclusion.elements.map((el, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-800 p-2 rounded">
              {el.type === "icon" ? (
                <>
                  <span className="text-white/70 text-xs w-12">Icon:</span>
                  <select
                    value={el.name}
                    onChange={(e) =>
                      updateConclusionElement(index, { ...el, name: e.target.value })
                    }
                    className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                  >
                    <option value="">Sélectionner une icône</option>
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <span className="text-white/70 text-xs w-12">Texte:</span>
                  <input
                    type="text"
                    value={el.text}
                    onChange={(e) =>
                      updateConclusionElement(index, { ...el, text: e.target.value })
                    }
                    placeholder="Texte"
                    className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                  />
                  <select
                    value={el.color || "white"}
                    onChange={(e) =>
                      updateConclusionElement(index, {
                        ...el,
                        color: e.target.value as "white" | "animed",
                      })
                    }
                    className={`px-2 py-1 border rounded text-sm ${
                      el.color === "animed"
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-500 text-white"
                        : "bg-gray-700 border-gray-600 text-white"
                    }`}
                  >
                    <option value="white">Blanc</option>
                    <option value="animed">Animé</option>
                  </select>
                </>
              )}
              <button
                type="button"
                onClick={() => removeConclusionElement(index)}
                className="text-red-400 hover:text-red-300 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => addConclusionElement("text")}
            className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-400/30 rounded"
          >
            + Texte
          </button>
          <button
            type="button"
            onClick={() => addConclusionElement("icon")}
            className="text-xs text-green-400 hover:text-green-300 px-2 py-1 border border-green-400/30 rounded"
          >
            + Icône
          </button>
        </div>
      </div>
    </div>
  );
}
