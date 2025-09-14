import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useActionData,
  Link,
  useNavigate,
} from "@remix-run/react";
import { useState, useEffect } from "react";
import { requireAuth, getSessionData } from "~/server/auth.server";
import { saveMedia } from "~/server/media.server";
import {
  getPortfolioBySlug,
  updatePortfolioBySlug,
  deletePortfolioBySlug,
  type PortfolioData,
  type PortfolioWithMedia,
} from "~/server/portfolio.server";

// Types pour les données du portfolio
interface BentoLine {
  format: "1/3 - 2/3" | "3 carrés" | "banner" | "2 carré" | "full";
  listImage: string[];
}

interface BentoItem {
  lines: BentoLine[];
}

// Type local pour le formulaire d'édition
interface EditPortfolioFormData {
  titre: string;
  slug: string;
  photoCouverture: string;
  description: string;
  kicker: string;
  livrable: string[];
  sousTitre: string;
  bento: BentoItem[];
}

// Loader pour charger le portfolio à éditer
export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("🚀 LOADER CALLED - manage-portfolio.$slug.tsx");
  console.log("📋 URL:", request.url);
  console.log("📋 Params:", params);

  await requireAuth(request);
  const sessionData = await getSessionData(request);

  const { slug } = params;
  console.log("📋 Extracted slug:", slug);

  if (!slug) {
    console.error("❌ Pas de slug fourni");
    throw new Response("Slug du portfolio requis", { status: 400 });
  }
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    console.log("❌ Portfolio non trouvé");
    throw new Response("Portfolio non trouvé", { status: 404 });
  }
  return { sessionData, portfolio };
}

// Action pour gérer la mise à jour et la suppression
export async function action({ request, params }: ActionFunctionArgs) {
  await requireAuth(request);

  const { slug } = params;
  if (!slug) {
    return Response.json(
      { success: false, error: "Slug du portfolio requis" },
      { status: 400 }
    );
  }

  try {
    if (request.method === "DELETE") {
      await deletePortfolioBySlug(slug);
      return redirect("/admin/manage-portfolio");
    }

    // Traitement des fichiers uploadés pour PUT
    const uploadHandler = unstable_createMemoryUploadHandler({
      maxPartSize: 10 * 1024 * 1024, // 10MB
    });

    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );

    // Gestion de la photo de couverture
    let photoCouverture = formData.get("photoCouvertureUrl") as string;
    const photoCouvertureFile = formData.get(
      "photoCouvertureFile"
    ) as File | null;

    if (photoCouvertureFile && photoCouvertureFile.size > 0) {
      // Récupérer le portfolio pour obtenir l'ID nécessaire pour saveMedia
      const portfolio = await getPortfolioBySlug(slug);
      if (portfolio) {
        const savedMedia = await saveMedia(
          photoCouvertureFile,
          "portfolio",
          portfolio.id
        );
        photoCouverture = savedMedia.url;
      }
    }

    // Récupération des données du formulaire
    const portfolioData: Partial<PortfolioData> = {
      titre: formData.get("titre") as string,
      slug: formData.get("slug") as string,
      photoCouverture: photoCouverture,
      description: formData.get("description") as string,
      kicker: formData.get("kicker") as string,
      livrable: formData.getAll("livrable") as string[],
      sousTitre: formData.get("sousTitre") as string,
      bento: (() => {
        try {
          const bentoData = formData.get("bento") as string;
          return bentoData ? JSON.parse(bentoData) : [];
        } catch (e) {
          console.warn("Error parsing bento data:", e);
          return [];
        }
      })(),
    };

    // Mettre à jour en base de données
    await updatePortfolioBySlug(slug, portfolioData);

    return Response.json({
      success: true,
      message: "Portfolio mis à jour avec succès!",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du portfolio:", error);
    return Response.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour du portfolio",
    });
  }
}

export default function EditPortfolio() {
  console.log("🚀 EditPortfolio component rendering...");

  const { sessionData, portfolio } = useLoaderData<typeof loader>();

  console.log(portfolio);
  console.log("📦 Loader data received:", {
    sessionData: !!sessionData,
    portfolio: !!portfolio,
  });
  console.log("📋 Portfolio details:", portfolio);

  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  console.log("Component - Portfolio reçu:", portfolio);

  // États pour le formulaire - initialisation simple pour éviter les problèmes d'hydratation
  const [formData, setFormData] = useState<EditPortfolioFormData>({
    titre: "",
    slug: "",
    photoCouverture: "",
    description: "",
    kicker: "",
    livrable: [],
    sousTitre: "",
    bento: [],
  });

  const [currentLivrable, setCurrentLivrable] = useState("");
  const [currentBento, setCurrentBento] = useState<BentoItem>({ lines: [] });
  const [currentBentoLine, setCurrentBentoLine] = useState<BentoLine>({
    format: "1/3 - 2/3",
    listImage: [],
  });
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("file");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [bentoPreviewImages, setBentoPreviewImages] = useState<
    { url: string; name: string }[]
  >([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Mise à jour du formulaire quand les données du portfolio changent
  useEffect(() => {
    if (portfolio) {
      console.log("Portfolio data loaded:", portfolio);
      console.log(
        "Portfolio livrable:",
        portfolio.livrable,
        typeof portfolio.livrable
      );
      console.log("Portfolio bento:", portfolio.bento, typeof portfolio.bento);

      const newFormData: EditPortfolioFormData = {
        titre: portfolio.titre || "",
        slug: portfolio.slug || "",
        photoCouverture: portfolio.photoCouverture || "",
        description: portfolio.description || "",
        kicker: portfolio.kicker || "",
        livrable: Array.isArray(portfolio.livrable) ? portfolio.livrable : [],
        sousTitre: portfolio.sousTitre || "",
        bento: Array.isArray(portfolio.bento) ? portfolio.bento : [],
      };
      console.log("Setting form data:", newFormData);
      setFormData(newFormData);
      setPreviewImage(portfolio.photoCouverture || null);
      setIsDataLoaded(true);
    }
  }, [portfolio]);

  // Options pour les formats de bento
  const bentoFormats = [
    "1/3 - 2/3",
    "3 carrés",
    "banner",
    "2 carré",
    "full",
  ] as const;

  // Gestion des changements dans le formulaire
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de l'upload de fichier pour la photo de couverture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, photoCouverture: file.name }));
    }
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

  // Gestion du bento
  const addBentoItem = () => {
    setFormData((prev) => ({
      ...prev,
      bento: [...prev.bento, { lines: [] }],
    }));
  };

  const removeBentoItem = (bentoIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      bento: prev.bento.filter((_, i) => i !== bentoIndex),
    }));
  };

  const addBentoLine = (bentoIndex: number) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      newBento[bentoIndex].lines.push({
        format: "1/3 - 2/3",
        listImage: [],
      });
      return { ...prev, bento: newBento };
    });
  };

  const removeBentoLine = (bentoIndex: number, lineIndex: number) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      newBento[bentoIndex].lines = newBento[bentoIndex].lines.filter(
        (_, i) => i !== lineIndex
      );
      return { ...prev, bento: newBento };
    });
  };

  const updateBentoLineFormat = (
    bentoIndex: number,
    lineIndex: number,
    format: BentoLine["format"]
  ) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      newBento[bentoIndex].lines[lineIndex].format = format;
      return { ...prev, bento: newBento };
    });
  };

  const addImageToBentoLine = (
    bentoIndex: number,
    lineIndex: number,
    imageUrl: string
  ) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      newBento[bentoIndex].lines[lineIndex].listImage.push(imageUrl);
      return { ...prev, bento: newBento };
    });
  };

  const removeImageFromBentoLine = (
    bentoIndex: number,
    lineIndex: number,
    imageIndex: number
  ) => {
    setFormData((prev) => {
      const newBento = [...prev.bento];
      newBento[bentoIndex].lines[lineIndex].listImage = newBento[
        bentoIndex
      ].lines[lineIndex].listImage.filter((_, i) => i !== imageIndex);
      return { ...prev, bento: newBento };
    });
  };

  // Gestion des uploads d'images pour le bento
  const handleBentoImageUpload = async (
    file: File,
    bentoIndex: number,
    lineIndex: number
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "portfolio");
      formData.append("portfolioId", portfolio.id);

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        addImageToBentoLine(bentoIndex, lineIndex, result.media.url);
      } else {
        console.error("Erreur lors de l'upload:", response.statusText);
        alert("Erreur lors de l'upload de l'image");
      }
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      alert("Erreur lors de l'upload de l'image");
    }
  };

  // Fonction pour supprimer le portfolio
  const handleDelete = async () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir supprimer ce portfolio ? Cette action est irréversible."
      )
    ) {
      try {
        const response = await fetch(
          `/admin/manage-portfolio/${portfolio.slug}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          navigate("/admin/manage-portfolio");
        } else {
          alert("Erreur lors de la suppression du portfolio");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la suppression du portfolio");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              Modifier le Portfolio
            </h1>
            <p className="text-gray-600 mt-2">Slug: {portfolio.slug}</p>
            <p className="text-gray-600 mt-1">Titre: {portfolio.titre}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/manage-portfolio"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
            >
              ← Retour
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Supprimer
            </button>
          </div>
        </div>

        {/* Messages de retour */}
        {actionData?.success && "message" in actionData && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {actionData.message}
          </div>
        )}
        {actionData && !actionData.success && "error" in actionData && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {actionData.error}
          </div>
        )}

        {/* Formulaire de modification */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Indicateur de chargement */}
          {!isDataLoaded && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
              Chargement des données du portfolio...
            </div>
          )}

          <Form
            method="post"
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* Titre */}
            <div>
              <label
                htmlFor="titre"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Titre du portfolio *
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez le titre du portfolio..."
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Slug *{" "}
                <span className="text-xs text-gray-500">
                  (URL-friendly, ex: mon-projet-web)
                </span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="mon-projet-web"
                pattern="[a-z0-9-]+"
                title="Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets"
              />
            </div>

            {/* Photo de couverture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo de couverture *
              </label>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center text-gray-600">
                    <input
                      type="radio"
                      value="url"
                      checked={uploadMethod === "url"}
                      onChange={(e) =>
                        setUploadMethod(e.target.value as "url" | "file")
                      }
                      className="mr-2"
                    />
                    URL
                  </label>
                  <label className="flex items-center text-gray-600">
                    <input
                      type="radio"
                      value="file"
                      checked={uploadMethod === "file"}
                      onChange={(e) =>
                        setUploadMethod(e.target.value as "url" | "file")
                      }
                      className="mr-2"
                    />
                    Upload fichier
                  </label>
                </div>

                {uploadMethod === "url" ? (
                  <input
                    type="url"
                    name="photoCouvertureUrl"
                    value={formData.photoCouverture}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        photoCouverture: e.target.value,
                      }));
                      setPreviewImage(e.target.value);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                ) : (
                  <>
                    <input
                      type="hidden"
                      name="photoCouvertureUrl"
                      value={formData.photoCouverture}
                    />
                    <input
                      type="file"
                      name="photoCouvertureFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </>
                )}

                {previewImage && (
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Aperçu"
                      className="w-full max-w-md h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Kicker */}
            <div>
              <label
                htmlFor="kicker"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Kicker (phrase d'accroche)
              </label>
              <input
                type="text"
                id="kicker"
                name="kicker"
                value={formData.kicker}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Une phrase courte et percutante..."
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Décrivez le projet, ses objectifs, les défis relevés..."
              />
            </div>

            {/* Sous-titre */}
            <div>
              <label
                htmlFor="sousTitre"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sous-titre
              </label>
              <input
                type="text"
                id="sousTitre"
                name="sousTitre"
                value={formData.sousTitre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sous-titre ou complément d'information..."
              />
            </div>

            {/* Livrables */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Livrables
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentLivrable}
                    onChange={(e) => setCurrentLivrable(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Logo, Charte graphique, Site web..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addLivrable())
                    }
                  />
                  <button
                    type="button"
                    onClick={addLivrable}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Ajouter
                  </button>
                </div>

                {formData.livrable.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.livrable.map((livrable, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {livrable}
                        <button
                          type="button"
                          onClick={() => removeLivrable(index)}
                          className="text-blue-600 hover:text-blue-800 font-bold text-lg leading-none"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Champs cachés pour les livrables */}
                {formData.livrable.map((livrable, index) => (
                  <input
                    key={index}
                    type="hidden"
                    name="livrable"
                    value={livrable}
                  />
                ))}
              </div>
            </div>

            {/* Gestion du Bento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Bento (Galerie d'images organisée)
              </label>

              <div className="space-y-6">
                {formData.bento.map((bentoItem, bentoIndex) => (
                  <div
                    key={bentoIndex}
                    className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Bento #{bentoIndex + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeBentoItem(bentoIndex)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                      >
                        Supprimer Bento
                      </button>
                    </div>

                    {/* Lignes du bento */}
                    <div className="space-y-4">
                      {bentoItem.lines.map((line, lineIndex) => (
                        <div
                          key={lineIndex}
                          className="border border-gray-200 rounded p-3 bg-white"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="font-medium text-gray-700">
                              Ligne #{lineIndex + 1}
                            </h5>
                            <button
                              type="button"
                              onClick={() =>
                                removeBentoLine(bentoIndex, lineIndex)
                              }
                              className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-200"
                            >
                              Supprimer Ligne
                            </button>
                          </div>

                          {/* Sélection du format */}
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Format de la ligne
                            </label>
                            <select
                              value={line.format}
                              onChange={(e) =>
                                updateBentoLineFormat(
                                  bentoIndex,
                                  lineIndex,
                                  e.target.value as BentoLine["format"]
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                              {bentoFormats.map((format) => (
                                <option key={format} value={format}>
                                  {format}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Upload d'images pour cette ligne */}
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                              Ajouter des images à la ligne
                            </label>

                            {/* Upload par fichier */}
                            <div className="mb-2">
                              <label className="block text-xs text-gray-500 mb-1">
                                Upload fichier
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleBentoImageUpload(
                                      file,
                                      bentoIndex,
                                      lineIndex
                                    );
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>

                            {/* Ajout par URL */}
                            <div className="flex gap-2">
                              <input
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const input = e.target as HTMLInputElement;
                                    if (input.value.trim()) {
                                      addImageToBentoLine(
                                        bentoIndex,
                                        lineIndex,
                                        input.value.trim()
                                      );
                                      input.value = "";
                                    }
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  const input = (e.target as HTMLButtonElement)
                                    .previousElementSibling as HTMLInputElement;
                                  if (input.value.trim()) {
                                    addImageToBentoLine(
                                      bentoIndex,
                                      lineIndex,
                                      input.value.trim()
                                    );
                                    input.value = "";
                                  }
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                              >
                                Ajouter URL
                              </button>
                            </div>
                          </div>

                          {/* Affichage des images de cette ligne */}
                          {line.listImage.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {line.listImage.map((imageUrl, imageIndex) => (
                                <div
                                  key={imageIndex}
                                  className="relative group"
                                >
                                  <img
                                    src={imageUrl}
                                    alt={`Image ${imageIndex + 1}`}
                                    className="w-full h-20 object-cover rounded border"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeImageFromBentoLine(
                                        bentoIndex,
                                        lineIndex,
                                        imageIndex
                                      )
                                    }
                                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Bouton pour ajouter une ligne */}
                      <button
                        type="button"
                        onClick={() => addBentoLine(bentoIndex)}
                        className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 border-2 border-dashed border-blue-300"
                      >
                        + Ajouter une ligne
                      </button>
                    </div>
                  </div>
                ))}

                {/* Bouton pour ajouter un bento */}
                <button
                  type="button"
                  onClick={addBentoItem}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 border-2 border-dashed border-green-300"
                >
                  + Ajouter un Bento
                </button>
              </div>
            </div>

            {/* Champ caché pour le bento */}
            <input
              type="hidden"
              name="bento"
              value={JSON.stringify(formData.bento)}
            />

            {/* Boutons de soumission */}
            <div className="flex gap-4 justify-end pt-6 border-t">
              <Link
                to="/admin/manage-portfolio"
                className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Annuler
              </Link>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Mettre à jour
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
