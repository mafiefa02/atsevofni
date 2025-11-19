import { equityIconPaths } from "-/domains/equity/constants";
import type { EquityId } from "-/domains/equity/types";
import { cn } from "-/lib/utils";

interface PriceCardIconProps extends React.ComponentProps<"img"> {
  equityId: EquityId;
}

export const PriceCardIcon = ({
  equityId,
  className,
  ...props
}: PriceCardIconProps) => {
  return (
    <img
      className={cn("size-11", className)}
      src={equityIconPaths[equityId]}
      {...props}
    />
  );
};
