import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { ArrowClockwiseIcon } from "-/components/icons/arrow-clockwise";
import { DownloadIcon } from "-/components/icons/download";
import { Alert, AlertDescription, AlertTitle } from "-/components/ui/alert";
import { Button } from "-/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "-/components/ui/dialog";
import { services } from "-/lib/services";
import type { SortParams } from "-/lib/types";

import {
  PriceFilterLocalContext,
  useSetFiltersAdapter,
} from "../../filters/hooks";
import type { PriceFilter } from "../../filters/types";
import { PriceSortLocalContext, useSetSortAdapter } from "../../sort/hooks";
import type { PriceSortKey } from "../../sort/types";
import { PriceViewControls } from "../price-view-controls";

interface ExportPDFDialogProps {
  initialFilters: PriceFilter;
  initialSort: SortParams<PriceSortKey>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ExportPDFDialog = ({
  initialFilters,
  initialSort,
  setOpen,
}: ExportPDFDialogProps) => {
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PriceFilter>(initialFilters);
  const [sort, setSort] = useState<SortParams<PriceSortKey>>(initialSort);

  const setFiltersAdapter = useSetFiltersAdapter(setFilters);
  const setSortAdapter = useSetSortAdapter(setSort);

  const { mutate, isPending } = useMutation({
    ...services.price.mutation.generatePricesPdf({ filters, sort }),
    onSuccess: ({ blob, filename }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      setOpen(false);
      setError(null);
    },
    onError: (err) => setError(err.message),
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Export PDF</DialogTitle>
        <DialogDescription>
          Customize filters for the export. These changes will not affect your
          current view.
        </DialogDescription>
        {error !== null && (
          <Alert variant="destructive">
            <AlertTitle>Unable to generate your reports</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </DialogHeader>

      <PriceFilterLocalContext.Provider value={[filters, setFiltersAdapter]}>
        <PriceSortLocalContext.Provider value={[sort, setSortAdapter]}>
          <div className="max-h-[70dvh] overflow-y-auto">
            <PriceViewControls />
          </div>
        </PriceSortLocalContext.Provider>
      </PriceFilterLocalContext.Provider>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={() => mutate()} disabled={isPending}>
          {isPending ? (
            <ArrowClockwiseIcon className="animate-spin" />
          ) : (
            <DownloadIcon />
          )}
          Export
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
