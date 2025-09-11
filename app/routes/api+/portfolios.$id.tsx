import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
} from "@remix-run/node";
import {
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "~/server/portfolio.server";
import { requireAuth } from "~/server/auth.server";

// GET /api/portfolios/:id - Récupérer un portfolio spécifique
export async function loader({ params, request }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    return json({ error: "ID du portfolio requis" }, { status: 400 });
  }

  try {
    const portfolio = await getPortfolio(id);

    if (!portfolio) {
      return json({ error: "Portfolio non trouvé" }, { status: 404 });
    }

    return json({ portfolio });
  } catch (error) {
    console.error("Erreur lors de la récupération du portfolio:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT /api/portfolios/:id - Mettre à jour un portfolio (admin seulement)
export async function action({ params, request }: ActionFunctionArgs) {
  const { id } = params;

  if (!id) {
    return json({ error: "ID du portfolio requis" }, { status: 400 });
  }

  if (request.method === "PUT") {
    try {
      await requireAuth(request);

      const body = await request.json();
      await updatePortfolio(id, body);

      return json({
        success: true,
        message: "Portfolio mis à jour avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du portfolio:", error);
      return json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Erreur lors de la mise à jour",
        },
        { status: 500 }
      );
    }
  }

  if (request.method === "DELETE") {
    try {
      await requireAuth(request);

      await deletePortfolio(id);

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

  return json({ error: "Méthode non autorisée" }, { status: 405 });
}
