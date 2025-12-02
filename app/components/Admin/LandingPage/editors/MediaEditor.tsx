import { useState, useRef } from "react";
import type { Media } from "~/types/landing-page";

interface MediaEditorProps {
  media: Media;
  onChange: (media: Media) => void;
  label?: string;
}

export default function MediaEditor({
  media,
  onChange,
  label = "Média",
}: MediaEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "landing-pages");

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'upload");
      }

      // Déterminer le type basé sur le fichier uploadé
      const isVideo = file.type.startsWith("video/");

      onChange({
        type: isVideo ? "video" : "image",
        url: result.media.url,
        alt: media.alt || file.name.replace(/\.[^/.]+$/, ""),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
      // Reset l'input pour permettre de sélectionner le même fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange({ type: "image", url: "", alt: "" });
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">{label}</label>

      {/* Zone d'upload ou prévisualisation */}
      {!media.url ? (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            id={`media-upload-${label}`}
          />
          <label
            htmlFor={`media-upload-${label}`}
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-white/70 text-sm">Upload en cours...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg
                  className="w-10 h-10 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-white/70 text-sm">
                  Cliquez pour importer une image ou vidéo
                </span>
                <span className="text-white/50 text-xs mt-1">
                  PNG, JPG, GIF, MP4, WebM (max 40MB)
                </span>
              </div>
            )}
          </label>
        </div>
      ) : (
        <div className="relative">
          {/* Prévisualisation */}
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            {media.type === "image" ? (
              <img
                src={media.url}
                alt={media.alt || "Prévisualisation"}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23374151' width='100' height='100'/%3E%3Ctext fill='%239CA3AF' x='50' y='50' text-anchor='middle' dy='.3em'%3EErreur%3C/text%3E%3C/svg%3E";
                }}
              />
            ) : (
              <video
                src={media.url}
                className="w-full h-40 object-cover"
                controls
                onError={(e) => {
                  (e.target as HTMLVideoElement).style.display = "none";
                }}
              />
            )}

            {/* Overlay avec actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <label
                htmlFor={`media-upload-${label}`}
                className="p-2 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </label>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
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
            </div>
          </div>

          {/* Input caché pour le remplacement */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            id={`media-upload-${label}`}
          />

          {/* Infos du média */}
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`text-xs px-2 py-1 rounded ${
                media.type === "video"
                  ? "bg-purple-600/30 text-purple-300"
                  : "bg-green-600/30 text-green-300"
              }`}
            >
              {media.type === "video" ? "Vidéo" : "Image"}
            </span>
            <span className="text-white/50 text-xs truncate flex-1">
              {media.url}
            </span>
          </div>
        </div>
      )}

      {/* Champ alt */}
      <input
        type="text"
        value={media.alt || ""}
        onChange={(e) => onChange({ ...media, alt: e.target.value })}
        placeholder="Texte alternatif (alt)"
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {/* Message d'erreur */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
}
