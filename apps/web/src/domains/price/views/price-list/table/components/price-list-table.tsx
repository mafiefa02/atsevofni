import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Card } from "-/components/ui/card";
import { Table, TableBody, TableHeader, TableRow } from "-/components/ui/table";

import { priceSortKeyToLabel } from "../../../sort/constants";
import type { PriceSortKey } from "../../../sort/types";
import { PriceListTableContent } from "./content";
import { PriceListContentLoading } from "./content/loading";
import { PriceListTableHead } from "./head";
import { PriceListTablePagination } from "./pagination";
import { PriceListTablePaginationLoading } from "./pagination/loading";

export const PriceListTable = () => {
  return (
    <div className="flex flex-col gap-2">
      <Card className="rounded-xl border p-6">
        <div className="overflow-hidden rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                {Object.entries(priceSortKeyToLabel).map(([key, label]) => (
                  <PriceListTableHead
                    key={key}
                    sortKey={key as PriceSortKey}
                    label={label}
                  />
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <ErrorBoundary fallback="Error price list">
                <Suspense fallback={<PriceListContentLoading />}>
                  <PriceListTableContent />
                </Suspense>
              </ErrorBoundary>
            </TableBody>
          </Table>
        </div>
      </Card>
      <ErrorBoundary fallback="Error">
        <Suspense fallback={<PriceListTablePaginationLoading />}>
          <PriceListTablePagination />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
