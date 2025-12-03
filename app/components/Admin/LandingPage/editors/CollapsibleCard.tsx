import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleCardProps {
  /** Index de la card (pour affichage) */
  index: number;
  /** Titre principal de la card */
  title: string;
  /** Sous-titre ou description courte (optionnel) */
  subtitle?: string;
  /** Badge de type (ex: "Offre", "Concurrence") */
  badge?: {
    label: string;
    color: "green" | "orange" | "blue" | "purple" | "red";
  };
  /** URL de l'image preview (optionnel) */
  previewImage?: string;
  /** Icône à afficher (optionnel) */
  icon?: ReactNode;
  /** Nombre d'éléments enfants (ex: "3 lignes") */
  itemCount?: { count: number; label: string };
  /** État initial expanded/collapsed */
  defaultExpanded?: boolean;
  /** Callback pour supprimer */
  onRemove: () => void;
  /** Callback pour monter */
  onMoveUp?: () => void;
  /** Callback pour descendre */
  onMoveDown?: () => void;
  /** Désactiver bouton monter */
  disableMoveUp?: boolean;
  /** Désactiver bouton descendre */
  disableMoveDown?: boolean;
  /** Contenu du formulaire d'édition */
  children: ReactNode;
}

const badgeColors = {
  green: "bg-green-600/30 text-green-300 border-green-500/30",
  orange: "bg-orange-600/30 text-orange-300 border-orange-500/30",
  blue: "bg-blue-600/30 text-blue-300 border-blue-500/30",
  purple: "bg-purple-600/30 text-purple-300 border-purple-500/30",
  red: "bg-red-600/30 text-red-300 border-red-500/30",
};

export default function CollapsibleCard({
  index,
  title,
  subtitle,
  badge,
  previewImage,
  icon,
  itemCount,
  defaultExpanded = false,
  onRemove,
  onMoveUp,
  onMoveDown,
  disableMoveUp = false,
  disableMoveDown = false,
  children,
}: CollapsibleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || false);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50 transition-all duration-200 hover:border-gray-600">
      {/* Header - Zone cliquable */}
      <div
        className="flex items-center gap-3 p-3 cursor-pointer select-none group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Preview image ou icône */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : icon ? (
            <span className="text-white/70">{icon}</span>
          ) : (
            <span className="text-white/40 text-lg font-bold">{index + 1}</span>
          )}
        </div>

        {/* Infos principales */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {badge && (
              <span
                className={`text-xs px-2 py-0.5 rounded border ${badgeColors[badge.color]}`}
              >
                {badge.label}
              </span>
            )}
            <span className="text-white font-medium truncate">
              {title || <span className="text-white/40 italic">Sans titre</span>}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            {subtitle && (
              <span className="text-white/50 text-sm truncate">{subtitle}</span>
            )}
            {itemCount && itemCount.count > 0 && (
              <span className="text-white/40 text-xs">
                {itemCount.count} {itemCount.label}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Boutons de déplacement */}
          {onMoveUp && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              disabled={disableMoveUp}
              className={`p-1.5 rounded transition-colors ${
                disableMoveUp
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white/60 hover:text-white hover:bg-gray-700"
              }`}
              title="Monter"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}

          {onMoveDown && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              disabled={disableMoveDown}
              className={`p-1.5 rounded transition-colors ${
                disableMoveDown
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white/60 hover:text-white hover:bg-gray-700"
              }`}
              title="Descendre"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {/* Supprimer */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1.5 rounded text-red-400/60 hover:text-red-400 hover:bg-red-900/30 transition-colors"
            title="Supprimer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Chevron expand/collapse - toujours visible */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="p-1.5 rounded text-white/60 hover:text-white hover:bg-gray-700 transition-all"
        >
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>

      {/* Contenu expandable */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2 border-t border-gray-700/50 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
