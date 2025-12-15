import type { BlocCards, Card, CardConcurrence, CardOffre } from "~/types/landing-page";
import MediaEditor from "./MediaEditor";
import CollapsibleCard from "./CollapsibleCard";
import LineTitleEditor from "./LineTitleEditor";

interface BlocCardsEditorProps {
  bloc: BlocCards;
  onUpdate: (bloc: BlocCards) => void;
}

export default function BlocCardsEditor({
  bloc,
  onUpdate,
}: BlocCardsEditorProps) {
  const addCard = (type: "concurrence" | "offre") => {
    const newCard: Card =
      type === "concurrence"
        ? {
            type: "concurrence",
            titre: "",
            cta: "",
            blocs: [],
          }
        : {
            type: "offre",
            titre: "",
            cta: "",
          };
    onUpdate({ ...bloc, cards: [...bloc.cards, newCard] });
  };

  const updateCard = (index: number, card: Card) => {
    const newCards = [...bloc.cards];
    newCards[index] = card;
    onUpdate({ ...bloc, cards: newCards });
  };

  const removeCard = (index: number) => {
    onUpdate({ ...bloc, cards: bloc.cards.filter((_, i) => i !== index) });
  };

  const addBlocConcurrence = (cardIndex: number) => {
    const card = bloc.cards[cardIndex] as CardConcurrence;
    updateCard(cardIndex, {
      ...card,
      blocs: [...card.blocs, { sousTitre: "", linesType: "coche", lines: [] }],
    });
  };

  const updateBlocConcurrence = (
    cardIndex: number,
    blocIndex: number,
    blocData: CardConcurrence["blocs"][0]
  ) => {
    const card = bloc.cards[cardIndex] as CardConcurrence;
    const newBlocs = [...card.blocs];
    newBlocs[blocIndex] = blocData;
    updateCard(cardIndex, { ...card, blocs: newBlocs });
  };

  const removeBlocConcurrence = (cardIndex: number, blocIndex: number) => {
    const card = bloc.cards[cardIndex] as CardConcurrence;
    updateCard(cardIndex, {
      ...card,
      blocs: card.blocs.filter((_, i) => i !== blocIndex),
    });
  };

  const moveCard = (index: number, direction: "up" | "down") => {
    const newCards = [...bloc.cards];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCards.length) return;
    [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
    onUpdate({ ...bloc, cards: newCards });
  };

  return (
    <div className="space-y-4">
      {/* Titre */}
      <LineTitleEditor
        lines={bloc.lineTitle}
        onChange={(lineTitle) => onUpdate({ ...bloc, lineTitle })}
        label="Titre"
      />

      {/* CTA global */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Label CTA
          </label>
          <input
            type="text"
            value={bloc.cta.label}
            onChange={(e) =>
              onUpdate({ ...bloc, cta: { ...bloc.cta, label: e.target.value } })
            }
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Type CTA
          </label>
          <select
            value={bloc.cta.ctaType}
            onChange={(e) =>
              onUpdate({
                ...bloc,
                cta: {
                  ...bloc.cta,
                  ctaType: e.target.value as "color" | "transparent",
                },
              })
            }
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="color">Couleur</option>
            <option value="transparent">Transparent</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Cards ({bloc.cards.length})
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addCard("offre")}
              className="text-sm text-green-400 hover:text-green-300 px-3 py-1.5 border border-green-400/30 rounded-lg hover:bg-green-400/10 transition-colors"
            >
              + Card Offre
            </button>
            <button
              type="button"
              onClick={() => addCard("concurrence")}
              className="text-sm text-orange-400 hover:text-orange-300 px-3 py-1.5 border border-orange-400/30 rounded-lg hover:bg-orange-400/10 transition-colors"
            >
              + Card Concurrence
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {bloc.cards.map((card, cardIndex) => (
            <CollapsibleCard
              key={cardIndex}
              index={cardIndex}
              title={card.titre}
              subtitle={card.cta}
              badge={{
                label: card.type === "offre" ? "Offre" : "Concurrence",
                color: card.type === "offre" ? "green" : "orange",
              }}
              previewImage={card.image?.url}
              itemCount={
                card.type === "concurrence"
                  ? { count: (card as CardConcurrence).blocs.length, label: "blocs" }
                  : undefined
              }
              onRemove={() => removeCard(cardIndex)}
              onMoveUp={() => moveCard(cardIndex, "up")}
              onMoveDown={() => moveCard(cardIndex, "down")}
              disableMoveUp={cardIndex === 0}
              disableMoveDown={cardIndex === bloc.cards.length - 1}
            >
              {/* Champs communs */}
              <input
                type="text"
                value={card.titre}
                onChange={(e) =>
                  updateCard(cardIndex, { ...card, titre: e.target.value })
                }
                placeholder="Titre de la card"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <input
                type="text"
                value={card.cta}
                onChange={(e) =>
                  updateCard(cardIndex, { ...card, cta: e.target.value })
                }
                placeholder="CTA"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* Champs spécifiques à Offre */}
              {card.type === "offre" && (
                <>
                  {/* Logo */}
                  {(card as CardOffre).logo ? (
                    <div className="space-y-2">
                      <MediaEditor
                        media={(card as CardOffre).logo!}
                        onChange={(media) =>
                          updateCard(cardIndex, { ...card, logo: media })
                        }
                        label="Logo"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const { logo, ...rest } = card as CardOffre;
                          updateCard(cardIndex, rest as Card);
                        }}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Supprimer le logo
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        updateCard(cardIndex, {
                          ...card,
                          logo: { type: "image", url: "" },
                        })
                      }
                      className="text-sm text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-400/30 rounded"
                    >
                      + Ajouter un logo
                    </button>
                  )}

                  {/* Lines multiples */}
                  {(() => {
                    const rawLines = (card as CardOffre).lines;
                    const lines = Array.isArray(rawLines)
                      ? rawLines
                      : typeof rawLines === "string" && rawLines
                        ? [rawLines]
                        : [];
                    return (
                      <div className="border border-gray-700 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/70">
                            Lignes ({lines.length})
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              updateCard(cardIndex, {
                                ...card,
                                lines: [...lines, ""],
                              });
                            }}
                            className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-400/30 rounded"
                          >
                            + Ajouter une ligne
                          </button>
                        </div>
                        {lines.map((line, lineIndex) => (
                          <div key={lineIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={line}
                              onChange={(e) => {
                                const newLines = [...lines];
                                newLines[lineIndex] = e.target.value;
                                updateCard(cardIndex, { ...card, lines: newLines });
                              }}
                              placeholder={`Ligne ${lineIndex + 1}`}
                              className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newLines = lines.filter((_, i) => i !== lineIndex);
                                updateCard(cardIndex, { ...card, lines: newLines });
                              }}
                              className="text-red-400 hover:text-red-300 px-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  <input
                    type="text"
                    value={(card as CardOffre).mention || ""}
                    onChange={(e) =>
                      updateCard(cardIndex, { ...card, mention: e.target.value })
                    }
                    placeholder="Mention (optionnel)"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </>
              )}

              {/* Image optionnelle */}
              {card.image && (
                <MediaEditor
                  media={card.image}
                  onChange={(media) =>
                    updateCard(cardIndex, { ...card, image: media })
                  }
                  label="Image"
                />
              )}
              {!card.image && (
                <button
                  type="button"
                  onClick={() =>
                    updateCard(cardIndex, {
                      ...card,
                      image: { type: "image", url: "" },
                    })
                  }
                  className="text-sm text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-400/30 rounded"
                >
                  + Ajouter une image
                </button>
              )}

              {/* Blocs spécifiques à Concurrence */}
              {card.type === "concurrence" && (
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/70">
                      Blocs concurrence ({(card as CardConcurrence).blocs.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => addBlocConcurrence(cardIndex)}
                      className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 border border-blue-400/30 rounded"
                    >
                      + Ajouter un bloc
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(card as CardConcurrence).blocs.map((b, blocIndex) => (
                      <div
                        key={blocIndex}
                        className="bg-gray-800 p-3 rounded-lg space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            value={b.sousTitre}
                            onChange={(e) =>
                              updateBlocConcurrence(cardIndex, blocIndex, {
                                ...b,
                                sousTitre: e.target.value,
                              })
                            }
                            placeholder="Sous-titre"
                            className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeBlocConcurrence(cardIndex, blocIndex)
                            }
                            className="ml-2 text-red-400 hover:text-red-300 p-1"
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

                        <select
                          value={b.linesType}
                          onChange={(e) =>
                            updateBlocConcurrence(cardIndex, blocIndex, {
                              ...b,
                              linesType: e.target.value as "coche" | "croix",
                            })
                          }
                          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                        >
                          <option value="coche">Coche</option>
                          <option value="croix">Croix</option>
                        </select>

                        <input
                          type="text"
                          value={b.lines.join(", ")}
                          onChange={(e) =>
                            updateBlocConcurrence(cardIndex, blocIndex, {
                              ...b,
                              lines: e.target.value
                                .split(",")
                                .map((l) => l.trim())
                                .filter(Boolean),
                            })
                          }
                          placeholder="Lignes (séparées par virgules)"
                          className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleCard>
          ))}
        </div>

        {bloc.cards.length === 0 && (
          <p className="text-white/40 text-sm text-center py-6">
            Aucune card ajoutée. Cliquez sur un bouton ci-dessus pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
