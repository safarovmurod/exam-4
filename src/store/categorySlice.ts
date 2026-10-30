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

export const getCategories = createAsyncThunk("category/get", async () => {
  try {
    const { data } = await _axios.get("/Category/get-categories");
    return (data.data || []) as Category[];
  } catch (error) {
    console.error(error);
  }
});

export const addCategory = createAsyncThunk("category/add", async (formData: FormData, { dispatch }) => {
  try {
    await _axios.post("/Category/add-category", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(getCategories());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const updateCategory = createAsyncThunk("category/update", async (formData: FormData, { dispatch }) => {
  try {
    await _axios.put("/Category/update-category", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(getCategories());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const deleteCategory = createAsyncThunk("category/delete", async (id: number, { dispatch }) => {
  try {
    await _axios.delete("/Category/delete-category", { params: { id } });
    dispatch(getCategories());
    return id;
  } catch (error) {
    console.error(error);
  }
});

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  isSaving: boolean;
  error: string;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  isSaving: false,
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload || [];
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ ҳангоми боркунии категорияҳо";
      })
      .addCase(addCategory.pending, (state) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(updateCategory.pending, (state) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      });
  },
});

export default categorySlice.reducer;
