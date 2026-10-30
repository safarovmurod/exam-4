import { Store, CircleDollarSign, ShoppingBag, Banknote } from "lucide-react";

const highlights = [
  { icon: Store, number: "10.5k", label: "Sellers active our site" },
  { icon: CircleDollarSign, number: "33k", label: "Monthly Product Sale" },
  { icon: ShoppingBag, number: "45.5k", label: "Customer active in our site" },
  { icon: Banknote, number: "25k", label: "Annual gross sale in our site" },
];

export default function Highlights() {
  return (
    <section className="mt-[100px] flex flex-col gap-[24px] md:flex-row">
      {highlights.map((item) => <div key={item.label} className="flex w-full flex-col items-center rounded-[4px] border border-[#cccccc] bg-[#ffffff] p-[24px] text-center hover:bg-[#DB4444] hover:text-[#ffffff]">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[50%] border-[8px] border-[#c4c4c4] bg-[#000000] text-[#ffffff]"><item.icon size={28} /></div>
        <p className="mt-[20px] text-[32px] font-[700]">{item.number}</p><p className="mt-[4px] text-[14px]">{item.label}</p>
      </div>)}
    </section>
  );
}
