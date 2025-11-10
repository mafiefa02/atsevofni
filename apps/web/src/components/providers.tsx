import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "-/domains/theme/components/theme-provider";

const queryClient = new QueryClient();

export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
