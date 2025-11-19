import { Button, type ButtonProps } from "-/components/ui/button";
import type { usePrefetchPrice } from "-/domains/price/views/hooks";

interface PaginationNavButtonProps extends ButtonProps {
  prefetch: ReturnType<typeof usePrefetchPrice>;
}

export const PaginationNavButton = ({
  onClick,
  prefetch,
  children,
  ...props
}: PaginationNavButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      onMouseEnter={() => prefetch.onMouseEnter()}
      onMouseLeave={prefetch.onMouseLeave}
      {...props}
    >
      {children}
    </Button>
  );
};
