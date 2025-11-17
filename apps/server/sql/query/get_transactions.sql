SELECT
  t."equityId",
  t."tradeDate",
  t.opening,
  t.high,
  t.low,
  t.closing,
  t.bid,
  t.offer,
  t.volume
FROM
  "Transaction" t
