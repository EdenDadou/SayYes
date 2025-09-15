import { type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, Link } from "@remix-run/react";
import { requireAuth, getSessionData, logout } from "~/server/auth.server";
import { getPortfolioCount } from "~/server/portfolio.server";

// Loader pour vérifier l'authentification
export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request); // Vérification de l'authentification
  const sessionData = await getSessionData(request);
  const portfolioCount = await getPortfolioCount();
  return { sessionData, portfolioCount };
}

// Action pour gérer la déconnexion
export async function action({ request }: LoaderFunctionArgs) {
  return await logout(request);
}

export default function AdminDashboard() {
  const { sessionData, portfolioCount } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 font-jakarta-bold">
              Dashboard Admin
            </h1>
            <p className="text-gray-300" style={{ fontFamily: "Jakarta" }}>
              Bienvenue dans l'administration SayYes
            </p>
            {sessionData.loginTime && (
              <p
                className="text-gray-300 text-sm mt-1"
                style={{ fontFamily: "Jakarta" }}
              >
                Connecté depuis :{" "}
                {new Date(sessionData.loginTime).toLocaleString("fr-FR")}
              </p>
            )}
          </div>
          <Form method="post">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Se déconnecter
            </button>
          </Form>
        </div>

        {/* Cards de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h3
              className="text-lg font-semibold text-white mb-2"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Temoignages
            </h3>
            <p
              className="text-3xl font-bold text-blue-500"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              24
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h3
              className="text-lg font-semibold text-white mb-2"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Projets
            </h3>
            <p
              className="text-3xl font-bold text-green-500"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              {portfolioCount}
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h3
              className="text-lg font-semibold text-white mb-2"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Visites ce mois-ci
            </h3>
            <p
              className="text-3xl font-bold text-gray-300"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              2210
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-6">
            <h3
              className="text-lg font-semibold text-white mb-2"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Visites totales
            </h3>
            <p
              className="text-3xl font-bold text-yellow-500"
              style={{ fontFamily: "Jakarta Bold" }}
            >
              100k+
            </p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-8">
          <h2
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "Jakarta Bold" }}
          >
            Actions rapides
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Nouveau Temoignage
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              style={{ fontFamily: "Jakarta Semi Bold" }}
              onClick={() => navigate("/admin/manage-portfolio")}
            >
              Gérer portfolio
            </button>

            <button
              className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Paramètres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
