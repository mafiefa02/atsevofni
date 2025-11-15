import { AppTitle } from "-/components/app-title";
import { Brand } from "-/components/brand";
import { Footer } from "-/components/footer";
import { Sidebar } from "-/components/sidebar";
import { SidebarContent } from "-/components/sidebar/content";
import { PriceViewFilters } from "-/domains/price/views/filters/components/price-view-filters";
import { PriceViewSort } from "-/domains/price/views/sort/components/price-view-sort";

import { DesktopDashboardView } from "./dashboard/desktop";

export const DesktopRootView = () => {
  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] overflow-hidden">
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
          <main className="grid h-full overflow-x-hidden overflow-y-auto px-10 py-8">
            <div className="grid grid-rows-[auto_1fr] gap-5">
              <AppTitle />
              <DesktopDashboardView />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
