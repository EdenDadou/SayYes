import { BentoItem, BentoLine } from "./manage-portfolio-types";

// Types répliqués pour éviter l'import de modules serveur
export interface PortfolioFormData {
  titre: string;
  categories: string[];
  slug: string;
  photoCouverture: string;
  photoMain: string;
  description: string;
  kicker: string;
  livrable: string[];
  sousTitre: string;
  topTitle: string;
  couleur: string;
  temoignage: {
    auteur: string;
    contenu: string;
    poste?: string;
  };
  bento: BentoItem[];
}

// Fonction utilitaire pour parser les champs JSON (client-safe)
function parseJsonField<T>(field: any, defaultValue: T): T {
  if (!field) return defaultValue;
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch {
      return defaultValue;
    }
  }
  return field;
}

// Fonction d'initialisation des données de formulaire (client-safe)
export function initializeFormData(portfolio: any): PortfolioFormData {
  return {
    titre: portfolio.titre || "",
    categories: parseJsonField(portfolio.categories, []),
    slug: portfolio.slug || "",
    photoCouverture: portfolio.photoCouverture || "",
    photoMain: portfolio.photoMain || "",
    description: portfolio.description || "",
    kicker: portfolio.kicker || "",
    livrable: parseJsonField(portfolio.livrable, []),
    sousTitre: portfolio.sousTitre || "",
    topTitle: portfolio.topTitle || "",
    couleur: portfolio.couleur || "",
    temoignage: parseJsonField(portfolio.temoignage, {
      auteur: "",
      contenu: "",
      poste: "",
    }),
    bento: parseJsonField(portfolio.bento, []),
  };
}

// Types pour les handlers de formulaire
export interface FormHandlers {
  // Handlers de base
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTemoignageChange: (field: string, value: string) => void;

  // Handlers pour les livrables
  addLivrable: () => void;
  removeLivrable: (index: number) => void;

  // Handlers pour la photo main
  handlePhotoMainChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Handlers pour les aperçus de photos principales
  removePhotoCouverturePreview: () => void;
  removePhotoMainPreview: () => void;

  // Handlers pour les bentos
  handleBentoFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addBentoLine: () => void;
  removeBentoLine: (index: number) => void;
  addBento: () => void;
  removeBento: (index: number) => void;
  removeBentoImage: (index: number) => void;
}

// Interface pour les états nécessaires aux handlers
export interface FormState {
  formData: PortfolioFormData;
  setFormData: React.Dispatch<React.SetStateAction<PortfolioFormData>>;
  currentLivrable: string;
  setCurrentLivrable: React.Dispatch<React.SetStateAction<string>>;
  currentBento: BentoItem;
  setCurrentBento: React.Dispatch<React.SetStateAction<BentoItem>>;
  currentBentoLine: BentoLine;
  setCurrentBentoLine: React.Dispatch<React.SetStateAction<BentoLine>>;
  setPhotoCouverturePreview: React.Dispatch<
    React.SetStateAction<{ url: string; name: string }[]>
  >;
  setPhotoMainPreview: React.Dispatch<
    React.SetStateAction<{ url: string; name: string }[]>
  >;
  setPhotoCouvertureFile: React.Dispatch<
    React.SetStateAction<Map<string, File>>
  >;
  setPhotoMainFile: React.Dispatch<React.SetStateAction<Map<string, File>>>;
  setBentoPreviewImages: React.Dispatch<
    React.SetStateAction<{ url: string; name: string }[]>
  >;
  setBentoFiles: React.Dispatch<React.SetStateAction<Map<string, File>>>;
  setIsUploadingFiles: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  setUploadedCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalFiles: React.Dispatch<React.SetStateAction<number>>;
}

// Fonction factory pour créer les handlers
export function createFormHandlers(state: FormState): FormHandlers {
  const {
    formData,
    setFormData,
    currentLivrable,
    setCurrentLivrable,
    currentBento,
    setCurrentBento,
    currentBentoLine,
    setCurrentBentoLine,
    setPhotoCouverturePreview,
    setPhotoMainPreview,
    setPhotoCouvertureFile,
    setPhotoMainFile,
    setBentoPreviewImages,
    setBentoFiles,
    setIsUploadingFiles,
    setUploadProgress,
    setUploadedCount,
    setTotalFiles,
  } = state;

  // Gestion des changements dans le formulaire
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion de l'upload de fichier pour la photo de couverture - même technique que bento
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // Une seule photo de couverture
    if (file && file.type.startsWith("image/")) {
      console.log("🔍 handleFileChange appelé avec:", file.name);

      // Stocker le fichier réel pour l'envoi avec Map
      setPhotoCouvertureFile((prev) => {
        const newFiles = new Map(prev);
        newFiles.clear(); // Une seule photo de couverture à la fois
        newFiles.set(file.name, file);
        return newFiles;
      });

      // Créer l'aperçu de manière asynchrone comme les bento
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPhotoCouverturePreview([{ url: imageUrl, name: file.name }]);
        console.log("✅ Photo de couverture chargée:", file.name);
      };

      reader.onerror = () => {
        console.error(
          "❌ Erreur lors du chargement de la photo de couverture:",
          file.name
        );
        setPhotoCouverturePreview([]);
      };

      reader.readAsDataURL(file);

      // Mettre à jour le nom du fichier dans le state
      setFormData((prev) => ({
        ...prev,
        photoCouverture: file.name,
      }));
    }

    // Réinitialiser l'input pour permettre de sélectionner le même fichier si nécessaire
    e.target.value = "";
  };

  // Gestion du témoignage
  const handleTemoignageChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      temoignage: {
        ...prev.temoignage,
        [field]: value,
      },
    }));
  };

  // Gestion des livrables
  const addLivrable = () => {
    if (currentLivrable.trim()) {
      setFormData((prev) => ({
        ...prev,
        livrable: [...prev.livrable, currentLivrable.trim()],
      }));
      setCurrentLivrable("");
    }
  };

  const removeLivrable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      livrable: prev.livrable.filter((_, i) => i !== index),
    }));
  };

  // Gestion de l'upload de fichier pour la photo main - même technique que bento
  const handlePhotoMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // Une seule photo main
    if (file && file.type.startsWith("image/")) {
      console.log("🔍 handlePhotoMainChange appelé avec:", file.name);

      // Stocker le fichier réel pour l'envoi avec Map
      setPhotoMainFile((prev) => {
        const newFiles = new Map(prev);
        newFiles.clear(); // Une seule photo main à la fois
        newFiles.set(file.name, file);
        return newFiles;
      });

      // Créer l'aperçu de manière asynchrone comme les bento
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPhotoMainPreview([{ url: imageUrl, name: file.name }]);
        console.log("✅ Photo main chargée:", file.name);
      };

      reader.onerror = () => {
        console.error(
          "❌ Erreur lors du chargement de la photo main:",
          file.name
        );
        setPhotoMainPreview([]);
      };

      reader.readAsDataURL(file);

      // Mettre à jour le nom du fichier dans le state
      setFormData((prev) => ({
        ...prev,
        photoMain: file.name,
      }));
    }

    // Réinitialiser l'input pour permettre de sélectionner le même fichier si nécessaire
    e.target.value = "";
  };

  // Handlers pour supprimer les aperçus de photos principales
  const removePhotoCouverturePreview = () => {
    setPhotoCouverturePreview([]);
    setPhotoCouvertureFile(new Map());
    setFormData((prev) => ({
      ...prev,
      photoCouverture: "",
    }));
  };

  const removePhotoMainPreview = () => {
    setPhotoMainPreview([]);
    setPhotoMainFile(new Map());
    setFormData((prev) => ({
      ...prev,
      photoMain: "",
    }));
  };

  // Gestion de l'upload de fichiers multiples pour les médias bento (images et vidéos)
  const handleBentoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🔍 handleBentoFilesChange appelé", e.target.files);
    const files = e.target.files;
    if (files) {
      // Activer l'état de chargement
      setIsUploadingFiles(true);

      const validFiles: File[] = [];
      const newPreviews: { url: string; name: string }[] = [];
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
          console.log(`🔍 Previous bentoFiles size: ${prev.size}`);
          validFiles.forEach((file, index) => {
            // Extraire l'ID unique du nom généré
            const fileId = newMediaNames[index].replace("pending_", "");
            newFiles.set(fileId, file);
            console.log(
              `✅ Added to bentoFiles Map: ${file.name} with unique ID: ${fileId}`
            );
          });
          console.log(`🔍 New bentoFiles size: ${newFiles.size}`);
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
                console.log("✅ Tous les fichiers bento sont chargés");
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

  const removeBentoImage = (index: number) => {
    // Récupérer l'image à supprimer pour obtenir son ID unique
    const imageToRemove = currentBentoLine.listImage[index];

    setCurrentBentoLine((prev) => ({
      ...prev,
      listImage: prev.listImage.filter((_, i) => i !== index),
    }));

    // Supprimer aussi l'aperçu et le fichier correspondants
    setBentoPreviewImages((prev) => {
      return prev.filter((_, i) => i !== index);
    });

    // Supprimer le fichier de la Map en utilisant l'ID unique
    if (imageToRemove && imageToRemove.startsWith("pending_")) {
      const fileId = imageToRemove.replace("pending_", "");
      setBentoFiles((prevFiles) => {
        const newFiles = new Map(prevFiles);
        newFiles.delete(fileId);
        console.log(`🗑️ Fichier supprimé de la Map: ${fileId}`);
        return newFiles;
      });
    }
  };

  // Gestion des lignes de bento
  const addBentoLine = () => {
    console.log(
      "addBentoLine appelé, currentBentoLine.listImage:",
      currentBentoLine.listImage
    );
    console.log("currentBento.lines.length:", currentBento.lines.length);
    if (
      currentBentoLine.listImage.length > 0 &&
      currentBento.lines.length < 10
    ) {
      setCurrentBento((prev) => ({
        lines: [...prev.lines, currentBentoLine],
      }));
      setCurrentBentoLine({
        format: "1/3 - 2/3",
        listImage: [],
      });
      setBentoPreviewImages([]);
    }
  };

  const removeBentoLine = (index: number) => {
    setCurrentBento((prev) => ({
      lines: prev.lines.filter((_, i) => i !== index),
    }));
  };

  // Gestion des bentos
  const addBento = () => {
    if (currentBento.lines.length > 0) {
      setFormData((prev) => ({
        ...prev,
        bento: [...prev.bento, currentBento],
      }));
      setCurrentBento({
        lines: [],
      });
      setCurrentBentoLine({
        format: "1/3 - 2/3",
        listImage: [],
      });
      setBentoPreviewImages([]);
    }
  };

  const removeBento = (index: number) => {
    console.log("🗑️ removeBento appelé avec index:", index);
    console.log("🗑️ Nombre de bentos avant:", formData.bento.length);
    setFormData((prev) => {
      const newBento = prev.bento.filter((_, i) => i !== index);
      console.log("🗑️ Nombre de bentos après:", newBento.length);
      return {
        ...prev,
        bento: newBento,
      };
    });
  };

  return {
    handleInputChange,
    handleFileChange,
    handleTemoignageChange,
    addLivrable,
    removeLivrable,
    handlePhotoMainChange,
    removePhotoCouverturePreview,
    removePhotoMainPreview,
    handleBentoFilesChange,
    addBentoLine,
    removeBentoLine,
    addBento,
    removeBento,
    removeBentoImage,
  };
}

// Hook personnalisé pour utiliser les handlers de formulaire
export function usePortfolioFormHandlers(state: FormState): FormHandlers {
  return createFormHandlers(state);
}
