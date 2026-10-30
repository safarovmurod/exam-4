import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Slider } from "../components/ui/slider";
import { getBrand } from "../store/BrandSlice";
import { getCategory } from "../store/CategorySlice";
import { getColor } from "../store/ColorSlice";
import { getProduct, type Product } from "../store/ProductSlice";
import type { AppDispatch, RootState } from "../store/store";

interface ProductsState {
  section?: string;
  ids?: number[];
}

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const pageState = state as ProductsState | null;
  const section = pageState?.section || "Explore Our Products";
  const searchQuery = params.get("search") || "";
  const [categoryId, setCategoryId] = useState(params.get("category") || "");
  const [subCategoryId] = useState(params.get("subcategory") || "");
  const [brandId, setBrandId] = useState("");
  const [colorId, setColorId] = useState("");
  const [search, setSearch] = useState(searchQuery);
  const [price, setPrice] = useState([0, 2000]);
  const [appliedPrice, setAppliedPrice] = useState([0, 2000]);
  const [sort, setSort] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(12);
  const { data, isLoading, error } = useSelector((root: RootState) => root.productSlice);
  const categories = useSelector((root: RootState) => root.categorySlice.data);
  const brands = useSelector((root: RootState) => root.brandSlice.data);
  const colors = useSelector((root: RootState) => root.colorSlice.data);
  const apiUrl = import.meta.env.VITE_API?.replace(/\/$/, "");

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
    dispatch(getColor());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct({
      CategoryId: categoryId ? Number(categoryId) : undefined,
      SubcategoryId: subCategoryId ? Number(subCategoryId) : undefined,
      BrandId: brandId ? Number(brandId) : undefined,
      ColorId: colorId ? Number(colorId) : undefined,
      MinPrice: appliedPrice[0] > 0 ? appliedPrice[0] : undefined,
      MaxPrice: appliedPrice[1] < 2000 ? appliedPrice[1] : undefined,
      PageNumber: 1,
      PageSize: 100,
    }));
  }, [dispatch, searchQuery, categoryId, subCategoryId, brandId, colorId, appliedPrice]);

  let products = data.products;
  if (searchQuery) products = products.filter((product) => product.productName.toLowerCase().includes(searchQuery.toLowerCase()));
  if (pageState?.ids) products = products.filter((product) => pageState.ids?.includes(product.id));
  if (sort === "price-low") products = [...products].sort((a, b) => (a.hasDiscount ? a.discountPrice : a.price) - (b.hasDiscount ? b.discountPrice : b.price));
  if (sort === "price-high") products = [...products].sort((a, b) => (b.hasDiscount ? b.discountPrice : b.price) - (a.hasDiscount ? a.discountPrice : a.price));
  if (sort === "name") products = [...products].sort((a, b) => a.productName.localeCompare(b.productName));

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(`/products${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ""}`);
  }

  function filters() {
    return (
      <Accordion type="multiple" defaultValue={["category", "brand", "color", "price"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[10px]">
            <Button type="button" variant="ghost" onClick={() => setCategoryId("")} className={`h-auto justify-start p-[0px] ${!categoryId ? "text-[#DB4444]" : ""}`}>All products</Button>
            {categories.slice(0, 8).map((category) => (
              <Button key={category.id} type="button" variant="ghost" onClick={() => setCategoryId(String(category.id))} className={`h-auto justify-start p-[0px] text-left ${categoryId === String(category.id) ? "text-[#DB4444]" : ""}`}>{category.categoryName}</Button>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent className="flex max-h-[220px] flex-col gap-[10px] overflow-auto">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center gap-[8px] text-[14px]">
                <Checkbox checked={brandId === String(brand.id)} onCheckedChange={() => setBrandId(brandId === String(brand.id) ? "" : String(brand.id))} />
                {brand.brandName}
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent className="flex max-h-[180px] flex-col gap-[10px] overflow-auto">
            {colors.map((color) => (
              <label key={color.id} className="flex items-center gap-[8px] text-[14px]">
                <Checkbox checked={colorId === String(color.id)} onCheckedChange={() => setColorId(colorId === String(color.id) ? "" : String(color.id))} />
                {color.colorName}
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price range</AccordionTrigger>
          <AccordionContent>
            <Slider value={price} onValueChange={setPrice} min={0} max={2000} step={10} />
            <div className="mt-[16px] flex gap-[8px]"><Input value={price[0]} readOnly aria-label="Min price" /><Input value={price[1]} readOnly aria-label="Max price" /></div>
            <Button type="button" variant="outline" onClick={() => setAppliedPrice(price)} className="mt-[12px] w-full border-[#DB4444] text-[#DB4444]">Apply</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] p-[16px] pt-[40px] pb-[100px]">
      <div className="flex items-center gap-[8px] text-[14px]"><Link to="/home" className="text-[#777777]">Home</Link><span>/</span><span>{section}</span></div>

      <form onSubmit={submitSearch} className="relative mt-[24px] flex md:hidden">
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="h-[48px] pr-[44px]" />
        <Button type="submit" variant="ghost" size="icon" aria-label="Search" className="absolute right-[4px] top-[4px]"><Search /></Button>
      </form>

      <div className="mt-[16px] flex items-center justify-between gap-[8px] md:justify-end">
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-[44px] w-[150px]"><SlidersHorizontal /><SelectValue placeholder="Popular" /></SelectTrigger>
          <SelectContent><SelectGroup><SelectItem value="popular">Popular</SelectItem><SelectItem value="price-low">Price: Low</SelectItem><SelectItem value="price-high">Price: High</SelectItem><SelectItem value="name">Name</SelectItem></SelectGroup></SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild><Button type="button" variant="outline" className="h-[44px] md:hidden"><Filter />Filter</Button></SheetTrigger>
          <SheetContent side="right" className="bg-[#ffffff] p-[20px]"><SheetHeader><SheetTitle>Filter</SheetTitle></SheetHeader><div className="mt-[20px]">{filters()}</div></SheetContent>
        </Sheet>
      </div>

      {(categoryId || brandId || colorId || searchQuery) && (
        <div className="mt-[16px] flex flex-wrap gap-[8px]">
          {categoryId && <Badge variant="outline">Category</Badge>}
          {brandId && <Badge variant="outline">Brand</Badge>}
          {colorId && <Badge variant="outline">Color</Badge>}
          {searchQuery && <Badge variant="outline">{searchQuery}</Badge>}
        </div>
      )}

      <div className="mt-[32px] flex gap-[40px]">
        <aside className="hidden w-[210px] shrink-0 md:block">{filters()}</aside>
        <div className="w-full min-w-[0px]">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-[#DB4444]">{error}</p>}
          {!isLoading && !error && products.length === 0 && <p>Маҳсулот нест</p>}
          <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, visibleCount).map((product: Product) => {
              const discount = product.hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
              return (
                <ProductCard key={product.id} id={product.id} image={`${apiUrl}/images/${product.image}`} name={product.productName} price={product.hasDiscount ? product.discountPrice : product.price} oldPrice={product.hasDiscount ? product.price : undefined} color={product.color}>
                  {discount > 0 && <Badge className="absolute top-[12px] left-[12px] bg-[#DB4444] text-[#ffffff]">-{discount}%</Badge>}
                </ProductCard>
              );
            })}
          </div>
          {visibleCount < products.length && <div className="mt-[48px] flex justify-center"><Button type="button" onClick={() => setVisibleCount(visibleCount + 12)} className="h-[48px] bg-[#DB4444] pl-[36px] pr-[36px] text-[#ffffff]">More Products</Button></div>}
        </div>
      </div>
    </div>
  );
}
