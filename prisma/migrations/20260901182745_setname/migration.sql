/*
  Warnings:

  - Added the required column `setname` to the `Sondermuenze` table without a default value. This is not possible if the table is not empty.
  - Made the column `gewichtInGramm` on table `Sondermuenze` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jahrgang` on table `Sondermuenze` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sondermuenze" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "motiv" TEXT NOT NULL,
    "setname" TEXT NOT NULL,
    "nennwertInCent" INTEGER NOT NULL,
    "material" TEXT NOT NULL,
    "reinheit" TEXT NOT NULL,
    "gewichtInGramm" REAL NOT NULL,
    "jahrgang" INTEGER NOT NULL,
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
INSERT INTO "new_Sondermuenze" ("anzahl", "auflage", "erhaltung", "gewichtInGramm", "id", "jahrgang", "kapsel", "kaufpreisInCent", "material", "motiv", "nennwertInCent", "notizen", "praegestaette", "reinheit", "schatulle", "zertifikat") SELECT "anzahl", "auflage", "erhaltung", "gewichtInGramm", "id", "jahrgang", "kapsel", "kaufpreisInCent", "material", "motiv", "nennwertInCent", "notizen", "praegestaette", "reinheit", "schatulle", "zertifikat" FROM "Sondermuenze";
DROP TABLE "Sondermuenze";
ALTER TABLE "new_Sondermuenze" RENAME TO "Sondermuenze";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
