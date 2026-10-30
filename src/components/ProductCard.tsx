import { useState, type ReactNode } from "react";
import { Eye, Heart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartProduct } from "../store/korzina";
import { toggleLike } from "../store/like";
import type { AppDispatch, RootState } from "../store/store";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  color?: string;
  children?: ReactNode;
  onRemove?: () => void;
}

export default function ProductCard({ id, image, name, price, oldPrice, color, children, onRemove }: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const liked = useSelector((state: RootState) => state.like.data.some((item) => item.id === id));
  const inCart = useSelector((state: RootState) => state.korzina.data.some((item) => item.productId === id));
  const [error, setError] = useState("");

  async function addProduct() {
    setError("");
    if (inCart) return;
    const result = await dispatch(addCartProduct(id));
    if (result.meta.requestStatus === "rejected") {
      setError((result as any).error?.message || "error");
    }
  }

  return (
    <Card className="w-full gap-[0px] rounded-[4px] bg-[#ffffff] py-[0px] ring-[0px] md:max-w-[270px]">
      <CardContent className="p-[0px]">
        <div className="group relative flex h-[250px] items-center justify-center overflow-hidden rounded-[4px] bg-[#f5f5f5]">
          {children}
          <div className="absolute top-[12px] right-[12px] z-10 flex flex-col gap-[8px]">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove || (() => dispatch(toggleLike({ id, image, name, price, oldPrice, color })))}
              aria-label={onRemove ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={onRemove ? undefined : liked}
              className="h-[34px] w-[34px] rounded-[50%] bg-[#ffffff]"
            >
              {onRemove ? <Trash2 /> : <Heart color={liked ? "#DB4444" : "currentColor"} fill={liked ? "#DB4444" : "none"} />}
            </Button>
            {!onRemove && (
              <Button type="button" variant="ghost" size="icon" onClick={() => navigate(`/products/${id}`)} aria-label="View product" className="h-[34px] w-[34px] rounded-[50%] bg-[#ffffff]">
                <Eye />
              </Button>
            )}
          </div>
          <img src={image} alt={name} className="h-[180px] w-[190px] object-contain transition-transform duration-300 group-hover:scale-105" />
          <Button
            type="button"
            onClick={addProduct}
            className={`absolute bottom-[8px] left-[8px] right-[8px] z-10 h-[40px] rounded-[4px] text-[14px] font-[500] text-[#ffffff] shadow-md transition-all duration-300 ease-in-out cursor-pointer ${
              inCart
                ? "bg-[#00a65a] hover:bg-[#008a4b] opacity-100 translate-y-0"
                : "bg-[#000000] hover:bg-[#DB4444] opacity-0 translate-y-[8px] group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
            }`}
          >
            {inCart ? "Уже в корзине" : "Add To Cart"}
          </Button>
        </div>
      </CardContent>
      <CardHeader className="gap-[8px] p-[0px] pt-[16px]">
        <CardTitle className="text-[16px] font-[500] text-[#000000]">{name}</CardTitle>
        {inCart ? (
          <p className="text-[12px] font-[500] text-[#00a65a]">Уже в корзине</p>
        ) : error ? (
          <p className="text-[12px] text-[#DB4444]">{error}</p>
        ) : null}
        <div className="flex items-center gap-[12px] text-[16px] font-[500]">
          <span className="text-[#DB4444]">${price}</span>
          {oldPrice !== undefined && <span className="text-[#777777] line-through">${oldPrice}</span>}
        </div>
        {color && CSS.supports("color", color) && <span title={color} className="h-[14px] w-[14px] rounded-[50%] border border-[#000000]" style={{ backgroundColor: color }} />}
      </CardHeader>
    </Card>
  );
}
