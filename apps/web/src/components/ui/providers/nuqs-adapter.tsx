import type { Options } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/react";

interface NuqsAdapterProviderProps {
  children: React.ReactNode;
  fullPageNavigationOnShallowFalseUpdates?: boolean;
  defaultOptions?:
    | Partial<
        Pick<
          Options,
          "shallow" | "clearOnDefault" | "scroll" | "limitUrlUpdates"
        >
      >
    | undefined;
  processUrlSearchParams?:
    | ((search: URLSearchParams) => URLSearchParams)
    | undefined;
}

export const NuqsAdapterProvider = (props: NuqsAdapterProviderProps) => {
  return <NuqsAdapter defaultOptions={{ clearOnDefault: true }} {...props} />;
};
