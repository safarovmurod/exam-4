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
  brandId?: number;
  description: string;
  weight: string;
  size: string;
  code: string;
  subCategoryId: number;
  subCategoryName?: string;
  colorId?: number;
  images: { id: number; images: string }[];
}

export const getProducts = createAsyncThunk("product/getProducts", async (params?: { ProductName?: string }) => {
  try {
    const { data } = await _axios.get("/Product/get-products", {
      params: { PageNumber: 1, PageSize: 100, ...params },
    });
    return (data.data?.products ?? []) as Product[];
  } catch (error) {
    console.error(error);
  }
});

export const getProductById = createAsyncThunk("product/getById", async (id: number) => {
  try {
    const { data } = await _axios.get("/Product/get-product-by-id", {
      params: { id },
    });
    return data.data as ProductDetail;
  } catch (error) {
    console.error(error);
  }
});

export const addProduct = createAsyncThunk("product/addProduct", async (formData: FormData, { dispatch }) => {
  try {
    await _axios.post("/Product/add-product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(getProducts());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const updateProduct = createAsyncThunk("product/updateProduct", async (payload: any, { dispatch }) => {
  try {
    await _axios.put("/Product/update-product", null, { params: payload });
    dispatch(getProducts());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: number, { dispatch }) => {
  try {
    await _axios.delete("/Product/delete-product", { params: { id } });
    dispatch(getProducts());
    return id;
  } catch (error) {
    console.error(error);
  }
});

interface ProductState {
  products: Product[];
  currentProduct: ProductDetail | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  isSaving: false,
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload || [];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ ҳангоми боркунии маҳсулот";
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload || null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(addProduct.pending, (state) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      });
  },
});

export default productSlice.reducer;
