import { useState, useEffect } from "react";
import {
  usePortfolioFormHandlers,
  initializeFormData,
  type PortfolioFormData,
} from "~/utils/admin/portfolio-form-handlers";
import {
  usePortfolioEditFormHandlers,
  type EditFormHandlers,
} from "~/utils/admin/portfolio-edit-handlers";
import { DeleteIcon } from "~/components/icons";
import InputAdmin, { InputGroup } from "~/components/Admin/InputAdmin";
import {
  BENTO_FORMATS,
  BentoItem,
  BentoLine,
} from "~/utils/admin/manage-portfolio-types";

interface FormulaireAdminProps {
  actionData?: any;
  initialData?: Partial<PortfolioFormData>;
  submitButtonText?: string;
  isEditing?: boolean;
  onDelete?: () => void;
  showDeleteButton?: boolean;
  resetTrigger?: number;
  fetcher: any;
}

export default function FormulaireAdmin({
  actionData,
  initialData,
  submitButtonText = "Créer le Projet",
  isEditing = false,
  onDelete,
  showDeleteButton = false,
  resetTrigger,
  fetcher,
}: FormulaireAdminProps) {
  // Initialisation des données du formulaire
  const [formData, setFormData] = useState<PortfolioFormData>(() =>
    initialData
      ? initializeFormData(initialData)
      : {
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
        }
  );

  // États pour la gestion du formulaire
  const [currentLivrable, setCurrentLivrable] = useState("");
  const [currentBento, setCurrentBento] = useState<BentoItem>({ lines: [] });
  const [currentBentoLine, setCurrentBentoLine] = useState<BentoLine>({
    format: "1/3 - 2/3",
    listImage: [],
  });

  // États pour les aperçus et uploads - même technique que les bento
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
  const [bentoPreviewImages, setBentoPreviewImages] = useState<
    { url: string; name: string }[]
  >([]);
  const [bentoFiles, setBentoFiles] = useState<Map<string, File>>(new Map());
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  // Utiliser les handlers appropriés selon le mode
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

  const handlers = isEditing
    ? usePortfolioEditFormHandlers({
        ...baseHandlerState,
        bentoFiles,
        setBentoFiles,
      })
    : usePortfolioFormHandlers(baseHandlerState);

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    const emptyData: PortfolioFormData = {
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
    };
    setFormData(emptyData);
    setCurrentLivrable("");
    setCurrentBento({ lines: [] });
    setCurrentBentoLine({ format: "1/3 - 2/3", listImage: [] });
    setPhotoCouverturePreview([]);
    setPhotoMainPreview([]);
    setPhotoCouvertureFile(new Map());
    setPhotoMainFile(new Map());
    setBentoPreviewImages([]);
    setBentoFiles(new Map());
    setIsUploadingFiles(false);
    setUploadProgress(0);
    setUploadedCount(0);
    setTotalFiles(0);
  };

  // Écouter le trigger de reset depuis le parent
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      resetForm();
    }
  }, [resetTrigger]);

  const {
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
  } = handlers;

  // Fonction pour générer des inputs file pour chaque fichier bento
  const renderBentoFileInputs = () => {
    const inputs: React.ReactElement[] = [];
    let globalFileIndex = 0;

    formData.bento.forEach((bento, bentoIndex) => {
      bento.lines.forEach((line) => {
        line.listImage.forEach((image) => {
          if (image.startsWith("pending_")) {
            const originalName = image.replace("pending_", "");
            const file = bentoFiles.get(originalName);
            const inputName = `bentoFile_${bentoIndex}_${globalFileIndex}`;

            if (file) {
              // Créer un input file caché avec le fichier
              inputs.push(
                <input
                  key={inputName}
                  type="file"
                  name={inputName}
                  style={{ display: "none" }}
                  ref={(input) => {
                    if (input) {
                      // Créer une nouvelle FileList avec notre fichier
                      const dt = new DataTransfer();
                      dt.items.add(file);
                      input.files = dt.files;
                    }
                  }}
                />
              );
            }
            globalFileIndex++;
          }
        });
      });
    });

    return inputs;
  };

  // Fonction pour générer des inputs file pour les photos principales
  const renderMainPhotoFileInputs = () => {
    const inputs: React.ReactElement[] = [];

    // Photo de couverture
    photoCouvertureFile.forEach((file, fileName) => {
      inputs.push(
        <input
          key={`photoCouvertureFile_${fileName}`}
          type="file"
          name="photoCouvertureFile"
          style={{ display: "none" }}
          ref={(input) => {
            if (input) {
              const dt = new DataTransfer();
              dt.items.add(file);
              input.files = dt.files;
            }
          }}
        />
      );
    });

    // Photo main
    photoMainFile.forEach((file, fileName) => {
      inputs.push(
        <input
          key={`photoMainFile_${fileName}`}
          type="file"
          name="photoMainFile"
          style={{ display: "none" }}
          ref={(input) => {
            if (input) {
              const dt = new DataTransfer();
              dt.items.add(file);
              input.files = dt.files;
            }
          }}
        />
      );
    });

    return inputs;
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

      {/* Formulaire principal */}
      <fetcher.Form
        method="post"
        className="space-y-8"
        encType="multipart/form-data"
      >
        <input
          type="hidden"
          name="bento"
          value={JSON.stringify(formData.bento)}
        />
        {/* Inputs file dynamiques pour les fichiers bento */}
        {renderBentoFileInputs()}
        {/* Inputs file dynamiques pour les photos principales */}
        {renderMainPhotoFileInputs()}
        {formData.categories.map((category, index) => (
          <input key={index} type="hidden" name="categories" value={category} />
        ))}

        <InputGroup title="Informations générales">
          {/* Top Title et Titre côte à côte */}
          <div className="lg:col-span-1">
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

          <div className="lg:col-span-1">
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

          {/* Photo de couverture et Photo Main côte à côte */}
          <div className="lg:col-span-1">
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
              previews={photoCouverturePreview}
              onRemovePreview={() => removePhotoCouverturePreview()}
              required={!isEditing}
            />
          </div>

          <div className="lg:col-span-1">
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
              previews={photoMainPreview}
              onRemovePreview={() => removePhotoMainPreview()}
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
              <div className="space-y-3">
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "Jakarta Semi Bold" }}
                >
                  Livrables ajoutés :
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formData.livrable.map((livrable, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-800/30 p-3 rounded-lg"
                    >
                      <span
                        className="text-white truncate mr-2"
                        style={{ fontFamily: "Jakarta" }}
                        title={livrable}
                      >
                        {livrable}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLivrable(index)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200 flex-shrink-0"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}
                </div>
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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🎨</span>
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Jakarta Bold" }}
              >
                Configuration Bento
              </h2>
              <p
                className="text-gray-400 text-sm"
                style={{ fontFamily: "Jakarta" }}
              >
                Créez des grilles visuelles pour organiser vos médias
              </p>
            </div>
          </div>

          {/* Workflow en étapes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Étape 1: Créer les lignes */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "Jakarta Semi Bold" }}
                >
                  Ajouter des lignes
                </h3>
              </div>

              <div className="space-y-4">
                {/* Format selector */}
                <div>
                  <InputAdmin
                    type="select"
                    label="Format de disposition"
                    value={currentBentoLine.format}
                    onChange={(value) =>
                      setCurrentBentoLine((prev) => ({
                        ...prev,
                        format: value as any,
                      }))
                    }
                    options={BENTO_FORMATS.map((format) => ({
                      value: format,
                      label: `📐 ${format}`,
                    }))}
                  />
                </div>

                {/* Upload files */}
                <div>
                  <InputAdmin
                    type="file-multiple"
                    label="📁 Ajouter des médias"
                    accept="image/*,video/*"
                    onChange={(value) => {
                      if (
                        Array.isArray(value) &&
                        value.every((v) => v instanceof File)
                      ) {
                        const fileList = {
                          length: value.length,
                          item: (index: number) => value[index] || null,
                          [Symbol.iterator]: function* () {
                            for (let i = 0; i < value.length; i++) {
                              yield value[i];
                            }
                          },
                        } as FileList;

                        value.forEach((file, index) => {
                          (fileList as any)[index] = file;
                        });

                        const fakeEvent = {
                          target: { files: fileList },
                        } as unknown as React.ChangeEvent<HTMLInputElement>;
                        handleBentoFilesChange(fakeEvent);
                      }
                    }}
                    previews={bentoPreviewImages}
                    onRemovePreview={removeBentoImage}
                  />
                </div>

                {/* Progress bar */}
                {isUploadingFiles && (
                  <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 text-sm font-medium">
                        ⏳ Chargement...
                      </span>
                      <span className="text-gray-300 text-sm">
                        {uploadedCount}/{totalFiles}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Add line button */}
                <button
                  type="button"
                  onClick={addBentoLine}
                  disabled={currentBentoLine.listImage.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                  style={{ fontFamily: "Jakarta Semi Bold" }}
                >
                  ➕ Ajouter cette ligne ({currentBentoLine.listImage.length}{" "}
                  médias)
                </button>
              </div>
            </div>

            {/* Étape 2: Aperçu du bento en cours */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "Jakarta Semi Bold" }}
                >
                  Bento en cours ({currentBento.lines.length}/10)
                </h3>
              </div>

              {currentBento.lines.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {currentBento.lines.map((line, index) => (
                    <div
                      key={index}
                      className="bg-purple-800/20 border border-purple-600/30 p-3 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <span
                            className="text-white font-medium"
                            style={{ fontFamily: "Jakarta Medium" }}
                          >
                            {line.format}
                          </span>
                          <span className="text-purple-300 ml-2 text-sm">
                            {line.listImage.length} médias
                          </span>
                        </div>
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

                  <button
                    type="button"
                    onClick={addBento}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    style={{ fontFamily: "Jakarta Semi Bold" }}
                  >
                    ✅ Finaliser ce Bento
                  </button>
                </div>
              ) : (
                <div className="bg-purple-800/10 border border-purple-600/20 rounded-lg p-8 text-center">
                  <div className="text-purple-400 mb-2">📋</div>
                  <p
                    className="text-purple-300 text-sm"
                    style={{ fontFamily: "Jakarta" }}
                  >
                    Ajoutez des lignes pour commencer votre bento
                  </p>
                </div>
              )}

              {currentBento.lines.length >= 10 && (
                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
                  <p
                    className="text-yellow-300 text-sm flex items-center gap-2"
                    style={{ fontFamily: "Jakarta" }}
                  >
                    ⚠️ Limite atteinte : Maximum 10 lignes par bento
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Étape 3: Bentos finalisés */}
          {formData.bento.length > 0 && (
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "Jakarta Semi Bold" }}
                >
                  Bentos finalisés ({formData.bento.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {formData.bento.map((bento, bentoIndex) => (
                  <div
                    key={bentoIndex}
                    className="bg-green-800/10 border border-green-600/20 rounded-lg p-4"
                  >
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
                        onClick={() => {
                          console.log(
                            "🗑️ Tentative suppression bento",
                            bentoIndex
                          );
                          console.log(
                            "🔍 Handler removeBento existe?",
                            "removeBento" in handlers
                          );
                          console.log(
                            "🔍 Bento avant suppression:",
                            formData.bento.length
                          );
                          removeBento(bentoIndex);
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        title="Supprimer ce bento"
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {bento.lines.map((line, lineIndex) => (
                        <div
                          key={lineIndex}
                          className="bg-green-700/10 border border-green-600/20 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-white font-medium text-sm"
                              style={{ fontFamily: "Jakarta Medium" }}
                            >
                              📐 {line.format}
                            </span>
                            <span className="text-green-300 text-xs">
                              {line.listImage.length} médias
                            </span>
                          </div>

                          {/* Aperçu des médias en grille */}
                          <div className="grid grid-cols-3 gap-1">
                            {line.listImage
                              .slice(0, 6)
                              .map((image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className={`text-xs p-1 rounded text-center truncate relative group ${
                                    isEditing
                                      ? "bg-green-800/20 text-green-200 hover:bg-green-700/30"
                                      : "bg-green-800/20 text-green-200"
                                  }`}
                                  style={{ fontFamily: "Jakarta" }}
                                  title={
                                    image.startsWith("pending_")
                                      ? image.replace("pending_", "")
                                      : image.split("/").pop()
                                  }
                                >
                                  {imgIndex < 5 ? (
                                    <>🖼️ {imgIndex + 1}</>
                                  ) : line.listImage.length > 6 ? (
                                    <>+{line.listImage.length - 5}</>
                                  ) : (
                                    <>🖼️ {imgIndex + 1}</>
                                  )}

                                  {/* Bouton de suppression en mode édition */}
                                  {isEditing && imgIndex < 5 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (
                                          "removeExistingBentoImage" in handlers
                                        ) {
                                          (
                                            handlers as EditFormHandlers
                                          ).removeExistingBentoImage(
                                            bentoIndex,
                                            lineIndex,
                                            imgIndex
                                          );
                                        }
                                      }}
                                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <span className="text-white text-xs">
                                        ×
                                      </span>
                                    </button>
                                  )}
                                </div>
                              ))}
                          </div>

                          {/* Actions pour mode édition */}
                          {isEditing && (
                            <div className="flex gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if ("removeExistingBentoLine" in handlers) {
                                    (
                                      handlers as EditFormHandlers
                                    ).removeExistingBentoLine(
                                      bentoIndex,
                                      lineIndex
                                    );
                                  }
                                }}
                                className="text-xs bg-red-600/20 hover:bg-red-600/30 text-red-300 px-2 py-1 rounded border border-red-600/30"
                              >
                                🗑️ Supprimer ligne
                              </button>
                              <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={(e) => {
                                  if (
                                    e.target.files &&
                                    "addImagesToExistingBento" in handlers
                                  ) {
                                    (
                                      handlers as EditFormHandlers
                                    ).addImagesToExistingBento(
                                      bentoIndex,
                                      e.target.files,
                                      e.target
                                    );
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
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
      </fetcher.Form>
    </div>
  );
}
