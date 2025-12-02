import type { BlocFAQ } from "~/types/landing-page";

interface BlocFAQEditorProps {
  bloc: BlocFAQ;
  onUpdate: (bloc: BlocFAQ) => void;
}

export default function BlocFAQEditor({
  bloc,
  onUpdate,
}: BlocFAQEditorProps) {
  const addQuestion = () => {
    onUpdate({
      ...bloc,
      blocs: [...bloc.blocs, { question: "", answer: "" }],
    });
  };

  const updateQuestion = (
    index: number,
    data: { question: string; answer: string }
  ) => {
    const newBlocs = [...bloc.blocs];
    newBlocs[index] = data;
    onUpdate({ ...bloc, blocs: newBlocs });
  };

  const removeQuestion = (index: number) => {
    onUpdate({
      ...bloc,
      blocs: bloc.blocs.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      {/* Titre */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Titre
        </label>
        <input
          type="text"
          value={bloc.title}
          onChange={(e) => onUpdate({ ...bloc, title: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Questions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Questions ({bloc.blocs.length})
          </label>
          <button
            type="button"
            onClick={addQuestion}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Ajouter une question
          </button>
        </div>

        <div className="space-y-4">
          {bloc.blocs.map((q, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">
                  Question {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Supprimer
                </button>
              </div>

              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  updateQuestion(index, { ...q, question: e.target.value })
                }
                placeholder="Question"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <textarea
                value={q.answer}
                onChange={(e) =>
                  updateQuestion(index, { ...q, answer: e.target.value })
                }
                placeholder="Réponse"
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        {bloc.blocs.length === 0 && (
          <p className="text-white/60 text-sm text-center py-4">
            Aucune question ajoutée.
          </p>
        )}
      </div>
    </div>
  );
}
