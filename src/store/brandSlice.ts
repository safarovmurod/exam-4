import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";

export interface Brand {
  id: number;
  brandName: string;
}

export const getBrands = createAsyncThunk("brand/get", async () => {
  try {
    const { data } = await _axios.get("/Brand/get-brands", {
      params: { PageNumber: 1, PageSize: 100 },
    });
    return (data.data || []) as Brand[];
  } catch (error) {
    console.error(error);
  }
});

export const addBrand = createAsyncThunk("brand/add", async (brandName: string, { dispatch }) => {
  try {
    await _axios.post("/Brand/add-brand", null, {
      params: { BrandName: brandName },
    });
    dispatch(getBrands());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const updateBrand = createAsyncThunk("brand/update", async (payload: any, { dispatch }) => {
  try {
    await _axios.put("/Brand/update-brand", null, {
      params: { Id: payload.id, BrandName: payload.brandName },
    });
    dispatch(getBrands());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const deleteBrand = createAsyncThunk("brand/delete", async (id: number, { dispatch }) => {try {
    await _axios.delete("/Brand/delete-brand", { params: { id } });
    dispatch(getBrands());
    return id;
  } catch (error) {
    console.error(error);
  }
});

interface BrandState {
  brands: Brand[];
  isLoading: boolean;
  isSaving: boolean;
  error: string;
}

const initialState: BrandState = {
  brands: [],
  isLoading: false,
  isSaving: false,
  error: "",
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload || [];
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ ҳангоми боркунии брендҳо";
      })
      .addCase(addBrand.pending, (state) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(addBrand.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(updateBrand.pending, (state) => {
        state.isSaving = true;
        state.error = "";
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.isSaving = false;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteBrand.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      });
  },
});

export default brandSlice.reducer;
