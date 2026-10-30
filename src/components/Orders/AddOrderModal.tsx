import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    customer: string;
    total: number;
    paymentStatus: "Paid" | "Pending";
    orderStatus: "Ready" | "Shipped" | "Received";
  }) => void;
}

export default function AddOrderModal({ isOpen, onOpenChange, onSave }: Props) {
  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"Paid" | "Pending">("Paid");
  const [orderStatus, setOrderStatus] = useState<"Ready" | "Shipped" | "Received">("Ready");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!customer.trim() || !total) return;

    onSave({
      customer: customer.trim(),
      total: parseFloat(total) || 0,
      paymentStatus,
      orderStatus,
    });

    setCustomer("");
    setTotal("");
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-[16px] flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] font-[500]">Customer Name</label>
            <Input
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px] font-[500]">Total Amount ($)</label>
            <Input
              required
              type="number"
              step="0.01"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="e.g. 89.90"
            />
          </div>

          <div className="grid grid-cols-2 gap-[12px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px] font-[500]">Payment</label>
              <Select
                value={paymentStatus}
                onValueChange={(v: any) => setPaymentStatus(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[14px] font-[500]">Order Status</label>
              <Select
                value={orderStatus}
                onValueChange={(v: any) => setOrderStatus(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-[12px] flex justify-end gap-[12px]">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#2563eb] text-[#ffffff] hover:bg-[#1d4ed8]"
            >
              Save Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

