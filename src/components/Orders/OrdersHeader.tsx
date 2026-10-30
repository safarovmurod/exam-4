import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  onOpenAdd: () => void;
}

export default function OrdersHeader({ onOpenAdd }: Props) {
  return (
    <div className="flex flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[26px] font-[700] text-[#0f172a]">Orders</h1>
      <Button
        onClick={onOpenAdd}
        className="h-[44px] bg-[#2563eb] px-[20px] text-[15px] font-[600] text-[#ffffff] hover:bg-[#1d4ed8]"
      >
        <Plus size={18} />
        <span>Add order</span>
      </Button>
    </div>
  );
}

