import { useState, useEffect, useRef } from "react";
import {
  usePortfolioFormHandlers,
  type PortfolioFormData,
  type BentoItem,
  type BentoLine,
  BENTO_FORMATS,
} from "~/utils/admin/portfolio-form-handlers";
import {
  usePortfolioEditFormHandlers,
  initializeFormData,
} from "~/utils/admin/portfolio-edit-handlers";
import { DeleteIcon } from "~/components/icons";
import InputAdmin, {
  InputGroup,
  type FilePreview,
  type SelectOption,
} from "~/components/Admin/InputAdmin";

interface FormulaireAdminProps {
  onSubmit?: (formData: FormData) => Promise<void>;
  actionData?: any;
  initialData?: Partial<PortfolioFormData>;
  submitButtonText?: string;
  isEditing?: boolean;
  onDelete?: () => void;
  showDeleteButton?: boolean;
  portfolioSlug?: string;
  resetTrigger?: number; // Nouveau prop pour déclencher le reset
  fetcher?: any; // Fetcher pour la soumission sans rechargement
}

export default function FormulaireAdmin({
  onSubmit,
  actionData,
  initialData,
  submitButtonText = "Créer le Projet",
  isEditing = false,
  onDelete,
  showDeleteButton = false,
  portfolioSlug,
  resetTrigger,
  fetcher,
}: FormulaireAdminProps) {
  // États pour le formulaire
  const [formData, setFormData] = useState<PortfolioFormData>({
    titre: initialData?.titre || "",
    categories: initialData?.categories || [],
    slug: initialData?.slug || "",
    photoCouverture: initialData?.photoCouverture || "",
    photoMain: initialData?.photoMain || "",
    description: initialData?.description || "",
    kicker: initialData?.kicker || "",
    livrable: initialData?.livrable || [],
    sousTitre: initialData?.sousTitre || "",
    topTitle: initialData?.topTitle || "",
    couleur: initialData?.couleur || "",
    temoignage: {
      auteur: initialData?.temoignage?.auteur || "",
      contenu: initialData?.temoignage?.contenu || "",
      poste: initialData?.temoignage?.poste || "",
    },
    bento: initialData?.bento || [],
  });

  const [currentLivrable, setCurrentLivrable] = useState("");
  const [currentBento, setCurrentBento] = useState<BentoItem>({
    lines: [],
  });
  const [currentBentoLine, setCurrentBentoLine] = useState<BentoLine>({
    format: "1/3 - 2/3",
    listImage: [],
  });

  // Debug: Log l'état de currentBentoLine à chaque changement
  useEffect(() => {
    console.log("currentBentoLine mis à jour:", currentBentoLine);
  }, [currentBentoLine]);

  // États pour la gestion des uploads
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [photoMainPreview, setPhotoMainPreview] = useState<string | null>(null);
  const [photoMainFile, setPhotoMainFile] = useState<File | null>(null);
  const [bentoPreviewImages, setBentoPreviewImages] = useState<
    { url: string; name: string }[]
  >([]);
  const [bentoFiles, setBentoFiles] = useState<Map<string, File>>(new Map());
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  // Référence synchrone pour les fichiers bento (évite les problèmes de timing)
  const bentoFilesRef = useRef<Map<string, File>>(new Map());

  // Options pour les formats de bento
  const bentoFormats = BENTO_FORMATS;

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      titre: "",
      categories: [],
      slug: "",
      photoCouverture: "",
      photoMain: "",
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
    });
    setCurrentLivrable("");
    setCurrentBento({ lines: [] });
    setCurrentBentoLine({ format: "1/3 - 2/3", listImage: [] });
    setPreviewImage(null);
    setPhotoMainPreview(null);
    setPhotoMainFile(null);
    setBentoPreviewImages([]);
    setBentoFiles(new Map());
  };

  // Écouter le trigger de reset depuis le parent
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      resetForm();
    }
  }, [resetTrigger]);

  // Mise à jour du formulaire quand les données initiales changent (mode édition)
  useEffect(() => {
    if (initialData && isEditing && !isDataLoaded) {
      const newFormData = initializeFormData(initialData);
      setFormData(newFormData);
      setPreviewImage(initialData.photoCouverture || null);
      setPhotoMainPreview(initialData.photoMain || null);
      setIsDataLoaded(true);
    }
  }, [initialData, isEditing, isDataLoaded]);

  // Utiliser les handlers centralisés selon le mode
  console.log("Mode formulaire:", isEditing ? "ÉDITION" : "CRÉATION");
  const handlers = isEditing
    ? usePortfolioEditFormHandlers({
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
        setIsUploadingFiles,
        setUploadProgress,
        setUploadedCount,
        setTotalFiles,
        bentoFiles,
      })
    : usePortfolioFormHandlers({
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
        setIsUploadingFiles,
        setUploadProgress,
        setUploadedCount,
        setTotalFiles,
      });

  const {
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
  } = handlers;

  // Handlers spécifiques au mode édition
  const removeExistingBentoImage = isEditing
    ? (handlers as any).removeExistingBentoImage
    : undefined;
  const removeExistingBentoLine = isEditing
    ? (handlers as any).removeExistingBentoLine
    : undefined;
  const addImagesToExistingBento = isEditing
    ? (handlers as any).addImagesToExistingBento
    : undefined;

  // Fonction de soumission personnalisée pour gérer les fichiers bento
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const submitFormData = new FormData(form);

    // Ajouter le fichier photo main s'il existe
    if (photoMainFile) {
      submitFormData.append("photoMainFile", photoMainFile);
    }

    // CORRECTION TIMING: Utiliser une référence synchrone pour éviter les problèmes de timing
    // Récupérer les fichiers bento directement depuis les inputs du formulaire comme fallback

    // Créer une Map combinée avec les fichiers de bentoFiles + fallback depuis les inputs du formulaire
    const allBentoFiles = new Map(bentoFiles);

    // Fallback: récupérer les fichiers depuis les inputs du formulaire si bentoFiles est vide
    if (allBentoFiles.size === 0) {
      console.log(
        "⚠️ bentoFiles Map is empty, trying fallback from form inputs"
      );
      const inputs = form.querySelectorAll(
        'input[type="file"][accept*="image"]'
      ) as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        if (input.files) {
          Array.from(input.files).forEach((file) => {
            if (file.type.startsWith("image/")) {
              allBentoFiles.set(file.name, file);
              console.log(`📁 Fallback: Added file ${file.name} from input`);
            }
          });
        }
      });
    }

    // Ajouter les fichiers bento avec les noms corrects
    if (isEditing) {
      // Mode édition: utiliser Map pour les fichiers bento
      formData.bento.forEach((bento, bentoIndex) => {
        let bentoImageIndex = 0;
        bento.lines.forEach((line, lineIndex) => {
          line.listImage.forEach((image, imageIndex) => {
            if (image.startsWith("pending_")) {
              const fileName = image.replace("pending_", "");
              const file = allBentoFiles.get(fileName);
              console.log(
                `🔍 Debug - Looking for file: ${fileName}, found:`,
                file ? "YES" : "NO"
              );
              if (file) {
                submitFormData.append(
                  `bentoFile_${bentoIndex}_${bentoImageIndex}`,
                  file
                );
                console.log(
                  `✅ Added bentoFile_${bentoIndex}_${bentoImageIndex}`
                );
                bentoImageIndex++;
              } else {
                console.warn(
                  `⚠️ File not found in allBentoFiles Map: ${fileName}`
                );
              }
            }
          });
        });
      });

      // Champs cachés pour l'édition
      submitFormData.set("photoCouvertureUrl", formData.photoCouverture);
      submitFormData.set("photoMainUrl", formData.photoMain);
    } else {
      // Mode création: utiliser Map pour les fichiers bento
      let globalImageIndex = 0;
      formData.bento.forEach((bento, bentoIndex) => {
        bento.lines.forEach((line, lineIndex) => {
          line.listImage.forEach((image, imageIndex) => {
            if (image.startsWith("pending_")) {
              const fileName = image.replace("pending_", "");
              const file = allBentoFiles.get(fileName);
              console.log(
                `🔍 Debug - Looking for file: ${fileName}, found:`,
                file ? "YES" : "NO"
              );
              if (file) {
                submitFormData.append(
                  `bentoFile_${bentoIndex}_${globalImageIndex}`,
                  file
                );
                console.log(
                  `✅ Added bentoFile_${bentoIndex}_${globalImageIndex}`
                );
                globalImageIndex++;
              } else {
                console.warn(
                  `⚠️ File not found in allBentoFiles Map: ${fileName}`
                );
              }
            }
          });
        });
      });
    }

    // Si fetcher est fourni, utiliser fetcher.submit
    if (fetcher) {
      e.preventDefault();
      fetcher.submit(e.currentTarget, { method: "POST" });
      return;
    }

    // Appeler la fonction onSubmit si fournie, sinon utiliser la soumission par défaut
    if (onSubmit) {
      await onSubmit(submitFormData);
    } else {
      // Soumission par défaut : laisser Remix gérer la soumission
      // Le formulaire HTML se soumettra automatiquement à l'action
      const form = e.currentTarget;
      form.submit();
    }
  };

  return (
    <div>
      {/* Messages de feedback */}
      {actionData?.success && "message" in actionData && (
        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg">
          <p className="text-green-300" style={{ fontFamily: "Jakarta" }}>
            {actionData.message}
          </p>
        </div>
      )}

      {actionData && !actionData.success && "error" in actionData && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
          <p className="text-red-300" style={{ fontFamily: "Jakarta" }}>
            {actionData.error}
          </p>
        </div>
      )}

      {/* Indicateur de chargement pour le mode édition */}
      {isEditing && !isDataLoaded && (
        <div className="mb-6 p-4 bg-blue-900/50 border border-blue-700 rounded-lg flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300 mr-2"></div>
          <p className="text-blue-300" style={{ fontFamily: "Jakarta" }}>
            Chargement des données du portfolio...
          </p>
        </div>
      )}

      {/* Formulaire principal */}
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        encType="multipart/form-data"
      >
        <input
          type="hidden"
          name="bento"
          value={JSON.stringify(formData.bento)}
        />
        {formData.categories.map((category, index) => (
          <input key={index} type="hidden" name="categories" value={category} />
        ))}

        {/* Champs cachés pour les URLs actuelles (mode édition) */}
        {isEditing && (
          <>
            <input
              type="hidden"
              name="photoCouvertureUrl"
              value={formData.photoCouverture}
            />
            <input
              type="hidden"
              name="photoMainUrl"
              value={formData.photoMain}
            />
          </>
        )}

        <InputGroup title="Informations générales">
          {/* Top Title */}
          <div className="lg:col-span-2">
            <InputAdmin
              type="text"
              id="topTitle"
              name="topTitle"
              label="Top Title"
              placeholder="Top title"
              value={formData.topTitle}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "topTitle", value },
                } as any)
              }
            />
          </div>

          {/* Titre */}
          <div className="lg:col-span-2">
            <InputAdmin
              type="text"
              id="titre"
              name="titre"
              label="Titre"
              placeholder="Titre du projet"
              value={formData.titre}
              onChange={(value) =>
                handleInputChange({ target: { name: "titre", value } } as any)
              }
              required
            />
          </div>

          {/* Catégories */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-jakarta-medium text-gray-300 mb-2">
              Catégories
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Identité visuelle",
                "Print",
                "Digital",
                "Event",
                "Facilitation graphique",
                "Motion Design",
              ].map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...formData.categories, category]
                        : formData.categories.filter((c) => c !== category);
                      setFormData((prev) => ({
                        ...prev,
                        categories: newCategories,
                      }));
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-300 font-jakarta-regular">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Couleur */}
          <div className="lg:col-span-2">
            <InputAdmin
              type="color"
              id="couleur"
              name="couleur"
              label="Couleur"
              placeholder="Couleur principale (ex: #FF5733)"
              value={formData.couleur}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, couleur: value as string }))
              }
            />
          </div>

          {/* Slug */}
          <div className="lg:col-span-2">
            <InputAdmin
              type="text"
              id="slug"
              name="slug"
              label="Slug (URL-friendly, ex: mon-projet-web)"
              placeholder="mon-projet-web"
              value={formData.slug}
              onChange={(value) =>
                handleInputChange({ target: { name: "slug", value } } as any)
              }
              pattern="[a-z0-9-]+"
              title="Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets"
              required
            />
          </div>

          {/* Photo de couverture */}
          <div className="lg:col-span-2">
            <InputAdmin
              type="file"
              id="photoCouvertureFile"
              name="photoCouvertureFile"
              label="Photo de couverture"
              accept="image/*"
              onChange={(value) => {
                if (value instanceof File) {
                  // Créer un événement simulé pour le handler existant
                  const fakeEvent = {
                    target: { files: [value] },
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  handleFileChange(fakeEvent);
                }
              }}
              previews={
                previewImage ? [{ url: previewImage, name: "Aperçu" }] : []
              }
              required={!isEditing}
            />
          </div>

          {/* Photo Main */}
          <div className="lg:col-span-2">
            <InputAdmin
              type="file"
              id="photoMainFile"
              name="photoMainFile"
              label="Photo Main"
              accept="image/*"
              onChange={(value) => {
                if (value instanceof File) {
                  // Créer un événement simulé pour le handler existant
                  const fakeEvent = {
                    target: { files: [value] },
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  handlePhotoMainChange(fakeEvent);
                }
              }}
              previews={
                photoMainPreview
                  ? [{ url: photoMainPreview, name: "Photo Main" }]
                  : []
              }
              required={!isEditing}
            />
          </div>

          {/* Description et Kicker côte à côte */}
          {/* Description */}
          <div className="lg:col-span-1">
            <InputAdmin
              type="textarea"
              id="description"
              name="description"
              label="Description"
              placeholder="Description détaillée du projet"
              value={formData.description}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "description", value },
                } as any)
              }
              rows={4}
              required
            />
          </div>

          {/* Kicker */}
          <div className="lg:col-span-1">
            <InputAdmin
              type="textarea"
              id="kicker"
              name="kicker"
              label="Kicker"
              placeholder="Texte d'accroche"
              value={formData.kicker}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "kicker", value },
                } as any)
              }
              rows={4}
            />

            {/* Aide pour le formatage */}
            <div className="mt-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
              <p
                className="text-sm text-blue-300"
                style={{ fontFamily: "Jakarta" }}
              >
                💡 <strong>Aide au formatage :</strong>
              </p>
              <ul
                className="text-xs text-blue-200 mt-1 space-y-1"
                style={{ fontFamily: "Jakarta" }}
              >
                <li>
                  • Pour mettre un texte en gras, ajouter la balise{" "}
                  <code className="bg-blue-800/30 px-1 rounded">
                    &lt;b&gt;&lt;/b&gt;
                  </code>{" "}
                  autour du texte
                </li>
                <li>
                  • Pour faire un retour à la ligne, mettre une balise{" "}
                  <code className="bg-blue-800/30 px-1 rounded">
                    &lt;br/&gt;
                  </code>
                </li>
              </ul>
            </div>
          </div>
        </InputGroup>

        {/* Section Livrables */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
          <h2
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "Jakarta Bold" }}
          >
            Livrables
          </h2>

          <div className="space-y-4">
            {/* Ajouter un livrable */}
            <div className="flex gap-3">
              <input
                type="text"
                value={currentLivrable}
                onChange={(e) => setCurrentLivrable(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ fontFamily: "Jakarta" }}
                placeholder="Nom du livrable"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addLivrable())
                }
              />
              <button
                type="button"
                onClick={addLivrable}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                style={{ fontFamily: "Jakarta Semi Bold" }}
              >
                Ajouter
              </button>
            </div>

            {/* Liste des livrables */}
            {formData.livrable.length > 0 && (
              <div className="space-y-2">
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "Jakarta Semi Bold" }}
                >
                  Livrables ajoutés :
                </h3>
                {formData.livrable.map((livrable, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-800/30 p-3 rounded-lg"
                  >
                    <span
                      className="text-white"
                      style={{ fontFamily: "Jakarta" }}
                    >
                      {livrable}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLivrable(index)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
                {/* Inputs cachés pour les livrables */}
                {formData.livrable.map((livrable, index) => (
                  <input
                    key={index}
                    type="hidden"
                    name="livrable"
                    value={livrable}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sous-titre */}
        <InputGroup title="Sous-titre">
          <div className="lg:col-span-2">
            <InputAdmin
              type="text"
              id="sousTitre"
              name="sousTitre"
              label="Sous-titre"
              placeholder="Sous-titre  ( juste avant le bento )"
              value={formData.sousTitre}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "sousTitre", value },
                } as any)
              }
            />
          </div>
        </InputGroup>

        {/* Section Témoignage */}
        <InputGroup title="Témoignage">
          {/* Auteur */}
          <InputAdmin
            type="text"
            id="temoignageAuteur"
            name="temoignageAuteur"
            label="Auteur"
            placeholder="Nom de l'auteur du témoignage"
            value={formData.temoignage.auteur}
            onChange={(value) =>
              handleTemoignageChange("auteur", value as string)
            }
            required
          />

          {/* Poste */}
          <InputAdmin
            type="text"
            id="temoignagePoste"
            name="temoignagePoste"
            label="Poste"
            placeholder="Poste de l'auteur"
            value={formData.temoignage.poste || ""}
            onChange={(value) =>
              handleTemoignageChange("poste", value as string)
            }
          />

          {/* Contenu */}
          <div className="lg:col-span-2">
            <InputAdmin
              type="textarea"
              id="temoignageContenu"
              name="temoignageContenu"
              label="Contenu du témoignage"
              placeholder="Contenu du témoignage"
              value={formData.temoignage.contenu}
              onChange={(value) =>
                handleTemoignageChange("contenu", value as string)
              }
              rows={4}
              required
            />
          </div>
        </InputGroup>

        {/* Section Bento */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
          <h2
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "Jakarta Bold" }}
          >
            Configuration Bento
          </h2>

          {/* Ajouter un nouveau bento */}
          <div className="space-y-6 mb-8 p-6 bg-gray-800/30 rounded-lg">
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Nouveau Bento ({currentBento.lines.length}/10 lignes)
            </h3>

            {/* Affichage des lignes existantes */}
            {currentBento.lines.length > 0 && (
              <div className="space-y-3 mb-6">
                <h4
                  className="text-md font-medium text-gray-300"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Lignes configurées :
                </h4>
                {currentBento.lines.map((line, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 p-3 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <span
                        className="text-white font-medium"
                        style={{ fontFamily: "Jakarta Medium" }}
                      >
                        Ligne {index + 1}: {line.format}
                      </span>
                      <span
                        className="text-gray-400 ml-2"
                        style={{ fontFamily: "Jakarta" }}
                      >
                        ({line.listImage.length} images)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBentoLine(index)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <DeleteIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Ajouter une nouvelle ligne */}
            {currentBento.lines.length < 10 && (
              <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-600">
                <h4
                  className="text-md font-medium text-white mb-4"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Nouvelle ligne {currentBento.lines.length + 1}
                </h4>

                {/* Format de la ligne */}
                <div className="mb-4">
                  <InputAdmin
                    type="select"
                    label="Format"
                    value={currentBentoLine.format}
                    onChange={(value) =>
                      setCurrentBentoLine((prev) => ({
                        ...prev,
                        format: value as any,
                      }))
                    }
                    options={bentoFormats.map((format) => ({
                      value: format,
                      label: format,
                    }))}
                  />
                </div>

                {/* Images de la ligne */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <InputAdmin
                      type="file-multiple"
                      label="Images et GIFs"
                      accept="image/*,.gif"
                      onChange={(value) => {
                        console.log("InputAdmin onChange appelé avec:", value);
                        console.log(
                          "Type de value:",
                          typeof value,
                          Array.isArray(value)
                        );
                        if (value) {
                          console.log("Contenu de value:", value);
                          if (Array.isArray(value)) {
                            console.log("Nombre de fichiers:", value.length);
                            value.forEach((file, index) => {
                              if (file instanceof File) {
                                console.log(
                                  `Fichier ${index}:`,
                                  file instanceof File,
                                  file.name,
                                  file.type
                                );
                              } else {
                                console.log(
                                  `Fichier ${index}:`,
                                  typeof file,
                                  file
                                );
                              }
                            });
                          }
                        }

                        if (
                          Array.isArray(value) &&
                          value.every((v) => v instanceof File)
                        ) {
                          console.log("Création de la FileList simulée...");
                          // Créer une FileList simulée à partir de l'array
                          const fileList = {
                            length: value.length,
                            item: (index: number) => value[index] || null,
                            [Symbol.iterator]: function* () {
                              for (let i = 0; i < value.length; i++) {
                                yield value[i];
                              }
                            },
                          } as FileList;

                          // Ajouter les fichiers comme propriétés indexées
                          value.forEach((file, index) => {
                            (fileList as any)[index] = file;
                          });

                          console.log("FileList créée:", fileList);
                          // Créer un événement simulé avec une vraie FileList
                          const fakeEvent = {
                            target: { files: fileList },
                          } as unknown as React.ChangeEvent<HTMLInputElement>;
                          console.log(
                            "Appel de handleBentoFilesChange avec:",
                            fakeEvent
                          );
                          handleBentoFilesChange(fakeEvent);
                        } else {
                          console.log(
                            "Condition non remplie pour handleBentoFilesChange"
                          );
                        }
                      }}
                      previews={bentoPreviewImages}
                      onRemovePreview={removeBentoImage}
                      required
                    />

                    {/* Barre de progression */}
                    {isUploadingFiles && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-blue-400 text-sm font-medium"
                            style={{ fontFamily: "Jakarta Medium" }}
                          >
                            Chargement des fichiers...
                          </span>
                          <span
                            className="text-gray-300 text-sm"
                            style={{ fontFamily: "Jakarta" }}
                          >
                            {uploadedCount}/{totalFiles}
                          </span>
                        </div>

                        {/* Barre de progression */}
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>

                        {/* Pourcentage */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            <span
                              className="text-gray-400 text-xs"
                              style={{ fontFamily: "Jakarta" }}
                            >
                              Traitement en cours...
                            </span>
                          </div>
                          <span
                            className="text-blue-400 text-sm font-bold"
                            style={{ fontFamily: "Jakarta Bold" }}
                          >
                            {uploadProgress}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Liste textuelle des images */}
                  {currentBentoLine.listImage.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h5
                        className="text-sm font-medium text-gray-300"
                        style={{ fontFamily: "Jakarta Medium" }}
                      >
                        Fichiers sélectionnés :
                      </h5>
                      {currentBentoLine.listImage.map((image, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-600/30 p-2 rounded"
                        >
                          <span
                            className="text-white text-sm truncate"
                            style={{ fontFamily: "Jakarta" }}
                          >
                            📎 {image}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeBentoImage(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200 ml-2"
                          >
                            <DeleteIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      console.log(
                        "Bouton cliqué - currentBentoLine.listImage:",
                        currentBentoLine.listImage
                      );
                      addBentoLine();
                    }}
                    disabled={currentBentoLine.listImage.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                    style={{ fontFamily: "Jakarta Semi Bold" }}
                  >
                    Ajouter cette ligne ({currentBentoLine.listImage.length}{" "}
                    images)
                  </button>
                </div>
              </div>
            )}

            {currentBento.lines.length >= 10 && (
              <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                <p
                  className="text-yellow-300 text-sm"
                  style={{ fontFamily: "Jakarta" }}
                >
                  ⚠️ Limite atteinte : Maximum 10 lignes par bento
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={addBento}
              disabled={currentBento.lines.length === 0}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Finaliser ce Bento
            </button>
          </div>

          {/* Liste des bentos créés */}
          {formData.bento.length > 0 && (
            <div className="space-y-4">
              <h3
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "Jakarta Semi Bold" }}
              >
                Bentos configurés :
              </h3>
              {formData.bento.map((bento, bentoIndex) => (
                <div key={bentoIndex} className="bg-gray-800/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span
                        className="text-white font-semibold"
                        style={{ fontFamily: "Jakarta Semi Bold" }}
                      >
                        Bento {bentoIndex + 1}
                      </span>
                      <span
                        className="text-gray-400 ml-3"
                        style={{ fontFamily: "Jakarta" }}
                      >
                        ({bento.lines.length} lignes)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Bouton pour ajouter des images à ce bento (mode édition) */}
                      {isEditing && addImagesToExistingBento && (
                        <label className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 cursor-pointer text-sm">
                          + Images
                          <input
                            type="file"
                            multiple
                            accept="image/*,.gif"
                            onChange={(e) =>
                              e.target.files &&
                              addImagesToExistingBento(
                                bentoIndex,
                                e.target.files,
                                e.target
                              )
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                      <button
                        type="button"
                        onClick={() => removeBento(bentoIndex)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>

                  {/* Affichage des lignes du bento avec possibilité de modification en mode édition */}
                  <div className="space-y-3">
                    {bento.lines.map((line, lineIndex) => (
                      <div
                        key={lineIndex}
                        className="bg-gray-700/20 p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span
                              className="text-white font-medium"
                              style={{ fontFamily: "Jakarta Medium" }}
                            >
                              Ligne {lineIndex + 1}: {line.format}
                            </span>
                            <span
                              className="text-gray-400 ml-2"
                              style={{ fontFamily: "Jakarta" }}
                            >
                              ({line.listImage.length} images)
                            </span>
                          </div>
                          {isEditing && removeExistingBentoLine && (
                            <button
                              type="button"
                              onClick={() =>
                                removeExistingBentoLine(bentoIndex, lineIndex)
                              }
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                              title="Supprimer cette ligne"
                            >
                              <DeleteIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {isEditing ? (
                          /* Grille des images avec possibilité de suppression individuelle */
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {line.listImage.map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="relative group bg-gray-600/30 rounded-lg overflow-hidden"
                              >
                                {/* Affichage de l'image ou du nom du fichier */}
                                {image.startsWith("pending_") ? (
                                  <div className="aspect-square bg-gray-700 flex items-center justify-center p-2">
                                    <span className="text-xs text-gray-300 text-center break-all">
                                      📎 {image.replace("pending_", "")}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="aspect-square">
                                    <img
                                      src={image}
                                      alt={`Image ${imgIndex + 1}`}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        // Si l'image ne charge pas, afficher le nom du fichier
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        const parent = target.parentElement;
                                        if (parent) {
                                          parent.innerHTML = `<div class="w-full h-full bg-gray-700 flex items-center justify-center p-2"><span class="text-xs text-gray-300 text-center break-all">📎 ${image.split("/").pop()}</span></div>`;
                                        }
                                      }}
                                    />
                                  </div>
                                )}

                                {/* Bouton de suppression */}
                                {removeExistingBentoImage && (
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeExistingBentoImage(
                                          bentoIndex,
                                          lineIndex,
                                          imgIndex
                                        )
                                      }
                                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                      title="Supprimer cette image"
                                    >
                                      <DeleteIcon />
                                    </button>
                                  </div>
                                )}

                                {/* Nom du fichier en bas */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                                  <p className="text-xs text-white truncate">
                                    {image.startsWith("pending_")
                                      ? image.replace("pending_", "")
                                      : image.split("/").pop()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Mode création: affichage simple des noms de fichiers */
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {line.listImage.map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="text-xs text-gray-300 bg-gray-600/30 p-2 rounded truncate"
                                style={{ fontFamily: "Jakarta" }}
                              >
                                {image}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Boutons de soumission */}
        <div className="flex gap-4 justify-end">
          {showDeleteButton && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Supprimer
            </button>
          )}
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            style={{ fontFamily: "Jakarta Semi Bold" }}
          >
            {isEditing ? "Annuler" : "Réinitialiser"}
          </button>
          <button
            type="submit"
            disabled={isUploadingFiles}
            className={`py-3 px-8 rounded-lg font-semibold transition-all duration-200 transform ${
              isUploadingFiles
                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02]"
            }`}
            style={{ fontFamily: "Jakarta Semi Bold" }}
          >
            {isUploadingFiles ? (
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                <span>Chargement... {uploadProgress}%</span>
                {totalFiles > 0 && (
                  <span className="text-xs opacity-75">
                    ({uploadedCount}/{totalFiles})
                  </span>
                )}
              </div>
            ) : (
              submitButtonText
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
