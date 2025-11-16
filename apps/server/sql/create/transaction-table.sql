CREATE TABLE "Transaction" (
  "equityId" TEXT NOT NULL,
  "tradeDate" NUMERIC NOT NULL,
  "opening" REAL,
  "high" REAL,
  "low" REAL,
  "closing" REAL,
  "bid" REAL,
  "offer" REAL,
  "volume" INTEGER,
  "tradedValue" INTEGER,
  PRIMARY KEY ("equityId", "tradeDate"),
  FOREIGN KEY ("equityId") REFERENCES "Equity" ("id") ON DELETE CASCADE
) WITHOUT ROWID
