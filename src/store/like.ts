import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  color?: string;
}

const likeSlice = createSlice({
  name: "like",
  initialState: { data: [] as Item[] },
  reducers: {
    toggleLike(state, action: PayloadAction<Item>) {
      const item = state.data.find((product) => product.id === action.payload.id);
      if (item) state.data = state.data.filter((product) => product.id !== action.payload.id);
      else state.data.push(action.payload);
    },
    clearLikes(state) {
      state.data = [];
    },
  },
});

export const { toggleLike, clearLikes } = likeSlice.actions;
export default likeSlice.reducer;
