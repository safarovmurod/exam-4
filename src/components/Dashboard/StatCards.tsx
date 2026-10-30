import { Package, Folder, Tag, Users } from "lucide-react";
import { Card } from "../ui/card";

interface Props {
  productsCount: number;
  categoriesCount: number;
  brandsCount: number;
  usersCount: number;
}

export default function StatCards({
  productsCount,
  categoriesCount,
  brandsCount,
  usersCount,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
      <Card className="flex items-center gap-[16px] p-[20px] shadow-sm">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-[#eff6ff] text-[#2563eb]">
          <Package size={26} />
        </div>
        <div>
          <p className="text-[13px] font-[500] text-[#64748b]">Products</p>
          <p className="text-[24px] font-[700] text-[#0f172a]">{productsCount}</p>
        </div>
      </Card>

      <Card className="flex items-center gap-[16px] p-[20px] shadow-sm">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-[#fdf2f8] text-[#ec4899]">
          <Folder size={26} />
        </div>
        <div>
          <p className="text-[13px] font-[500] text-[#64748b]">Categories</p>
          <p className="text-[24px] font-[700] text-[#0f172a]">{categoriesCount}</p>
        </div>
      </Card>

      <Card className="flex items-center gap-[16px] p-[20px] shadow-sm">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-[#fff7ed] text-[#f97316]">
          <Tag size={26} />
        </div>
        <div>
          <p className="text-[13px] font-[500] text-[#64748b]">Brands</p>
          <p className="text-[24px] font-[700] text-[#0f172a]">{brandsCount}</p>
        </div>
      </Card>

      <Card className="flex items-center gap-[16px] p-[20px] shadow-sm">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-[#f0fdf4] text-[#10b981]">
          <Users size={26} />
        </div>
        <div>
          <p className="text-[13px] font-[500] text-[#64748b]">Users</p>
          <p className="text-[24px] font-[700] text-[#0f172a]">{usersCount}</p>
        </div>
      </Card>
    </div>
  );
}
