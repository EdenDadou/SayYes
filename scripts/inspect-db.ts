#!/usr/bin/env tsx

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function inspectDatabase() {
  console.log("🔍 Inspection de la base de données\n");

  try {
    // Compter les enregistrements
    const portfolioCount = await prisma.portfolio.count();
    const mediaCount = await prisma.media.count();

    console.log("📊 Statistiques :");
    console.log(`- Portfolios : ${portfolioCount}`);
    console.log(`- Médias : ${mediaCount}\n`);

    // Lister tous les portfolios
    if (portfolioCount > 0) {
      console.log("📁 Portfolios :");
      const portfolios = await prisma.portfolio.findMany({
        include: {
          medias: {
            select: {
              id: true,
              filename: true,
              type: true,
            },
          },
        },
      });

      portfolios.forEach((portfolio, index) => {
        console.log(`${index + 1}. ${portfolio.titre}`);
        console.log(`   ID: ${portfolio.id}`);
        console.log(
          `   Description: ${portfolio.description.substring(0, 50)}...`
        );
        console.log(`   Médias associés: ${portfolio.medias.length}`);
        console.log(
          `   Créé le: ${portfolio.createdAt.toLocaleDateString("fr-FR")}`
        );
        console.log("");
      });
    }

    // Lister tous les médias
    if (mediaCount > 0) {
      console.log("🖼️  Médias :");
      const medias = await prisma.media.findMany({
        include: {
          portfolio: {
            select: {
              titre: true,
            },
          },
        },
      });

      medias.forEach((media, index) => {
        console.log(`${index + 1}. ${media.originalName} (${media.type})`);
        console.log(`   ID: ${media.id}`);
        console.log(`   Taille: ${(media.size / 1024).toFixed(2)} KB`);
        console.log(`   URL: ${media.url}`);
        console.log(`   Portfolio: ${media.portfolio?.titre || "Aucun"}`);
        console.log("");
      });
    }

    if (portfolioCount === 0 && mediaCount === 0) {
      console.log(
        "🤷 La base de données est vide. Créez votre premier portfolio via l'interface admin !"
      );
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'inspection :", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
inspectDatabase();
