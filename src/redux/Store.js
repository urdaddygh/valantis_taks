import { configureStore } from "@reduxjs/toolkit";
import itemApiSlice from "./slices/itemsApiSlice";

export const store = configureStore({
  reducer: {
    items: itemApiSlice,
  },
});
