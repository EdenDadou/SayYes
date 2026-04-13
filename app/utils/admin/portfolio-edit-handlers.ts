import {
  type FormHandlers,
  createFormHandlers,
  type FormState,
} from "./portfolio-form-handlers";

// Ré-exporter les types, constantes et fonctions pour faciliter l'import
export {
  type PortfolioFormData,
  initializeFormData,
} from "./portfolio-form-handlers";

// Interface étendue pour les handlers d'édition
export interface EditFormHandlers extends FormHandlers {
  // Handlers supplémentaires pour l'édition
  removeExistingBentoImage: (
    bentoIndex: number,
    lineIndex: number,
    imageIndex: number
  ) => void;
  removeExistingBentoLine: (bentoIndex: number, lineIndex: number) => void;
  addImagesToExistingBento: (
    bentoIndex: number,
    lineIndex: number,
    files: FileList,
    inputElement?: HTMLInputElement
  ) => void;
  updateBentoLines: (
    bentoIndex: number,
    newLines: Array<{
      format: string;
      listImage: string[];
      listImageAlt?: string[];
    }>
  ) => void;
  addLineToExistingBento: (bentoIndex: number) => void;
  updateExistingBentoImageAlt: (
    bentoIndex: number,
    lineIndex: number,
    imageIndex: number,
    alt: string
  ) => void;
}

// Interface étendue pour les états d'édition
export interface EditFormState extends FormState {
  bentoFiles: Map<string, File>;
  setBentoFiles: React.Dispatch<React.SetStateAction<Map<string, File>>>;
}

// Fonction factory pour créer les handlers d'édition
export function createEditFormHandlers(state: EditFormState): EditFormHandlers {
  const baseHandlers = createFormHandlers(state);

  const { setFormData, setBentoPreviewImages, setBentoFiles } = state;

  // Fonction pour supprimer une image d'un bento existant
  const removeExistingBentoImage = (
    bentoIndex: number,
    lineIndex: number,
    imageIndex: number
  ) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      const imageToRemove =
        newBento[bentoIndex].lines[lineIndex].listImage[imageIndex];

      // Si c'est une image pending, supprimer le fichier correspondant
      if (imageToRemove && imageToRemove.startsWith("pending_")) {
        const fileId = imageToRemove.replace("pending_", "");
        setBentoFiles((prevFiles) => {
          const newFiles = new Map(prevFiles);
          newFiles.delete(fileId);
          return newFiles;
        });
      }

      newBento[bentoIndex].lines[lineIndex].listImage = newBento[
        bentoIndex
      ].lines[lineIndex].listImage.filter((_, i) => i !== imageIndex);
      // Supprimer aussi l'alt correspondant
      if (newBento[bentoIndex].lines[lineIndex].listImageAlt) {
        newBento[bentoIndex].lines[lineIndex].listImageAlt = newBento[
          bentoIndex
        ].lines[lineIndex].listImageAlt.filter((_, i) => i !== imageIndex);
      }

      // Si la ligne n'a plus d'images, la supprimer
      if (newBento[bentoIndex].lines[lineIndex].listImage.length === 0) {
        newBento[bentoIndex].lines = newBento[bentoIndex].lines.filter(
          (_, i) => i !== lineIndex
        );
      }

      // Si le bento n'a plus de lignes, le supprimer
      if (newBento[bentoIndex].lines.length === 0) {
        return {
          ...prev,
          bento: newBento.filter((_, i) => i !== bentoIndex),
        };
      }

      return {
        ...prev,
        bento: newBento,
      };
    });
  };

  // Fonction pour supprimer une ligne entière d'un bento existant
  const removeExistingBentoLine = (bentoIndex: number, lineIndex: number) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      newBento[bentoIndex].lines = newBento[bentoIndex].lines.filter(
        (_, i) => i !== lineIndex
      );

      // Si le bento n'a plus de lignes, le supprimer
      if (newBento[bentoIndex].lines.length === 0) {
        return {
          ...prev,
          bento: newBento.filter((_, i) => i !== bentoIndex),
        };
      }

      return {
        ...prev,
        bento: newBento,
      };
    });
  };

  // Fonction pour ajouter des images à un bento existant
  const addImagesToExistingBento = (
    bentoIndex: number,
    lineIndex: number,
    files: FileList,
    inputElement?: HTMLInputElement
  ) => {
    const validFiles = Array.from(files).filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (validFiles.length === 0) return;

    // Générer tous les IDs et pending IDs d'abord
    const filesData = validFiles.map((file, index) => {
      const fileId = `${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}_${file.name}`;
      const pendingId = `pending_${fileId}`;
      return { file, fileId, pendingId };
    });

    // Mettre à jour le formData une seule fois avec toutes les images
    setFormData((prev) => {
      const newBento = [...prev.bento];

      // Vérifier qu'on n'ajoute pas de doublons
      if (newBento[bentoIndex].lines[lineIndex]) {
        const existingImages = new Set(
          newBento[bentoIndex].lines[lineIndex].listImage
        );
        const newImages = filesData
          .map((f) => f.pendingId)
          .filter((id) => !existingImages.has(id));

        newBento[bentoIndex].lines[lineIndex].listImage.push(...newImages);
        // Ajouter des alts vides pour les nouvelles images
        const currentAlts =
          newBento[bentoIndex].lines[lineIndex].listImageAlt || [];
        newBento[bentoIndex].lines[lineIndex].listImageAlt = [
          ...currentAlts,
          ...newImages.map(() => ""),
        ];
      }

      return {
        ...prev,
        bento: newBento,
      };
    });

    // Stocker tous les fichiers
    filesData.forEach(({ file, fileId, pendingId }) => {
      setBentoFiles((prev) => {
        const newFiles = new Map(prev);
        newFiles.set(fileId, file);
        return newFiles;
      });

      // Créer un blob URL pour l'aperçu et le stocker dans bentoPreviewImages
      const reader = new FileReader();
      reader.onload = (event) => {
        const blobUrl = event.target?.result as string;

        // Ajouter l'aperçu à la liste des previews
        setBentoPreviewImages((prev) => [
          ...prev,
          { url: blobUrl, name: pendingId },
        ]);
      };

      reader.readAsDataURL(file);
    });

    // Réinitialiser l'input pour permettre de sélectionner les mêmes fichiers si nécessaire
    if (inputElement) {
      inputElement.value = "";
    }
  };

  // Fonction pour mettre à jour les lignes d'un bento (pour le drag & drop)
  const updateBentoLines = (
    bentoIndex: number,
    newLines: Array<{
      format: string;
      listImage: string[];
      listImageAlt?: string[];
    }>
  ) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      newBento[bentoIndex].lines = newLines as any;
      return {
        ...prev,
        bento: newBento,
      };
    });
  };

  // Fonction pour ajouter une nouvelle ligne à un bento existant
  const addLineToExistingBento = (bentoIndex: number) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];

      // Ajouter une nouvelle ligne vide avec le format par défaut
      if (newBento[bentoIndex]) {
        newBento[bentoIndex].lines.push({
          format: "1/3 - 2/3",
          listImage: [],
          listImageAlt: [],
        });
      }

      return {
        ...prev,
        bento: newBento,
      };
    });
  };

  // Fonction pour mettre à jour l'alt d'une image dans un bento existant
  const updateExistingBentoImageAlt = (
    bentoIndex: number,
    lineIndex: number,
    imageIndex: number,
    alt: string
  ) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      if (newBento[bentoIndex]?.lines[lineIndex]) {
        const line = newBento[bentoIndex].lines[lineIndex];
        const newAlts = [...(line.listImageAlt || [])];
        // S'assurer que le tableau a la bonne taille
        while (newAlts.length < line.listImage.length) {
          newAlts.push("");
        }
        newAlts[imageIndex] = alt;
        newBento[bentoIndex].lines[lineIndex] = {
          ...line,
          listImageAlt: newAlts,
        };
      }
      return {
        ...prev,
        bento: newBento,
      };
    });
  };

  return {
    ...baseHandlers,
    removeExistingBentoImage,
    removeExistingBentoLine,
    addImagesToExistingBento,
    updateBentoLines,
    addLineToExistingBento,
    updateExistingBentoImageAlt,
  };
}

// Hook personnalisé pour utiliser les handlers d'édition
export function usePortfolioEditFormHandlers(
  state: EditFormState
): EditFormHandlers {
  return createEditFormHandlers(state);
}
