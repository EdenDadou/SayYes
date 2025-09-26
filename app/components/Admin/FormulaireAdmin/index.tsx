import { useState, useEffect } from "react";
import {
  usePortfolioFormHandlers,
  initializeFormData,
  type PortfolioFormData,
  type BentoItem,
  type BentoLine,
  BENTO_FORMATS,
} from "~/utils/admin/portfolio-form-handlers";
import { DeleteIcon } from "~/components/icons";
import InputAdmin, { InputGroup } from "~/components/Admin/InputAdmin";

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

  // États pour les aperçus et uploads
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.photoCouverture || null
  );
  const [photoMainPreview, setPhotoMainPreview] = useState<string | null>(
    initialData?.photoMain || null
  );
  const [photoMainFile, setPhotoMainFile] = useState<File | null>(null);
  const [bentoPreviewImages, setBentoPreviewImages] = useState<
    { url: string; name: string }[]
  >([]);
  const [bentoFiles, setBentoFiles] = useState<Map<string, File>>(new Map());
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  // Utiliser les handlers du portfolio-form-handlers
  const handlers = usePortfolioFormHandlers({
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
        {formData.categories.map((category, index) => (
          <input key={index} type="hidden" name="categories" value={category} />
        ))}

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
                        ({line.listImage.length} médias)
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
                    options={BENTO_FORMATS.map((format) => ({
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
                      label="Images, GIFs et Vidéos"
                      accept="image/*,video/*"
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
                    médias)
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
                    <button
                      type="button"
                      onClick={() => removeBento(bentoIndex)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <DeleteIcon />
                    </button>
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
                              ({line.listImage.length} médias)
                            </span>
                          </div>
                        </div>

                        {/* Affichage simple des noms de fichiers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {line.listImage.map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="text-xs text-gray-300 bg-gray-600/30 p-2 rounded truncate"
                              style={{ fontFamily: "Jakarta" }}
                            >
                              📎{" "}
                              {image.startsWith("pending_")
                                ? image.replace("pending_", "")
                                : image.split("/").pop()}
                            </div>
                          ))}
                        </div>
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
      </fetcher.Form>
    </div>
  );
}
