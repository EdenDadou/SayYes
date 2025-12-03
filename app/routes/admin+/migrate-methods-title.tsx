import { type ActionFunctionArgs, json } from "@remix-run/node";
import { requireAuth } from "~/server/auth.server";
import { migrateBlocMethodsTitleToLineTitle } from "~/server/landing-page.server";

export async function action({ request }: ActionFunctionArgs) {
  await requireAuth(request);

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const migratedCount = await migrateBlocMethodsTitleToLineTitle();
    return json({
      success: true,
      message: `Migration terminée. ${migratedCount} landing page(s) mise(s) à jour.`,
    });
  } catch (error) {
    console.error("Erreur migration:", error);
    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
