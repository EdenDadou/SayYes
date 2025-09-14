-- CreateTable
CREATE TABLE "portfolios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "photoCouverture" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "kicker" TEXT NOT NULL,
    "sousTitre" TEXT NOT NULL,
    "livrable" TEXT NOT NULL,
    "bento" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "medias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "portfolioId" TEXT,
    CONSTRAINT "medias_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "solutions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_slug_key" ON "portfolios"("slug");
