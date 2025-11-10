import { useSuspenseQuery } from "@tanstack/react-query";

import { services } from "-/lib/services";

export const IndexView = () => {
  const { data: items, isError } = useSuspenseQuery(
    services.price.query.getAllPrices(),
  );

  if (isError) return "Error!";

  return <p>{JSON.stringify(items.data[0])}</p>;
};
