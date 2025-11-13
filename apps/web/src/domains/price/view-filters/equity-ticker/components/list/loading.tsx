import { RandomSkeletons } from "-/components/random-skeletons";

export const EquityTickerListLoading = (props: React.ComponentProps<"div">) => {
  return <RandomSkeletons className="h-9" min={3} max={7} {...props} />;
};
