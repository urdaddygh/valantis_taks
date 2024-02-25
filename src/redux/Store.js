import { configureStore } from "@reduxjs/toolkit";
import itemApiSlice from "./slices/productsApiSlice"

export const store = configureStore({
  reducer: {
    items:itemApiSlice,
  },
});
