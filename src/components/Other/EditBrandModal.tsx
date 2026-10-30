import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Brand } from "../../store/brandSlice";

interface Props {
  brand: Brand;
  isOpen: boolean;
  onClose: () => void;
  isSaving: boolean;
  onSave: (payload: { id: number; brandName: string }) => Promise<boolean>;
}

export default function EditBrandModal({
  brand,
  isOpen,
  onClose,
  isSaving,
  onSave,
}: Props) {
  const [brandName, setBrandName] = useState(brand.brandName);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!brandName.trim()) {
      setErrorMsg("Номи брендро нависед");
      return;
    }

    const success = await onSave({ id: brand.id, brandName: brandName.trim() });
    if (success) {
      onClose();
    } else {
      setErrorMsg("Хатогӣ ҳангоми таҳрир");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#00000080] flex items-center justify-center p-[16px]">
      <div className="bg-[#ffffff] rounded-[12px] w-full max-w-[420px] p-[24px]">
        <div className="flex items-center justify-between pb-[16px] border-b border-[#e5e7eb] mb-[16px]">
          <h2 className="text-[18px] font-[700] text-[#111827]">
            Таҳрири бренд #{brand.id}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#9ca3af] hover:text-[#111827] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-[16px] bg-[#fee2e2] text-[#b91c1c] text-[13px] p-[10px] rounded-[6px]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-[500] text-[#374151]">
              Номи бренд *
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-[12px] pt-[12px] border-t border-[#e5e7eb]">
            <button
              type="button"
              onClick={onClose}
              className="px-[16px] py-[8px] text-[14px] text-[#4b5563] hover:bg-[#f3f4f6] rounded-[6px] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-[16px] py-[8px] text-[14px] bg-[#10b981] hover:bg-[#059669] text-[#ffffff] font-[500] rounded-[6px] cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Навсозӣ..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

