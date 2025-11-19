import { Socials } from "../socials";
import { ThemeToggle } from "../theme-toggle";
import { TooltipProvider } from "../ui/tooltip";

export const DesktopFooter = () => {
  return (
    <div className="bg-background flex items-center justify-between gap-4 border-t px-10 py-2 text-xs backdrop-blur-sm">
      <p>
        <span className="font-medium">
          &copy; Atsevofni Dashboard <span className="font-normal">| </span>
        </span>
        Afief Abdurrahman
      </p>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Socials />
          <ThemeToggle />
        </TooltipProvider>
      </div>
    </div>
  );
};
