import { json, type ActionFunctionArgs } from "@remix-run/node";
import nodemailer from "nodemailer";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;

    // Validation
    if (!name || !email) {
      return json(
        { error: "Le nom et l'email sont obligatoires" },
        { status: 400 }
      );
    }

    // Configuration du transporteur Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.BREVOS_SMTP_SERVER || "smtp-relay.brevo.com",
      port: parseInt(process.env.BREVOS_PORT || "587"),
      secure: false, // true pour le port 465, false pour les autres ports
      auth: {
        user: process.env.BREVOS_LOGIN || "",
        pass: process.env.BREVOS_API_KEY || "",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Vérification de la configuration
    console.log("Configuration SMTP:", {
      host: process.env.BREVOS_SMTP_SERVER,
      port: process.env.BREVOS_PORT,
      user: process.env.BREVOS_LOGIN,
      hasPassword: !!process.env.BREVOS_API_KEY,
    });

    // Préparation du contenu de l'email
    const emailContent = `
Nouvelle demande de contact depuis Say Yes

Nom et prénom: ${name}
Email: ${email}
Mobile: ${mobile || "Non renseigné"}
Entreprise: ${company || "Non renseignée"}

Message:
${message || "Aucun message"}
    `.trim();

    // Vérification de la connexion
    try {
      await transporter.verify();
      console.log("✓ Serveur SMTP prêt à envoyer des emails");
    } catch (verifyError) {
      console.error("✗ Erreur de vérification SMTP:", verifyError);
    }

    // Envoi de l'email
    await transporter.sendMail({
      from: `"La Sainte Paire" <javier@lasaintepaire.com>`, // Utilise l'adresse du compte Brevo
      to: "edenw@hotmail.fr", // adresse de destination
      replyTo: email, // L'email du client pour pouvoir répondre directement
      subject: `Nouvelle demande de contact - ${name}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouvelle demande de contact depuis Say Yes</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Nom et prénom:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${mobile || "Non renseigné"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Entreprise:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || "Non renseignée"}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <strong>Message:</strong>
            <p style="margin-top: 10px; white-space: pre-wrap;">${message || "Aucun message"}</p>
          </div>
        </div>
      `,
    });

    return json({ success: true, message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return json(
      {
        error: "Une erreur est survenue lors de l'envoi du message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
