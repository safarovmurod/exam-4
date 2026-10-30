import { useState, type ChangeEvent, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Category } from "../../store/categorySlice";
import type { Brand } from "../../store/brandSlice";
import type { Color } from "../../store/colorSlice";
import ProductFormFields from "./ProductFormFields";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  isSaving: boolean;
  onSave: (fd: FormData) => Promise<boolean>;
}

export default function AddProductModal({
  isOpen,
  onClose,
  categories,
  brands,
  colors,
  isSaving,
  onSave,
}: Props) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">(
    categories[0]?.id || ""
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | "">(
    categories[0]?.subCategories?.[0]?.id || ""
  );
  const [selectedBrandId, setSelectedBrandId] = useState<number | "">(
    brands[0]?.id || ""
  );
  const [selectedColorId, setSelectedColorId] = useState<number | "">(
    colors[0]?.id || ""
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!productName.trim()) {
      setFormError("Номи маҳсулотро ворид кунед");
      return;
    }
    if (!price || Number(price) <= 0) {
      setFormError("Нархи дурустро ворид кунед");
      return;
    }
    if (!selectedSubCategoryId) {
      setFormError("Зеркатегорияро интихоб кунед");
      return;
    }
    if (!selectedBrandId) {
      setFormError("Брендро интихоб кунед");
      return;
    }
    if (!selectedColorId) {
      setFormError("Рангро интихоб кунед");
      return;
    }
    if (imageFiles.length === 0) {
      setFormError("Ҳадди ақал 1 сурат интихоб кунед");
      return;
    }

    const fd = new FormData();
    imageFiles.forEach((file) => fd.append("Images", file));
    fd.append("BrandId", String(selectedBrandId));
    fd.append("ColorId", String(selectedColorId));
    fd.append("ProductName", productName.trim());
    fd.append("Description", description.trim() || productName.trim());
    fd.append("Quantity", String(quantity || 10));
    fd.append("Weight", "0.5 kg");
    fd.append("Size", "M");
    fd.append("Code", `PRD-${Date.now()}`);
    fd.append("Price", String(price));
    fd.append("HasDiscount", String(hasDiscount));
    fd.append("DiscountPrice", String(hasDiscount ? discountPrice || 0 : 0));
    fd.append("SubCategoryId", String(selectedSubCategoryId));

    const success = await onSave(fd);
    if (success) {
      onClose();
    } else {
      setFormError("Хатогӣ ҳангоми иловаи маҳсулот");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#00000080] flex items-center justify-center p-[16px] overflow-y-auto">
      <div className="bg-[#ffffff] rounded-[12px] w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-[24px]">
        <div className="flex items-center justify-between pb-[16px] border-b border-[#e5e7eb] mb-[16px]">
          <div>
            <h2 className="text-[18px] font-[700] text-[#111827]">
              Add a new product
            </h2>
            <p className="text-[12px] text-[#6b7280]">
              Маълумоти маҳсулотро пур кунед
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#9ca3af] hover:text-[#111827] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {formError && (
          <div className="mb-[16px] bg-[#fee2e2] text-[#b91c1c] text-[13px] p-[10px] rounded-[6px]">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          <ProductFormFields
            productName={productName}
            setProductName={setProductName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            hasDiscount={hasDiscount}
            setHasDiscount={setHasDiscount}
            discountPrice={discountPrice}
            setDiscountPrice={setDiscountPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
            setSelectedSubCategoryId={setSelectedSubCategoryId}
            selectedBrandId={selectedBrandId}
            setSelectedBrandId={setSelectedBrandId}
            selectedColorId={selectedColorId}
            setSelectedColorId={setSelectedColorId}
            categories={categories}
            brands={brands}
            colors={colors}
            imageFiles={imageFiles}
            onImageChange={handleImageChange}
            showImageUpload={true}
          />

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
              {isSaving ? "Сабт..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
