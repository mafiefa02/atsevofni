import { Suspense } from "react";

import { Brand } from "-/components/brand";
import { Footer } from "-/components/footer";
import { Sidebar } from "-/components/sidebar";
import { SidebarContent } from "-/components/sidebar/content";
import { PriceViewFilters } from "-/domains/price/view-filters/components/price-view-filters";
import { PriceViewSort } from "-/domains/price/view-sort/components/price-view-sort";

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
            <PriceViewSort />
            <PriceViewFilters />
          </SidebarContent>
        </Sidebar>
        <div className="grid h-dvh grid-rows-[1fr_auto] overflow-y-auto">
          <div className="overflow-x-hidden overflow-y-auto">
            <Suspense fallback={<DashboardLoadingView />}>
              <DashboardView />
            </Suspense>
          </div>
          <Footer />
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
