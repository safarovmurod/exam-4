import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";

export interface Product {
  id: number;
  productName: string;
  image: string;
  color: string;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;
  quantity: number;
  categoryId: number;
  categoryName: string;
}

export interface ProductDetail extends Product {
  brand: string;
  description: string;
  weight: string;
  size: string;
  code: string;
  subCategoryId: number;
  images: { id: number; images: string }[];
}

export interface ProductParams {
  ProductName?: string;
  MinPrice?: number;
  MaxPrice?: number;
  BrandId?: number;
  ColorId?: number;
  CategoryId?: number;
  SubcategoryId?: number;
  PageNumber?: number;
  PageSize?: number;
}

interface ProductList {
  products: Product[];
}

export const getProduct = createAsyncThunk("Product/get", async (params?: ProductParams) => {
  try {
    const { data } = await _axios.get("/Product/get-products", { params });
    return { products: data.data?.products ?? [] } as ProductList;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getProductById = createAsyncThunk("Product/getById", async (id: number) => {
  try {
    const { data } = await _axios.get("/Product/get-product-by-id", { params: { id } });
    return data.data as ProductDetail;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    data: { products: [] } as ProductList,
    byId: null as ProductDetail | null,
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => { state.isLoading = true; state.error = ""; });
    builder.addCase(getProduct.fulfilled, (state, action) => { state.data = action.payload; state.isLoading = false; });
    builder.addCase(getProduct.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || "error"; });
    builder.addCase(getProductById.pending, (state) => { state.isLoading = true; state.error = ""; });
    builder.addCase(getProductById.fulfilled, (state, action) => { state.byId = action.payload; state.isLoading = false; });
    builder.addCase(getProductById.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || "error"; });
  },
});

export default ProductSlice.reducer;
