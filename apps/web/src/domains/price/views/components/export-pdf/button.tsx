import { useState } from "react";

import { DownloadIcon } from "-/components/icons/download";
import { Button } from "-/components/ui/button";
import { Dialog, DialogTrigger } from "-/components/ui/dialog";
import { usePriceViewFilters } from "-/domains/price/views/filters/hooks";
import { usePriceViewSort } from "-/domains/price/views/sort/hooks";

import { ExportPDFDialog } from "./dialog";

export const DownloadPDFButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [globalFilters] = usePriceViewFilters();
  const [globalSort] = usePriceViewSort();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <DownloadIcon />
          <span className="xs:inline hidden">Export</span>
        </Button>
      </DialogTrigger>

      <ExportPDFDialog
        initialFilters={globalFilters}
        initialSort={globalSort}
        setOpen={setIsDialogOpen}
      />
    </Dialog>
  );
};
