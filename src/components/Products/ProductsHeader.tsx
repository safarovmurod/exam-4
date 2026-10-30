import { Plus } from "lucide-react";

interface Props {
  totalCount: number;
  onOpenAdd: () => void;
}

export default function ProductsHeader({ totalCount, onOpenAdd }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
      <div>
        <h1 className="text-[24px] font-[700] text-[#111827]">Products</h1>
        <p className="text-[14px] text-[#6b7280]">
          Идоракунии маҳсулот ва нархҳо ({totalCount} маҳсулот)
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenAdd}
        className="flex items-center justify-center gap-[8px] bg-[#10b981] hover:bg-[#059669] text-[#ffffff] px-[16px] py-[10px] rounded-[8px] text-[14px] font-[500] cursor-pointer"
      >
        <Plus size={18} />
        <span>Add product</span>
      </button>
    </div>
  );
}

