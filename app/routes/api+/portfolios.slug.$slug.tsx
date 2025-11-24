import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { getPortfolioBySlug } from "~/server/portfolio.server";

// GET /api/portfolios/slug/:slug - Récupérer un portfolio par slug
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    return json({ error: "Slug du portfolio requis" }, { status: 400 });
  }

  try {
    const portfolio = await getPortfolioBySlug(slug);

    if (!portfolio) {
      return json({ error: "Portfolio non trouvé" }, { status: 404 });
    }

    return json({ portfolio });
  } catch (error) {
    console.error("Erreur lors de la récupération du portfolio:", error);
    return json({ error: "Erreur serveur" }, { status: 500 });
  }
}
