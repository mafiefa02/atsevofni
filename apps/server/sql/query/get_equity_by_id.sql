SELECT
  e.id,
  e.name,
  e."listedDate",
  es.code AS sectorId,
  es.name AS sector,
  ess.code AS subsectorId,
  ess.name AS subsector
FROM
  "Equity" AS e
  LEFT JOIN "EquitySector" AS es ON e."sectorId" = es.id
  LEFT JOIN "EquitySubsector" AS ess ON e."subSectorId" = ess.id
WHERE
  e.id = ?
