import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  paymentStatus: "Paid" | "Pending";
  orderStatus: "Ready" | "Shipped" | "Received";
  total: number;
}

export type Order = OrderItem;

interface OrderState {
  orders: OrderItem[];
}

const defaultOrders: OrderItem[] = [
  {
    id: "1",
    orderNumber: "#3452B",
    date: "Today at 6:42 AM",
    customer: "Jagdish T.",
    paymentStatus: "Paid",
    orderStatus: "Ready",
    total: 240.0,
  },
  {
    id: "2",
    orderNumber: "#3451B",
    date: "Today at 5:10 AM",
    customer: "Ananya P.",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    total: 180.5,
  },
  {
    id: "3",
    orderNumber: "#3450B",
    date: "Yesterday",
    customer: "Vikram R.",
    paymentStatus: "Pending",
    orderStatus: "Ready",
    total: 49.99,
  },
  {
    id: "4",
    orderNumber: "#3449B",
    date: "Yesterday",
    customer: "Pooja M.",
    paymentStatus: "Paid",
    orderStatus: "Received",
    total: 320.0,
  },
  {
    id: "5",
    orderNumber: "#3448B",
    date: "24.05.2026",
    customer: "Rohan S.",
    paymentStatus: "Pending",
    orderStatus: "Ready",
    total: 95.0,
  },
];

const saved = localStorage.getItem("admin_orders");
const initialState: OrderState = {
  orders: saved ? JSON.parse(saved) : defaultOrders,
};

const saveOrders = (orders: OrderItem[]) => {
  localStorage.setItem("admin_orders", JSON.stringify(orders));
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<any>) {
      state.orders.unshift({
        ...action.payload,
        id: String(Date.now()),
      });
      saveOrders(state.orders);
    },
    updateOrderStatus(
      state,
      action: PayloadAction<{ id: string; status: "Ready" | "Shipped" | "Received" }>
    ) {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.orderStatus = action.payload.status;
        saveOrders(state.orders);
      }
    },
    deleteOrder(state, action: PayloadAction<string>) {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
      saveOrders(state.orders);
    },
  },
});

export const { addOrder, updateOrderStatus, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
