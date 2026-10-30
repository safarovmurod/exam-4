import type { Brand } from "../../store/brandSlice";

interface Props {
  brand: Brand;
  isOpen: boolean;
  onClose: () => void;
  isSaving: boolean;
  onConfirm: () => void;
}

export default function DeleteBrandModal({
  brand,
  isOpen,
  onClose,
  isSaving,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#00000080] flex items-center justify-center p-[16px]">
      <div className="bg-[#ffffff] rounded-[12px] w-full max-w-[420px] p-[24px]">
        <h3 className="text-[18px] font-[700] text-[#111827] mb-[8px]">
          Нест кардани бренд
        </h3>
        <p className="text-[14px] text-[#6b7280] mb-[20px]">
          Оё шумо мутмаин ҳастед, ки бренди{" "}
          <strong className="text-[#111827] font-[600]">
            "{brand.brandName}"
          </strong>
          -ро нест кардан мехоҳед?
        </p>

        <div className="flex items-center justify-end gap-[12px]">
          <button
            type="button"
            onClick={onClose}
            className="px-[16px] py-[8px] text-[14px] text-[#4b5563] hover:bg-[#f3f4f6] rounded-[6px] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={onConfirm}
            className="px-[16px] py-[8px] text-[14px] bg-[#ef4444] hover:bg-[#dc2626] text-[#ffffff] font-[500] rounded-[6px] cursor-pointer disabled:opacity-50"
          >
            {isSaving ? "Нест шуда истодааст..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

