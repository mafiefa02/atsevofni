import { generateUniqueRandomIntArray } from "-/lib/utils";

import { Skeleton } from "./ui/skeleton";

interface RandomSkeletonsProps extends React.ComponentProps<"div"> {
  min: number;
  max: number;
}

export const RandomSkeletons = ({
  min,
  max,
  ...props
}: RandomSkeletonsProps) => {
  const skeletons = generateUniqueRandomIntArray(min, max);
  const keys = skeletons.map(
    (skeleton, index) => `${index}-skeleton-${skeleton}`,
  );
  return skeletons.map((_, index) => <Skeleton key={keys[index]} {...props} />);
};
