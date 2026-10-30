import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CardsSwiper from "../components/Swiper/CardsSwiper";
import { Button } from "../components/ui/button";
import { addCartProduct } from "../store/korzina";
import { clearLikes, toggleLike } from "../store/like";
import { getProduct } from "../store/ProductSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function Wishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.like.data);
  const products = useSelector((state: RootState) => state.productSlice.data.products);
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_API?.replace(/\/$/, "");

  useEffect(() => {
    if (products.length === 0) dispatch(getProduct({ PageNumber: 1, PageSize: 8 }));
  }, [dispatch, products.length]);

  async function moveAll() {
    setError("");
    for (const product of wishlist) {
      const result = await dispatch(addCartProduct(product.id));
      if (result.meta.requestStatus === "rejected") {
        setError((result as any).error?.message || "error");
        return;
      }
    }
    dispatch(clearLikes());
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] p-[16px] pt-[60px] pb-[100px]">
      <div className="flex items-center justify-between gap-[16px]">
        <h1 className="text-[20px]">Wishlist ({wishlist.length})</h1>
        <Button type="button" variant="outline" disabled={wishlist.length === 0} onClick={moveAll}>Move All To Bag</Button>
      </div>
      {error && <p className="mt-[16px] text-[#DB4444]">{error}</p>}
      {wishlist.length === 0 && <p className="mt-[32px] text-[#777777]">Wishlist холияй</p>}
      <div className="mt-[32px]">
        <CardsSwiper>{wishlist.map((product) => <ProductCard key={product.id} {...product} onRemove={() => dispatch(toggleLike(product))} />)}</CardsSwiper>
      </div>

      <div className="mt-[80px] flex items-center justify-between gap-[16px]">
        <div className="flex items-center gap-[16px]"><span className="h-[40px] w-[20px] rounded-[4px] bg-[#DB4444]" /><h2 className="text-[20px]">Just For You</h2></div>
        <Button asChild variant="outline"><Link to="/products">See All</Link></Button>
      </div>
      <div className="mt-[32px]">
        <CardsSwiper>
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} id={product.id} image={`${apiUrl}/images/${product.image}`} name={product.productName} price={product.hasDiscount ? product.discountPrice : product.price} oldPrice={product.hasDiscount ? product.price : undefined} color={product.color} />)}
        </CardsSwiper>
      </div>
    </div>
  );
}
