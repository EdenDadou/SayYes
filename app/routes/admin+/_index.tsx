import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { type ActionFunctionArgs } from "@remix-run/node";
import { verifyCredentials, createUserSession } from "~/server/auth.server";

// Action pour gérer la soumission du formulaire
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const login = formData.get("login");
  const password = formData.get("password");

  // Vérification que les champs sont des chaînes
  if (typeof login !== "string" || typeof password !== "string") {
    return { error: "Données de formulaire invalides" };
  }

  // Vérification des identifiants via la fonction sécurisée
  if (verifyCredentials(login, password)) {
    // Connexion réussie, création de session et redirection
    return await createUserSession(request);
  }

  // Connexion échouée, retourner une erreur
  return { error: "Identifiants incorrects" };
}

export default function AdminLogin() {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Titre */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "MADE Soulmaze" }}
          >
            SayYes
          </h1>
          <p className="text-white font-jakarta-bold">Administration</p>
        </div>

        {/* Formulaire */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Message d'erreur */}
          {actionData?.error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
              <p
                className="text-red-300 text-sm"
                style={{ fontFamily: "Jakarta" }}
              >
                {actionData.error}
              </p>
            </div>
          )}

          <Form method="post" className="space-y-6">
            {/* Champ Login */}
            <div>
              <label
                htmlFor="login"
                className="block text-sm font-medium text-gray-300 mb-2"
                style={{ fontFamily: "Jakarta Medium" }}
              >
                Identifiant
              </label>
              <input
                type="text"
                id="login"
                name="login"
                value={formData.login}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ fontFamily: "Jakarta" }}
                placeholder="Entrez votre identifiant"
              />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
                style={{ fontFamily: "Jakarta Medium" }}
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ fontFamily: "Jakarta" }}
                placeholder="Entrez votre mot de passe"
              />
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02]"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              Se connecter
            </button>
          </Form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p
            className="text-gray-300 text-sm"
            style={{ fontFamily: "Jakarta" }}
          >
            © 2024 SayYes. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
