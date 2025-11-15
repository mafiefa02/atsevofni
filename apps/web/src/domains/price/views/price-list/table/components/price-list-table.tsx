import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Card } from "-/components/ui/card";
import { Table, TableBody, TableHeader, TableRow } from "-/components/ui/table";

import { priceSortKeyToLabel } from "../../../sort/constants";
import type { PriceSortKey } from "../../../sort/types";
import { PriceListTableContent } from "./content";
import { PriceListTableContentError } from "./content/error";
import { PriceListContentLoading } from "./content/loading";
import { PriceListTableHead } from "./head";
import { PriceListTableHeadError } from "./head/error";
import { PriceListTableHeadLoading } from "./head/loading";
import { PriceListTablePagination } from "./pagination";
import { PriceListTablePaginationError } from "./pagination/error";
import { PriceListTablePaginationLoading } from "./pagination/loading";

export const PriceListTable = () => {
  return (
    <div className="flex flex-col gap-2">
      <Card className="rounded-xl border p-6">
        <div className="overflow-hidden rounded-lg">
          <Table>
            <TableHeader>
              <ErrorBoundary fallback={<PriceListTableHeadError />}>
                <Suspense fallback={<PriceListTableHeadLoading />}>
                  <TableRow>
                    {Object.entries(priceSortKeyToLabel).map(([key, label]) => (
                      <PriceListTableHead
                        key={key}
                        sortKey={key as PriceSortKey}
                        label={label}
                      />
                    ))}
                  </TableRow>
                </Suspense>
              </ErrorBoundary>
            </TableHeader>
            <TableBody>
              <ErrorBoundary fallback={<PriceListTableContentError />}>
                <Suspense fallback={<PriceListContentLoading />}>
                  <PriceListTableContent />
                </Suspense>
              </ErrorBoundary>
            </TableBody>
          </Table>
        </div>
      </Card>
      <ErrorBoundary fallback={<PriceListTablePaginationError />}>
        <Suspense fallback={<PriceListTablePaginationLoading />}>
          <PriceListTablePagination />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
