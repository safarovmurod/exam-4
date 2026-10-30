import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";

export interface SubCategory {
  id: number;
  subCategoryName: string;
}

export interface Category {
  id: number;
  categoryName: string;
  categoryImage: string;
  subCategories: SubCategory[];
}

export const getCategory = createAsyncThunk("Category/get", async () => {
  try {
    const { data } = await _axios.get("/Category/get-categories");
    return data.data as Category[];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getCategoryById = createAsyncThunk("Category/getById", async (id: number) => {
  try {
    const { data } = await _axios.get("/Category/get-category-by-id", { params: { id } });
    return data.data as Category;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const CategorySlice = createSlice({
  name: "Category",
  initialState: { data: [] as Category[], byId: null as Category | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
  },
});

export default CategorySlice.reducer;
