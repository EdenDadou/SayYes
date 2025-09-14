import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { useLoaderData, useActionData, Link } from "@remix-run/react";
import { useState } from "react";
import { requireAuth, getSessionData } from "~/server/auth.server";
import { saveMedia } from "~/server/media.server";
import {
  createPortfolio,
  getAllPortfolios,
  updatePortfolio,
} from "~/server/portfolio.server";

// Types pour les données du portfolio
interface BentoLine {
  format: "1/3 - 2/3" | "3 carrés" | "banner" | "2 carré" | "full";
  listImage: string[];
}

interface BentoItem {
  lines: BentoLine[];
}

interface PortfolioData {
  titre: string;
  slug: string;
  photoCouverture: string;
  description: string;
  kicker: string;
  livrable: string[];
  sousTitre: string;
  topTitle: string;
  couleur: string;
  shortlist: string;
  temoignage: {
    auteur: string;
    contenu: string;
    poste?: string;
    entreprise?: string;
  };
  bento: BentoItem[];
}

// Loader pour vérifier l'authentification et charger les portfolios
export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  const sessionData = await getSessionData(request);
  const portfolios = await getAllPortfolios();
  return { sessionData, portfolios };
}

// Action pour gérer la soumission du formulaire
export async function action({ request }: ActionFunctionArgs) {
  await requireAuth(request);

  try {
    // Traitement des fichiers uploadés
    const uploadHandler = unstable_createMemoryUploadHandler({
      maxPartSize: 10 * 1024 * 1024, // 10MB
    });

    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );

    // Créer d'abord le portfolio pour avoir l'ID
    const portfolioData: PortfolioData = {
      titre: formData.get("titre") as string,
      slug: formData.get("slug") as string,
      photoCouverture: "", // Sera mis à jour après l'upload
      description: formData.get("description") as string,
      kicker: formData.get("kicker") as string,
      livrable: formData.getAll("livrable") as string[],
      sousTitre: formData.get("sousTitre") as string,
      topTitle: formData.get("topTitle") as string,
      couleur: formData.get("couleur") as string,
      shortlist: formData.get("shortlist") as string,
      temoignage: {
        auteur: (formData.get("temoignageAuteur") as string) || "",
        contenu: (formData.get("temoignageContenu") as string) || "",
        poste: (formData.get("temoignagePoste") as string) || undefined,
        entreprise:
          (formData.get("temoignageEntreprise") as string) || undefined,
      },
      bento: JSON.parse((formData.get("bento") as string) || "[]"),
    };

    // Sauvegarder en base de données pour obtenir l'ID
    const portfolioId = await createPortfolio(portfolioData);

    // Gestion de la photo de couverture
    let photoCouverture = formData.get("photoCouvertureUrl") as string;
    const photoCouvertureFile = formData.get(
      "photoCouvertureFile"
    ) as File | null;

    if (photoCouvertureFile && photoCouvertureFile.size > 0) {
      const savedMedia = await saveMedia(
        photoCouvertureFile,
        "portfolio",
        portfolioId
      );
      photoCouverture = savedMedia.url;
    }

    // Traitement des fichiers du bento
    const updatedBento = [...portfolioData.bento];

    // Parcourir tous les fichiers uploadés pour le bento
    for (const [key, value] of formData.entries()) {
      if (
        key.startsWith("bentoFile_") &&
        value instanceof File &&
        value.size > 0
      ) {
        // Extraire les indices de bento et d'image du nom du champ
        const match = key.match(/bentoFile_(\d+)_(\d+)/);
        if (match) {
          const bentoIndex = parseInt(match[1]);
          const imageIndex = parseInt(match[2]);

          // Sauvegarder le fichier
          const savedMedia = await saveMedia(
            value,
            "portfolio/bento",
            portfolioId
          );

          // Mettre à jour l'URL dans le bento
          // Trouver l'image "pending_" correspondante dans le bento
          if (updatedBento[bentoIndex]) {
            let currentImageIndex = 0;

            // Parcourir toutes les lignes du bento
            for (
              let lineIndex = 0;
              lineIndex < updatedBento[bentoIndex].lines.length;
              lineIndex++
            ) {
              const line = updatedBento[bentoIndex].lines[lineIndex];

              // Parcourir toutes les images de la ligne
              for (
                let imgIndex = 0;
                imgIndex < line.listImage.length;
                imgIndex++
              ) {
                if (line.listImage[imgIndex].startsWith("pending_")) {
                  // Vérifier si c'est l'image correspondante à l'index
                  if (currentImageIndex === imageIndex) {
                    updatedBento[bentoIndex].lines[lineIndex].listImage[
                      imgIndex
                    ] = savedMedia.url;
                    // Sortir de toutes les boucles une fois l'image trouvée et remplacée
                    lineIndex = updatedBento[bentoIndex].lines.length;
                    break;
                  }
                  currentImageIndex++;
                }
              }
            }
          }
        }
      }
    }

    // Mettre à jour le portfolio avec les URLs finales
    await updatePortfolio(portfolioId, {
      photoCouverture: photoCouverture,
      bento: updatedBento,
    });

    return json({
      success: true,
      message: "Portfolio créé avec succès!",
      portfolioId,
    });
  } catch (error) {
    console.error("Erreur lors de la création du portfolio:", error);
    return json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du portfolio",
    });
  }
}

export default function ManagePortfolio() {
  const { sessionData, portfolios } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  // États pour le formulaire
  const [formData, setFormData] = useState<PortfolioData>({
    titre: "",
    slug: "",
    photoCouverture: "",
    description: "",
    kicker: "",
    livrable: [],
    sousTitre: "",
    topTitle: "",
    couleur: "",
    shortlist: "",
    temoignage: {
      auteur: "",
      contenu: "",
      poste: "",
      entreprise: "",
    },
    bento: [],
  });

  const [currentLivrable, setCurrentLivrable] = useState("");
  const [currentBento, setCurrentBento] = useState<BentoItem>({
    lines: [],
  });
  const [currentBentoLine, setCurrentBentoLine] = useState<BentoLine>({
    format: "1/3 - 2/3",
    listImage: [],
  });
  // États pour la gestion des uploads
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [bentoPreviewImages, setBentoPreviewImages] = useState<
    { url: string; name: string }[]
  >([]);
  const [bentoFiles, setBentoFiles] = useState<File[]>([]);

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

  // Gestion de l'upload de fichiers multiples pour les images bento
  const handleBentoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        // Vérifier le type de fichier
        if (file.type.startsWith("image/")) {
          // Stocker le fichier réel pour l'envoi
          setBentoFiles((prev) => [...prev, file]);

          // Créer un aperçu de l'image
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            setBentoPreviewImages((prev) => [
              ...prev,
              { url: imageUrl, name: file.name },
            ]);

            // Ajouter un placeholder à la ligne bento actuelle
            setCurrentBentoLine((prev) => ({
              ...prev,
              listImage: [...prev.listImage, `pending_${file.name}`],
            }));
          };
          reader.readAsDataURL(file);
        }
      });
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
    setBentoPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setBentoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Gestion des lignes de bento
  const addBentoLine = () => {
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

  // Fonction de soumission personnalisée pour gérer les fichiers bento
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const submitFormData = new FormData(form);

    // Ajouter les fichiers bento avec les noms corrects
    let globalImageIndex = 0;
    formData.bento.forEach((bento, bentoIndex) => {
      bento.lines.forEach((line, lineIndex) => {
        line.listImage.forEach((image, imageIndex) => {
          // Si l'image commence par "pending_", c'est un fichier à uploader
          if (image.startsWith("pending_")) {
            const fileName = image.replace("pending_", "");
            const file = bentoFiles.find((f) => f.name === fileName);
            if (file) {
              submitFormData.append(
                `bentoFile_${bentoIndex}_${globalImageIndex}`,
                file
              );
              globalImageIndex++;
            }
          }
        });
      });
    });

    // Soumettre le formulaire
    try {
      const response = await fetch("/admin/manage-portfolio", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (result.success) {
        // Réinitialiser le formulaire
        setFormData({
          titre: "",
          slug: "",
          photoCouverture: "",
          description: "",
          kicker: "",
          livrable: [],
          sousTitre: "",
          topTitle: "",
          couleur: "",
          shortlist: "",
          temoignage: {
            auteur: "",
            contenu: "",
            poste: "",
            entreprise: "",
          },
          bento: [],
        });
        setCurrentLivrable("");
        setCurrentBento({ lines: [] });
        setCurrentBentoLine({ format: "1/3 - 2/3", listImage: [] });
        setPreviewImage(null);
        setBentoPreviewImages([]);
        setBentoFiles([]);

        // Recharger la page pour voir le nouveau portfolio
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 font-jakarta-bold">
              Gestion Portfolio
            </h1>
            <p className="text-gray-300" style={{ fontFamily: "Jakarta" }}>
              Créer un nouveau projet
            </p>
          </div>
          <Link
            to="/admin/dashboard"
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
            style={{ fontFamily: "Jakarta Semi Bold" }}
          >
            Retour au Dashboard
          </Link>
        </div>

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

          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              Informations générales
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Title */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="topTitle"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Top Title
                </label>
                <input
                  type="text"
                  id="topTitle"
                  name="topTitle"
                  value={formData.topTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Titre principal du projet"
                />
              </div>

              {/* Titre */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="titre"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Titre *
                </label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  value={formData.titre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Titre du projet"
                />
              </div>

              {/* Couleur */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="couleur"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Couleur
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    id="couleurPicker"
                    value={formData.couleur || "#000000"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        couleur: e.target.value,
                      }))
                    }
                    className="w-16 h-12 rounded-lg border border-gray-700 bg-gray-800 cursor-pointer"
                    title="Choisir une couleur"
                  />
                  <input
                    type="text"
                    id="couleur"
                    name="couleur"
                    value={formData.couleur}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: "Jakarta" }}
                    placeholder="Couleur principale (ex: #FF5733)"
                  />
                </div>
              </div>

              {/* Section Shortlist */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="shortlist"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Note Shortlist (ex : 4.5)
                </label>
                <input
                  type="text"
                  id="shortlist"
                  name="shortlist"
                  value={formData.shortlist}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Note shortlist (ex: 4.5)"
                />
              </div>

              {/* Slug */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Slug *{" "}
                  <span className="text-xs text-gray-300">
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
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="mon-projet-web"
                  pattern="[a-z0-9-]+"
                  title="Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets"
                />
              </div>

              {/* Photo de couverture */}
              <div className="lg:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-300 mb-4"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Photo de couverture *
                </label>

                {/* Upload de fichier */}
                <div className="space-y-4">
                  <input
                    type="file"
                    id="photoCouvertureFile"
                    name="photoCouvertureFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700 transition-all duration-200"
                    style={{ fontFamily: "Jakarta" }}
                  />

                  {/* Aperçu de l'image */}
                  {previewImage && (
                    <div className="mt-4">
                      <p
                        className="text-sm text-gray-400 mb-2"
                        style={{ fontFamily: "Jakarta" }}
                      >
                        Aperçu :
                      </p>
                      <img
                        src={previewImage}
                        alt="Aperçu"
                        className="max-w-xs h-32 object-cover rounded-lg border border-gray-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Kicker */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="kicker"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Kicker
                </label>
                <input
                  type="text"
                  id="kicker"
                  name="kicker"
                  value={formData.kicker}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Texte d'accroche"
                />
              </div>

              {/* Sous-titre */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="sousTitre"
                  className="block text-sm font-medium text-gray-300 mb-2 "
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Sous-titre
                </label>
                <input
                  type="text"
                  id="sousTitre"
                  name="sousTitre"
                  value={formData.sousTitre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Sous-titre du projet"
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
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
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Description détaillée du projet"
                />
              </div>
            </div>
          </div>

          {/* Section Témoignage */}
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              Témoignage
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Auteur */}
              <div>
                <label
                  htmlFor="temoignageAuteur"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Auteur *
                </label>
                <input
                  type="text"
                  id="temoignageAuteur"
                  name="temoignageAuteur"
                  value={formData.temoignage.auteur}
                  onChange={(e) =>
                    handleTemoignageChange("auteur", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Nom de l'auteur du témoignage"
                />
              </div>

              {/* Poste */}
              <div>
                <label
                  htmlFor="temoignagePoste"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Poste
                </label>
                <input
                  type="text"
                  id="temoignagePoste"
                  name="temoignagePoste"
                  value={formData.temoignage.poste || ""}
                  onChange={(e) =>
                    handleTemoignageChange("poste", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Poste de l'auteur"
                />
              </div>

              {/* Entreprise */}
              <div>
                <label
                  htmlFor="temoignageEntreprise"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Entreprise
                </label>
                <input
                  type="text"
                  id="temoignageEntreprise"
                  name="temoignageEntreprise"
                  value={formData.temoignage.entreprise || ""}
                  onChange={(e) =>
                    handleTemoignageChange("entreprise", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Entreprise de l'auteur"
                />
              </div>

              {/* Contenu */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="temoignageContenu"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Jakarta Medium" }}
                >
                  Contenu du témoignage *
                </label>
                <textarea
                  id="temoignageContenu"
                  name="temoignageContenu"
                  value={formData.temoignage.contenu}
                  onChange={(e) =>
                    handleTemoignageChange("contenu", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  style={{ fontFamily: "Jakarta" }}
                  placeholder="Contenu du témoignage"
                />
              </div>
            </div>
          </div>

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
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
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
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
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
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      style={{ fontFamily: "Jakarta Medium" }}
                    >
                      Format
                    </label>
                    <select
                      value={currentBentoLine.format}
                      onChange={(e) =>
                        setCurrentBentoLine((prev) => ({
                          ...prev,
                          format: e.target.value as any,
                        }))
                      }
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      style={{ fontFamily: "Jakarta" }}
                    >
                      {bentoFormats.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Images de la ligne */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      style={{ fontFamily: "Jakarta Medium" }}
                    >
                      Images et GIFs *
                    </label>
                    {/* Upload de fichiers multiples */}
                    <div className="mb-4">
                      <input
                        type="file"
                        multiple
                        accept="image/*,.gif"
                        onChange={handleBentoFilesChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:cursor-pointer hover:file:bg-green-700 transition-all duration-200"
                        style={{ fontFamily: "Jakarta" }}
                      />
                      <p
                        className="text-xs text-gray-300 mt-2"
                        style={{ fontFamily: "Jakarta" }}
                      >
                        📁 Sélectionnez plusieurs images ou GIFs (formats
                        supportés: JPG, PNG, GIF, WebP, etc.)
                      </p>
                    </div>

                    {/* Aperçus des images uploadées */}
                    {bentoPreviewImages.length > 0 && (
                      <div className="mb-4">
                        <h5
                          className="text-sm font-medium text-gray-300 mb-3"
                          style={{ fontFamily: "Jakarta Medium" }}
                        >
                          Aperçu des images ({bentoPreviewImages.length}) :
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {bentoPreviewImages.map((image, index) => (
                            <div
                              key={index}
                              className="relative group bg-gray-700/30 rounded-lg overflow-hidden"
                            >
                              <img
                                src={image.url}
                                alt={`Aperçu ${index + 1}`}
                                className="w-full h-20 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => removeBentoImage(index)}
                                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                                <p
                                  className="text-xs text-white truncate"
                                  style={{ fontFamily: "Jakarta" }}
                                >
                                  {image.name}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={addBentoLine}
                      disabled={currentBentoLine.listImage.length === 0}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                      style={{ fontFamily: "Jakarta Semi Bold" }}
                    >
                      Ajouter cette ligne
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
                {formData.bento.map((bento, index) => (
                  <div key={index} className="bg-gray-800/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span
                          className="text-white font-semibold"
                          style={{ fontFamily: "Jakarta Semi Bold" }}
                        >
                          Bento {index + 1}
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
                        onClick={() => removeBento(index)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Affichage des lignes du bento */}
                    <div className="space-y-3">
                      {bento.lines.map((line, lineIndex) => (
                        <div
                          key={lineIndex}
                          className="bg-gray-700/20 p-3 rounded-lg"
                        >
                          <div className="mb-2">
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
            <button
              type="button"
              onClick={() => {
                setFormData({
                  titre: "",
                  slug: "",
                  photoCouverture: "",
                  description: "",
                  kicker: "",
                  livrable: [],
                  sousTitre: "",
                  topTitle: "",
                  couleur: "",
                  shortlist: "",
                  temoignage: {
                    auteur: "",
                    contenu: "",
                    poste: "",
                    entreprise: "",
                  },
                  bento: [],
                });
                setCurrentLivrable("");
                setCurrentBento({ lines: [] });
                setCurrentBentoLine({ format: "1/3 - 2/3", listImage: [] });
                setPreviewImage(null);
                setBentoPreviewImages([]);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Créer le Projet
            </button>
          </div>
        </form>
      </div>

      {/* Section des portfolios existants */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2
          className="text-2xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "Jakarta Bold" }}
        >
          Projets existants ({portfolios.length})
        </h2>

        {portfolios.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucun projets créés pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Image de couverture */}
                {portfolio.photoCouverture && (
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={portfolio.photoCouverture}
                      alt={portfolio.titre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Contenu */}
                <div className="p-4">
                  <h3
                    className="font-semibold text-lg text-gray-900 mb-2"
                    style={{ fontFamily: "Jakarta Semi Bold" }}
                  >
                    {portfolio.titre}
                  </h3>

                  {portfolio.kicker && (
                    <p className="text-sm text-blue-600 mb-2 font-medium">
                      {portfolio.kicker}
                    </p>
                  )}

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {portfolio.description}
                  </p>

                  {/* Livrables */}
                  {portfolio.livrable.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {portfolio.livrable
                          .slice(0, 3)
                          .map((livrable, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                            >
                              {livrable}
                            </span>
                          ))}
                        {portfolio.livrable.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{portfolio.livrable.length - 3} autres
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Métadonnées */}
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>
                      Créé le{" "}
                      {new Date(portfolio.createdAt).toLocaleDateString(
                        "fr-FR"
                      )}
                    </span>
                    <span>
                      {portfolio.medias.length} média
                      {portfolio.medias.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/manage-portfolio/${portfolio.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition-colors duration-200"
                    >
                      Modifier
                    </Link>
                    <button
                      type="button"
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition-colors duration-200"
                      onClick={async () => {
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
                              // Recharger la page pour actualiser la liste
                              window.location.reload();
                            } else {
                              alert(
                                "Erreur lors de la suppression du portfolio"
                              );
                            }
                          } catch (error) {
                            console.error("Erreur:", error);
                            alert("Erreur lors de la suppression du portfolio");
                          }
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
