import { ThemeProvider } from "-/domains/theme/components/theme-provider";

import { NuqsAdapterProvider } from "./nuqs-adapter";
import { QueryProvider } from "./query-client";

export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryProvider>
        <NuqsAdapterProvider>{children}</NuqsAdapterProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};
