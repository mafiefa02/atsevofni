import { PriceViewControls } from "-/domains/price/views/components/price-view-controls";

import { Brand } from "../brand";
import { DesktopFooter } from "../footer/desktop";
import { Sidebar } from "../sidebar";
import { SidebarContent } from "../sidebar/content";

export const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] overflow-hidden">
      <Sidebar className="overflow-y-auto">
        <SidebarContent>
          <Brand className="dark:grayscale dark:invert" />
          <PriceViewControls />
        </SidebarContent>
      </Sidebar>
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-10 py-8">
          {children}
        </main>
        <DesktopFooter />
      </div>
    </div>
  );
};
