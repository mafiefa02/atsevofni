import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Brand } from "-/components/brand";
import { Footer } from "-/components/footer";
import { Sidebar } from "-/components/sidebar";
import { SidebarContent } from "-/components/sidebar/content";
import { PriceViewFilters } from "-/domains/price/views/filters/components/price-view-filters";
import { PriceViewSort } from "-/domains/price/views/sort/components/price-view-sort";

import { DashboardView } from "./dashboard";
import { DashboardLoadingView } from "./dashboard/loading";

export const RootAppView = () => {
  return (
    <>
      {/* Desktop/tablet view */}
      <div className="hidden h-dvh grid-cols-[auto_1fr] overflow-hidden xl:grid">
        <Sidebar className="overflow-y-auto">
          <SidebarContent>
            <Brand className="dark:grayscale dark:invert" />
            <div className="flex w-full flex-col gap-7">
              <PriceViewSort />
              <PriceViewFilters />
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 overflow-x-hidden overflow-y-auto">
            <ErrorBoundary fallback="error">
              <Suspense fallback={<DashboardLoadingView />}>
                <DashboardView />
              </Suspense>
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile view */}
      <div className="overflow-x-hidden overflow-y-auto xl:hidden">
        <ErrorBoundary fallback="error">
          <Suspense fallback={<DashboardLoadingView />}>
            <DashboardView />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};
