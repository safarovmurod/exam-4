import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";
import { getCategories } from "./categorySlice";

export interface SubCategoryItem {
  id: number;
  subCategoryName: string;
  categoryId: number;
}

export const getSubCategories = createAsyncThunk("subCategory/get", async (categoryId?: number) => {
  try {
    const { data } = await _axios.get("/SubCategory/get-sub-category", {
      params: { CategoryId: categoryId, PageNumber: 1, PageSize: 100 },
    });
    return (data.data?.subCategories || data.data || []) as SubCategoryItem[];
  } catch (error) {
    console.error(error);
  }
});

export const addSubCategory = createAsyncThunk("subCategory/add", async (payload: { categoryId: number; subCategoryName: string }, { dispatch }) => {
  try {
    await _axios.post("/SubCategory/add-sub-category", null, {
      params: {
        CategoryId: payload.categoryId,
        SubCategoryName: payload.subCategoryName,
      },
    });
    dispatch(getCategories());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const updateSubCategory = createAsyncThunk("subCategory/update", async (payload: { id: number; categoryId: number; subCategoryName: string }, { dispatch }) => {
  try {
    await _axios.put("/SubCategory/update-sub-category", null, {
      params: {
        Id: payload.id,
        CategoryId: payload.categoryId,
        SubCategoryName: payload.subCategoryName,
      },
    });
    dispatch(getCategories());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const deleteSubCategory = createAsyncThunk("subCategory/delete", async (id: number, { dispatch }) => {
  try {
    await _axios.delete("/SubCategory/delete-sub-category", {
      params: { id },
    });
    dispatch(getCategories());
    return id;
  } catch (error) {
    console.error(error);
  }
});

interface SubCategoryState {
  subCategories: SubCategoryItem[];
  isLoading: boolean;
  isSaving: boolean;
  error: string;
}

const initialState: SubCategoryState = {
  subCategories: [],
  isLoading: false,
  isSaving: false,
  error: "",
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubCategories.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = action.payload || [];
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(addSubCategory.pending, (state) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(addSubCategory.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(updateSubCategory.pending, (state) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(updateSubCategory.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteSubCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      });
  },
});

export default subCategorySlice.reducer;
