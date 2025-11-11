import { useCallback } from "react";

import { Input } from "-/components/ui/input";

interface EquityTickerSearchProps {
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
}

export const EquityTickerSearch = ({
  search,
  setSearch,
}: EquityTickerSearchProps) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (setSearch) {
        setSearch(e.target.value);
      }
    },
    [setSearch],
  );

  return (
    <Input
      name="search-ticker"
      placeholder="Search..."
      value={search}
      onChange={onChange}
    />
  );
};
