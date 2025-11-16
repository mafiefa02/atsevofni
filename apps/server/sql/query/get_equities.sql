SELECT
  e.id,
  e.name,
  e."listedDate" AS listedDate
FROM
  "Equity" AS e
  LEFT JOIN "EquitySector" AS es ON e."sectorId" = es.id
  LEFT JOIN "EquitySubSector" AS ess ON e."subsectorId" = ess.id
