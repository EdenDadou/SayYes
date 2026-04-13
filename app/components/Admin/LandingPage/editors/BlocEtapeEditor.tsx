import type { BlocEtape } from "~/types/landing-page";
import LineTitleEditor from "./LineTitleEditor";
import MediaEditor from "./MediaEditor";
import CollapsibleCard from "./CollapsibleCard";
import { ADMIN_INPUT_CLASS, swapItems } from "~/utils/admin/landing-page-constants";

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

  const moveStep = (index: number, direction: "up" | "down") => {
    const result = swapItems(bloc.stepLines, index, direction);
    if (result !== bloc.stepLines) onUpdate({ ...bloc, stepLines: result });
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
          className={ADMIN_INPUT_CLASS}
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
          className={ADMIN_INPUT_CLASS}
        />
      </div>

      {/* CTA */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">CTA</label>
        <input
          type="text"
          value={bloc.cta}
          onChange={(e) => onUpdate({ ...bloc, cta: e.target.value })}
          className={ADMIN_INPUT_CLASS}
        />
      </div>

      {/* Étapes */}
      <div className="border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-white">
            Étapes ({bloc.stepLines.length})
          </label>
          <button
            type="button"
            onClick={addStep}
            className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1.5 border border-blue-400/30 rounded-lg hover:bg-blue-400/10 transition-colors"
          >
            + Ajouter une étape
          </button>
        </div>

        <div className="space-y-2">
          {bloc.stepLines.map((step, index) => (
            <CollapsibleCard
              key={index}
              index={index}
              title={step.title}
              subtitle={step.subtitle}
              icon={
                <span className="text-blue-400 font-bold text-lg">
                  {index + 1}
                </span>
              }
              onRemove={() => removeStep(index)}
              onMoveUp={() => moveStep(index, "up")}
              onMoveDown={() => moveStep(index, "down")}
              disableMoveUp={index === 0}
              disableMoveDown={index === bloc.stepLines.length - 1}
            >
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Titre de l'étape
                </label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) =>
                    updateStep(index, { ...step, title: e.target.value })
                  }
                  placeholder="Titre de l'étape"
                  className={ADMIN_INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Sous-titre
                </label>
                <input
                  type="text"
                  value={step.subtitle}
                  onChange={(e) =>
                    updateStep(index, { ...step, subtitle: e.target.value })
                  }
                  placeholder="Sous-titre de l'étape"
                  className={ADMIN_INPUT_CLASS}
                />
              </div>
            </CollapsibleCard>
          ))}
        </div>

        {bloc.stepLines.length === 0 && (
          <p className="text-white/40 text-sm text-center py-6">
            Aucune étape ajoutée. Cliquez sur "+ Ajouter une étape" pour
            commencer.
          </p>
        )}
      </div>
    </div>
  );
}
