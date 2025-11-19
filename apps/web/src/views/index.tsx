import { ErrorBoundary } from "react-error-boundary";

import { DesktopLayout } from "-/components/layout/desktop";
import { MobileLayout } from "-/components/layout/mobile";
import { useMediaQuery } from "-/lib/hooks";

import { DesktopView } from "./desktop";
import { MobileView } from "./mobile";

export const RootAppView = () => {
  const isDesktop = useMediaQuery("(min-width: 80rem)");
  const isMobile = !isDesktop;

  return (
    <ErrorBoundary fallback="Root error boundary">
      {isDesktop && (
        <DesktopLayout>
          <DesktopView />
        </DesktopLayout>
      )}
      {isMobile && (
        <MobileLayout>
          <MobileView />
        </MobileLayout>
      )}
    </ErrorBoundary>
  );
};
