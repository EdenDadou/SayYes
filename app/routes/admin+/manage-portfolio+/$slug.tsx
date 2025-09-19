import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Link, useNavigate, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { requireAuth, getSessionData } from "~/server/auth.server";
import {
  getPortfolioBySlug,
  updatePortfolioBySlug,
  deletePortfolioBySlug,
  isSlugUnique,
  type PortfolioData,
  type PortfolioWithMedia,
} from "~/server/portfolio.server";
import {
  parseFormData,
  extractPortfolioData,
  processPhotoCouverture,
  processPhotoMain,
  processBentoFiles,
  validatePortfolioDataAsync,
  createJsonResponse,
  handleError,
} from "~/utils/admin/manage-portfolio";
import { CloseIcon, SuccessIcon, ErrorIcon } from "~/components/icons";
import FormulaireAdmin from "~/components/Admin/FormulaireAdmin";

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

    // Récupérer le portfolio pour obtenir l'ID nécessaire
    const portfolio = await getPortfolioBySlug(slug);
    if (!portfolio) {
      return createJsonResponse(false, "Portfolio non trouvé", undefined, 404);
    }

    // Parse les données du formulaire
    const formData = await parseFormData(request);

    // Extraire les données du portfolio
    const portfolioData = extractPortfolioData(formData);

    // Valider les données (incluant la vérification d'unicité du slug, en excluant le portfolio actuel)
    const errors = await validatePortfolioDataAsync(
      portfolioData,
      isSlugUnique,
      portfolio.id
    );
    if (errors.length > 0) {
      return createJsonResponse(false, errors.join(", "), undefined, 400);
    }

    // Traiter les fichiers uploadés
    const photoCouverture = await processPhotoCouverture(
      formData,
      portfolio.id,
      portfolio.photoCouverture
    );
    const photoMain = await processPhotoMain(
      formData,
      portfolio.id,
      portfolio.photoMain
    );
    const updatedBento = await processBentoFiles(
      formData,
      portfolio.id,
      portfolioData.bento
    );

    // Mettre à jour en base de données
    await updatePortfolioBySlug(slug, {
      ...portfolioData,
      photoCouverture,
      photoMain,
      bento: updatedBento,
    });

    return createJsonResponse(true, "Portfolio mis à jour avec succès!");
  } catch (error) {
    return handleError(error, "la mise à jour du portfolio");
  }
}

export default function EditPortfolio() {
  const { sessionData, portfolio } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  // Afficher le toast quand fetcher.data change après soumission
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        setToast({
          show: true,
          message: fetcher.data.message || "Portfolio mis à jour avec succès!",
          type: "success",
        });

        // Recharger la page après un délai pour voir les changements
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setToast({
          show: true,
          message:
            fetcher.data.message ||
            fetcher.data.error ||
            "Une erreur est survenue",
          type: "error",
        });
      }

      // Masquer le toast après 5 secondes
      setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
      }, 5000);
    }
  }, [fetcher.data]);

  // Fonction de soumission utilisant fetcher
  const handleSubmit = async (formData: FormData) => {
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetcher.submit(formData, { method: "POST" });
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
              <SuccessIcon className="w-5 h-5 text-green-400" />
            ) : (
              <ErrorIcon className="w-5 h-5 text-red-400" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() =>
                setToast({ show: false, message: "", type: "success" })
              }
              className="ml-2 text-gray-400 hover:text-white transition-colors"
            >
              <CloseIcon />
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
          </div>
        </div>

        {/* Utiliser le composant FormulaireAdmin en mode édition */}
        <FormulaireAdmin
          onSubmit={handleSubmit}
          initialData={portfolio as any}
          submitButtonText={
            fetcher.state === "submitting"
              ? "Mise à jour en cours..."
              : "Mettre à jour"
          }
          isEditing={true}
          onDelete={handleDelete}
          showDeleteButton={true}
          portfolioSlug={portfolio.slug}
          fetcher={fetcher}
          actionData={fetcher.data}
        />
      </div>
    </div>
  );
}
