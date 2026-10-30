import { Package, Plus, Edit2, Trash2 } from "lucide-react";
import type { Product } from "../../store/productSlice";

interface Props {
  products: Product[];
  isLoading: boolean;
  onOpenAdd: () => void;
  onOpenEdit: (prod: Product) => void;
  onOpenDelete: (prod: Product) => void;
}

export default function ProductsTable({
  products,
  isLoading,
  onOpenAdd,
  onOpenEdit,
  onOpenDelete,
}: Props) {
  const apiUrl = import.meta.env.VITE_API || "https://store-api.softclub.tj";

  if (isLoading && products.length === 0) {
    return (
      <div className="bg-[#ffffff] rounded-[10px] border border-[#e5e7eb] p-[40px] text-center text-[#6b7280] text-[14px]">
        Боргузории маҳсулот...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-[#ffffff] rounded-[10px] border border-[#e5e7eb] flex flex-col items-center justify-center p-[48px] text-center">
        <Package size={48} className="text-[#9ca3af] mb-[12px]" />
        <h3 className="text-[16px] font-[600] text-[#111827] mb-[4px]">
          Маҳсулот ёфт нашуд
        </h3>
        <p className="text-[14px] text-[#6b7280] mb-[16px]">
          Аз рӯи ин ҷустуҷӯ ё филтр ягон маҳсулот ёфт нашуд.
        </p>
        <button
          type="button"
          onClick={onOpenAdd}
          className="flex items-center gap-[6px] text-[#10b981] hover:underline text-[14px] font-[500] cursor-pointer"
        >
          <Plus size={16} /> Иловаи маҳсулоти нав
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] rounded-[10px] border border-[#e5e7eb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-[#f9fafb] text-[#6b7280] text-[12px] uppercase font-[500] border-b border-[#e5e7eb]">
            <tr>
              <th className="py-[12px] px-[16px]">Product</th>
              <th className="py-[12px] px-[16px]">Inventory</th>
              <th className="py-[12px] px-[16px]">Category</th>
              <th className="py-[12px] px-[16px]">Price</th>
              <th className="py-[12px] px-[16px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb] text-[#111827]">
            {products.map((prod) => {
              const inStock = (prod.quantity ?? 1) > 0;
              return (
                <tr key={prod.id} className="hover:bg-[#f9fafb] transition">
                  <td className="py-[12px] px-[16px]">
                    <div className="flex items-center gap-[12px]">
                      <img
                        src={
                          prod.image
                            ? `${apiUrl}/images/${prod.image}`
                            : "https://via.placeholder.com/60"
                        }
                        alt={prod.productName}
                        className="w-[48px] h-[48px] rounded-[6px] object-cover bg-[#f3f4f6] border border-[#e5e7eb]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/60?text=No+Img";
                        }}
                      />
                      <div>
                        <p className="font-[600] text-[#111827] line-clamp-1">
                          {prod.productName}
                        </p>
                        <p className="text-[12px] text-[#9ca3af]">
                          ID: #{prod.id} {prod.color ? `• ${prod.color}` : ""}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-[12px] px-[16px]">
                    {inStock ? (
                      <span className="inline-block bg-[#d1fae5] text-[#065f46] text-[12px] font-[500] px-[8px] py-[3px] rounded-[12px]">
                        {prod.quantity ?? 10} in stock
                      </span>
                    ) : (
                      <span className="inline-block bg-[#fee2e2] text-[#991b1b] text-[12px] font-[500] px-[8px] py-[3px] rounded-[12px]">
                        Out of stock
                      </span>
                    )}
                  </td>

                  <td className="py-[12px] px-[16px] text-[#4b5563]">
                    {prod.categoryName || "Умумӣ"}
                  </td>

                  <td className="py-[12px] px-[16px]">
                    {prod.hasDiscount && prod.discountPrice ? (
                      <div className="flex items-center gap-[6px]">
                        <span className="font-[600] text-[#10b981]">
                          ${prod.discountPrice}
                        </span>
                        <span className="text-[12px] text-[#9ca3af] line-through">
                          ${prod.price}
                        </span>
                      </div>
                    ) : (
                      <span className="font-[600] text-[#111827]">
                        ${prod.price}
                      </span>
                    )}
                  </td>

                  <td className="py-[12px] px-[16px] text-right">
                    <div className="flex items-center justify-end gap-[8px]">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(prod)}
                        className="p-[6px] text-[#4b5563] hover:text-[#10b981] hover:bg-[#f3f4f6] rounded-[6px] transition cursor-pointer"
                        title="Таҳрир"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenDelete(prod)}
                        className="p-[6px] text-[#4b5563] hover:text-[#ef4444] hover:bg-[#fee2e2] rounded-[6px] transition cursor-pointer"
                        title="Нест кардан"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

