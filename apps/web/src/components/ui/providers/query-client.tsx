import {
  QueryClient,
  QueryClientProvider,
  type QueryClientProviderProps,
  keepPreviousData,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { throwOnError: true, initialData: keepPreviousData },
  },
});

export const QueryProvider = (
  props: Omit<QueryClientProviderProps, "client">,
) => {
  return <QueryClientProvider client={queryClient} {...props} />;
};
