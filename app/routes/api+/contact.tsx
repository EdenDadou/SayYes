import { json, type ActionFunctionArgs } from "@remix-run/node";
import dns from "dns";
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

    // Configuration du transporteur Brevo (force IPv4 pour éviter le timeout IPv6)
    const transporter = nodemailer.createTransport({
      host: process.env.BREVOS_SMTP_SERVER || "smtp-relay.brevo.com",
      port: parseInt(process.env.BREVOS_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.BREVOS_LOGIN || "",
        pass: process.env.BREVOS_API_KEY || "",
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
      lookup: (hostname, options, callback) => {
        dns.lookup(hostname, { ...options, family: 4 }, callback);
      },
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

    const mailOptions = {
      from: `"Say Yes" <${process.env.BREVOS_FROM_EMAIL || process.env.BREVOS_LOGIN}>`,
      to: "javier@lasaintepaire.com",
      replyTo: email,
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
    };

    // Fire-and-forget : retourner succès immédiatement, envoyer en arrière-plan
    transporter.sendMail(mailOptions).catch((err) => {
      console.error("[contact] Erreur envoi email:", err);
    });

    return json({ success: true, message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("[contact] Erreur:", error);
    return json(
      {
        error: "Une erreur est survenue lors de l'envoi du message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
