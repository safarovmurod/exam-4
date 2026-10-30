import { Tag, Edit2, Trash2 } from "lucide-react";
import type { Brand } from "../../store/brandSlice";

interface Props {
  brands: Brand[];
  isLoading: boolean;
  onOpenEditBrand: (b: Brand) => void;
  onOpenDeleteBrand: (b: Brand) => void;
}

export default function BrandsTable({
  brands,
  isLoading,
  onOpenEditBrand,
  onOpenDeleteBrand,
}: Props) {
  if (isLoading && brands.length === 0) {
    return (
      <div className="p-[40px] text-center text-[#6b7280] text-[14px]">
        Боргузории брендҳо...
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="p-[48px] text-center text-[#6b7280]">
        Ҳоло ягон бренд вуҷуд надорад.
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] rounded-[10px] border border-[#e5e7eb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-[#f9fafb] text-[#6b7280] text-[12px] uppercase font-[500] border-b border-[#e5e7eb]">
            <tr>
              <th className="py-[12px] px-[16px] w-[80px]">ID</th>
              <th className="py-[12px] px-[16px]">Brand Name</th>
              <th className="py-[12px] px-[16px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb] text-[#111827]">
            {brands.map((b) => (
              <tr key={b.id} className="hover:bg-[#f9fafb] transition">
                <td className="py-[12px] px-[16px] text-[#6b7280]">
                  #{b.id}
                </td>
                <td className="py-[12px] px-[16px] font-[600]">
                  <div className="flex items-center gap-[8px]">
                    <Tag size={16} className="text-[#10b981]" />
                    <span>{b.brandName}</span>
                  </div>
                </td>
                <td className="py-[12px] px-[16px] text-right">
                  <div className="flex items-center justify-end gap-[8px]">
                    <button
                      type="button"
                      onClick={() => onOpenEditBrand(b)}
                      className="p-[6px] text-[#4b5563] hover:text-[#10b981] hover:bg-[#f3f4f6] rounded-[6px] transition cursor-pointer"
                      title="Таҳрир"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenDeleteBrand(b)}
                      className="p-[6px] text-[#4b5563] hover:text-[#ef4444] hover:bg-[#fee2e2] rounded-[6px] transition cursor-pointer"
                      title="Нест кардан"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

