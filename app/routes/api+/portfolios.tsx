import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
} from "@remix-run/node";
import {
  getAllPortfolios,
  getPublicPortfolios,
  deletePortfolio,
} from "~/server/portfolio.server";
import { requireAuth } from "~/server/auth.server";

// GET /api/portfolios - Récupérer tous les portfolios (publique)
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const isAdmin = url.searchParams.get("admin") === "true";

  try {
    if (isAdmin) {
      // Vérifier l'authentification pour l'accès admin
      await requireAuth(request);
      const portfolios = await getAllPortfolios();
      return json({ portfolios });
    } else {
      // Accès public - données limitées
      const portfolios = await getPublicPortfolios();
      return json({ portfolios });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des portfolios:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/portfolios - Supprimer un portfolio (admin seulement)
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "DELETE") {
    return json({ error: "Méthode non autorisée" }, { status: 405 });
  }

  try {
    await requireAuth(request);

    const body = await request.json();
    const { portfolioId } = body;

    if (!portfolioId) {
      return json({ error: "ID du portfolio requis" }, { status: 400 });
    }

    await deletePortfolio(portfolioId);
    return json({ success: true, message: "Portfolio supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du portfolio:", error);
    return json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la suppression",
      },
      { status: 500 }
    );
  }
}
