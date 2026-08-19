-- CreateTable
CREATE TABLE "Euromuenzset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artikelnummer" TEXT,
    "name" TEXT NOT NULL,
    "land" TEXT NOT NULL,
    "qualitaet" TEXT NOT NULL,
    "jahrgang" INTEGER NOT NULL,
    "anzahl" INTEGER NOT NULL DEFAULT 1,
    "wertInCent" INTEGER
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

-- CreateTable
CREATE TABLE "Sondermuenze" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "motiv" TEXT NOT NULL,
    "nennwertInCent" INTEGER NOT NULL,
    "material" TEXT NOT NULL,
    "reinheit" TEXT NOT NULL,
    "gewichtInGramm" REAL,
    "jahrgang" INTEGER,
    "praegestaette" TEXT,
    "erhaltung" TEXT,
    "zertifikat" BOOLEAN NOT NULL DEFAULT false,
    "schatulle" BOOLEAN NOT NULL DEFAULT false,
    "kapsel" BOOLEAN NOT NULL DEFAULT true,
    "kaufpreisInCent" INTEGER,
    "auflage" INTEGER,
    "anzahl" INTEGER NOT NULL DEFAULT 1,
    "notizen" TEXT
);
