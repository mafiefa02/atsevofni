CREATE TABLE "EquitySubsector" (
  "id" INTEGER NOT NULL UNIQUE,
  "code" TEXT UNIQUE,
  "name" TEXT NOT NULL,
  "sectorId" INTEGER,
  PRIMARY KEY ("id" AUTOINCREMENT),
  FOREIGN KEY ("sectorId") REFERENCES "EquitySector" ("id")
)
