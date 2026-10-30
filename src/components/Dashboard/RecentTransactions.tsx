import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending";
}

const defaultTransactions: Transaction[] = [
  { id: "1", name: "Jagdish T.", date: "24.05.2026", amount: 240.0, status: "Paid" },
  { id: "2", name: "Ananya P.", date: "23.05.2026", amount: 180.5, status: "Paid" },
  { id: "3", name: "Vikram R.", date: "22.05.2026", amount: 49.99, status: "Pending" },
  { id: "4", name: "Pooja M.", date: "21.05.2026", amount: 320.0, status: "Paid" },
  { id: "5", name: "Rohan S.", date: "20.05.2026", amount: 95.0, status: "Pending" },
];

export default function RecentTransactions() {
  return (
    <Card className="p-[20px] shadow-sm">
      <CardHeader className="p-0 pb-[16px]">
        <CardTitle className="text-[18px] font-[700] text-[#0f172a]">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-[#f1f5f9] text-[12px] font-[600] text-[#64748b]">
              <th className="pb-[12px]">Name</th>
              <th className="pb-[12px]">Date</th>
              <th className="pb-[12px]">Amount</th>
              <th className="pb-[12px] text-right pr-[8px]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {defaultTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#f8fafc]">
                <td className="py-[12px] font-[500] text-[#0f172a]">{tx.name}</td>
                <td className="py-[12px] text-[#64748b]">{tx.date}</td>
                <td className="py-[12px] font-[600] text-[#0f172a]">
                  ${tx.amount.toFixed(2)}
                </td>
                <td className="py-[12px] text-right pr-[8px]">
                  <Badge variant={tx.status === "Paid" ? "success" : "warning"}>
                    {tx.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

