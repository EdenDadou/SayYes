import { writeFile, mkdir, unlink } from "fs/promises";
import { join, extname } from "path";
import { prisma } from "./db.server";
import type { MediaType } from "@prisma/client";

// Configuration des uploads - toujours utiliser public/uploads pour que Nginx puisse servir les fichiers
// Le serveur s'exécute toujours depuis la racine du projet (process.cwd() = /var/www/remix/)
const UPLOAD_DIR = "public/uploads";
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || "40485760"); // 10MB par défaut

// Types MIME autorisés
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Interface pour les informations de fichier uploadé
export interface UploadedFileInfo {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
  type: MediaType;
}

// Fonction pour déterminer le type de média
function getMediaType(mimetype: string): MediaType {
  if (ALLOWED_IMAGE_TYPES.includes(mimetype)) return "IMAGE";
  if (ALLOWED_VIDEO_TYPES.includes(mimetype)) return "VIDEO";
  if (ALLOWED_DOCUMENT_TYPES.includes(mimetype)) return "DOCUMENT";
  throw new Error(`Type de fichier non supporté: ${mimetype}`);
}

// Fonction pour valider un fichier
export function validateFile(file: File): void {
  console.log(
    `🔍 Validation fichier: ${file.name} (${file.size} bytes, type: "${file.type}")`
  );

  // Vérifier la taille
  if (file.size > MAX_FILE_SIZE) {
    const error = `Fichier trop volumineux. Taille: ${(file.size / 1024 / 1024).toFixed(2)}MB > Max: ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(2)}MB`;
    console.error(`❌ ${error}`);
    throw new Error(error);
  }

  // Vérifier le type MIME
  const allAllowedTypes = [
    ...ALLOWED_IMAGE_TYPES,
    ...ALLOWED_VIDEO_TYPES,
    ...ALLOWED_DOCUMENT_TYPES,
  ];
  if (!allAllowedTypes.includes(file.type)) {
    const error = `Type de fichier non supporté: "${file.type}". Types autorisés: ${allAllowedTypes.join(", ")}`;
    console.error(`❌ ${error}`);
    throw new Error(error);
  }

  console.log(`✅ Fichier validé: ${file.name}`);
}

// Fonction pour générer un nom de fichier unique
function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = extname(originalName);
  const baseName = originalName
    .replace(extension, "")
    .replace(/[^a-zA-Z0-9]/g, "_");
  return `${timestamp}_${randomString}_${baseName}${extension}`;
}

// Fonction pour sauvegarder un fichier et l'enregistrer en base
export async function saveMedia(
  file: File,
  folder: string = "general",
  portfolioId?: string
): Promise<UploadedFileInfo> {
  const isProduction = process.env.NODE_ENV === "production";
  console.log(
    `🔧 saveMedia() - Env: ${isProduction ? "PROD" : "DEV"}, File: ${file.name} (${file.size} bytes, ${file.type})`
  );

  // Valider le fichier
  validateFile(file);

  // Préparer les chemins
  const filename = generateUniqueFilename(file.name);
  const folderPath = join(process.cwd(), UPLOAD_DIR, folder);
  const filePath = join(folderPath, filename);
  const relativePath = `uploads/${folder}/${filename}`;
  const publicUrl = `/${relativePath}`;

  console.log(`📂 Chemin upload: ${folderPath}`);
  console.log(`📄 Fichier final: ${filePath}`);

  // Créer le dossier s'il n'existe pas
  await mkdir(folderPath, { recursive: true });
  console.log(`✅ Dossier créé/vérifié: ${folderPath}`);

  // Sauvegarder le fichier
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);

  console.log(`💾 Fichier écrit: ${filePath} (${buffer.length} bytes)`);

  // Enregistrer en base de données
  const mediaType = getMediaType(file.type);
  console.log(`📊 Enregistrement BDD - Type: ${mediaType}, URL: ${publicUrl}`);

  const media = await prisma.media.create({
    data: {
      filename,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      path: relativePath,
      url: publicUrl,
      type: mediaType,
      portfolioId: portfolioId || null,
    },
  });

  console.log(`✅ Média enregistré en BDD - ID: ${media.id}`);

  return {
    id: media.id,
    filename: media.filename,
    originalName: media.originalName,
    mimetype: media.mimetype,
    size: media.size,
    path: media.path,
    url: media.url,
    type: media.type,
  };
}

// Fonction pour supprimer un média
export async function deleteMedia(mediaId: string): Promise<void> {
  const media = await prisma.media.findUnique({
    where: { id: mediaId },
  });

  if (!media) {
    throw new Error("Média non trouvé");
  }

  // Supprimer le fichier physique
  try {
    const filePath = join(process.cwd(), "public", media.path);
    await unlink(filePath);
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier:", error);
    // On continue même si la suppression du fichier échoue
  }

  // Supprimer l'enregistrement en base
  await prisma.media.delete({
    where: { id: mediaId },
  });
}

// Fonction pour récupérer les médias d'un portfolio
export async function getPortfolioMedias(portfolioId: string) {
  return await prisma.media.findMany({
    where: { portfolioId },
    orderBy: { createdAt: "desc" },
  });
}

// Fonction pour récupérer tous les médias
export async function getAllMedias() {
  return await prisma.media.findMany({
    include: {
      portfolio: {
        select: {
          id: true,
          titre: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
