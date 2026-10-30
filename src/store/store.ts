import like from "./like";
import korzina from "./korzina";
import { configureStore } from "@reduxjs/toolkit";
import brandSlice from "./BrandSlice";
import categorySlice from "./CategorySlice";
import colorSlice from "./ColorSlice";
import productSlice from "./ProductSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    like,
    korzina,
    brandSlice,
    categorySlice,
    colorSlice,
    productSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
