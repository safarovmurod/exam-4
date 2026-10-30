import { FolderTree, Tag, Plus } from "lucide-react";

interface Props {
  activeTab: "categories" | "brands";
  onTabChange: (tab: "categories" | "brands") => void;
  categoriesCount: number;
  brandsCount: number;
  onOpenAddCat: () => void;
  onOpenAddBrand: () => void;
}

export default function OtherTabs({
  activeTab,
  onTabChange,
  categoriesCount,
  brandsCount,
  onOpenAddCat,
  onOpenAddBrand,
}: Props) {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
        <div>
          <h1 className="text-[24px] font-[700] text-[#111827]">
            Категорияҳо ва Брендҳо
          </h1>
          <p className="text-[14px] text-[#6b7280]">
            Идоракунии сохтор, гурӯҳбандӣ ва тамғаҳои молӣ
          </p>
        </div>

        {activeTab === "categories" ? (
          <button
            type="button"
            onClick={onOpenAddCat}
            className="flex items-center justify-center gap-[8px] bg-[#10b981] hover:bg-[#059669] text-[#ffffff] px-[16px] py-[10px] rounded-[8px] text-[14px] font-[500] cursor-pointer"
          >
            <Plus size={18} />
            <span>Add Category</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenAddBrand}
            className="flex items-center justify-center gap-[8px] bg-[#10b981] hover:bg-[#059669] text-[#ffffff] px-[16px] py-[10px] rounded-[8px] text-[14px] font-[500] cursor-pointer"
          >
            <Plus size={18} />
            <span>Add Brand</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-[8px] border-b border-[#e5e7eb] pb-[2px]">
        <button
          type="button"
          onClick={() => onTabChange("categories")}
          className={`flex items-center gap-[8px] px-[16px] py-[10px] text-[14px] font-[600] rounded-t-[6px] transition cursor-pointer ${
            activeTab === "categories"
              ? "text-[#10b981] border-b-2 border-[#10b981] bg-[#ecfdf5]"
              : "text-[#6b7280] hover:text-[#111827]"
          }`}
        >
          <FolderTree size={18} />
          <span>Категорияҳо ({categoriesCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("brands")}
          className={`flex items-center gap-[8px] px-[16px] py-[10px] text-[14px] font-[600] rounded-t-[6px] transition cursor-pointer ${
            activeTab === "brands"
              ? "text-[#10b981] border-b-2 border-[#10b981] bg-[#ecfdf5]"
              : "text-[#6b7280] hover:text-[#111827]"
          }`}
        >
          <Tag size={18} />
          <span>Брендҳо ({brandsCount})</span>
        </button>
      </div>
    </div>
  );
}

