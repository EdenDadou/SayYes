import { useState, useEffect } from "react";
import {
  usePortfolioFormHandlers,
  initializeFormData,
  type PortfolioFormData,
} from "~/utils/admin/portfolio-form-handlers";
import { usePortfolioEditFormHandlers } from "~/utils/admin/portfolio-edit-handlers";
import { BentoItem, BentoLine } from "~/utils/admin/manage-portfolio-types";

interface UseFormulaireStateProps {
  initialData?: Partial<PortfolioFormData>;
  isEditing: boolean;
  resetTrigger?: number;
}

const EMPTY_FORM_DATA: PortfolioFormData = {
  titre: "",
  categories: [],
  slug: "",
  photoCouverture: "",
  photoCouvertureAlt: "",
  photoMain: "",
  photoMainAlt: "",
  description: "",
  kicker: "",
  livrable: [],
  sousTitre: "",
  topTitle: "",
  couleur: "",
  temoignage: {
    auteur: "",
    contenu: "",
    poste: "",
  },
  bento: [],
  metaTitle: "",
  metaDescription: "",
  metaImage: "",
  schemaOrg: "{}",
};

export function useFormulaireState({
  initialData,
  isEditing,
  resetTrigger,
}: UseFormulaireStateProps) {
  // Form data state
  const [formData, setFormData] = useState<PortfolioFormData>(() =>
    initialData ? initializeFormData(initialData) : EMPTY_FORM_DATA
  );

  // Livrable state
  const [currentLivrable, setCurrentLivrable] = useState("");

  // Bento state
  const [currentBento, setCurrentBento] = useState<BentoItem>({ lines: [] });
  const [currentBentoLine, setCurrentBentoLine] = useState<BentoLine>({
    format: "1/3 - 2/3",
    listImage: [],
    listImageAlt: [],
  });

  // Tab state
  const [activeTab, setActiveTab] = useState<"general" | "seo">("general");

  // Photo previews and files
  const [photoCouverturePreview, setPhotoCouverturePreview] = useState<
    { url: string; name: string }[]
  >(
    initialData?.photoCouverture && initialData.photoCouverture !== ""
      ? [{ url: initialData.photoCouverture, name: "Photo de couverture" }]
      : []
  );
  const [photoMainPreview, setPhotoMainPreview] = useState<
    { url: string; name: string }[]
  >(
    initialData?.photoMain && initialData.photoMain !== ""
      ? [{ url: initialData.photoMain, name: "Photo principale" }]
      : []
  );
  const [photoCouvertureFile, setPhotoCouvertureFile] = useState<
    Map<string, File>
  >(new Map());
  const [photoMainFile, setPhotoMainFile] = useState<Map<string, File>>(
    new Map()
  );

  // Meta image
  const [metaImagePreview, setMetaImagePreview] = useState<
    { url: string; name: string }[]
  >(
    initialData?.metaImage && initialData.metaImage !== ""
      ? [{ url: initialData.metaImage, name: "Meta Image" }]
      : []
  );
  const [metaImageFile, setMetaImageFile] = useState<Map<string, File>>(
    new Map()
  );

  // Bento files
  const [bentoPreviewImages, setBentoPreviewImages] = useState<
    { url: string; name: string }[]
  >([]);
  const [bentoFiles, setBentoFiles] = useState<Map<string, File>>(new Map());

  // Upload state
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  // Reset form function
  const resetForm = () => {
    setFormData(EMPTY_FORM_DATA);
    setCurrentLivrable("");
    setCurrentBento({ lines: [] });
    setCurrentBentoLine({ format: "1/3 - 2/3", listImage: [], listImageAlt: [] });
    setPhotoCouverturePreview([]);
    setPhotoMainPreview([]);
    setPhotoCouvertureFile(new Map());
    setPhotoMainFile(new Map());
    setMetaImagePreview([]);
    setMetaImageFile(new Map());
    setBentoPreviewImages([]);
    setBentoFiles(new Map());
    setIsUploadingFiles(false);
    setUploadProgress(0);
    setUploadedCount(0);
    setTotalFiles(0);
  };

  // Listen for reset trigger
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      resetForm();
    }
  }, [resetTrigger]);

  // Handler state for hooks
  const baseHandlerState = {
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
  };

  // Use appropriate handlers based on mode
  const handlers = isEditing
    ? usePortfolioEditFormHandlers({
        ...baseHandlerState,
        bentoFiles,
        setBentoFiles,
      })
    : usePortfolioFormHandlers(baseHandlerState);

  // Meta image handlers
  const handleMetaImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setMetaImagePreview([{ url, name: file.name }]);
      setMetaImageFile(new Map([[file.name, file]]));
      setFormData((prev) => ({
        ...prev,
        metaImage: `pending_${file.name}`,
      }));
    }
  };

  const removeMetaImagePreview = () => {
    metaImagePreview.forEach((preview) => URL.revokeObjectURL(preview.url));
    setMetaImagePreview([]);
    setMetaImageFile(new Map());
    setFormData((prev) => ({ ...prev, metaImage: "" }));
  };

  return {
    // Form data
    formData,
    setFormData,

    // Livrable
    currentLivrable,
    setCurrentLivrable,

    // Bento
    currentBento,
    setCurrentBento,
    currentBentoLine,
    setCurrentBentoLine,

    // Tab
    activeTab,
    setActiveTab,

    // Photo previews
    photoCouverturePreview,
    photoMainPreview,

    // Photo files
    photoCouvertureFile,
    photoMainFile,

    // Meta image
    metaImagePreview,
    metaImageFile,
    handleMetaImageChange,
    removeMetaImagePreview,

    // Bento files
    bentoPreviewImages,
    bentoFiles,

    // Upload state
    isUploadingFiles,
    uploadProgress,
    uploadedCount,
    totalFiles,

    // Functions
    resetForm,
    handlers,
  };
}
