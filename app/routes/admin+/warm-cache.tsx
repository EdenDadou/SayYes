import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { requireAuth } from "~/server/auth.server";
import { getPublicPortfolios } from "~/server/portfolio.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAuth(request);

  const baseUrl = new URL(request.url).origin;
  const portfolios = await getPublicPortfolios();

  // Collecter toutes les URLs d'images uniques (photoMain + photoCouverture)
  const imageUrls = new Set<string>();
  portfolios.forEach((p) => {
    if (p.photoMain) imageUrls.add(p.photoMain);
    if (p.photoCouverture) imageUrls.add(p.photoCouverture);
  });

  const sizes = [640, 1280];
  const requests: Promise<Response>[] = [];

  imageUrls.forEach((url) => {
    sizes.forEach((w) => {
      requests.push(
        fetch(
          `${baseUrl}/api/image?src=${encodeURIComponent(url)}&w=${w}&q=80`
        )
      );
    });
  });

  const results = await Promise.allSettled(requests);
  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  return json({
    success: true,
    total: requests.length,
    succeeded,
    failed,
    images: imageUrls.size,
  });
}

export default function WarmCache() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isWarming = navigation.state === "submitting";

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Pré-chauffe du cache image</h1>
      <p className="text-gray-600 mb-6">
        Déclenche le traitement Sharp pour toutes les images de portfolios aux
        tailles 640px et 1280px. À utiliser après un redémarrage serveur ou un
        déploiement.
      </p>

      <Form method="post">
        <button
          type="submit"
          disabled={isWarming}
          className="px-6 py-3 bg-black text-white rounded-lg font-semibold disabled:opacity-50"
        >
          {isWarming ? "Chauffe en cours..." : "Lancer le warm-up"}
        </button>
      </Form>

      {actionData?.success && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="font-semibold text-green-800">Terminé ✓</p>
          <p className="text-green-700 text-sm mt-1">
            {actionData.images} images × {2} tailles ={" "}
            {actionData.total} requêtes
          </p>
          <p className="text-green-700 text-sm">
            ✓ {actionData.succeeded} succès · ✗ {actionData.failed} échecs
          </p>
        </div>
      )}
    </div>
  );
}
