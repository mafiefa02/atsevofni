import { useState } from "react";

import { DownloadIcon } from "-/components/icons/download";
import { Button } from "-/components/ui/button";
import { Dialog, DialogTrigger } from "-/components/ui/dialog";
import { usePriceViewFilters } from "-/domains/price/views/filters/hooks";
import { usePriceViewSort } from "-/domains/price/views/sort/hooks";

import { ExportPDFDialog } from "./dialog";

export const DownloadPDFButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // acts as a unique key to reset the state inside of dialog
  const [openCount, setOpenCount] = useState(0);

  const [globalFilters] = usePriceViewFilters();
  const [globalSort] = usePriceViewSort();

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      setOpenCount((prev) => prev + 1);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <DownloadIcon />
          <span className="xs:inline hidden">Export</span>
        </Button>
      </DialogTrigger>

      <ExportPDFDialog
        key={openCount}
        initialFilters={globalFilters}
        initialSort={globalSort}
        setOpen={setIsDialogOpen}
      />
    </Dialog>
  );
};
