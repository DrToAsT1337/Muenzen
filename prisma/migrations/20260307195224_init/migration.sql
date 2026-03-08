-- CreateTable
CREATE TABLE "Euromuenzset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artikelnummer" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "land" TEXT NOT NULL,
    "qualitaet" TEXT NOT NULL,
    "jahrgang" INTEGER NOT NULL,
    "praegeort" TEXT,
    "anzahl" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Euromuenzeinzel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artikelnummer" TEXT,
    "wertInCent" INTEGER NOT NULL,
    "land" TEXT NOT NULL,
    "praegestaette" TEXT,
    "anzahl" INTEGER NOT NULL DEFAULT 1
);
