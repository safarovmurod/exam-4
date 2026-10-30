import { useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipboardList, Plus } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import OrdersHeader from "../components/Orders/OrdersHeader";
import OrdersFilters from "../components/Orders/OrdersFilters";
import OrdersTable from "../components/Orders/OrdersTable";
import AddOrderModal from "../components/Orders/AddOrderModal";
import {
  addOrder,
  deleteOrder,
  updateOrderStatus,
} from "../store/orderSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.order.orders);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const hasSearch = order.customer.toLowerCase().includes(search.toLowerCase());
    if (filterStatus === "all") return hasSearch;
    if (filterStatus === "paid") return hasSearch && order.paymentStatus === "Paid";
    if (filterStatus === "pending") return hasSearch && order.paymentStatus === "Pending";
    return hasSearch;
  });

  function handleSelectAll(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSelectedIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedIds([]);
    }
  }

  function handleSelectOne(id: string) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  function handleDeleteSelected() {
    selectedIds.forEach((id) => dispatch(deleteOrder(id)));
    setSelectedIds([]);
  }

  function handleSaveOrder(data: {
    customer: string;
    total: number;
    paymentStatus: "Paid" | "Pending";
    orderStatus: "Ready" | "Shipped" | "Received";
  }) {
    dispatch(
      addOrder({
        orderNumber: `#${Math.floor(10000 + Math.random() * 90000)}B`,
        date: "Today",
        ...data,
      })
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <OrdersHeader onOpenAdd={() => setIsAddOpen(true)} />

      {orders.length === 0 ? (
        <Card className="flex min-h-[460px] flex-col items-center justify-center p-[40px] text-center shadow-sm">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
            <ClipboardList size={40} />
          </div>
          <h2 className="mt-[24px] text-[20px] font-[700] text-[#0f172a]">
            No Orders Yet
          </h2>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="mt-[24px] h-[44px] bg-[#2563eb] px-[24px] text-[15px] font-[600] text-[#ffffff] hover:bg-[#1d4ed8]"
          >
            <Plus size={18} />
            <span>Add order</span>
          </Button>
        </Card>
      ) : (
        <Card className="p-[20px] shadow-sm">
          <OrdersFilters
            search={search}
            onSearchChange={setSearch}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            selectedCount={selectedIds.length}
            onDeleteSelected={handleDeleteSelected}
          />

          <OrdersTable
            orders={filteredOrders}
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onUpdateStatus={(id, status) =>
              dispatch(updateOrderStatus({ id, status }))
            }
            onDeleteOrder={(id) => dispatch(deleteOrder(id))}
          />
        </Card>
      )}

      <AddOrderModal
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={handleSaveOrder}
      />
    </div>
  );
}
