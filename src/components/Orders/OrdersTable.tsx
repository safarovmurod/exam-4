import type { ChangeEvent } from "react";
import { Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Order } from "../../store/orderSlice";

interface Props {
  orders: Order[];
  selectedIds: string[];
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: string) => void;
  onUpdateStatus: (id: string, status: "Ready" | "Shipped" | "Received") => void;
  onDeleteOrder: (id: string) => void;
}

export default function OrdersTable({
  orders,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onUpdateStatus,
  onDeleteOrder,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-[#e2e8f0] text-[13px] font-[600] text-[#64748b]">
            <th className="w-[40px] pb-[12px]">
              <input
                type="checkbox"
                checked={orders.length > 0 && selectedIds.length === orders.length}
                onChange={onSelectAll}
                className="h-[16px] w-[16px] rounded-[4px] accent-[#2563eb]"
              />
            </th>
            <th className="pb-[12px]">Order</th>
            <th className="pb-[12px]">Date</th>
            <th className="pb-[12px]">Customer</th>
            <th className="pb-[12px]">Payment status</th>
            <th className="pb-[12px]">Order Status</th>
            <th className="pb-[12px]">Total</th>
            <th className="pb-[12px] text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-[#f8fafc]">
              <td className="py-[14px]">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(order.id)}
                  onChange={() => onSelectOne(order.id)}
                  className="h-[16px] w-[16px] rounded-[4px] accent-[#2563eb]"
                />
              </td>
              <td className="py-[14px] font-[600] text-[#0f172a]">
                {order.orderNumber}
              </td>
              <td className="py-[14px] text-[#64748b]">{order.date}</td>
              <td className="py-[14px] font-[500] text-[#0f172a]">
                {order.customer}
              </td>
              <td className="py-[14px]">
                <Badge
                  variant={order.paymentStatus === "Paid" ? "success" : "warning"}
                >
                  {order.paymentStatus}
                </Badge>
              </td>
              <td className="py-[14px]">
                <Badge
                  className={
                    order.orderStatus === "Ready"
                      ? "bg-[#ffedd5] text-[#c2410c]"
                      : order.orderStatus === "Shipped"
                      ? "bg-[#e0e7ff] text-[#3730a3]"
                      : "bg-[#dbeafe] text-[#1d4ed8]"
                  }
                >
                  {order.orderStatus}
                </Badge>
              </td>
              <td className="py-[14px] font-[600] text-[#0f172a]">
                ${order.total.toFixed(2)}
              </td>
              <td className="py-[14px] text-right">
                <div className="flex items-center justify-end gap-[8px]">
                  <Select
                    value={order.orderStatus}
                    onValueChange={(val: any) => onUpdateStatus(order.id, val)}
                  >
                    <SelectTrigger className="h-[30px] w-[95px] text-[12px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ready">Ready</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Received">Received</SelectItem>
                    </SelectContent>
                  </Select>

                  <button
                    type="button"
                    onClick={() => onDeleteOrder(order.id)}
                    className="rounded-[4px] p-[6px] text-[#ef4444] hover:bg-[#fee2e2] cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

