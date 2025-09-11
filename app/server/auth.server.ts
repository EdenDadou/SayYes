import { createCookieSessionStorage, redirect } from "@remix-run/node";

// Configuration sécurisée des identifiants
const ADMIN_CREDENTIALS = {
  login: process.env.ADMIN_LOGIN || "SayYes",
  password: process.env.ADMIN_PASSWORD || "Sisiiiiiiii",
};

// Configuration de la session sécurisée
const sessionSecret =
  process.env.SESSION_SECRET || "default-secret-change-in-production";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
      sameSite: "lax",
      secrets: [sessionSecret],
      secure: process.env.NODE_ENV === "production",
    },
  });

// Fonction pour vérifier les identifiants
export function verifyCredentials(login: string, password: string): boolean {
  return (
    login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password
  );
}

// Fonction pour créer une session utilisateur
export async function createUserSession(
  request: Request,
  redirectTo: string = "/admin/dashboard"
) {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("isAuthenticated", true);
  session.set("loginTime", new Date().toISOString());

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

// Fonction pour vérifier si l'utilisateur est connecté
export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const isAuthenticated = session.get("isAuthenticated");

  if (!isAuthenticated) {
    throw redirect("/admin");
  }

  return session;
}

// Fonction pour déconnecter l'utilisateur
export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/admin", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

// Fonction pour obtenir les informations de session
export async function getSessionData(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    isAuthenticated: session.get("isAuthenticated") || false,
    loginTime: session.get("loginTime"),
  };
}
