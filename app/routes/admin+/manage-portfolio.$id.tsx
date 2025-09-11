import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
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
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  type PortfolioData,
} from "~/server/portfolio.server";

// Types pour les données du portfolio
interface BentoLine {
  format: "1/3 - 2/3" | "3 carrés" | "banner" | "2 carré" | "full";
  listImage: string[];
}

interface BentoItem {
  lines: BentoLine[];
}

// Loader pour charger le portfolio à éditer
export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAuth(request);
  const sessionData = await getSessionData(request);

  const { id } = params;
  if (!id) {
    throw new Response("ID du portfolio requis", { status: 400 });
  }

  const portfolio = await getPortfolio(id);
  if (!portfolio) {
    throw new Response("Portfolio non trouvé", { status: 404 });
  }

  return { sessionData, portfolio };
}

// Action pour gérer la mise à jour et la suppression
export async function action({ request, params }: ActionFunctionArgs) {
  await requireAuth(request);

  const { id } = params;
  if (!id) {
    return json(
      { success: false, error: "ID du portfolio requis" },
      { status: 400 }
    );
  }

  try {
    if (request.method === "DELETE") {
      await deletePortfolio(id);
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
      const savedMedia = await saveMedia(photoCouvertureFile, "portfolio", id);
      photoCouverture = savedMedia.url;
    }

    // Récupération des données du formulaire
    const portfolioData: Partial<PortfolioData> = {
      titre: formData.get("titre") as string,
      photoCouverture: photoCouverture,
      description: formData.get("description") as string,
      kicker: formData.get("kicker") as string,
      livrable: formData.getAll("livrable") as string[],
      sousTitre: formData.get("sousTitre") as string,
      bento: JSON.parse((formData.get("bento") as string) || "[]"),
    };

    // Mettre à jour en base de données
    await updatePortfolio(id, portfolioData);

    return json({
      success: true,
      message: "Portfolio mis à jour avec succès!",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du portfolio:", error);
    return json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour du portfolio",
    });
  }
}

export default function EditPortfolio() {
  const { sessionData, portfolio } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  // États pour le formulaire
  const [formData, setFormData] = useState<PortfolioData>({
    titre: portfolio.titre,
    photoCouverture: portfolio.photoCouverture,
    description: portfolio.description,
    kicker: portfolio.kicker,
    livrable: portfolio.livrable,
    sousTitre: portfolio.sousTitre,
    bento: portfolio.bento,
  });

  const [currentLivrable, setCurrentLivrable] = useState("");
  const [currentBento, setCurrentBento] = useState<BentoItem>({ lines: [] });
  const [currentBentoLine, setCurrentBentoLine] = useState<BentoLine>({
    format: "1/3 - 2/3",
    listImage: [],
  });
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("file");
  const [previewImage, setPreviewImage] = useState<string | null>(
    portfolio.photoCouverture
  );
  const [bentoPreviewImages, setBentoPreviewImages] = useState<
    { url: string; name: string }[]
  >([]);

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

  // Fonction pour supprimer le portfolio
  const handleDelete = async () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir supprimer ce portfolio ? Cette action est irréversible."
      )
    ) {
      try {
        const response = await fetch(
          `/admin/manage-portfolio/${portfolio.id}`,
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
    <div className="min-h-screen bg-gray-50 py-8">
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
            <p className="text-gray-600 mt-2">ID: {portfolio.id}</p>
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
        {actionData?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {actionData.message}
          </div>
        )}
        {actionData?.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {actionData.error}
          </div>
        )}

        {/* Informations sur les médias */}
        {portfolio.medias.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              Médias associés ({portfolio.medias.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {portfolio.medias.map((media) => (
                <div
                  key={media.id}
                  className="bg-white rounded p-2 text-center"
                >
                  <div className="text-xs text-gray-600 mb-1">{media.type}</div>
                  <div className="text-xs font-medium truncate">
                    {media.originalName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulaire de modification */}
        <div className="bg-white rounded-lg shadow-lg p-6">
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

            {/* Photo de couverture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo de couverture *
              </label>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center">
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
                  <label className="flex items-center">
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
