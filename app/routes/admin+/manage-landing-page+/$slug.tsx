import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
  json,
} from "@remix-run/node";
import { useLoaderData, Link, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import { requireAuth, getSessionData } from "~/server/auth.server";
import {
  getLandingPageBySlug,
  updateLandingPageBySlug,
  deleteLandingPageBySlug,
  isLandingPageSlugUnique,
} from "~/server/landing-page.server";
import type { LandingPageSEO, Bloc } from "~/types/landing-page";
import LandingPageForm from "~/components/Admin/LandingPage/LandingPageForm";

// Loader pour charger la landing page à éditer
export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAuth(request);
  const sessionData = await getSessionData(request);

  const { slug } = params;

  if (!slug) {
    throw new Response("Slug de la landing page requis", { status: 400 });
  }

  const landingPage = await getLandingPageBySlug(slug);

  if (!landingPage) {
    throw new Response("Landing page non trouvée", { status: 404 });
  }

  return { sessionData, landingPage };
}

// Action pour gérer la mise à jour et la suppression
export async function action({ request, params }: ActionFunctionArgs) {
  await requireAuth(request);

  const { slug } = params;
  if (!slug) {
    return json(
      { success: false, message: "Slug de la landing page requis" },
      { status: 400 }
    );
  }

  try {
    // Récupérer la landing page actuelle
    const currentLandingPage = await getLandingPageBySlug(slug);
    if (!currentLandingPage) {
      return json(
        { success: false, message: "Landing page non trouvée" },
        { status: 404 }
      );
    }

    if (request.method === "DELETE") {
      await deleteLandingPageBySlug(slug);

      return redirect("/admin/manage-landing-page", {
        headers: {
          "Set-Cookie":
            "flash-message=Landing page supprimée avec succès!; Path=/; HttpOnly; Max-Age=10",
        },
      });
    }

    // Mise à jour
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const newSlug = formData.get("slug") as string;
    const color = formData.get("color") as string;
    const seoString = formData.get("seo") as string;
    const blocsString = formData.get("blocs") as string;

    // Validation
    if (!title || !newSlug) {
      return json(
        { success: false, message: "Titre et slug sont requis" },
        { status: 400 }
      );
    }

    // Vérifier l'unicité du slug si modifié
    if (newSlug !== slug) {
      const isUnique = await isLandingPageSlugUnique(
        newSlug,
        currentLandingPage.id
      );
      if (!isUnique) {
        return json(
          { success: false, message: "Ce slug est déjà utilisé" },
          { status: 400 }
        );
      }
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

    // Mettre à jour
    await updateLandingPageBySlug(slug, {
      title,
      slug: newSlug,
      color: color || "#000000",
      seo,
      blocs,
    });

    // Si le slug a changé, rediriger vers la nouvelle URL
    if (newSlug !== slug) {
      return redirect(`/admin/manage-landing-page/${newSlug}`, {
        headers: {
          "Set-Cookie":
            "flash-message=Landing page mise à jour avec succès!; Path=/; HttpOnly; Max-Age=10",
        },
      });
    }

    return json({
      success: true,
      message: "Landing page mise à jour avec succès!",
    });
  } catch (error) {
    console.error(`Erreur dans l'action pour ${slug}:`, error);

    if (request.method === "DELETE") {
      return json(
        {
          success: false,
          message: `Erreur lors de la suppression: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
        },
        { status: 500 }
      );
    }

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

export default function EditLandingPage() {
  const { landingPage } = useLoaderData<typeof loader>();
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
          message:
            fetcher.data.message || "Landing page mise à jour avec succès!",
          type: "success",
        });

        setTimeout(() => {
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

  // Fonction pour supprimer la landing page
  const handleDelete = async () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir supprimer cette landing page ? Cette action est irréversible."
      )
    ) {
      try {
        const response = await fetch(
          `/admin/manage-landing-page/${landingPage.slug}`,
          {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          setToast({
            show: true,
            message: `Erreur lors de la suppression de la landing page (${response.status})`,
            type: "error",
          });
        }
      } catch (error) {
        setToast({
          show: true,
          message: `Erreur lors de la suppression: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
          type: "error",
        });
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
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() =>
                setToast({ show: false, message: "", type: "success" })
              }
              className="ml-2 text-white/60 hover:text-white transition-colors"
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-4xl font-bold text-white mb-2"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              Modifier la Landing Page
            </h1>
            <p className="text-white/80 mt-2" style={{ fontFamily: "Jakarta" }}>
              Slug: /{landingPage.slug}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/manage-landing-page"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Retour
            </Link>
          </div>
        </div>

        {/* Formulaire d'édition */}
        <LandingPageForm
          initialData={{
            title: landingPage.title,
            slug: landingPage.slug,
            color: landingPage.color,
            seo: landingPage.seo,
            blocs: landingPage.blocs,
          }}
          fetcher={fetcher}
          submitButtonText={
            fetcher.state === "submitting"
              ? "Mise à jour en cours..."
              : "Mettre à jour"
          }
          isEditing={true}
          onDelete={handleDelete}
          showDeleteButton={true}
        />
      </div>
    </div>
  );
}
