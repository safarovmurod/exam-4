import { Search } from "lucide-react";
import type { Category } from "../../store/categorySlice";

interface Props {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  categories: Category[];
}

export default function ProductsFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: Props) {
  return (
    <div className="bg-[#ffffff] p-[16px] rounded-[10px] border border-[#e5e7eb] flex flex-col md:flex-row items-center justify-between gap-[16px]">
      <div className="relative w-full md:w-[320px]">
        <Search
          size={18}
          className="absolute left-[12px] top-[12px] text-[#9ca3af]"
        />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-[38px] pr-[12px] py-[8px] text-[14px] border border-[#e5e7eb] rounded-[8px] text-[#111827] focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-[12px] w-full md:w-auto">
        <label className="text-[14px] text-[#6b7280] hidden sm:inline">
          Category:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full md:w-[200px] py-[8px] px-[12px] text-[14px] border border-[#e5e7eb] rounded-[8px] text-[#111827] bg-[#ffffff] focus:outline-none"
        >
          <option value="all">Ҳамаи категорияҳо</option>
          {categories.map((cat) => (
            <option key={cat.id} value={String(cat.id)}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

