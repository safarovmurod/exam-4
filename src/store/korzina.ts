import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";

interface CartApiProduct {
  id: number;
  quantity: number;
  product: { id: number; productName: string; image: string; price: number; hasDiscount: boolean; discountPrice: number };
}

export const getCart = createAsyncThunk("cart/getCart", async () => {
  try {
    const { data } = await _axios.get("/Cart/get-products-from-cart");
    const items: CartApiProduct[] = data.data?.[0]?.productsInCart || [];
    const apiUrl = import.meta.env.VITE_API?.replace(/\/$/, "");
    return items.map((item) => ({
      id: item.id,
      productId: item.product.id,
      name: item.product.productName,
      image: `${apiUrl}/images/${item.product.image}`,
      price: item.product.hasDiscount ? item.product.discountPrice : item.product.price,
      quantity: item.quantity,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const addCartProduct = createAsyncThunk("cart/addProduct", async (id: number, { dispatch }) => {
  try {
    await _axios.post("/Cart/add-product-to-cart", null, { params: { id } });
    await dispatch(getCart());
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const plus = createAsyncThunk("cart/plus", async (id: number, { dispatch }) => {
  try {
    await _axios.put("/Cart/increase-product-in-cart", null, { params: { id } });
    await dispatch(getCart());
  } catch (error) {
    console.error(error);
    throw error;  
  }
});

export const minus = createAsyncThunk("cart/minus", async (id: number, { dispatch }) => {
  try {
    await _axios.put("/Cart/reduce-product-in-cart", null, { params: { id } });
    await dispatch(getCart());
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteCartProduct = createAsyncThunk("cart/deleteProduct", async (id: number, { dispatch }) => {
  try {
    await _axios.delete("/Cart/delete-product-from-cart", { params: { id } });
    await dispatch(getCart());
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const clearServerCart = createAsyncThunk("cart/clearServerCart", async (_, { dispatch }) => {
  try {
    await _axios.delete("/Cart/clear-cart");
    await dispatch(getCart());
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export type CartItem = { id: number; productId: number; name: string; image: string; price: number; quantity: number };

const cartSlice = createSlice({
  name: "cart",
  initialState: { data: [] as CartItem[], isLoading: false, error: "" },
  reducers: {
    resetCart(state) { state.data = []; state.error = ""; },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => { state.isLoading = true; state.error = ""; });
    builder.addCase(getCart.fulfilled, (state, action) => { state.data = action.payload; state.isLoading = false; });
    builder.addCase(getCart.rejected, (state, action) => { state.data = []; state.isLoading = false; state.error = action.error.message || "error"; });
    builder.addCase(addCartProduct.pending, (state) => { state.isLoading = true; state.error = ""; });
    builder.addCase(plus.pending, (state) => { state.isLoading = true; state.error = ""; });
    builder.addCase(minus.pending, (state) => { state.isLoading = true; state.error = ""; });
    builder.addCase(deleteCartProduct.pending, (state) => { state.isLoading = true; state.error = ""; });
    builder.addCase(clearServerCart.pending, (state) => { state.isLoading = true; state.error = ""; });
    builder.addCase(addCartProduct.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || "error"; });
    builder.addCase(plus.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || "error"; });
    builder.addCase(minus.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || "error"; });
    builder.addCase(deleteCartProduct.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || "error"; });
    builder.addCase(clearServerCart.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || "error"; });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
