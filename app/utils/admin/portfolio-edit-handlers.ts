import {
  type FormHandlers,
  createFormHandlers,
  type FormState,
  type PortfolioFormData,
  type BentoItem,
  type BentoLine,
} from "./portfolio-form-handlers";

// Ré-exporter les types, constantes et fonctions pour faciliter l'import
export {
  type PortfolioFormData,
  type BentoItem,
  type BentoLine,
  BENTO_FORMATS,
  initializeFormData,
} from "./portfolio-form-handlers";

// Interface étendue pour les handlers d'édition
export interface EditFormHandlers extends FormHandlers {
  // Handlers supplémentaires pour l'édition
  removeBentoImage: (index: number) => void;
  removeExistingBentoImage: (
    bentoIndex: number,
    lineIndex: number,
    imageIndex: number
  ) => void;
  removeExistingBentoLine: (bentoIndex: number, lineIndex: number) => void;
  addImagesToExistingBento: (
    bentoIndex: number,
    files: FileList,
    inputElement?: HTMLInputElement
  ) => void;
  handleBentoFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Interface étendue pour les états d'édition
export interface EditFormState extends FormState {
  bentoFiles: Map<string, File>;
  setBentoFiles: React.Dispatch<React.SetStateAction<Map<string, File>>>;
}

// Fonction factory pour créer les handlers d'édition
export function createEditFormHandlers(state: EditFormState): EditFormHandlers {
  const baseHandlers = createFormHandlers(state);

  const {
    formData,
    setFormData,
    currentBentoLine,
    setCurrentBentoLine,
    setBentoPreviewImages,
    bentoFiles,
    setBentoFiles,
  } = state;

  // Gestion de l'upload de fichiers multiples pour les images bento (version édition)
  const handleBentoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleBentoFilesChange EDITION appelé", e.target.files);
    const files = e.target.files;
    if (files) {
      const validFiles: File[] = [];
      const newImageNames: string[] = [];

      Array.from(files).forEach((file) => {
        // Vérifier le type de fichier
        if (file.type.startsWith("image/")) {
          validFiles.push(file);
          newImageNames.push(`pending_${file.name}`);
        }
      });

      // Mettre à jour les fichiers et les noms d'images de manière synchrone
      if (validFiles.length > 0) {
        // Stocker les fichiers réels pour l'envoi avec Map
        setBentoFiles((prev) => {
          const newFiles = new Map(prev);
          validFiles.forEach((file) => {
            newFiles.set(file.name, file);
          });
          return newFiles;
        });

        // Ajouter les placeholders à la ligne bento actuelle immédiatement
        setCurrentBentoLine((prev) => ({
          ...prev,
          listImage: [...prev.listImage, ...newImageNames],
        }));

        // Créer les aperçus de manière asynchrone (pour l'affichage uniquement)
        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            setBentoPreviewImages((prev) => [
              ...prev,
              { url: imageUrl, name: file.name },
            ]);
          };
          reader.readAsDataURL(file);
        });
      }

      // Réinitialiser l'input pour permettre de sélectionner les mêmes fichiers si nécessaire
      e.target.value = "";
    }
  };

  const removeBentoImage = (index: number) => {
    setCurrentBentoLine((prev) => ({
      ...prev,
      listImage: prev.listImage.filter((_, i) => i !== index),
    }));
    // Supprimer aussi l'aperçu et le fichier correspondants
    setBentoPreviewImages((prev) => {
      const imageToRemove = prev[index];
      if (imageToRemove) {
        // Supprimer aussi le fichier correspondant de la Map
        setBentoFiles((prevFiles) => {
          const newFiles = new Map(prevFiles);
          newFiles.delete(imageToRemove.name);
          return newFiles;
        });
      }
      return prev.filter((_, i) => i !== index);
    });
  };

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
        const fileName = imageToRemove.replace("pending_", "");
        setBentoFiles((prevFiles) => {
          const newFiles = new Map(prevFiles);
          newFiles.delete(fileName);
          return newFiles;
        });
      }

      newBento[bentoIndex].lines[lineIndex].listImage = newBento[
        bentoIndex
      ].lines[lineIndex].listImage.filter((_, i) => i !== imageIndex);

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
    files: FileList,
    inputElement?: HTMLInputElement
  ) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        // Stocker le fichier réel pour l'envoi avec son nom comme clé
        setBentoFiles((prev) => {
          const newFiles = new Map(prev);
          newFiles.set(file.name, file);
          return newFiles;
        });

        // Ajouter l'image pending au bento existant
        setFormData((prev) => {
          const newBento = [...prev.bento];

          // Trouver la dernière ligne ou créer une nouvelle ligne
          if (newBento[bentoIndex].lines.length === 0) {
            newBento[bentoIndex].lines.push({
              format: "1/3 - 2/3",
              listImage: [`pending_${file.name}`],
            });
          } else {
            // Ajouter à la dernière ligne
            const lastLineIndex = newBento[bentoIndex].lines.length - 1;
            newBento[bentoIndex].lines[lastLineIndex].listImage.push(
              `pending_${file.name}`
            );
          }

          return {
            ...prev,
            bento: newBento,
          };
        });
      }
    });

    // Réinitialiser l'input pour permettre de sélectionner les mêmes fichiers si nécessaire
    if (inputElement) {
      inputElement.value = "";
    }
  };

  return {
    ...baseHandlers,
    removeBentoImage,
    removeExistingBentoImage,
    removeExistingBentoLine,
    addImagesToExistingBento,
    handleBentoFilesChange,
  };
}

// Hook personnalisé pour utiliser les handlers d'édition
export function usePortfolioEditFormHandlers(
  state: EditFormState
): EditFormHandlers {
  return createEditFormHandlers(state);
}
