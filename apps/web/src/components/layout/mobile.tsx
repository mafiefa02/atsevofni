import { MobileFooter } from "../footer/mobile";
import { Header } from "../header";

export const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] overflow-hidden">
      <Header />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
        <MobileFooter />
      </div>
    </div>
  );
};
