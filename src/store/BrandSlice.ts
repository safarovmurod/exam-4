import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";

export interface Brand {
  id: number;
  brandName: string;
}

export const getBrand = createAsyncThunk("Brand/get", async () => {
  try {
    const { data } = await _axios.get("/Brand/get-brands", { params: { PageNumber: 1, PageSize: 100 } });
    return data.data as Brand[];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getBrandById = createAsyncThunk("Brand/getById", async (id: number) => {
  try {
    const { data } = await _axios.get("/Brand/get-brand-by-id", { params: { id } });
    return data.data as Brand;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const BrandSlice = createSlice({
  name: "Brand",
  initialState: { data: [] as Brand[], byId: null as Brand | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrand.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getBrandById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
  },
});

export default BrandSlice.reducer;
