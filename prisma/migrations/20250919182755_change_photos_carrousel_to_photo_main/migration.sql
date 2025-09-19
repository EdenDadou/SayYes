/*
  Warnings:

  - You are about to drop the column `photosCarrousel` on the `portfolios` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_portfolios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "categories" TEXT NOT NULL DEFAULT '[]',
    "slug" TEXT NOT NULL,
    "photoCouverture" TEXT NOT NULL,
    "photoMain" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "kicker" TEXT NOT NULL,
    "sousTitre" TEXT NOT NULL,
    "topTitle" TEXT NOT NULL DEFAULT '',
    "couleur" TEXT NOT NULL DEFAULT '',
    "temoignage" TEXT NOT NULL DEFAULT '{"auteur":"","contenu":""}',
    "livrable" TEXT NOT NULL,
    "bento" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_portfolios" ("bento", "categories", "couleur", "createdAt", "description", "id", "kicker", "livrable", "photoCouverture", "slug", "sousTitre", "temoignage", "titre", "topTitle", "updatedAt") SELECT "bento", "categories", "couleur", "createdAt", "description", "id", "kicker", "livrable", "photoCouverture", "slug", "sousTitre", "temoignage", "titre", "topTitle", "updatedAt" FROM "portfolios";
DROP TABLE "portfolios";
ALTER TABLE "new_portfolios" RENAME TO "portfolios";
CREATE UNIQUE INDEX "portfolios_slug_key" ON "portfolios"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
