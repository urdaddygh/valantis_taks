import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  items: [],
};

export const getItems = createAsyncThunk(
  "getItemsReducer/getItems",
  async () => {
    try {
      const res = await requests.addProduct();
      // data.showSuccessMessage("Товар добавлен")
      console.log(res.data);
      return res.data;
    } catch (err) {
      // data.showErrMessage("Добавьте изображение")
      throw new Error(console.log(err));
    }
  }
);

const itemApiSlice = createSlice({
  name: "getItemsReducer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getItems.fulfilled, (state, action) => {
        state.error = false;
        state.items = action.payload;
      })
      .addCase(getItems.pending, (state) => {
        state.error = true;
      })
      .addCase(getItems.rejected, (state) => {
        state.error = false;
      });
  },
});

export default itemApiSlice.reducer;
