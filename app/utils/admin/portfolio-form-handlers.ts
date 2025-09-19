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

export interface BentoItem {
  lines: BentoLine[];
}

export interface BentoLine {
  format: "1/3 - 2/3" | "2/3 - 1/3" | "1/2 - 1/2" | "1/1";
  listImage: string[];
}

// Options pour les formats de bento (répliqué pour éviter l'import de modules serveur)
export const BENTO_FORMATS = [
  "1/3 - 2/3",
  "2/3 - 1/3",
  "3 carrés",
  "banner",
  "2 carré",
  "full",
] as const;

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
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  setPhotoMainPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setPhotoMainFile: React.Dispatch<React.SetStateAction<File | null>>;
  setBentoPreviewImages: React.Dispatch<
    React.SetStateAction<{ url: string; name: string }[]>
  >;
  setBentoFiles: React.Dispatch<React.SetStateAction<Map<string, File>>>;
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
    setPreviewImage,
    setPhotoMainPreview,
    setPhotoMainFile,
    setBentoPreviewImages,
    setBentoFiles,
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

  // Gestion de l'upload de fichier pour la photo de couverture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Mettre à jour le nom du fichier dans le state
      setFormData((prev) => ({
        ...prev,
        photoCouverture: file.name,
      }));
    }
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

  // Gestion de l'upload de fichier pour la photo main
  const handlePhotoMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // Stocker le fichier réel pour l'envoi
      setPhotoMainFile(file);

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoMainPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Mettre à jour le nom du fichier dans le state
      setFormData((prev) => ({
        ...prev,
        photoMain: file.name,
      }));
    }
  };

  // Gestion de l'upload de fichiers multiples pour les images bento
  const handleBentoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleBentoFilesChange appelé", e.target.files);
    const files = e.target.files;
    if (files) {
      const validFiles: File[] = [];
      const newPreviews: { url: string; name: string }[] = [];
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
    setFormData((prev) => ({
      ...prev,
      bento: prev.bento.filter((_, i) => i !== index),
    }));
  };

  return {
    handleInputChange,
    handleFileChange,
    handleTemoignageChange,
    addLivrable,
    removeLivrable,
    handlePhotoMainChange,
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
