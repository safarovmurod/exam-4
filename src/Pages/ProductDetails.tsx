import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart, RefreshCw, Truck } from "lucide-react";
import ProductCard from "../components/ProductCard";
import CardsSwiper from "../components/Swiper/CardsSwiper";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { getCart, addCartProduct, plus, type CartItem } from "../store/korzina";
import { toggleLike } from "../store/like";
import { getProductById, type Product } from "../store/ProductSlice";
import type { AppDispatch, RootState } from "../store/store";
import { _axios } from "../token/token";

export default function ProductDetails() {
  const { id = "" } = useParams();
  return <ProductDetailsContent key={id} productId={Number(id)} />;
}

function ProductDetailsContent({ productId }: { productId: number }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { byId: product, isLoading, error } = useSelector((state: RootState) => state.productSlice);
  const liked = useSelector((state: RootState) => state.like.data.some((item) => item.id === productId));
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState<Product[]>([]);
  const [cartError, setCartError] = useState("");
  const apiUrl = import.meta.env.VITE_API?.replace(/\/$/, "");

  useEffect(() => {
    if (productId) dispatch(getProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (!product?.subCategoryId || product.id !== productId) return;
    let active = true;

    async function getRelated() {
      try {
        const { data } = await _axios.get("/Product/get-products", { params: { SubcategoryId: product?.subCategoryId, PageNumber: 1, PageSize: 8 } });
        if (active) setRelated((data.data.products || []).filter((item: Product) => item.id !== productId).slice(0, 4));
      } catch (requestError) {
        console.error(requestError);
        if (active) setRelated([]);
      }
    }

    getRelated();
    return () => { active = false; };
  }, [productId, product]);

  async function buyNow() {
    setCartError("");
    const cartResult = await dispatch(getCart());
    const cartList = (cartResult.payload as CartItem[]) || [];
    const existing = cartList.find((item) => item.productId === productId);

    if (existing) {
      for (let count = 0; count < quantity; count++) {
        await dispatch(plus(existing.id));
      }
    } else {
      const addResult = await dispatch(addCartProduct(productId));
      if (addResult.meta.requestStatus === "rejected") {
        setCartError((addResult as any).error?.message || "error");
        return;
      }
      if (quantity > 1) {
        const updatedCart = await dispatch(getCart());
        if (updatedCart.meta.requestStatus === "fulfilled") {
          const item = (updatedCart.payload as CartItem[]).find((cartProduct) => cartProduct.productId === productId);
          if (item) {
            for (let count = 1; count < quantity; count++) {
              await dispatch(plus(item.id));
            }
          }
        }
      }
    }

    await dispatch(getCart());
    navigate("/checkout");
  }

  if (isLoading) return <p className="mx-auto w-full max-w-[1200px] p-[16px] pt-[60px]">Loading...</p>;
  if (error || !product || product.id !== productId) return <p className="mx-auto w-full max-w-[1200px] p-[16px] pt-[60px] text-[#DB4444]">{error || "Маҳсулот нест"}</p>;

  const images = product.images || [];
  const image = selectedImage || images[0]?.images;
  const price = product.hasDiscount ? product.discountPrice : product.price;

  return (
    <div className="mx-auto w-full max-w-[1200px] p-[16px] pt-[40px] pb-[100px]">
      <div className="flex flex-wrap gap-[8px] text-[14px] text-[#777777]"><Link to="/home">Home</Link><span>/</span><span>{product.categoryName || "Product"}</span><span>/</span><span className="text-[#000000]">{product.productName}</span></div>

      <div className="mt-[40px] flex flex-col gap-[40px] lg:flex-row">
        <div className="flex w-full flex-col gap-[16px] md:flex-row-reverse">
          <div className="flex h-[360px] w-full items-center justify-center rounded-[4px] bg-[#f5f5f5] md:h-[500px]">
            {image && <img src={`${apiUrl}/images/${image}`} alt={product.productName} className="h-[82%] w-[82%] object-contain" />}
          </div>
          <div className="flex gap-[16px] overflow-x-auto md:flex-col">
            {images.map((item) => (
              <Button key={item.id} type="button" variant="ghost" onClick={() => setSelectedImage(item.images)} aria-label="View product image" className="h-[90px] w-[90px] shrink-0 rounded-[4px] bg-[#f5f5f5] p-[8px] md:h-[110px] md:w-[130px]">
                <img src={`${apiUrl}/images/${item.images}`} alt="" className="h-full w-full object-contain" />
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full lg:max-w-[400px]">
          <h1 className="text-[24px] font-[700]">{product.productName}</h1>
          <p className={`mt-[12px] text-[14px] ${product.quantity > 0 ? "text-[#00a65a]" : "text-[#DB4444]"}`}>{product.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
          <div className="mt-[16px] flex gap-[12px] text-[24px]"><span>${price}</span>{product.hasDiscount && <span className="text-[#777777] line-through">${product.price}</span>}</div>
          <p className="mt-[24px] text-[14px]">{product.description}</p>
          <Separator className="mt-[24px] bg-[#cccccc]" />
          {product.color && (
            <div className="mt-[24px] flex items-center gap-[16px]">
              <span>Colours:</span>
              {CSS.supports("color", product.color) && <span title={product.color} className="h-[22px] w-[22px] rounded-[50%] border-[2px] border-[#000000]" style={{ backgroundColor: product.color }} />}
              <span className="text-[14px] text-[#777777] capitalize">{product.color}</span>
            </div>
          )}
          {product.size && <p className="mt-[16px]">Size: {product.size}</p>}
          <div className="mt-[24px] flex flex-wrap items-center gap-[12px]">
            <div className="flex h-[44px] items-center rounded-[4px] border border-[#aaaaaa]">
              <Button type="button" variant="ghost" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity" className="h-full w-[42px] rounded-[0px]">−</Button>
              <span className="w-[42px] text-center">{quantity}</span>
              <Button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity" className="h-full w-[42px] rounded-[0px] bg-[#DB4444] text-[#ffffff]">+</Button>
            </div>
            <Button type="button" onClick={buyNow} className="h-[44px] flex-1 rounded-[4px] bg-[#DB4444] text-[16px] font-[500] text-[#ffffff] cursor-pointer hover:bg-[#b83838]">Buy Now</Button>
            <Button type="button" variant="outline" size="icon" aria-label="Add to wishlist" onClick={() => dispatch(toggleLike({ id: product.id, name: product.productName, image: image ? `${apiUrl}/images/${image}` : "", price, oldPrice: product.hasDiscount ? product.price : undefined, color: product.color }))} className="h-[44px] w-[44px]"><Heart fill={liked ? "#DB4444" : "none"} color={liked ? "#DB4444" : "currentColor"} /></Button>
          </div>
          {cartError && <p className="mt-[8px] text-[14px] text-[#DB4444]">{cartError}</p>}

          <div className="mt-[32px] rounded-[4px] border border-[#dddddd]">
            <div className="flex items-center gap-[16px] p-[16px]"><Truck size={28} /><div><p className="font-[500]">Free Delivery</p><p className="text-[12px]">Enter your postal code for delivery availability</p></div></div>
            <Separator />
            <div className="flex items-center gap-[16px] p-[16px]"><RefreshCw size={28} /><div><p className="font-[500]">Return Delivery</p><p className="text-[12px]">Free 30 Days Delivery Returns</p></div></div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-[80px]">
          <div className="flex items-center gap-[16px] text-[#DB4444]"><span className="h-[40px] w-[20px] rounded-[4px] bg-[#DB4444]" /><h2 className="font-[700]">Related Item</h2></div>
          <div className="mt-[32px]"><CardsSwiper>{related.map((item) => <ProductCard key={item.id} id={item.id} image={`${apiUrl}/images/${item.image}`} name={item.productName} price={item.hasDiscount ? item.discountPrice : item.price} oldPrice={item.hasDiscount ? item.price : undefined} color={item.color} />)}</CardsSwiper></div>
        </section>
      )}
    </div>
  );
}
