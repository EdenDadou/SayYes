import type { SVGProps } from "react";

// Types pour les propriétés des icônes
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

/**
 * Icône de suppression (croix)
 * Utilisée dans les formulaires pour supprimer des éléments
 */
export const DeleteIcon = ({
  size = 20,
  className = "w-5 h-5",
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    width={size}
    height={size}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Icône de succès (checkmark)
 * Utilisée pour indiquer le succès d'une action
 */
export const SuccessIcon = ({
  size = 20,
  className = "w-5 h-5",
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    width={size}
    height={size}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Icône d'erreur (croix dans un cercle)
 * Utilisée pour indiquer une erreur
 */
export const ErrorIcon = ({
  size = 20,
  className = "w-5 h-5",
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    width={size}
    height={size}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Icône de fermeture (plus petite que DeleteIcon)
 * Utilisée pour fermer des modales ou notifications
 */
export const CloseIcon = ({
  size = 16,
  className = "w-4 h-4",
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    width={size}
    height={size}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Icône de chargement (spinner)
 * Utilisée pour indiquer un chargement en cours
 */
export const LoadingIcon = ({
  size = 20,
  className = "animate-spin rounded-full border-b-2 border-current",
  ...props
}: IconProps) => (
  <div className={className} style={{ width: size, height: size }} {...props} />
);

/**
 * Icône de fichier/document
 * Utilisée pour représenter des fichiers
 */
export const FileIcon = ({
  size = 20,
  className = "w-5 h-5",
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

/**
 * Icône d'image
 * Utilisée pour représenter des images
 */
export const ImageIcon = ({
  size = 20,
  className = "w-5 h-5",
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

/**
 * Icône de plus/ajouter
 * Utilisée pour ajouter des éléments
 */
export const PlusIcon = ({
  size = 20,
  className = "w-5 h-5",
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

/**
 * Icône d'édition/crayon
 * Utilisée pour éditer des éléments
 */
export const EditIcon = ({
  size = 20,
  className = "w-5 h-5",
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
