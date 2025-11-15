import { Button } from "-/components/ui/button";

import { usePrefetchPage } from "../../hooks";

interface StepButtonProps {
  step: number;
  isActive: boolean;
  handleNavigate: (step: number) => void;
}

export const StepButton = ({
  step,
  isActive,
  handleNavigate,
}: StepButtonProps) => {
  const { onMouseEnter, onMouseLeave } = usePrefetchPage(step);
  return (
    <Button
      variant={isActive ? "secondary" : "outline"}
      className="border"
      onClick={() => handleNavigate(step)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {step}
    </Button>
  );
};
