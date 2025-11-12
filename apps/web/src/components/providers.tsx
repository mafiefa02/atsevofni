import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";

import { ThemeProvider } from "-/domains/theme/components/theme-provider";

const queryClient = new QueryClient();

export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="atsevofni-theme">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
};
