import { PriceViewControls } from "-/domains/price/views/components/price-view-controls";

import PanelRightIcon from "./icons/panel-right";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const Header = () => {
  return (
    <header className="w-full border border-b px-6 py-2">
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium">Atsevofni</span>
        <Sheet defaultOpen={false}>
          <SheetTrigger asChild>
            <Button variant="outline">
              Filters <PanelRightIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="gap-0">
            <SheetHeader>
              <SheetTitle>Controls</SheetTitle>
              <SheetDescription>
                You can set the filters or sorting options for the data here.
              </SheetDescription>
            </SheetHeader>
            <div className="px-4">
              <PriceViewControls />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
