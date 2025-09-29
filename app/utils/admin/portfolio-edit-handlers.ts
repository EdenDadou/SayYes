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
    files: FileList,
    inputElement?: HTMLInputElement
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

  const {
    formData,
    setFormData,
    currentBentoLine,
    setCurrentBentoLine,
    setBentoPreviewImages,
    bentoFiles,
    setBentoFiles,
    setIsUploadingFiles,
    setUploadProgress,
    setUploadedCount,
    setTotalFiles,
  } = state;

  // Version édition de handleBentoFilesChange (surcharge la version de base)
  const handleBentoFilesChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("handleBentoFilesChange EDITION appelé", e.target.files);
    const files = e.target.files;
    if (files) {
      // Activer l'état de chargement
      setIsUploadingFiles(true);

      const validFiles: File[] = [];
      const newMediaNames: string[] = [];

      Array.from(files).forEach((file) => {
        // Vérifier le type de fichier (images et vidéos)
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          // Générer un ID unique pour éviter les conflits de noms
          const fileId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${file.name}`;
          validFiles.push(file);
          newMediaNames.push(`pending_${fileId}`);
          console.log(
            `✅ Valid file added: ${file.name} with ID: ${fileId} (${file.type})`
          );
        }
      });

      console.log(`🔍 Total valid files: ${validFiles.length}`);
      console.log(`🔍 New media names: ${newMediaNames.join(", ")}`);

      // Mettre à jour les fichiers et les noms de médias de manière synchrone
      if (validFiles.length > 0) {
        // Initialiser les états de progression
        setTotalFiles(validFiles.length);
        setUploadedCount(0);
        setUploadProgress(0);

        // Stocker les fichiers réels pour l'envoi avec Map en utilisant l'ID unique
        setBentoFiles((prev) => {
          const newFiles = new Map(prev);
          validFiles.forEach((file, index) => {
            // Extraire l'ID unique du nom généré
            const fileId = newMediaNames[index].replace("pending_", "");
            newFiles.set(fileId, file);
            console.log(
              `✅ Added to bentoFiles Map (EDITION): ${file.name} with unique ID: ${fileId}`
            );
          });
          return newFiles;
        });

        // Ajouter les placeholders à la ligne bento actuelle immédiatement
        setCurrentBentoLine((prev) => ({
          ...prev,
          listImage: [...prev.listImage, ...newMediaNames],
        }));

        // Créer les aperçus de manière asynchrone avec barre de progression
        let loadedCount = 0;
        validFiles.forEach((file, index) => {
          const reader = new FileReader();

          reader.onprogress = (event) => {
            if (event.lengthComputable) {
              const fileProgress = (event.loaded / event.total) * 100;
              const totalProgress =
                (loadedCount * 100 + fileProgress) / validFiles.length;
              setUploadProgress(Math.round(totalProgress));
            }
          };

          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            setBentoPreviewImages((prev) => [
              ...prev,
              { url: imageUrl, name: file.name },
            ]);

            // Mettre à jour le compteur et la progression
            loadedCount++;
            setUploadedCount(loadedCount);
            const totalProgress = (loadedCount / validFiles.length) * 100;
            setUploadProgress(Math.round(totalProgress));

            console.log(
              `📁 Fichier ${loadedCount}/${validFiles.length} chargé: ${file.name}`
            );

            // Désactiver le loader quand tous les fichiers sont chargés
            if (loadedCount === validFiles.length) {
              setTimeout(() => {
                setIsUploadingFiles(false);
                setUploadProgress(0);
                setUploadedCount(0);
                setTotalFiles(0);
                console.log(
                  "✅ Tous les fichiers bento sont chargés (EDITION)"
                );
              }, 500); // Petit délai pour voir la progression complète
            }
          };

          reader.onerror = () => {
            console.error(`❌ Erreur lors du chargement de ${file.name}`);
            loadedCount++;
            setUploadedCount(loadedCount);

            if (loadedCount === validFiles.length) {
              setIsUploadingFiles(false);
              setUploadProgress(0);
              setUploadedCount(0);
              setTotalFiles(0);
            }
          };

          reader.readAsDataURL(file);
        });
      } else {
        // Aucun fichier valide, désactiver immédiatement le loader
        setIsUploadingFiles(false);
      }

      // Réinitialiser l'input pour permettre de sélectionner les mêmes fichiers si nécessaire
      e.target.value = "";
    }
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
        const fileId = imageToRemove.replace("pending_", "");
        setBentoFiles((prevFiles) => {
          const newFiles = new Map(prevFiles);
          newFiles.delete(fileId);
          console.log(`🗑️ Fichier supprimé de la Map (EDITION): ${fileId}`);
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
        // Générer un ID unique pour éviter les conflits de noms
        const fileId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${file.name}`;

        // Stocker le fichier réel pour l'envoi avec l'ID unique comme clé
        setBentoFiles((prev) => {
          const newFiles = new Map(prev);
          newFiles.set(fileId, file);
          console.log(
            `✅ Added to existing bento: ${file.name} with unique ID: ${fileId}`
          );
          return newFiles;
        });

        // Ajouter l'image pending au bento existant
        setFormData((prev) => {
          const newBento = [...prev.bento];

          // Trouver la dernière ligne ou créer une nouvelle ligne
          if (newBento[bentoIndex].lines.length === 0) {
            newBento[bentoIndex].lines.push({
              format: "1/3 - 2/3",
              listImage: [`pending_${fileId}`],
            });
          } else {
            // Ajouter à la dernière ligne
            const lastLineIndex = newBento[bentoIndex].lines.length - 1;
            newBento[bentoIndex].lines[lastLineIndex].listImage.push(
              `pending_${fileId}`
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
    handleBentoFilesChange: handleBentoFilesChangeEdit, // Utiliser la version édition
    removeExistingBentoImage,
    removeExistingBentoLine,
    addImagesToExistingBento,
    // S'assurer que les fonctions de base sont bien accessibles
    removeBento: baseHandlers.removeBento,
    addBento: baseHandlers.addBento,
    removeBentoImage: baseHandlers.removeBentoImage,
  };
}

// Hook personnalisé pour utiliser les handlers d'édition
export function usePortfolioEditFormHandlers(
  state: EditFormState
): EditFormHandlers {
  return createEditFormHandlers(state);
}
