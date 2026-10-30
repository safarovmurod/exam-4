import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import subCategorySlice from "./subCategorySlice";
import brandSlice from "./brandSlice";
import colorSlice from "./colorSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    category: categorySlice,
    subCategory: subCategorySlice,
    brand: brandSlice,
    color: colorSlice,
    order: orderSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
