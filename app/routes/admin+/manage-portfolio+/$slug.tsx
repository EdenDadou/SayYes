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

// Loader pour charger le portfolio à éditer
export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAuth(request);
  const sessionData = await getSessionData(request);

  const { slug } = params;

  if (!slug) {
    console.error("❌ Pas de slug fourni");
    throw new Response("Slug du portfolio requis", { status: 400 });
  }
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    console.error("❌ Portfolio non trouvé");
    throw new Response("Portfolio non trouvé", { status: 404 });
  }
  return { sessionData, portfolio };
}

// Action pour gérer la mise à jour et la suppression
export async function action({ request, params }: ActionFunctionArgs) {
  await requireAuth(request);

  const { slug } = params;
  if (!slug) {
    console.error("❌ Pas de slug fourni dans l'action");
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

    // Traitement des fichiers uploadés pour PUT/POST
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
      bento: (() => {
        try {
          const bentoData = formData.get("bento") as string;
          const parsed = bentoData ? JSON.parse(bentoData) : [];
          console.log(
            "📦 Bento parsé côté serveur:",
            JSON.stringify(parsed, null, 2)
          );
          return parsed;
        } catch (e) {
          console.error("❌ Erreur parsing bento data:", e);
          return [];
        }
      })(),
    };

    // Traitement des fichiers du bento (même logique que la création)
    const updatedBento = [...(portfolioData.bento || [])];

    // Récupérer le portfolio pour obtenir l'ID
    const portfolio = await getPortfolioBySlug(slug);
    if (!portfolio) {
      return Response.json(
        { success: false, error: "Portfolio non trouvé" },
        { status: 404 }
      );
    }

    // Créer une map des fichiers uploadés pour un accès plus facile
    const uploadedFiles = new Map<string, any>();

    // Debug: Lister tous les champs du formulaire
    console.log("🔍 Tous les champs du formulaire reçus:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  📁 ${key}: ${value.name} (${value.size} bytes)`);
      } else {
        console.log(
          `  📝 ${key}: ${typeof value === "string" ? value.substring(0, 100) : value}`
        );
      }
    }

    for (const [key, value] of formData.entries()) {
      if (
        key.startsWith("bentoFile_") &&
        value instanceof File &&
        value.size > 0
      ) {
        const match = key.match(/bentoFile_(\d+)_(\d+)/);
        if (match) {
          const bentoIndex = parseInt(match[1]);
          const globalIndex = parseInt(match[2]);

          // Sauvegarder le fichier
          const savedMedia = await saveMedia(
            value,
            "portfolio/bento",
            portfolio.id
          );

          uploadedFiles.set(`${bentoIndex}_${globalIndex}`, savedMedia.url);
          console.log(`✅ Fichier sauvegardé: ${key} -> ${savedMedia.url}`);
        }
      }
    }

    // Maintenant, parcourir le bento et remplacer les images pending
    updatedBento.forEach((bento, bentoIndex) => {
      let globalPendingIndex = 0;

      bento.lines.forEach((line, lineIndex) => {
        line.listImage.forEach((image, imgIndex) => {
          if (image.startsWith("pending_")) {
            const fileKey = `${bentoIndex}_${globalPendingIndex}`;
            const newUrl = uploadedFiles.get(fileKey);

            if (newUrl) {
              console.log(`🔄 Remplacement: ${image} -> ${newUrl}`);
              updatedBento[bentoIndex].lines[lineIndex].listImage[imgIndex] =
                newUrl;
            } else {
              console.warn(
                `⚠️ Aucun fichier trouvé pour ${fileKey} (image: ${image})`
              );
            }
            globalPendingIndex++;
          }
        });
      });
    });

    // Mettre à jour les données avec le bento traité
    portfolioData.bento = updatedBento;

    // Mettre à jour en base de données
    await updatePortfolioBySlug(slug, portfolioData);

    const successResponse = {
      success: true,
      message: "Portfolio mis à jour avec succès!",
    };

    return Response.json(successResponse);
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du portfolio:", error);
    console.error(
      "❌ Stack trace:",
      error instanceof Error ? error.stack : "N/A"
    );
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
  const { sessionData, portfolio } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  // États pour le formulaire - initialisation simple pour éviter les problèmes d'hydratation
  const [formData, setFormData] = useState<EditPortfolioFormData>({
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
  const [bentoFiles, setBentoFiles] = useState<Map<string, File>>(new Map());
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  // Mise à jour du formulaire quand les données du portfolio changent
  useEffect(() => {
    if (portfolio && !isDataLoaded) {
      // Parser les données JSON si nécessaire
      let parsedLivrable = [];
      let parsedBento = [];
      let parsedTemoignage = {
        auteur: "",
        contenu: "",
        poste: "",
        entreprise: "",
      };

      try {
        parsedLivrable = Array.isArray(portfolio.livrable)
          ? portfolio.livrable
          : typeof portfolio.livrable === "string"
            ? JSON.parse(portfolio.livrable)
            : [];
      } catch (e) {
        console.warn("⚠️ Erreur parsing livrable:", e);
        parsedLivrable = [];
      }

      try {
        parsedBento = Array.isArray(portfolio.bento)
          ? portfolio.bento
          : typeof portfolio.bento === "string"
            ? JSON.parse(portfolio.bento)
            : [];
      } catch (e) {
        console.warn("⚠️ Erreur parsing bento:", e);
        parsedBento = [];
      }

      try {
        parsedTemoignage =
          portfolio.temoignage && typeof portfolio.temoignage === "object"
            ? portfolio.temoignage
            : typeof portfolio.temoignage === "string"
              ? JSON.parse(portfolio.temoignage)
              : {
                  auteur: "",
                  contenu: "",
                  poste: "",
                  entreprise: "",
                };
      } catch (e) {
        console.warn("⚠️ Erreur parsing temoignage:", e);
        parsedTemoignage = {
          auteur: "",
          contenu: "",
          poste: "",
          entreprise: "",
        };
      }

      const newFormData: EditPortfolioFormData = {
        titre: portfolio.titre || "",
        slug: portfolio.slug || "",
        photoCouverture: portfolio.photoCouverture || "",
        description: portfolio.description || "",
        kicker: portfolio.kicker || "",
        livrable: parsedLivrable,
        sousTitre: portfolio.sousTitre || "",
        topTitle: portfolio.topTitle || "",
        couleur: portfolio.couleur || "",
        shortlist: portfolio.shortlist || "",
        temoignage: parsedTemoignage,
        bento: parsedBento,
      };

      setFormData(newFormData);
      setPreviewImage(portfolio.photoCouverture || null);
      setIsDataLoaded(true);
    }
  }, [portfolio, isDataLoaded]);

  // Gestion des retours de l'action
  useEffect(() => {
    if (actionData && isDataLoaded) {
      console.log("📡 Action data received:", actionData);
      if (actionData.success) {
        showToast(
          actionData.message || "Portfolio mis à jour avec succès!",
          "success"
        );
        // Recharger la page pour voir les modifications après un délai
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (actionData.error) {
        showToast(actionData.error, "error");
      }
    }
  }, [actionData, isDataLoaded]);

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
          setBentoFiles((prev) => {
            const newFiles = new Map(prev);
            newFiles.set(file.name, file);
            return newFiles;
          });

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
        const fileName = imageToRemove.replace("pending_", "");
        setBentoFiles((prevFiles) => {
          const newFiles = new Map(prevFiles);
          newFiles.delete(fileName);
          console.log(`🗑️ Fichier supprimé de bentoFiles: "${fileName}"`);
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
    console.log(`🔄 Ajout de ${files.length} fichiers au bento ${bentoIndex}`);

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        console.log(
          `📁 Ajout du fichier: "${file.name}" (taille: ${file.size})`
        );

        // Stocker le fichier réel pour l'envoi avec son nom comme clé
        setBentoFiles((prev) => {
          const newFiles = new Map(prev);
          newFiles.set(file.name, file);
          console.log(
            `📋 bentoFiles mis à jour, total: ${newFiles.size} fichiers`
          );
          console.log(`📁 Fichier ajouté: "${file.name}"`);
          return newFiles;
        });

        // Ajouter l'image pending au bento existant
        setFormData((prev) => {
          const newBento = [...prev.bento];

          // Trouver la dernière ligne ou créer une nouvelle ligne
          if (newBento[bentoIndex].lines.length === 0) {
            newBento[bentoIndex].lines.push({
              format: "1/3 - 2/3",
              listImage: [`pending_${file.name}`],
            });
            console.log(
              `➕ Nouvelle ligne créée pour bento ${bentoIndex} avec image: pending_${file.name}`
            );
          } else {
            // Ajouter à la dernière ligne
            const lastLineIndex = newBento[bentoIndex].lines.length - 1;
            newBento[bentoIndex].lines[lastLineIndex].listImage.push(
              `pending_${file.name}`
            );
            console.log(
              `➕ Image ajoutée à la ligne ${lastLineIndex} du bento ${bentoIndex}: pending_${file.name}`
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
      // Ne pas réinitialiser bentoFiles ici car on peut avoir plusieurs lignes par bento
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
      // Note: On ne réinitialise pas bentoFiles car il contient les fichiers de tous les bentos
    }
  };

  const removeBento = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bento: prev.bento.filter((_, i) => i !== index),
    }));
  };

  // Fonction pour afficher le toast
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    // Masquer le toast après 5 secondes
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 5000);
  };

  // Fonction de soumission personnalisée pour gérer les fichiers bento
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêcher la soumission par défaut

    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: "smooth" });

    const form = e.currentTarget;
    const submitFormData = new FormData(form);

    // S'assurer que les données bento sont correctement sérialisées
    console.log("📦 Structure bento avant envoi:", formData.bento);
    submitFormData.set("bento", JSON.stringify(formData.bento));

    // Ajouter les fichiers bento avec les noms corrects
    console.log(
      "🔍 Debug - bentoFiles disponibles:",
      Array.from(bentoFiles.keys())
    );
    console.log(
      "🔍 Debug - formData.bento:",
      JSON.stringify(formData.bento, null, 2)
    );

    formData.bento.forEach((bento, bentoIndex) => {
      let bentoImageIndex = 0; // Index local pour chaque bento
      bento.lines.forEach((line, lineIndex) => {
        line.listImage.forEach((image, imageIndex) => {
          // Si l'image commence par "pending_", c'est un fichier à uploader
          if (image.startsWith("pending_")) {
            const fileName = image.replace("pending_", "");
            console.log(`🔍 Recherche du fichier: "${fileName}"`);

            const file = bentoFiles.get(fileName);
            if (file) {
              // Utiliser l'index local pour chaque bento
              submitFormData.append(
                `bentoFile_${bentoIndex}_${bentoImageIndex}`,
                file
              );
              console.log(
                `📎 Ajout fichier: bentoFile_${bentoIndex}_${bentoImageIndex} -> ${fileName}`
              );
              bentoImageIndex++;
            } else {
              console.warn(
                `⚠️ Fichier non trouvé dans bentoFiles: "${fileName}"`
              );
              console.log(
                "📋 Fichiers disponibles:",
                Array.from(bentoFiles.keys()).map((name) => `"${name}"`)
              );
            }
          }
        });
      });
    });

    // Soumettre manuellement avec fetch
    try {
      console.log("🚀 Soumission du formulaire...");

      const response = await fetch(window.location.pathname, {
        method: "POST",
        body: submitFormData,
      });

      console.log("📡 Statut de la réponse:", response.status);
      console.log("📡 Headers de la réponse:", response.headers);

      const result = await response.json();
      console.log("📡 Réponse du serveur:", result);

      // Vérification plus robuste du succès
      const isSuccess =
        response.ok &&
        (result.success === true ||
          result.success === "true" ||
          response.status === 200);

      if (isSuccess) {
        console.log("✅ Portfolio mis à jour avec succès!");
        showToast("Portfolio mis à jour avec succès!", "success");

        // Recharger la page après un délai pour voir les changements
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("❌ Erreur détectée:");
        console.error("  - response.ok:", response.ok);
        console.error("  - response.status:", response.status);
        console.error("  - result.success:", result.success);
        console.error("  - result:", result);
        showToast(result.message || "Erreur lors de la mise à jour", "error");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la soumission:", error);
      showToast("Erreur lors de la mise à jour du portfolio", "error");
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
    <div className="min-h-screen bg-black p-8">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 transform ${
            toast.type === "success"
              ? "bg-green-900/90 border-green-700 text-green-100"
              : "bg-red-900/90 border-red-700 text-red-100"
          }`}
          style={{ fontFamily: "Jakarta" }}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" ? (
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() =>
                setToast({ show: false, message: "", type: "success" })
              }
              className="ml-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-4xl font-bold text-white mb-2"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              Modifier le Portfolio
            </h1>
            <p className="text-gray-300 mt-2" style={{ fontFamily: "Jakarta" }}>
              Slug: {portfolio.slug}
            </p>
            <p className="text-gray-300 mt-1" style={{ fontFamily: "Jakarta" }}>
              Titre: {portfolio.titre}
            </p>
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

        {/* Indicateur de chargement */}
        {!isDataLoaded && (
          <div className="mb-6 p-4 bg-blue-900/50 border border-blue-700 rounded-lg flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300 mr-2"></div>
            <p className="text-blue-300" style={{ fontFamily: "Jakarta" }}>
              Chargement des données du portfolio...
            </p>
          </div>
        )}

        <Form
          method="post"
          onSubmit={handleSubmit}
          className="space-y-8"
          encType="multipart/form-data"
        >
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              Informations générales
            </h2>
            <input
              type="hidden"
              name="bento"
              value={JSON.stringify(formData.bento)}
            />

            {/* Champ caché pour l'URL de la photo de couverture actuelle */}
            <input
              type="hidden"
              name="photoCouvertureUrl"
              value={formData.photoCouverture}
            />

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
                  htmlFor="titre"
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
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                {formData.bento.map((bento, bentoIndex) => (
                  <div
                    key={bentoIndex}
                    className="bg-gray-800/30 p-4 rounded-lg"
                  >
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
                        {/* Bouton pour ajouter des images à ce bento */}
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
                        <button
                          type="button"
                          onClick={() => removeBento(bentoIndex)}
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
                    </div>

                    {/* Affichage des lignes du bento avec possibilité de modification */}
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
                            <button
                              type="button"
                              onClick={() =>
                                removeExistingBentoLine(bentoIndex, lineIndex)
                              }
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                              title="Supprimer cette ligne"
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

                          {/* Grille des images avec possibilité de suppression individuelle */}
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
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Champ caché pour le bento */}
          <input
            type="hidden"
            name="bento"
            value={JSON.stringify(formData.bento)}
          />

          {/* Boutons de soumission */}
          <div className="flex gap-4 justify-end">
            <Link
              to="/admin/manage-portfolio"
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Annuler
            </Link>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Mettre à jour
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
