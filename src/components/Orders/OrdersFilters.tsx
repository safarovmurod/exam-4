import { Search, Filter, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  filterStatus: string;
  onFilterChange: (val: string) => void;
  selectedCount: number;
  onDeleteSelected: () => void;
}

export default function OrdersFilters({
  search,
  onSearchChange,
  filterStatus,
  onFilterChange,
  selectedCount,
  onDeleteSelected,
}: Props) {
  return (
    <div className="mb-[20px] flex flex-wrap items-center justify-between gap-[16px]">
      <div className="relative w-full sm:w-[260px]">
        <Search
          size={18}
          className="absolute left-[12px] top-[12px] text-[#94a3b8]"
        />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="h-[40px] pl-[38px] text-[14px]"
        />
      </div>

      <div className="flex items-center gap-[12px]">
        <div className="flex items-center gap-[6px]">
          <Filter size={16} className="text-[#64748b]" />
          <Select value={filterStatus} onValueChange={onFilterChange}>
            <SelectTrigger className="h-[40px] w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDeleteSelected}
            className="h-[40px]"
          >
            <Trash2 size={16} />
            <span>Delete ({selectedCount})</span>
          </Button>
        )}
      </div>
    </div>
  );
}

