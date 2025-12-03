import type { BlocFAQ } from "~/types/landing-page";
import CollapsibleCard from "./CollapsibleCard";

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

  const moveQuestion = (index: number, direction: "up" | "down") => {
    const newBlocs = [...bloc.blocs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocs.length) return;
    [newBlocs[index], newBlocs[targetIndex]] = [newBlocs[targetIndex], newBlocs[index]];
    onUpdate({ ...bloc, blocs: newBlocs });
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
      <div className="border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Questions ({bloc.blocs.length})
          </label>
          <button
            type="button"
            onClick={addQuestion}
            className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5 border border-blue-400/30 rounded-lg hover:bg-blue-400/10 transition-colors"
          >
            + Ajouter une question
          </button>
        </div>

        <div className="space-y-2">
          {bloc.blocs.map((q, index) => (
            <CollapsibleCard
              key={index}
              index={index}
              title={q.question}
              subtitle={q.answer ? `${q.answer.substring(0, 50)}${q.answer.length > 50 ? "..." : ""}` : undefined}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              onRemove={() => removeQuestion(index)}
              onMoveUp={() => moveQuestion(index, "up")}
              onMoveDown={() => moveQuestion(index, "down")}
              disableMoveUp={index === 0}
              disableMoveDown={index === bloc.blocs.length - 1}
            >
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(index, { ...q, question: e.target.value })
                  }
                  placeholder="Votre question..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Réponse
                </label>
                <textarea
                  value={q.answer}
                  onChange={(e) =>
                    updateQuestion(index, { ...q, answer: e.target.value })
                  }
                  placeholder="Votre réponse..."
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                />
              </div>
            </CollapsibleCard>
          ))}
        </div>

        {bloc.blocs.length === 0 && (
          <p className="text-white/40 text-sm text-center py-6">
            Aucune question ajoutée. Cliquez sur "+ Ajouter une question" pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
