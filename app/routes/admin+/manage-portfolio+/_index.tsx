import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
} from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  Link,
  useFetcher,
} from "@remix-run/react";
import { useState, useEffect } from "react";
import { requireAuth, getSessionData } from "~/server/auth.server";
import {
  createPortfolio,
  getAllPortfolios,
  updatePortfolio,
  isSlugUnique,
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
import FormulaireAdmin from "~/components/Admin/FormulaireAdmin";

// Loader pour vérifier l'authentification et charger les portfolios
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await requireAuth(request);
    const sessionData = await getSessionData(request);
    const portfolios = await getAllPortfolios();
    return { sessionData, portfolios };
  } catch (error) {
    console.error("Erreur dans le loader manage-portfolio:", error);
    // Si c'est une erreur d'authentification, la laisser passer
    if (error instanceof Response) {
      throw error;
    }
    // Pour les autres erreurs, retourner un état vide
    const sessionData = await getSessionData(request);
    return { sessionData, portfolios: [] };
  }
}

// Action pour gérer la soumission du formulaire
export async function action({ request }: ActionFunctionArgs) {
  try {
    await requireAuth(request);

    // Parse les données du formulaire
    const formData = await parseFormData(request);

    // Extraire les données du portfolio
    const portfolioData = extractPortfolioData(formData);

    // Valider les données (incluant la vérification d'unicité du slug)
    const errors = await validatePortfolioDataAsync(
      portfolioData,
      isSlugUnique
    );
    if (errors.length > 0) {
      return createJsonResponse(false, errors.join(", "), undefined, 400);
    }

    // Créer d'abord le portfolio pour avoir l'ID
    const portfolioId = await createPortfolio(portfolioData);

    // Traiter les fichiers uploadés
    const photoCouverture = await processPhotoCouverture(formData, portfolioId);
    const photoMain = await processPhotoMain(formData, portfolioId);
    const updatedBento = await processBentoFiles(
      formData,
      portfolioId,
      portfolioData.bento
    );

    // Mettre à jour le portfolio avec les URLs finales
    await updatePortfolio(portfolioId, {
      photoCouverture,
      photoMain,
      bento: updatedBento,
    });

    return createJsonResponse(true, "Portfolio créé avec succès!", {
      portfolioId,
    });
  } catch (error) {
    return handleError(error, "la création du portfolio");
  }
}

export default function ManagePortfolio() {
  const { sessionData, portfolios } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const [resetTrigger, setResetTrigger] = useState(0);

  // Afficher le toast quand fetcher.data change après soumission
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        setToast({
          show: true,
          message: fetcher.data.message || "Portfolio créé avec succès!",
          type: "success",
        });
        // Déclencher le reset du formulaire
        setResetTrigger((prev) => prev + 1);

        // Recharger la page après un délai pour voir le nouveau portfolio
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

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Toast de notification */}
        {toast.show && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
              toast.type === "success"
                ? "bg-green-900/90 border border-green-700 text-green-300"
                : "bg-red-900/90 border border-red-700 text-red-300"
            }`}
            style={{ fontFamily: "Jakarta" }}
          >
            {toast.message}
          </div>
        )}

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

        {/* Formulaire principal */}
        <FormulaireAdmin
          actionData={fetcher.data}
          submitButtonText={
            fetcher.state === "submitting"
              ? "Création en cours..."
              : "Créer le Projet"
          }
          resetTrigger={resetTrigger}
          fetcher={fetcher}
        />
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
