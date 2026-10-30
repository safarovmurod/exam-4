import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Product, ProductDetail } from "../../store/productSlice";
import type { Category } from "../../store/categorySlice";
import type { Brand } from "../../store/brandSlice";
import type { Color } from "../../store/colorSlice";
import ProductFormFields from "./ProductFormFields";

interface Props {
  product: Product | ProductDetail;
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  isSaving: boolean;
  onSave: (payload: any) => Promise<{ success: boolean; error?: string }>;
}

export default function EditProductModal({
  product,
  isOpen,
  onClose,
  categories,
  brands,
  colors,
  isSaving,
  onSave,
}: Props) {
  const detail = product as Partial<ProductDetail>;

  const matchedBrand =
    brands.find((b) => b.id === detail.brandId) ||
    brands.find((b) => detail.brand && b.brandName.toLowerCase() === detail.brand.toLowerCase()) ||
    brands[0];

  const matchedColor =
    colors.find((c) => c.id === detail.colorId) ||
    colors.find((c) => detail.color && c.colorName.toLowerCase() === detail.color.toLowerCase()) ||
    colors[0];

  const parentCategory = categories.find((c) =>
    c.subCategories?.some((s) => s.id === detail.subCategoryId)
  );

  const [productName, setProductName] = useState(product.productName || "");
  const [description, setDescription] = useState(detail.description || "Сифати аъло ва бренди аслӣ");
  const [price, setPrice] = useState<number | "">(product.price || 0);
  const [hasDiscount, setHasDiscount] = useState(product.hasDiscount || false);
  const [discountPrice, setDiscountPrice] = useState<number | "">(
    product.discountPrice || 0
  );
  const [quantity, setQuantity] = useState<number | "">(product.quantity || 10);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "">(
    parentCategory?.id || product.categoryId || categories[0]?.id || ""
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | "">(
    detail.subCategoryId ||
      parentCategory?.subCategories?.[0]?.id ||
      categories[0]?.subCategories?.[0]?.id ||
      ""
  );
  const [selectedBrandId, setSelectedBrandId] = useState<number | "">(
    matchedBrand?.id || ""
  );
  const [selectedColorId, setSelectedColorId] = useState<number | "">(
    matchedColor?.id || ""
  );
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

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

    const uniqueCode = detail.code
      ? `${detail.code}_${Date.now()}`
      : `PRD_${product.id}_${Date.now()}`;

    const payload = {
      Id: product.id,
      BrandId: selectedBrandId || matchedBrand?.id || 71,
      ColorId: selectedColorId || matchedColor?.id || 2,
      ProductName: productName.trim(),
      Description: description.trim() || productName.trim(),
      Quantity: Number(quantity) || 10,
      Weight: detail.weight || "0.5 kg",
      Size: detail.size || "M",
      Code: uniqueCode,
      Price: Number(price),
      HasDiscount: Boolean(hasDiscount),
      DiscountPrice: hasDiscount ? Number(discountPrice) || 0 : 0,
      SubCategoryId: selectedSubCategoryId || 175,
    };

    const res = await onSave(payload);
    if (res.success) {
      onClose();
    } else {
      setFormError(res.error || "Хатогӣ ҳангоми навсозӣ");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#00000080] flex items-center justify-center p-[16px] overflow-y-auto">
      <div className="bg-[#ffffff] rounded-[12px] w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-[24px]">
        <div className="flex items-center justify-between pb-[16px] border-b border-[#e5e7eb] mb-[16px]">
          <div>
            <h2 className="text-[18px] font-[700] text-[#111827]">
              Edit Product #{product.id}
            </h2>
            <p className="text-[12px] text-[#6b7280]">Таҳрири маълумоти маҳсулот</p>
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
            showImageUpload={false}
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
              {isSaving ? "Навсозӣ..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
