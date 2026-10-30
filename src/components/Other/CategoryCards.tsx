import { Edit2, Trash2, Plus, X } from "lucide-react";
import type { Category } from "../../store/categorySlice";

interface Props {
  categories: Category[];
  isLoading: boolean;
  onOpenEditCat: (cat: Category) => void;
  onOpenDeleteCat: (cat: Category) => void;
  onOpenAddSub: (cat: Category) => void;
  onDeleteSub: (subId: number) => void;
}

export default function CategoryCards({
  categories,
  isLoading,
  onOpenEditCat,
  onOpenDeleteCat,
  onOpenAddSub,
  onDeleteSub,
}: Props) {
  const apiUrl = import.meta.env.VITE_API || "https://store-api.softclub.tj";

  if (isLoading && categories.length === 0) {
    return (
      <div className="p-[40px] text-center text-[#6b7280] text-[14px] bg-[#ffffff] rounded-[10px] border border-[#e5e7eb]">
        Боргузории категорияҳо...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="p-[48px] text-center text-[#6b7280] bg-[#ffffff] rounded-[10px] border border-[#e5e7eb]">
        Ҳоло ягон категория вуҷуд надорад.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-[#ffffff] rounded-[10px] border border-[#e5e7eb] p-[16px] flex flex-col justify-between hover:shadow-[0_2px_8px_#0000000a] transition"
        >
          <div>
            <div className="flex items-center gap-[12px] mb-[12px]">
              <img
                src={
                  cat.categoryImage
                    ? `${apiUrl}/images/${cat.categoryImage}`
                    : "https://via.placeholder.com/60"
                }
                alt={cat.categoryName}
                className="w-[52px] h-[52px] rounded-[8px] object-cover bg-[#f3f4f6] border border-[#e5e7eb]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/60?text=Cat";
                }}
              />
              <div className="flex-1">
                <h3 className="font-[700] text-[16px] text-[#111827]">
                  {cat.categoryName}
                </h3>
                <p className="text-[12px] text-[#6b7280]">
                  ID: #{cat.id} • {cat.subCategories?.length || 0} зеркатегория
                </p>
              </div>

              <div className="flex items-center gap-[4px]">
                <button
                  type="button"
                  onClick={() => onOpenEditCat(cat)}
                  className="p-[6px] text-[#4b5563] hover:text-[#10b981] hover:bg-[#f3f4f6] rounded-[6px] transition cursor-pointer"
                  title="Таҳрир"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDeleteCat(cat)}
                  className="p-[6px] text-[#4b5563] hover:text-[#ef4444] hover:bg-[#fee2e2] rounded-[6px] transition cursor-pointer"
                  title="Нест кардан"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div className="bg-[#f9fafb] rounded-[8px] p-[10px] flex flex-col gap-[6px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-[600] text-[#6b7280] tracking-wider">
                  Зеркатегорияҳо
                </span>
                <button
                  type="button"
                  onClick={() => onOpenAddSub(cat)}
                  className="text-[12px] text-[#10b981] hover:underline flex items-center gap-[2px] font-[500] cursor-pointer"
                >
                  <Plus size={14} /> Илова
                </button>
              </div>

              <div className="flex flex-wrap gap-[6px] mt-[4px]">
                {cat.subCategories && cat.subCategories.length > 0 ? (
                  cat.subCategories.map((sub) => (
                    <span
                      key={sub.id}
                      className="inline-flex items-center gap-[4px] bg-[#ffffff] border border-[#e5e7eb] text-[#374151] text-[12px] px-[8px] py-[3px] rounded-[12px]"
                    >
                      <span>{sub.subCategoryName}</span>
                      <button
                        type="button"
                        onClick={() => onDeleteSub(sub.id)}
                        className="text-[#9ca3af] hover:text-[#ef4444] cursor-pointer ml-[2px]"
                        title="Ҳазф"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-[12px] text-[#9ca3af] italic">
                    Зеркатегория надорад
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

