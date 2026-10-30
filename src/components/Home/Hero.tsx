import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getCategory, type Category } from "../../store/CategorySlice";
import type { AppDispatch, RootState } from "../../store/store";
import HeroSwiper from "../Swiper/HeroSwiper";

export default function Hero() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.categorySlice);
  const categories = data;
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => { dispatch(getCategory()); }, [dispatch]);

  return (
    <section className="mx-auto w-full max-w-[1200px] md:flex md:pl-[16px] md:pr-[16px]">
      <div
        onMouseLeave={() => setActiveCategory(null)}
        className="relative flex flex-wrap gap-[8px] p-[16px] md:w-[217px] md:shrink-0 md:border-r-[1px] md:border-[#dddddd] md:pt-[40px] md:pr-[16px]"
      >
        <div className="flex w-full flex-wrap gap-[8px] md:h-[340px] md:flex-col md:flex-nowrap md:gap-[16px] md:overflow-y-auto md:overflow-x-hidden md:pr-[8px]">
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => {
                if (category.subCategories?.length > 0) setActiveCategory(category);
                else setActiveCategory(null);
              }}
              className="flex items-center justify-between"
            >
              <Link
                to={`/products?category=${category.id}`}
                className={`flex w-full items-center justify-between gap-[8px] text-[14px] md:text-[16px] ${
                  activeCategory?.id === category.id ? "text-[#DB4444]" : ""
                }`}
              >
                <span className="truncate">{category.categoryName}</span>
                {category.subCategories?.length > 0 && <ChevronRight size={16} className="shrink-0" />}
              </Link>
            </div>
          ))}
        </div>

        {activeCategory && activeCategory.subCategories?.length > 0 && (
          <div
            onMouseEnter={() => setActiveCategory(activeCategory)}
            onMouseLeave={() => setActiveCategory(null)}
            className="absolute left-[16px] top-[100%] z-30 flex min-w-[200px] flex-col gap-[10px] rounded-[4px] border border-[#dddddd] bg-[#ffffff] p-[16px] shadow-lg md:left-[217px] md:top-[40px]"
          >
            <p className="text-[12px] font-[500] uppercase tracking-wide text-[#777777]">
              {activeCategory.categoryName}
            </p>
            {activeCategory.subCategories.map((subCategory) => (
              <Link
                key={subCategory.id}
                to={`/products?subcategory=${subCategory.id}`}
                className="text-[14px] hover:text-[#DB4444] hover:underline"
              >
                {subCategory.subCategoryName}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="w-full md:min-w-0 md:flex-1 md:pl-[32px] md:pt-[40px]"><HeroSwiper /></div>
    </section>
  );
}
