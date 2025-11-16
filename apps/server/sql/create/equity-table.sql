CREATE TABLE "Equity" (
  "id" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL UNIQUE,
  "listedDate" DATE,
  "sectorId" INTEGER,
  "subSectorId" INTEGER,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("sectorId") REFERENCES "EquitySector" ("id") ON DELETE RESTRICT,
  FOREIGN KEY ("subSectorId") REFERENCES "EquitySector" ("id") ON DELETE RESTRICT
)
