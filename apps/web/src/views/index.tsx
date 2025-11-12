import { Suspense } from "react";

import { Brand } from "-/components/brand";
import { Sidebar } from "-/components/sidebar";
import { SidebarContent } from "-/components/sidebar/content";
import { PriceViewFilters } from "-/domains/price/view-filters/components/price-view-filters";

import { DashboardView } from "./dashboard";
import { DashboardLoadingView } from "./dashboard/loading";

export const RootAppView = () => {
  return (
    <>
      {/* Desktop/tablet view */}
      <div className="hidden h-dvh grid-cols-[auto_1fr] overflow-hidden xl:grid">
        <Sidebar>
          <SidebarContent>
            <Brand className="dark:grayscale dark:invert" />
            <PriceViewFilters />
          </SidebarContent>
        </Sidebar>
        <div className="overflow-x-hidden overflow-y-auto">
          <Suspense fallback={<DashboardLoadingView />}>
            <DashboardView />
          </Suspense>
        </div>
      </div>

      {/* Mobile view */}
      <div className="overflow-x-hidden overflow-y-auto xl:hidden">
        <Suspense fallback={<DashboardLoadingView />}>
          <DashboardView />
        </Suspense>
      </div>
    </>
  );
};
