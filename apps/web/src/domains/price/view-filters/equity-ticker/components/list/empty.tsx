import emptyBox from "-/assets/empty-box.png";
import { Card, CardContent } from "-/components/ui/card";

export const EquityTickerListEmpty = () => {
  return (
    <Card>
      <CardContent className="min-h-24 place-items-center space-y-2">
        <img className="pointer-events-none size-20 grayscale" src={emptyBox} />
        <div className="flex flex-col gap-1.5 text-center text-balance">
          <strong>No data found</strong>
          <p className="text-muted-foreground text-xs">
            We can&apos;t find the data you're looking for...
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
