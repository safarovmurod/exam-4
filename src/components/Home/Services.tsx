import delivery from "../../assets/Services.png";
import support from "../../assets/Services (1).png";
import guarantee from "../../assets/Services (2).png";

export default function Services() {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-[48px] p-[16px] pt-[80px] pb-[80px] md:flex-row md:justify-around">
      <div className="flex flex-col items-center text-center">
        <img src={delivery} alt="" className="h-[80px] w-[80px]" />
        <h3 className="mt-[24px] text-[20px] font-[700]">FREE AND FAST DELIVERY</h3>
        <p className="mt-[8px] text-[14px]">Free delivery for all orders over $140</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <img src={support} alt="" className="h-[80px] w-[80px]" />
        <h3 className="mt-[24px] text-[20px] font-[700]">24/7 CUSTOMER SERVICE</h3>
        <p className="mt-[8px] text-[14px]">Friendly 24/7 customer support</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <img src={guarantee} alt="" className="h-[80px] w-[80px]" />
        <h3 className="mt-[24px] text-[20px] font-[700]">MONEY BACK GUARANTEE</h3>
        <p className="mt-[8px] text-[14px]">We return money within 30 days</p>
      </div>
    </section>
  );
}
