CREATE TABLE "Transaction" (
  "id" INTEGER UNIQUE,
  "tradeDate" DATE NOT NULL,
  "opening" REAL,
  "high" REAL,
  "low" REAL,
  "closing" REAL,
  "bid" REAL,
  "offer" REAL,
  "volume" BIGINT,
  "tradedValue" BIGINT,
  "equityId" TEXT,
  UNIQUE ("equityId", "tradeDate"),
  PRIMARY KEY ("id" AUTOINCREMENT)
  ON CONFLICT FAIL,
  FOREIGN KEY ("equityId") REFERENCES "Equity" ("id") ON DELETE CASCADE
)
