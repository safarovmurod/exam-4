import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { clearServerCart, deleteCartProduct, getCart, minus, plus } from "../store/korzina";
import type { AppDispatch, RootState } from "../store/store";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useSelector((state: RootState) => state.korzina);
  const total = data.reduce((sum, product) => sum + product.price * product.quantity, 0);

  useEffect(() => { dispatch(getCart()); }, [dispatch]);

  return (
    <div className="mx-auto w-full max-w-[1200px] p-[16px] pt-[48px] pb-[100px] md:pt-[72px]">
      <div className="flex gap-[12px] text-[14px] text-[#777777]"><Link to="/home">Home</Link><span>/</span><span className="text-[#000000]">Cart</span></div>

      <div className="mt-[48px] hidden justify-between p-[20px] text-[14px] md:flex"><span className="w-[35%]">Product</span><span className="w-[18%]">Price</span><span className="w-[22%]">Quantity</span><span className="w-[20%]">Subtotal</span></div>
      {isLoading && <p className="mt-[24px]">Loading...</p>}
      {error && <p className="mt-[24px] text-[#DB4444]">{error}</p>}
      {!isLoading && !error && data.length === 0 && <p className="mt-[32px] text-[#777777]">Корзина холияй</p>}

      <div className="flex flex-col gap-[16px]">
        {data.map((product) => (
          <Card key={product.id} className="gap-[0px] rounded-[4px] py-[0px] ring-[0px] shadow-[0_2px_12px_#00000015]">
            <CardContent className="flex flex-wrap items-center justify-between gap-[16px] p-[20px] md:flex-nowrap">
              <div className="flex w-[70%] items-center gap-[16px] md:w-[35%]"><img src={product.image} alt={product.name} className="h-[48px] w-[48px] object-contain" /><span>{product.name}</span></div>
              <span className="w-[20%] md:w-[18%]">${product.price.toFixed(2)}</span>
              <div className="flex w-[45%] items-center gap-[8px] md:w-[22%]">
                <Button type="button" variant="outline" size="icon" disabled={isLoading || product.quantity <= 1} onClick={() => dispatch(minus(product.id))}>−</Button>
                <span className="w-[32px] text-center">{product.quantity}</span>
                <Button type="button" variant="outline" size="icon" disabled={isLoading} onClick={() => dispatch(plus(product.id))}>+</Button>
              </div>
              <span className="font-[500] md:w-[15%]">${(product.price * product.quantity).toFixed(2)}</span>
              <Button type="button" variant="ghost" size="icon" onClick={() => dispatch(deleteCartProduct(product.id))} aria-label={`Remove ${product.name}`} className="text-[#DB4444]"><Trash2 /></Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-[24px] flex justify-between gap-[16px]">
        <Button asChild variant="outline"><Link to="/home">Return To Shop</Link></Button>
        <Button type="button" variant="outline" disabled={data.length === 0 || isLoading} onClick={() => dispatch(clearServerCart())} className="border-[#DB4444] text-[#DB4444]">Remove all</Button>
      </div>

      <div className="mt-[60px] flex justify-end">
        <Card className="w-full max-w-[420px] gap-[0px] rounded-[4px] border border-[#000000] py-[0px] ring-[0px]">
          <CardHeader className="p-[24px] pb-[0px]"><CardTitle className="text-[20px] font-[500]">Cart Total</CardTitle></CardHeader>
          <CardContent className="p-[24px]">
            <div className="flex justify-between pb-[16px]"><span>Subtotal:</span><span>${total.toFixed(2)}</span></div><Separator />
            <div className="flex justify-between pt-[16px] pb-[16px]"><span>Shipping:</span><span>Free</span></div><Separator />
            <div className="flex justify-between pt-[16px] font-[700]"><span>Total:</span><span>${total.toFixed(2)}</span></div>
            <Button type="button" disabled={data.length === 0} onClick={() => navigate("/checkout")} className="mt-[24px] h-[46px] w-full bg-[#DB4444] text-[#ffffff]">Process to checkout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
