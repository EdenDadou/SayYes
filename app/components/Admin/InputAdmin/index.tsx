import React, { useState, useRef, useEffect } from "react";
import { DeleteIcon } from "~/components/icons";

// Types pour les différents types d'inputs
export type InputType =
  | "text"
  | "textarea"
  | "color"
  | "file"
  | "file-multiple"
  | "select"
  | "rich-text";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilePreview {
  url: string;
  name: string;
}

export interface InputAdminProps {
  // Props communes
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;

  // Type d'input
  type: InputType;

  // Valeur
  value?: string | string[];
  onChange?: (value: string | string[] | File | File[]) => void;

  // Props spécifiques aux différents types
  // Pour textarea
  rows?: number;

  // Pour select
  options?: SelectOption[];

  // Pour file
  accept?: string;
  multiple?: boolean;

  // Pour les previews de fichiers
  previews?: FilePreview[];
  onRemovePreview?: (index: number) => void;

  // Pour les fichiers existants (en mode édition)
  existingFiles?: string[];
  onRemoveExisting?: (file: string) => void;

  // Props pour le style
  labelClassName?: string;
  inputClassName?: string;

  // Props pour les validations
  pattern?: string;
  title?: string;
  min?: string;
  max?: string;
}

export default function InputAdmin({
  id,
  name,
  label,
  placeholder,
  required = false,
  className = "",
  disabled = false,
  type,
  value = "",
  onChange,
  rows = 4,
  options = [],
  accept = "*/*",
  multiple = false,
  previews = [],
  onRemovePreview,
  existingFiles = [],
  onRemoveExisting,
  labelClassName = "",
  inputClassName = "",
  pattern,
  title,
  min,
  max,
}: InputAdminProps) {
  const [internalValue, setInternalValue] = useState<string>(
    Array.isArray(value) ? value.join(", ") : (value as string) || ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchroniser la valeur interne avec la prop value
  useEffect(() => {
    const newValue = Array.isArray(value)
      ? value.join(", ")
      : (value as string) || "";
    setInternalValue(newValue);
  }, [value]);

  // Classes CSS communes
  const baseInputClasses = `
    w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
    text-white placeholder-gray-100 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    transition-all duration-200
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${inputClassName}
  `.trim();

  const baseLabelClasses = `
    block text-sm font-medium text-gray-300 mb-2
    ${labelClassName}
  `.trim();

  const fileInputClasses = `
    w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
    file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
    file:bg-blue-600 file:text-white file:cursor-pointer 
    hover:file:bg-blue-700 transition-all duration-200
    ${inputClassName}
  `.trim();

  // Gestionnaires d'événements
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    console.log(
      "InputAdmin handleFileChange appelé avec:",
      files.length,
      "fichiers"
    );
    console.log(
      "Type:",
      type,
      "Multiple prop:",
      multiple,
      "Should be multiple:",
      type === "file-multiple"
    );

    // Utiliser le type pour déterminer si c'est multiple, pas la prop
    const isMultiple = type === "file-multiple" || multiple;

    if (isMultiple) {
      const fileArray = Array.from(files);
      console.log("Envoi de fileArray:", fileArray);
      onChange?.(fileArray);
    } else {
      console.log("Envoi d'un seul fichier:", files[0]);
      onChange?.(files[0]);
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Rendu des différents types d'inputs
  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            id={id}
            name={name}
            value={internalValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={baseInputClasses}
            style={{ fontFamily: "Jakarta" }}
            pattern={pattern}
            title={title}
            min={min}
            max={max}
          />
        );

      case "textarea":
        return (
          <textarea
            id={id}
            name={name}
            value={internalValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className={`${baseInputClasses} resize-vertical`}
            style={{ fontFamily: "Jakarta" }}
          />
        );

      case "select":
        return (
          <select
            id={id}
            name={name}
            value={internalValue}
            onChange={handleInputChange}
            required={required}
            disabled={disabled}
            className={baseInputClasses}
            style={{ fontFamily: "Jakarta" }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "color":
        return (
          <div className="flex gap-3">
            <input
              type="color"
              value={internalValue || "#000000"}
              onChange={handleColorChange}
              className="w-16 h-12 rounded-lg border border-gray-700 bg-gray-800 cursor-pointer"
              title="Choisir une couleur"
              disabled={disabled}
            />
            <input
              type="text"
              id={id}
              name={name}
              value={internalValue}
              onChange={handleInputChange}
              placeholder={placeholder || "Couleur (ex: #FF5733)"}
              className={`flex-1 ${baseInputClasses}`}
              style={{ fontFamily: "Jakarta" }}
              disabled={disabled}
            />
          </div>
        );

      case "file":
      case "file-multiple":
        return (
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              id={id}
              name={name}
              accept={accept}
              multiple={type === "file-multiple"}
              onChange={handleFileChange}
              disabled={disabled}
              className={fileInputClasses}
              style={{ fontFamily: "Jakarta" }}
            />

            {/* Affichage des fichiers existants */}
            {existingFiles.length > 0 && (
              <div>
                <p
                  className="text-sm text-gray-400 mb-3"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Fichiers existants ({existingFiles.length}) :
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                  {existingFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden ring-2 ring-green-500"
                    >
                      {/* Vérifier si c'est une image pour l'affichage */}
                      {file.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                        <img
                          src={file}
                          alt={`Fichier ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      ) : (
                        <div className="w-full h-20 bg-gray-700 flex items-center justify-center">
                          <span className="text-xs text-gray-300 text-center p-2">
                            📎 {file.split("/").pop()}
                          </span>
                        </div>
                      )}

                      {onRemoveExisting && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => onRemoveExisting(file)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            title="Supprimer ce fichier"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Affichage des previews de nouveaux fichiers */}
            {previews.length > 0 && (
              <div>
                <p
                  className="text-sm text-gray-400 mb-3"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  {type === "file-multiple" ? "Nouveaux fichiers" : "Aperçu"} (
                  {previews.length}) :
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {previews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative group bg-gray-700/30 rounded-lg overflow-hidden ring-2 ring-blue-500"
                    >
                      {/* Vérifier si c'est une image pour l'affichage */}
                      {preview.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                        <img
                          src={preview.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      ) : (
                        <div className="w-full h-20 bg-gray-700 flex items-center justify-center">
                          <span className="text-xs text-gray-300 text-center p-2">
                            📎 {preview.name}
                          </span>
                        </div>
                      )}

                      {onRemovePreview && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => onRemovePreview(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                        <p
                          className="text-xs text-white truncate"
                          style={{ fontFamily: "Jakarta" }}
                        >
                          {preview.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "rich-text":
        // Pour l'instant, on utilise un textarea, mais on pourrait intégrer un éditeur riche plus tard
        return (
          <textarea
            id={id}
            name={name}
            value={internalValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className={`${baseInputClasses} resize-vertical`}
            style={{ fontFamily: "Jakarta" }}
          />
        );

      default:
        return (
          <input
            type="text"
            id={id}
            name={name}
            value={internalValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={baseInputClasses}
            style={{ fontFamily: "Jakarta" }}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={baseLabelClasses}
          style={{ fontFamily: "Jakarta Medium" }}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      {renderInput()}

      {/* Messages d'aide pour certains types */}
      {type === "file-multiple" && (
        <p className="text-xs text-gray-300" style={{ fontFamily: "Jakarta" }}>
          📁 Sélectionnez plusieurs fichiers (formats supportés:{" "}
          {accept || "tous"})
        </p>
      )}

      {type === "file" && accept === "image/*" && (
        <p className="text-xs text-gray-300" style={{ fontFamily: "Jakarta" }}>
          🖼️ Sélectionnez une image (JPG, PNG, GIF, WebP, etc.)
        </p>
      )}
    </div>
  );
}

// Composant wrapper pour les groupes d'inputs
export function InputGroup({
  children,
  title,
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8 ${className}`}
    >
      {title && (
        <h2
          className="text-2xl font-bold text-white mb-6"
          style={{ fontFamily: "Jakarta Bold" }}
        >
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

// Hook personnalisé pour gérer les états des inputs
export function useInputAdmin() {
  const [values, setValues] = useState<Record<string, any>>({});
  const [previews, setPreviews] = useState<Record<string, FilePreview[]>>({});
  const [files, setFiles] = useState<Record<string, File[]>>({});

  const setValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const getValue = (name: string) => {
    return values[name];
  };

  const setPreview = (name: string, previews: FilePreview[]) => {
    setPreviews((prev) => ({ ...prev, [name]: previews }));
  };

  const getPreview = (name: string): FilePreview[] => {
    return previews[name] || [];
  };

  const setFile = (name: string, files: File[]) => {
    setFiles((prev) => ({ ...prev, [name]: files }));
  };

  const getFile = (name: string): File[] => {
    return files[name] || [];
  };

  const reset = () => {
    setValues({});
    setPreviews({});
    setFiles({});
  };

  return {
    values,
    setValue,
    getValue,
    previews,
    setPreview,
    getPreview,
    files,
    setFile,
    getFile,
    reset,
  };
}
