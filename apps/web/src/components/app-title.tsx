export const AppTitle = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Atsevofni Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time stock price data and analysis
        </p>
      </div>
    </div>
  );
};
