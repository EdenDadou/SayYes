import { useState } from "react";
import type { BlocIntro } from "~/types/landing-page";
import LineTitleEditor from "./LineTitleEditor";
import MediaEditor from "./MediaEditor";

interface BlocIntroEditorProps {
  bloc: BlocIntro;
  onUpdate: (bloc: BlocIntro) => void;
}

export default function BlocIntroEditor({
  bloc,
  onUpdate,
}: BlocIntroEditorProps) {
  const [newTag, setNewTag] = useState("");

  const updateField = <K extends keyof BlocIntro>(
    field: K,
    value: BlocIntro[K]
  ) => {
    onUpdate({ ...bloc, [field]: value });
  };

  const addTag = () => {
    if (newTag.trim()) {
      updateField("tags", [...bloc.tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    updateField(
      "tags",
      bloc.tags.filter((_, i) => i !== index)
    );
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
          value={bloc.punchline}
          onChange={(e) => updateField("punchline", e.target.value)}
          placeholder="Texte affiché au-dessus du titre..."
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Titre animé */}
      <LineTitleEditor
        lines={bloc.lineTitle}
        onChange={(lines) => updateField("lineTitle", lines)}
        label="Titre principal"
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Description *
        </label>
        <textarea
          value={bloc.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* CTA */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          CTA (Call to Action) *
        </label>
        <input
          type="text"
          value={bloc.cta}
          onChange={(e) => updateField("cta", e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Tags * ({bloc.tags.length})
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Ajouter un tag..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Ajouter
          </button>
        </div>
        {bloc.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {bloc.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-600/30 text-blue-300 text-sm rounded-lg flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="text-blue-300 hover:text-white"
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
              </span>
            ))}
          </div>
        )}
        {bloc.tags.length === 0 && (
          <p className="text-white/60 text-sm">Aucun tag ajouté.</p>
        )}
      </div>

      {/* Média */}
      <MediaEditor
        media={bloc.media}
        onChange={(media) => updateField("media", media)}
        label="Média principal *"
      />

      {/* Alt Title */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Alt media
        </label>
        <input
          type="text"
          value={bloc.altTitle || ""}
          onChange={(e) => updateField("altTitle", e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
