import { equityIconPaths } from "-/domains/equity/constants";
import type { EquityId } from "-/domains/equity/types";
import { cn } from "-/lib/utils";

interface EquityIconProps extends React.ComponentProps<"img"> {
  equityId: EquityId;
}

export const EquityIcon = ({
  equityId,
  className,
  ...props
}: EquityIconProps) => {
  return (
    <img
      className={cn("size-11", className)}
      src={equityIconPaths[equityId]}
      {...props}
    />
  );
};
