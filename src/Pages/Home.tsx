import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import CategoryCard from "../components/CategoryCard";
import Hero from "../components/Home/Hero";
import MusicBanner from "../components/Home/MusicBanner";
import NewArrival from "../components/Home/NewArrival";
import Services from "../components/Home/Services";
import ProductCard from "../components/ProductCard";
import ProductSection from "../components/ProductSection";
import CardsSwiper from "../components/Swiper/CardsSwiper";
import Timer from "../components/Timer";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { getCategory } from "../store/CategorySlice";
import { getProduct, type Product } from "../store/ProductSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation();
  const [orderSuccess, setOrderSuccess] = useState(Boolean((state as { orderSuccess?: boolean })?.orderSuccess));
  const [contactSuccess, setContactSuccess] = useState(Boolean((state as { contactSuccess?: boolean })?.contactSuccess));
  const flashSwiper = useRef<SwiperType | null>(null);
  const { data: productData, isLoading, error } = useSelector((state: RootState) => state.productSlice);
  const { data: categories } = useSelector((state: RootState) => state.categorySlice);
  const products = productData.products;
  const flashProducts = products.filter((product) => product.hasDiscount);
  const bestProducts = products.slice(0, 4);
  const exploreProducts = products.slice(0, 8);
  const apiUrl = import.meta.env.VITE_API?.replace(/\/$/, "");

  useEffect(() => {
    dispatch(getProduct({ PageNumber: 1, PageSize: 100 }));
    dispatch(getCategory());
  }, [dispatch]);

  function productCards(items: Product[]) {
    return items.map((product) => {
      const discount = product.hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
      return (
        <ProductCard
          key={product.id}
          id={product.id}
          image={`${apiUrl}/images/${product.image}`}
          name={product.productName}
          price={product.hasDiscount ? product.discountPrice : product.price}
          oldPrice={product.hasDiscount ? product.price : undefined}
          color={product.color}
        >
          {discount > 0 && <Badge className="absolute top-[12px] left-[12px] bg-[#DB4444] text-[12px] text-[#ffffff]">-{discount}%</Badge>}
        </ProductCard>
      );
    });
  }

  function viewAll(title: string, items: Product[], text = "View All Products") {
    return (
      <div className="mt-[40px] flex justify-center">
        <Button asChild className="h-[48px] rounded-[4px] bg-[#DB4444] pl-[40px] pr-[40px] text-[#ffffff]">
          <Link to="/products" state={{ section: title, ids: items.map((item) => item.id) }}>{text}</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {orderSuccess && (
        <div className="mx-auto mt-[24px] mb-[12px] flex w-full max-w-[1200px] items-center justify-between gap-[16px] rounded-[4px] border border-[#22c55e] bg-[#f0fdf4] p-[16px] text-[#15803d]">
          <div className="flex items-center gap-[12px]">
            <CheckCircle2 size={24} className="shrink-0 text-[#16a34a]" />
            <div>
              <p className="font-[600] text-[16px]">Ваш заказ принят!</p>
              <p className="text-[14px]">Ждите, курьер свяжется с вами и доставит ваш заказ.</p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={() => setOrderSuccess(false)} className="text-[#15803d] hover:bg-[#dcfce7]">
            <X size={18} />
          </Button>
        </div>
      )}
      {contactSuccess && (
        <div className="mx-auto mt-[24px] mb-[12px] flex w-full max-w-[1200px] items-center justify-between gap-[16px] rounded-[4px] border border-[#22c55e] bg-[#f0fdf4] p-[16px] text-[#15803d]">
          <div className="flex items-center gap-[12px]">
            <CheckCircle2 size={24} className="shrink-0 text-[#16a34a]" />
            <div>
              <p className="font-[600] text-[16px]">Ваш запрос принят!</p>
              <p className="text-[14px]">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={() => setContactSuccess(false)} className="text-[#15803d] hover:bg-[#dcfce7]">
            <X size={18} />
          </Button>
        </div>
      )}
      <Hero />
      {isLoading && <p className="mx-auto mt-[40px] w-full max-w-[1200px] p-[16px]">Loading...</p>}
      {error && <p className="mx-auto mt-[40px] w-full max-w-[1200px] p-[16px] text-[#DB4444]">{error}</p>}
      {!isLoading && !error && products.length === 0 && <p className="mx-auto mt-[40px] w-full max-w-[1200px] p-[16px]">Маҳсулот нест</p>}

      <ProductSection
        label="Today’s"
        title="Flash Sales"
        timer={<Timer />}
        action={
          <div className="flex gap-[8px]">
            <Button type="button" variant="ghost" size="icon" aria-label="Previous products" onClick={() => flashSwiper.current?.slidePrev()} className="h-[46px] w-[46px] rounded-[50%] bg-[#f5f5f5]"><ArrowLeft /></Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Next products" onClick={() => flashSwiper.current?.slideNext()} className="h-[46px] w-[46px] rounded-[50%] bg-[#f5f5f5]"><ArrowRight /></Button>
          </div>
        }
        footer={viewAll("Flash Sales", flashProducts)}
      >
        <CardsSwiper onSwiper={(swiper) => { flashSwiper.current = swiper; }}>{productCards(flashProducts)}</CardsSwiper>
      </ProductSection>

      <ProductSection label="Categories" title="Browse By Category">
        <CardsSwiper width={170}>
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <CategoryCard image={`${apiUrl}/images/${category.categoryImage}`}>{category.categoryName}</CategoryCard>
            </Link>
          ))}
        </CardsSwiper>
      </ProductSection>

      <ProductSection label="This Month" title="Best Selling Products" action={viewAll("Best Selling Products", bestProducts, "View All")}>
        <CardsSwiper>{productCards(bestProducts)}</CardsSwiper>
      </ProductSection>

      <MusicBanner />

      <ProductSection label="Our Products" title="Explore Our Products" footer={viewAll("Explore Our Products", exploreProducts)}>
        <div className="flex flex-col gap-[32px]">
          <CardsSwiper>{productCards(exploreProducts.slice(0, 4))}</CardsSwiper>
          <CardsSwiper>{productCards(exploreProducts.slice(4, 8))}</CardsSwiper>
        </div>
      </ProductSection>

      <NewArrival />
      <Services />
      <div className="sticky bottom-[16px] z-10 mx-auto flex w-full max-w-[1200px] justify-end p-[16px]">
        <Button type="button" variant="ghost" size="icon" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="h-[46px] w-[46px] rounded-[50%] bg-[#f5f5f5]"><ArrowRight className="rotate-[-90deg]" /></Button>
      </div>
    </>
  );
}
