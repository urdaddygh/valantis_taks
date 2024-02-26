import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  items: [],
};
export const getItems = createAsyncThunk(
  "getItemsReducer/getItems",
  async (data) => {
    try {
      const res = await requests.getIds(data);
      const response = await requests.getItems(res.data.result);
      return response.data.result;
    } catch (err) {
      throw new Error(console.log(err));
    }
  }
);
export const getItemsByPrice = createAsyncThunk(
  "getItemsReducer/getItemsByPrice",
  async () => {
    try {
      const res = await requests.getItemsByPrice();
      console.log(res.data)
      // const response = await requests.getItems(res.data.result);
      return res.data;
    } catch (err) {
      throw new Error(console.log(err));
    }
  }
);
export const getFields = createAsyncThunk(
  "getItemsReducer/getFields",
  async (data) => {
    try {
      const res = await requests.getFields(data);
      // console.log(res.data)
      return res.data;
    } catch (err) {
      throw new Error(console.log(err));
    }
  }
);
export const getNextPageItems = createAsyncThunk(
  "getItemsReducer/getNextPageItems",
  async (data) => {
    try {
      // data.stateCountPlus()
      const res = await requests.getIds(data.data);
      const response = await requests.getItems(res.data.result);
      return response.data.result;
    } catch (err) {
      throw new Error(console.log(err));
    }
  }
);
export const getPrevPageItems = createAsyncThunk(
  "getItemsReducer/getPrevPageItems",
  async (data) => {
    try {
      // data.stateCountMinus()
      const res = await requests.getIds(data.data);
      const response = await requests.getItems(res.data.result);
      return response.data.result;
    } catch (err) {
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
      .addCase(getItems.pending, (state) => {
        state.error = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.error = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state) => {
        state.error = false;
      })
      .addCase(getNextPageItems.pending, (state) => {
        state.error = true;
      })
      .addCase(getNextPageItems.fulfilled, (state, action) => {
        state.error = false;
        state.items = action.payload;
      })
      .addCase(getNextPageItems.rejected, (state) => {
        state.error = false;
      })
      .addCase(getPrevPageItems.pending, (state) => {
        state.error = true;
      })
      .addCase(getPrevPageItems.fulfilled, (state, action) => {
        state.error = false;
        state.items = action.payload;
      })
      .addCase(getPrevPageItems.rejected, (state) => {
        state.error = false;
      });
  },
});

export default itemApiSlice.reducer;
