import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import type { AppDispatch, RootState } from "../store/store";
import { clearServerCart, getCart, resetCart } from "../store/korzina";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import InteractiveCard from "../components/Checkout/InteractiveCard";

export default function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.korzina);
  const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isOrdering, setIsOrdering] = useState(false);
  const inputClass = "h-[50px] w-full rounded-[4px] border border-[#cccccc] p-[12px] text-[15px]";

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  async function handlePlaceOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (data.length === 0) return;

    setIsOrdering(true);
    setTimeout(async () => {
      try {
        await dispatch(clearServerCart());
      } catch (error) {
        console.error(error);
      }
      dispatch(resetCart());
      setIsOrdering(false);
      navigate("/home", { state: { orderSuccess: true } });
    }, 2000);
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] p-[16px] pt-[48px] pb-[100px] md:pt-[72px]">
      <div className="flex gap-[12px] text-[14px] text-[#777777]">
        <Link to="/home">Product</Link><span>/</span><Link to="/cart">View Cart</Link><span>/</span><span className="text-[#000000]">CheckOut</span>
      </div>

      <h1 className="mt-[48px] text-[32px] font-[500]">Billing Details</h1>
      <div className="mt-[16px] flex flex-col gap-[60px] lg:flex-row lg:justify-between">
        <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex w-full max-w-[520px] flex-col gap-[20px] bg-[#ffffff] p-[20px] shadow-[0_4px_20px_#00000020]">
          <InteractiveCard />
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] font-[500] text-[#000000]">Email address</label>
            <Input required type="email" className={inputClass} aria-label="Email address" placeholder="example@gmail.com" />
          </div>
          <label className="flex items-start gap-[16px] text-[16px]"><Checkbox className="mt-[4px]" /> Save this information for faster check-out next time</label>
        </form>

        <div className="w-full max-w-[470px]">
          {data.map((item) => <div key={item.id} className="mt-[16px] flex items-center justify-between gap-[16px]"><img src={item.image} alt={item.name} className="h-[48px] w-[48px] object-contain" /><span>{item.name} × {item.quantity}</span><span>${(item.price * item.quantity).toFixed(2)}</span></div>)}
          <div className="mt-[32px] flex justify-between"><span>Subtotal:</span><span>${total.toFixed(2)}</span></div>
          <div className="mt-[20px] flex justify-between pb-[16px]"><span>Shipping:</span><span>Free</span></div><Separator />
          <div className="mt-[16px] flex justify-between text-[20px] font-[700]"><span>Total:</span><span>${total.toFixed(2)}</span></div>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-[40px] flex flex-col gap-[20px]">
            <label onClick={() => setPaymentMethod("bank")} className="flex items-center gap-[16px] cursor-pointer">
              <RadioGroupItem value="bank" id="bank" />
              <span className="text-[16px]">Bank</span>
            </label>
            <label onClick={() => setPaymentMethod("cash")} className="flex items-center gap-[16px] cursor-pointer">
              <RadioGroupItem value="cash" id="cash" />
              <span className="text-[16px]">Cash on delivery</span>
            </label>
          </RadioGroup>
          <Button type="submit" form="checkout-form" disabled={data.length === 0 || isOrdering} className="mt-[40px] h-[52px] w-full rounded-[4px] bg-[#DB4444] text-[16px] font-[500] text-[#ffffff] cursor-pointer hover:bg-[#b83838]">Place Order</Button>
        </div>
      </div>

      {isOrdering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] p-[16px]">
          <div className="flex w-full max-w-[360px] flex-col items-center justify-center gap-[16px] rounded-[8px] bg-[#ffffff] p-[32px] text-center shadow-lg">
            <Loader2 className="h-[48px] w-[48px] animate-spin text-[#DB4444]" />
            <p className="text-[18px] font-[500] text-[#000000]">Оформление заказа...</p>
            <p className="text-[14px] text-[#777777]">Лутфан каме сабр кунед, фармоиши шумо қабул шуда истодааст.</p>
          </div>
        </div>
      )}
    </div>
  );
}
