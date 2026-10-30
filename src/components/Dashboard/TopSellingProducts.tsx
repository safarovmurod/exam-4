import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Product } from "../../store/productSlice";

interface Props {
  products: Product[];
}

export default function TopSellingProducts({ products }: Props) {
  const apiUrl = import.meta.env.VITE_API?.replace(/\/$/, "") || "https://store-api.softclub.tj";
  const topSelling = products.length > 0 ? products.slice(0, 5) : [];

  return (
    <Card className="p-[20px] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-[16px]">
        <CardTitle className="text-[18px] font-[700]">Top selling products</CardTitle>
        <Link
          to="/products"
          className="flex items-center gap-[4px] text-[13px] font-[500] text-[#2563eb] hover:underline"
        >
          <span>See All</span>
          <ArrowRight size={14} />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-[14px] p-0">
        {topSelling.map((prod) => (
          <div key={prod.id} className="flex items-center justify-between gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[6px] bg-[#f1f5f9] p-[4px]">
                <img
                  src={`${apiUrl}/images/${prod.image}`}
                  alt={prod.productName}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/42?text=Product";
                  }}
                />
              </div>
              <div>
                <p className="line-clamp-1 text-[14px] font-[500] text-[#0f172a]">
                  {prod.productName}
                </p>
                <p className="text-[12px] text-[#64748b]">
                  {prod.categoryName || "Accessories"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-[600] text-[#10b981]">${prod.price}</p>
              <p className="text-[11px] text-[#94a3b8]">in sales</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

