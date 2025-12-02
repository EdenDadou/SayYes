import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
} from "@remix-run/node";
import { useLoaderData, Link, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { requireAuth, getSessionData } from "~/server/auth.server";
import {
  getAllLandingPages,
  createLandingPage,
  deleteLandingPageBySlug,
  isLandingPageSlugUnique,
} from "~/server/landing-page.server";
import type { LandingPageSEO, Bloc } from "~/types/landing-page";
import LandingPageForm from "~/components/Admin/LandingPage/LandingPageForm";

// Loader pour vérifier l'authentification et charger les landing pages
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    await requireAuth(request);
    const sessionData = await getSessionData(request);
    const landingPages = await getAllLandingPages();

    // Lire le message flash depuis les cookies
    const cookies = request.headers.get("Cookie") || "";
    const flashMessage = cookies.match(/flash-message=([^;]*)/)?.[1];

    return {
      sessionData,
      landingPages,
      flashMessage: flashMessage ? decodeURIComponent(flashMessage) : null,
    };
  } catch (error) {
    console.error("Erreur dans le loader manage-landing-page:", error);
    if (error instanceof Response) {
      throw error;
    }
    const sessionData = await getSessionData(request);
    return { sessionData, landingPages: [], flashMessage: null };
  }
}

// Action pour gérer la soumission du formulaire
export async function action({ request }: ActionFunctionArgs) {
  try {
    await requireAuth(request);

    // Gérer la suppression
    if (request.method === "DELETE") {
      const formData = await request.formData();
      const slug = formData.get("slug") as string;

      if (!slug) {
        return json(
          { success: false, message: "Slug requis pour la suppression" },
          { status: 400 }
        );
      }

      await deleteLandingPageBySlug(slug);
      return json({
        success: true,
        message: "Landing page supprimée avec succès!",
      });
    }

    // Création d'une landing page
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const color = formData.get("color") as string;
    const seoString = formData.get("seo") as string;
    const blocsString = formData.get("blocs") as string;

    // Validation
    if (!title || !slug) {
      return json(
        { success: false, message: "Titre et slug sont requis" },
        { status: 400 }
      );
    }

    // Vérifier l'unicité du slug
    const isUnique = await isLandingPageSlugUnique(slug);
    if (!isUnique) {
      return json(
        { success: false, message: "Ce slug est déjà utilisé" },
        { status: 400 }
      );
    }

    // Parser les données JSON
    let seo: LandingPageSEO;
    let blocs: Bloc[];
    try {
      seo = JSON.parse(seoString || "{}");
      blocs = JSON.parse(blocsString || "[]");
    } catch {
      return json(
        { success: false, message: "Données SEO ou blocs invalides" },
        { status: 400 }
      );
    }

    // Créer la landing page
    await createLandingPage({
      title,
      slug,
      color: color || "#000000",
      seo,
      blocs,
    });

    return json({
      success: true,
      message: "Landing page créée avec succès!",
    });
  } catch (error) {
    console.error("Erreur dans l'action manage-landing-page:", error);
    return json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Une erreur est survenue",
      },
      { status: 500 }
    );
  }
}

export default function ManageLandingPage() {
  const { landingPages, flashMessage } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const deleteFetcher = useFetcher<typeof action>();

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const [activeTab, setActiveTab] = useState<"existing" | "create">("existing");
  const [resetTrigger, setResetTrigger] = useState(0);

  // Afficher le message flash au chargement de la page
  useEffect(() => {
    if (flashMessage) {
      setToast({
        show: true,
        message: flashMessage,
        type: "success",
      });

      setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
      }, 5000);
    }
  }, [flashMessage]);

  // Gérer les réponses du fetcher (création)
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        setToast({
          show: true,
          message:
            fetcher.data.message || "Landing page créée avec succès!",
          type: "success",
        });
        setResetTrigger((prev) => prev + 1);

        setTimeout(() => {
          setActiveTab("existing");
          window.location.reload();
        }, 1500);
      } else {
        setToast({
          show: true,
          message: fetcher.data.message || "Une erreur est survenue",
          type: "error",
        });
      }

      setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
      }, 5000);
    }
  }, [fetcher.data]);

  // Gérer les réponses du deleteFetcher
  useEffect(() => {
    if (deleteFetcher.data) {
      if (deleteFetcher.data.success) {
        setToast({
          show: true,
          message:
            deleteFetcher.data.message || "Landing page supprimée avec succès!",
          type: "success",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setToast({
          show: true,
          message:
            deleteFetcher.data.message || "Erreur lors de la suppression",
          type: "error",
        });
      }

      setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
      }, 5000);
    }
  }, [deleteFetcher.data]);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
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
              Gestion Landing Pages
            </h1>
            <p className="text-white/80" style={{ fontFamily: "Jakarta" }}>
              {activeTab === "existing"
                ? "Gérer vos landing pages existantes"
                : "Créer une nouvelle landing page"}
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

        {/* Onglets */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("existing")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "existing"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-100 hover:text-gray-300 hover:border-gray-600"
                }`}
                style={{ fontFamily: "Jakarta Semi Bold" }}
              >
                Landing pages existantes ({landingPages.length})
              </button>
              <button
                onClick={() => setActiveTab("create")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "create"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-100 hover:text-gray-300 hover:border-gray-600"
                }`}
                style={{ fontFamily: "Jakarta Semi Bold" }}
              >
                Créer une landing page
              </button>
            </nav>
          </div>
        </div>

        {/* Contenu des onglets */}
        {activeTab === "create" && (
          <div className="mb-8">
            <LandingPageForm
              fetcher={fetcher}
              submitButtonText={
                fetcher.state === "submitting"
                  ? "Création en cours..."
                  : "Créer la landing page"
              }
              resetTrigger={resetTrigger}
            />
          </div>
        )}

        {activeTab === "existing" && (
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              Landing pages existantes ({landingPages.length})
            </h2>

            {landingPages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/70 mb-4">
                  Aucune landing page créée pour le moment.
                </p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                  style={{ fontFamily: "Jakarta Semi Bold" }}
                >
                  Créer votre première landing page
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {landingPages.map((landingPage) => (
                  <div
                    key={landingPage.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors duration-200"
                  >
                    {/* Barre de couleur */}
                    <div
                      className="h-2"
                      style={{ backgroundColor: landingPage.color }}
                    />

                    {/* Contenu */}
                    <div className="p-4">
                      <h3
                        className="font-semibold text-lg text-white mb-1"
                        style={{ fontFamily: "Jakarta Semi Bold" }}
                      >
                        {landingPage.title}
                      </h3>

                      <p className="text-white/70 text-sm mb-3">
                        /{landingPage.slug}
                      </p>

                      <p className="text-white/60 text-xs mb-3">
                        {landingPage.blocs.length} bloc
                        {landingPage.blocs.length !== 1 ? "s" : ""}
                      </p>

                      {/* Métadonnées */}
                      <div className="text-xs text-white/60 mb-3">
                        Créé le{" "}
                        {new Date(landingPage.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/manage-landing-page/${landingPage.slug}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition-colors duration-200"
                        >
                          Modifier
                        </Link>
                        <button
                          type="button"
                          className={`text-white text-sm px-3 py-1 rounded transition-colors duration-200 ${
                            deleteFetcher.state === "submitting"
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                          disabled={deleteFetcher.state === "submitting"}
                          onClick={() => {
                            if (
                              confirm(
                                "Êtes-vous sûr de vouloir supprimer cette landing page ? Cette action est irréversible."
                              )
                            ) {
                              const formData = new FormData();
                              formData.append("slug", landingPage.slug);

                              deleteFetcher.submit(formData, {
                                method: "delete",
                              });
                            }
                          }}
                        >
                          {deleteFetcher.state === "submitting"
                            ? "Suppression..."
                            : "Supprimer"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
