import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";

export interface Color {
  id: number;
  colorName: string;
}

export const getColor = createAsyncThunk("Color/get", async () => {
  try {
    const { data } = await _axios.get("/Color/get-colors");
    return data.data as Color[];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getColorById = createAsyncThunk("Color/getById", async (id: number) => {
  try {
    const { data } = await _axios.get("/Color/get-color-by-id", { params: { id } });
    return data.data as Color;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const ColorSlice = createSlice({
  name: "Color",
  initialState: { data: [] as Color[], byId: null as Color | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getColorById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
  },
});

export default ColorSlice.reducer;
