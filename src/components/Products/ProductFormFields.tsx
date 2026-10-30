import type { ChangeEvent } from "react";
import { Upload } from "lucide-react";
import type { Category } from "../../store/categorySlice";
import type { Brand } from "../../store/brandSlice";
import type { Color } from "../../store/colorSlice";

interface Props {
  productName: string;
  setProductName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  price: number | "";
  setPrice: (v: number | "") => void;
  hasDiscount: boolean;
  setHasDiscount: (v: boolean) => void;
  discountPrice: number | "";
  setDiscountPrice: (v: number | "") => void;
  quantity: number | "";
  setQuantity: (v: number | "") => void;
  selectedCategoryId: number | "";
  setSelectedCategoryId: (v: number | "") => void;
  selectedSubCategoryId: number | "";
  setSelectedSubCategoryId: (v: number | "") => void;
  selectedBrandId: number | "";
  setSelectedBrandId: (v: number | "") => void;
  selectedColorId: number | "";
  setSelectedColorId: (v: number | "") => void;
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  imageFiles?: File[];
  onImageChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  showImageUpload?: boolean;
}

export default function ProductFormFields({
  productName,
  setProductName,
  description,
  setDescription,
  price,
  setPrice,
  hasDiscount,
  setHasDiscount,
  discountPrice,
  setDiscountPrice,
  quantity,
  setQuantity,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedSubCategoryId,
  setSelectedSubCategoryId,
  selectedBrandId,
  setSelectedBrandId,
  selectedColorId,
  setSelectedColorId,
  categories,
  brands,
  colors,
  imageFiles = [],
  onImageChange,
  showImageUpload = false,
}: Props) {
  const activeCategory = categories.find((c) => c.id === Number(selectedCategoryId));
  const availableSubCategories = activeCategory?.subCategories || [];

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[6px]">
        <label className="text-[13px] font-[500] text-[#374151]">
          Product Name *
        </label>
        <input
          type="text"
          placeholder="e.g. Nike Air Max"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] focus:outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label className="text-[13px] font-[500] text-[#374151]">
          Description
        </label>
        <textarea
          placeholder="Маълумот дар бораи маҳсулот..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
        <div className="flex flex-col gap-[6px]">
          <label className="text-[13px] font-[500] text-[#374151]">
            Category *
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => {
              const id = Number(e.target.value);
              setSelectedCategoryId(id);
              const cat = categories.find((c) => c.id === id);
              if (cat && cat.subCategories?.length > 0) {
                setSelectedSubCategoryId(cat.subCategories[0].id);
              }
            }}
            className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] bg-[#ffffff] focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[13px] font-[500] text-[#374151]">
            SubCategory *
          </label>
          <select
            value={selectedSubCategoryId}
            onChange={(e) => setSelectedSubCategoryId(Number(e.target.value))}
            className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] bg-[#ffffff] focus:outline-none"
          >
            {availableSubCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.subCategoryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
        <div className="flex flex-col gap-[6px]">
          <label className="text-[13px] font-[500] text-[#374151]">
            Brand *
          </label>
          <select
            value={selectedBrandId}
            onChange={(e) => setSelectedBrandId(Number(e.target.value))}
            className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] bg-[#ffffff] focus:outline-none"
          >
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.brandName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[13px] font-[500] text-[#374151]">
            Color *
          </label>
          <select
            value={selectedColorId}
            onChange={(e) => setSelectedColorId(Number(e.target.value))}
            className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] bg-[#ffffff] focus:outline-none"
          >
            {colors.map((col) => (
              <option key={col.id} value={col.id}>
                {col.colorName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px]">
        <div className="flex flex-col gap-[6px]">
          <label className="text-[13px] font-[500] text-[#374151]">
            Price ($) *
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="99.99"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center gap-[6px]">
            <input
              type="checkbox"
              id="fieldHasDisc"
              checked={hasDiscount}
              onChange={(e) => setHasDiscount(e.target.checked)}
              className="cursor-pointer"
            />
            <label htmlFor="fieldHasDisc" className="text-[13px] font-[500] text-[#374151] cursor-pointer">
              Has Discount
            </label>
          </div>
          <input
            type="number"
            step="0.01"
            placeholder="79.99"
            disabled={!hasDiscount}
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className={`w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] focus:outline-none ${
              !hasDiscount ? "bg-[#f3f4f6] text-[#9ca3af]" : ""
            }`}
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[13px] font-[500] text-[#374151]">
            Quantity
          </label>
          <input
            type="number"
            placeholder="10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-[12px] py-[8px] text-[14px] border border-[#d1d5db] rounded-[6px] focus:outline-none"
          />
        </div>
      </div>

      {showImageUpload && onImageChange && (
        <div className="flex flex-col gap-[6px]">
          <label className="text-[13px] font-[500] text-[#374151]">
            Images *
          </label>
          <div className="border-2 border-dashed border-[#d1d5db] rounded-[8px] p-[16px] text-center hover:border-[#10b981] transition cursor-pointer relative bg-[#f9fafb]">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload size={24} className="mx-auto text-[#9ca3af] mb-[6px]" />
            <p className="text-[13px] text-[#4b5563]">
              {imageFiles.length > 0
                ? `${imageFiles.length} файл интихоб шуд`
                : "Суратҳоро интихоб кунед"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

