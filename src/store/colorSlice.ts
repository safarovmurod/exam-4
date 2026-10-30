import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _axios } from "../token/token";

export interface Color {
  id: number;
  colorName: string;
}

export const getColors = createAsyncThunk("color/get", async () => {
  try {
    const { data } = await _axios.get("/Color/get-colors");
    return (data.data || []) as Color[];
  } catch (error) {
    console.error(error);
  }
});

export const addColor = createAsyncThunk("color/add", async (colorName: string, { dispatch }) => {
  try {
    await _axios.post("/Color/add-color", null, {
      params: { ColorName: colorName },
    });
    dispatch(getColors());
    return true;
  } catch (error) {
    console.error(error);
  }
});

export const deleteColor = createAsyncThunk("color/delete", async (id: number, { dispatch }) => {
  try {
    await _axios.delete("/Color/delete-color", { params: { id } });
    dispatch(getColors());
    return id;
  } catch (error) {
    console.error(error);
  }
});

interface ColorState {
  colors: Color[];
  isLoading: boolean;
  error: string;
}

const initialState: ColorState = {
  colors: [],
  isLoading: false,
  error: "",
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.colors = action.payload || [];
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(addColor.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(addColor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteColor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Хатогӣ";
      });
  },
});

export default colorSlice.reducer;
