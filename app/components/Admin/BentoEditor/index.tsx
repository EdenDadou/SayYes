import { useState, useRef } from "react";
import { DeleteIcon } from "~/components/icons";
import { BentoItem, BENTO_FORMATS } from "~/utils/admin/manage-portfolio-types";
import { EditFormHandlers } from "~/utils/admin/portfolio-edit-handlers";

interface BentoEditorProps {
  bento: BentoItem;
  bentoIndex: number;
  handlers: EditFormHandlers;
  onRemoveBento: (bentoIndex: number) => void;
  bentoPreviewImages: { url: string; name: string }[];
}

export default function BentoEditor({
  bento,
  bentoIndex,
  handlers,
  onRemoveBento,
  bentoPreviewImages,
}: BentoEditorProps) {
  const [draggedLineIndex, setDraggedLineIndex] = useState<number | null>(null);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);
  const [draggedFromLineIndex, setDraggedFromLineIndex] = useState<number | null>(null);
  const processingFiles = useRef<Set<string>>(new Set());

  // Handler pour déplacer une ligne
  const handleLineDragStart = (lineIndex: number) => {
    setDraggedLineIndex(lineIndex);
  };

  const handleLineDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleLineDrop = (targetLineIndex: number) => {
    if (draggedLineIndex === null || draggedLineIndex === targetLineIndex) {
      setDraggedLineIndex(null);
      return;
    }

    // Réorganiser les lignes
    const newLines = [...bento.lines];
    const [movedLine] = newLines.splice(draggedLineIndex, 1);
    newLines.splice(targetLineIndex, 0, movedLine);

    // Mettre à jour le formData via un handler personnalisé
    handlers.updateBentoLines?.(bentoIndex, newLines);
    setDraggedLineIndex(null);
  };

  // Handler pour déplacer une image
  const handleImageDragStart = (lineIndex: number, imageIndex: number) => {
    setDraggedImageIndex(imageIndex);
    setDraggedFromLineIndex(lineIndex);
  };

  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleImageDrop = (targetLineIndex: number, targetImageIndex: number) => {
    if (
      draggedImageIndex === null ||
      draggedFromLineIndex === null ||
      (draggedFromLineIndex === targetLineIndex && draggedImageIndex === targetImageIndex)
    ) {
      setDraggedImageIndex(null);
      setDraggedFromLineIndex(null);
      return;
    }

    const newLines = [...bento.lines];

    // Retirer l'image source
    const [movedImage] = newLines[draggedFromLineIndex].listImage.splice(draggedImageIndex, 1);

    // Insérer l'image à la nouvelle position
    newLines[targetLineIndex].listImage.splice(targetImageIndex, 0, movedImage);

    handlers.updateBentoLines?.(bentoIndex, newLines);
    setDraggedImageIndex(null);
    setDraggedFromLineIndex(null);
  };

  return (
    <div className="bg-green-800/10 border border-green-600/20 rounded-lg p-4">
      {/* En-tête du bento */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
            {bentoIndex + 1}
          </div>
          <span
            className="text-white font-semibold"
            style={{ fontFamily: "Jakarta Semi Bold" }}
          >
            Bento {bentoIndex + 1}
          </span>
          <span className="text-green-300 text-sm">
            {bento.lines.length} lignes
          </span>
        </div>
        <button
          type="button"
          onClick={() => onRemoveBento(bentoIndex)}
          className="text-red-400 hover:text-red-300 transition-colors duration-200"
          title="Supprimer ce bento"
        >
          <DeleteIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Lignes du bento */}
      <div className="space-y-2">
        {bento.lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            draggable
            onDragStart={() => handleLineDragStart(lineIndex)}
            onDragOver={handleLineDragOver}
            onDrop={() => handleLineDrop(lineIndex)}
            className={`bg-green-700/10 border border-green-600/20 rounded-lg p-3 cursor-move hover:border-green-500/40 transition-all ${
              draggedLineIndex === lineIndex ? "opacity-50" : ""
            }`}
          >
            {/* En-tête de la ligne */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white text-xs">⋮⋮</span>
                <select
                  value={line.format}
                  onChange={(e) => {
                    const newLines = [...bento.lines];
                    newLines[lineIndex] = {
                      ...newLines[lineIndex],
                      format: e.target.value as any,
                    };
                    handlers.updateBentoLines(bentoIndex, newLines);
                  }}
                  className="text-white bg-green-800/30 border border-green-600/30 rounded px-2 py-1 text-xs"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  {BENTO_FORMATS.map((format) => (
                    <option key={format} value={format}>
                      📐 {format}
                    </option>
                  ))}
                </select>
                <span className="text-green-300 text-xs">
                  {line.listImage.length} médias
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlers.removeExistingBentoLine(bentoIndex, lineIndex)}
                  className="text-xs bg-red-600/20 hover:bg-red-600/30 text-red-300 px-2 py-1 rounded border border-red-600/30"
                >
                  🗑️ Ligne
                </button>
              </div>
            </div>

            {/* Grille des images avec drag & drop et aperçu */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              {line.listImage.map((image, imgIndex) => {
                // Déterminer l'URL de l'image et si c'est une vidéo
                let imageUrl = image;
                let isVideo = false;

                // Pour les images pending, chercher le blob URL dans bentoPreviewImages
                if (image.startsWith("pending_")) {
                  const preview = bentoPreviewImages.find((p) => p.name === image);
                  imageUrl = preview
                    ? preview.url
                    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' fill='%2322c55e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='40'%3E📁%3C/text%3E%3C/svg%3E";

                  // Vérifier si c'est une vidéo dans le nom du fichier
                  if (image.includes('.mp4') || image.includes('.mov') || image.includes('.webm') || image.includes('.avi')) {
                    isVideo = true;
                  }
                } else {
                  // Vérifier l'extension pour les URLs normales
                  const ext = image.toLowerCase();
                  if (ext.includes('.mp4') || ext.includes('.mov') || ext.includes('.webm') || ext.includes('.avi')) {
                    isVideo = true;
                  }
                }

                return (
                  <div
                    key={imgIndex}
                    draggable
                    onDragStart={() => handleImageDragStart(lineIndex, imgIndex)}
                    onDragOver={handleImageDragOver}
                    onDrop={() => handleImageDrop(lineIndex, imgIndex)}
                    className={`relative group cursor-move rounded-lg overflow-hidden aspect-square bg-green-800/20 hover:bg-green-700/30 border-2 border-green-600/30 hover:border-green-500/50 transition-all ${
                      draggedImageIndex === imgIndex && draggedFromLineIndex === lineIndex
                        ? "opacity-50"
                        : ""
                    }`}
                    title={
                      image.startsWith("pending_")
                        ? image.replace("pending_", "")
                        : image.split("/").pop()
                    }
                  >
                    {/* Aperçu de l'image ou vidéo */}
                    {isVideo ? (
                      <video
                        src={imageUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={imageUrl}
                        alt={`Image ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback si l'image ne charge pas
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239CA3AF' font-size='40'%3E🖼️%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    )}

                    {/* Icône vidéo si c'est une vidéo */}
                    {isVideo && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 rounded-full w-10 h-10 flex items-center justify-center pointer-events-none">
                        <span className="text-white text-2xl">▶</span>
                      </div>
                    )}

                    {/* Overlay avec numéro */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1">
                      <span className="text-white text-xs font-bold" style={{ fontFamily: "Jakarta" }}>
                        {isVideo ? '🎬 ' : ''}{imgIndex + 1}
                      </span>
                    </div>

                    {/* Icône de déplacement */}
                    <div className="absolute top-1 left-1 bg-black/50 rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs">⋮⋮</span>
                    </div>

                    {/* Bouton de suppression */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlers.removeExistingBentoImage(bentoIndex, lineIndex, imgIndex);
                      }}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                    >
                      <span className="text-white text-sm font-bold">×</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bouton pour ajouter des images */}
            <div className="flex gap-2">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    // Créer une clé unique pour cet upload
                    const uploadKey = `${bentoIndex}-${lineIndex}-${Array.from(e.target.files).map(f => f.name + f.size).join(',')}`;

                    // Vérifier si on n'est pas déjà en train de traiter ces fichiers
                    if (processingFiles.current.has(uploadKey)) {
                      console.log(`⚠️ Upload déjà en cours, ignoré: ${uploadKey}`);
                      return;
                    }

                    console.log(`🎯 BentoEditor onChange appelé pour bento ${bentoIndex}, ligne ${lineIndex}, ${e.target.files.length} fichiers`);

                    // Marquer comme en cours de traitement
                    processingFiles.current.add(uploadKey);

                    handlers.addImagesToExistingBento(
                      bentoIndex,
                      lineIndex,
                      e.target.files,
                      e.target
                    );

                    // Nettoyer après un délai
                    setTimeout(() => {
                      processingFiles.current.delete(uploadKey);
                    }, 1000);
                  }
                }}
                className="hidden"
                id={`add-to-bento-${bentoIndex}-${lineIndex}`}
              />
              <label
                htmlFor={`add-to-bento-${bentoIndex}-${lineIndex}`}
                className="text-xs bg-green-600/20 hover:bg-green-600/30 text-green-300 px-2 py-1 rounded border border-green-600/30 cursor-pointer"
              >
                📁 Ajouter images
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton pour ajouter une nouvelle ligne au bento */}
      <button
        type="button"
        onClick={() => handlers.addLineToExistingBento(bentoIndex)}
        className="w-full mt-3 text-sm bg-green-600/20 hover:bg-green-600/30 text-green-300 py-2 px-4 rounded-lg border border-green-600/30 transition-colors flex items-center justify-center gap-2"
        style={{ fontFamily: "Jakarta Medium" }}
      >
        <span className="text-lg">+</span>
        Ajouter une ligne
      </button>
    </div>
  );
}
