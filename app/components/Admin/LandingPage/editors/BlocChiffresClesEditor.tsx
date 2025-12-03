import type { BlocChiffresCles } from "~/types/landing-page";
import LineTitleEditor from "./LineTitleEditor";

interface BlocChiffresClesEditorProps {
  bloc: BlocChiffresCles;
  onUpdate: (bloc: BlocChiffresCles) => void;
}

export default function BlocChiffresClesEditor({
  bloc,
  onUpdate,
}: BlocChiffresClesEditorProps) {
  const addNumber = () => {
    onUpdate({
      ...bloc,
      numbers: [...bloc.numbers, { title: "", subtitle: "" }],
    });
  };

  const updateNumber = (
    index: number,
    data: { title: string; subtitle: string }
  ) => {
    const newNumbers = [...bloc.numbers];
    newNumbers[index] = data;
    onUpdate({ ...bloc, numbers: newNumbers });
  };

  const removeNumber = (index: number) => {
    onUpdate({
      ...bloc,
      numbers: bloc.numbers.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      {/* Punchline */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Punchline
        </label>
        <input
          type="text"
          value={bloc.punchline || ""}
          onChange={(e) => onUpdate({ ...bloc, punchline: e.target.value })}
          placeholder="Ex: L'agence qui met tout le monde d'accord"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Titre animé */}
      <LineTitleEditor
        lines={bloc.lineTitle || []}
        onChange={(lineTitle) => onUpdate({ ...bloc, lineTitle })}
        label="Titre"
      />

      {/* Numbers */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Chiffres ({bloc.numbers.length})
          </label>
          <button
            type="button"
            onClick={addNumber}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Ajouter un chiffre
          </button>
        </div>

        <div className="space-y-3">
          {bloc.numbers.map((num, index) => (
            <div
              key={index}
              className="flex gap-2 items-center bg-gray-800 p-3 rounded-lg"
            >
              <input
                type="text"
                value={num.title}
                onChange={(e) =>
                  updateNumber(index, { ...num, title: e.target.value })
                }
                placeholder="Chiffre (ex: 150+)"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                value={num.subtitle}
                onChange={(e) =>
                  updateNumber(index, { ...num, subtitle: e.target.value })
                }
                placeholder="Description"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => removeNumber(index)}
                className="p-2 text-red-400 hover:text-red-300"
              >
                <svg
                  className="w-5 h-5"
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

        {bloc.numbers.length === 0 && (
          <p className="text-white/60 text-sm text-center py-4">
            Aucun chiffre ajouté.
          </p>
        )}
      </div>

      {/* Lines */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Lignes ({(bloc.lines || []).length})
          </label>
          <button
            type="button"
            onClick={() => onUpdate({ ...bloc, lines: [...(bloc.lines || []), ""] })}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Ajouter une ligne
          </button>
        </div>

        <div className="space-y-2">
          {(bloc.lines || []).map((line, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={line}
                onChange={(e) => {
                  const newLines = [...(bloc.lines || [])];
                  newLines[index] = e.target.value;
                  onUpdate({ ...bloc, lines: newLines });
                }}
                placeholder="Ex: Un interlocuteur unique, du brief au déploiement"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => {
                  const newLines = (bloc.lines || []).filter((_, i) => i !== index);
                  onUpdate({ ...bloc, lines: newLines });
                }}
                className="p-2 text-red-400 hover:text-red-300"
              >
                <svg
                  className="w-5 h-5"
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

        {(bloc.lines || []).length === 0 && (
          <p className="text-white/60 text-sm text-center py-4">
            Aucune ligne ajoutée.
          </p>
        )}
      </div>
    </div>
  );
}
