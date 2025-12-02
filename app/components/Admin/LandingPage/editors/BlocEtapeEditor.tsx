import type { BlocEtape } from "~/types/landing-page";
import LineTitleEditor from "./LineTitleEditor";
import MediaEditor from "./MediaEditor";

interface BlocEtapeEditorProps {
  bloc: BlocEtape;
  onUpdate: (bloc: BlocEtape) => void;
}

export default function BlocEtapeEditor({
  bloc,
  onUpdate,
}: BlocEtapeEditorProps) {
  const addStep = () => {
    onUpdate({
      ...bloc,
      stepLines: [...bloc.stepLines, { title: "", subtitle: "" }],
    });
  };

  const updateStep = (
    index: number,
    step: { title: string; subtitle: string }
  ) => {
    const newSteps = [...bloc.stepLines];
    newSteps[index] = step;
    onUpdate({ ...bloc, stepLines: newSteps });
  };

  const removeStep = (index: number) => {
    onUpdate({
      ...bloc,
      stepLines: bloc.stepLines.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      {/* Média */}
      <MediaEditor
        media={bloc.media}
        onChange={(media) => onUpdate({ ...bloc, media })}
        label="Média"
      />

      {/* Titre animé */}
      <LineTitleEditor
        lines={bloc.lineTitle}
        onChange={(lines) => onUpdate({ ...bloc, lineTitle: lines })}
        label="Titre"
      />

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

      {/* Texte */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Texte
        </label>
        <textarea
          value={bloc.text}
          onChange={(e) => onUpdate({ ...bloc, text: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* CTA */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          CTA
        </label>
        <input
          type="text"
          value={bloc.cta}
          onChange={(e) => onUpdate({ ...bloc, cta: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Étapes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Étapes ({bloc.stepLines.length})
          </label>
          <button
            type="button"
            onClick={addStep}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Ajouter une étape
          </button>
        </div>

        <div className="space-y-3">
          {bloc.stepLines.map((step, index) => (
            <div
              key={index}
              className="flex gap-2 items-start bg-gray-800 p-3 rounded-lg"
            >
              <span className="text-blue-400 font-bold mt-2">{index + 1}.</span>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) =>
                    updateStep(index, { ...step, title: e.target.value })
                  }
                  placeholder="Titre de l'étape"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={step.subtitle}
                  onChange={(e) =>
                    updateStep(index, { ...step, subtitle: e.target.value })
                  }
                  placeholder="Sous-titre de l'étape"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => removeStep(index)}
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

        {bloc.stepLines.length === 0 && (
          <p className="text-white/60 text-sm text-center py-4">
            Aucune étape ajoutée.
          </p>
        )}
      </div>
    </div>
  );
}
