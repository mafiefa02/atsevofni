import { Brand } from "-/components/brand";
import { Footer } from "-/components/footer";
import { Sidebar } from "-/components/sidebar";
import { SidebarContent } from "-/components/sidebar/content";
import { PriceViewFilters } from "-/domains/price/view-filters/components/price-view-filters";
import { PriceViewSort } from "-/domains/price/view-sort/components/price-view-sort";

import { DashboardView } from "./dashboard";

export const RootAppView = () => {
  return (
    <>
      {/* Desktop/tablet view */}
      <div className="hidden h-dvh grid-cols-[auto_1fr] overflow-hidden xl:grid">
        <Sidebar>
          <SidebarContent>
            <Brand className="dark:grayscale dark:invert" />
            <div className="flex w-full flex-col gap-7">
              <PriceViewSort />
              <PriceViewFilters />
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="grid h-dvh grid-rows-[1fr_auto] overflow-y-auto">
          <div className="overflow-x-hidden overflow-y-auto">
            <DashboardView />
          </div>
          <Footer />
        </div>
      </div>

      {/* Mobile view */}
      <div className="overflow-x-hidden overflow-y-auto xl:hidden">
        <DashboardView />
      </div>
    </>
  );
};
