import { cn } from "-/lib/utils";

export const SidebarContent = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  return (
    <div
      className={cn("flex flex-col items-center gap-8", className)}
      {...props}
    >
      {children}
    </div>
  );
};
