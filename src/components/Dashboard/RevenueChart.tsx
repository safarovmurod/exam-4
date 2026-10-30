import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface RevenueItem {
  month: string;
  revenue: number;
}

const defaultMonthlyData: RevenueItem[] = [
  { month: "Jan", revenue: 28 },
  { month: "Feb", revenue: 35 },
  { month: "Mar", revenue: 22 },
  { month: "Apr", revenue: 45 },
  { month: "May", revenue: 58 },
  { month: "Jun", revenue: 40 },
  { month: "Jul", revenue: 65 },
  { month: "Aug", revenue: 52 },
  { month: "Sep", revenue: 48 },
  { month: "Oct", revenue: 60 },
  { month: "Nov", revenue: 75 },
  { month: "Dec", revenue: 84 },
];

export default function RevenueChart() {
  return (
    <Card className="p-[20px] shadow-sm">
      <CardHeader className="p-0 pb-[16px]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[18px] font-[700] text-[#0f172a]">
            Sales Revenue
          </CardTitle>
          <span className="text-[12px] font-[500] text-[#64748b]">
            Year 2026
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-end justify-between h-[200px] pt-[20px] gap-[8px] overflow-x-auto">
          {defaultMonthlyData.map((item) => (
            <div
              key={item.month}
              className="flex flex-col items-center gap-[8px] flex-1 min-w-[32px]"
            >
              <span className="text-[10px] text-[#64748b]">${item.revenue}k</span>
              <div
                className="w-full bg-[#2563eb] rounded-t-[4px] hover:bg-[#1d4ed8] transition-all cursor-pointer"
                style={{ height: `${item.revenue * 1.8}px` }}
                title={`${item.month}: $${item.revenue},000`}
              />
              <span className="text-[11px] font-[500] text-[#64748b]">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

