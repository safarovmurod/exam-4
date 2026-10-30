import { useState, type FormEvent, type ChangeEvent } from "react";
import { X, Upload } from "lucide-react";
import type { Category } from "../../store/categorySlice";

interface Props {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
  isSaving: boolean;
  onSave: (fd: FormData) => Promise<boolean>;
}

export default function EditCategoryModal({
  category,
  isOpen,
  onClose,
  isSaving,
  onSave,
}: Props) {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!categoryName.trim()) {
      setErrorMsg("Номи категорияро нависед");
      return;
    }
    if (!categoryImageFile) {
      setErrorMsg("Сурати нав ё сурати пешинаро интихоб кунед");
      return;
    }

    const fd = new FormData();
    fd.append("Id", String(category.id));
    fd.append("CategoryName", categoryName.trim());
    fd.append("CategoryImage", categoryImageFile);

    const success = await onSave(fd);
    if (success) {
      onClose();
    } else {
      setErrorMsg("Хатогӣ ҳангоми навсозӣ");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#00000080] flex items-center justify-center p-[16px]">
      <div className="bg-[#ffffff] rounded-[12px] w-full max-w-[480px] p-[24px]">
        <div className="flex items-center justify-between pb-[16px] border-b border-[#e5e7eb] mb-[16px]">
          <h2 className="text-[18px] font-[700] text-[#111827]">
            Таҳрири категория #{category.id}
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
              Номи категория *
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-[500] text-[#374151]">
              Сурати категория (нусха ё нав) *
            </label>
            <div className="border-2 border-dashed border-[#d1d5db] rounded-[8px] p-[16px] text-center hover:border-[#10b981] transition cursor-pointer relative bg-[#f9fafb]">
              <input
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    setCategoryImageFile(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required
              />
              <Upload size={24} className="mx-auto text-[#9ca3af] mb-[6px]" />
              <p className="text-[13px] text-[#4b5563]">
                {categoryImageFile
                  ? categoryImageFile.name
                  : "Суратро интихоб кунед"}
              </p>
            </div>
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

