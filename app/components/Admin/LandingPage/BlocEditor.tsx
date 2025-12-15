import { useState } from "react";
import type { Bloc } from "~/types/landing-page";
import { BLOC_TYPES } from "~/types/landing-page";

// Import des éditeurs spécifiques
import BlocIntroEditor from "./editors/BlocIntroEditor";
import BlocCardsEditor from "./editors/BlocCardsEditor";
import BlocChiffresClesEditor from "./editors/BlocChiffresClesEditor";
import BlocCommentaireClientEditor from "./editors/BlocCommentaireClientEditor";
import BlocMethodsEditor from "./editors/BlocMethodsEditor";
import BlocTestimonialEditor from "./editors/BlocTestimonialEditor";
import BlocEtapeEditor from "./editors/BlocEtapeEditor";
import BlocFAQEditor from "./editors/BlocFAQEditor";
import BlocFooterEditor from "./editors/BlocFooterEditor";
import BlocUseCaseEditor from "./editors/BlocUseCaseEditor";
import BlocSeparatorEditor from "./editors/BlocSeparatorEditor";

interface BlocEditorProps {
  bloc: Bloc;
  index: number;
  totalBlocs: number;
  onUpdate: (bloc: Bloc) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  // Drag & drop props
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  onDragEnd?: () => void;
}

export default function BlocEditor({
  bloc,
  index,
  totalBlocs,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: BlocEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Trouver le label du type de bloc
  const blocLabel =
    BLOC_TYPES.find((t) => t.value === bloc.type)?.label || bloc.type;

  // Rendu de l'éditeur spécifique selon le type
  const renderEditor = () => {
    switch (bloc.type) {
      case "blocIntro":
        return <BlocIntroEditor bloc={bloc} onUpdate={onUpdate} />;
      case "cards":
        return <BlocCardsEditor bloc={bloc} onUpdate={onUpdate} />;
      case "chiffresCles":
        return <BlocChiffresClesEditor bloc={bloc} onUpdate={onUpdate} />;
      case "commentaireClient":
        return <BlocCommentaireClientEditor bloc={bloc} onUpdate={onUpdate} />;
      case "methods":
        return <BlocMethodsEditor bloc={bloc} onUpdate={onUpdate} />;
      case "testimonial":
        return <BlocTestimonialEditor bloc={bloc} onUpdate={onUpdate} />;
      case "etape":
        return <BlocEtapeEditor bloc={bloc} onUpdate={onUpdate} />;
      case "faq":
        return <BlocFAQEditor bloc={bloc} onUpdate={onUpdate} />;
      case "footer":
        return <BlocFooterEditor bloc={bloc} onUpdate={onUpdate} />;
      case "useCase":
        return <BlocUseCaseEditor bloc={bloc} onUpdate={onUpdate} />;
      case "separator":
        return <BlocSeparatorEditor bloc={bloc} onUpdate={onUpdate} />;
      default:
        return (
          <p className="text-white/70">
            Éditeur non disponible pour ce type de bloc
          </p>
        );
    }
  };

  return (
    <div
      className={`border border-gray-700 rounded-lg overflow-hidden transition-all ${
        isDragging ? "opacity-50 border-blue-500" : ""
      }`}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {/* Header du bloc */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-gray-800 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {/* Drag handle */}
          <span className="text-white/50 cursor-grab active:cursor-grabbing select-none" title="Glisser pour réorganiser">
            ⋮⋮
          </span>
          <span className="text-white/70 font-mono text-sm">#{index + 1}</span>
          <span className="text-white font-medium">{blocLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bouton supprimer */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Supprimer ce bloc ?")) {
                onRemove();
              }
            }}
            className="p-1 rounded text-red-500 hover:text-red-400 hover:bg-red-900/30"
            title="Supprimer"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>

          {/* Bouton expand/collapse */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded text-white hover:text-white/80 hover:bg-gray-700"
          >
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Contenu du bloc */}
      {isExpanded && (
        <div className="p-4 bg-gray-900/50">{renderEditor()}</div>
      )}
    </div>
  );
}
