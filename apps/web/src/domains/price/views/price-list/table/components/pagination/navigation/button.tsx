import { Button, type ButtonProps } from "-/components/ui/button";

import type { usePrefetchPrice } from "../../../hooks";

interface NavButtonProps extends ButtonProps {
  prefetch: ReturnType<typeof usePrefetchPrice>;
}

export const NavButton = ({
  onClick,
  prefetch,
  children,
  ...props
}: NavButtonProps) => (
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
