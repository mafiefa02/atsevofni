import { cn } from "-/lib/utils";

export const Sidebar = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"aside">) => {
  return (
    <aside
      className={cn("min-w-2xs border-r px-10 py-8", className)}
      {...props}
    >
      {children}
    </aside>
  );
};
