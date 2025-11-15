import { ErrorBoundary } from "react-error-boundary";

import { useMediaQuery } from "-/lib/hooks";

import { DesktopRootView } from "./desktop";
import { MobileRootView } from "./mobile";

export const RootAppView = () => {
  const isDesktop = useMediaQuery("(min-width: 80rem)");
  const isMobile = !isDesktop;

  return (
    <ErrorBoundary fallback="Root error boundary">
      {isDesktop && <DesktopRootView />}
      {isMobile && <MobileRootView />}
    </ErrorBoundary>
  );
};
