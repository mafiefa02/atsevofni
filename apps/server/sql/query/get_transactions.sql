SELECT
  t.id,
  t."tradeDate",
  t.opening,
  t.high,
  t.low,
  t.closing,
  t.bid,
  t.offer,
  t.volume,
  t."tradedValue" AS "values",
  e.id AS equityId
FROM
  "Transaction" AS t
  LEFT JOIN "Equity" AS e ON t."equityId" = e.id
