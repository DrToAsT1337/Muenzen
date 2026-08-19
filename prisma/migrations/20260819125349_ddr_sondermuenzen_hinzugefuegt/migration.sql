-- CreateTable
CREATE TABLE "DdrSondermuenze" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "katalogNummer" TEXT,
    "motiv" TEXT NOT NULL,
    "nennwertMark" INTEGER,
    "material" TEXT NOT NULL,
    "reinheit" TEXT,
    "gewichtInGramm" REAL,
    "jahrgang" INTEGER NOT NULL,
    "erhaltung" TEXT NOT NULL,
    "inFolie" BOOLEAN NOT NULL DEFAULT false,
    "kapsel" BOOLEAN NOT NULL DEFAULT false,
    "auflage" INTEGER,
    "anzahl" INTEGER NOT NULL DEFAULT 1,
    "notizen" TEXT
);
