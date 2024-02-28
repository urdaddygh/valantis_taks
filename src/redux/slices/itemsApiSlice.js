import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  items: [],
};
export const getItems = createAsyncThunk(
  "getItemsReducer/getItems",
  async (data) => {
    console.log(data);
    try {
      const res = await requests.getIds(data.data);
      const response = await requests.getItems(res.data.result);
      const filteredArr = response.data.result.filter(
        (product, index, self) =>
          index === self.findIndex((t) => t.id === product.id)
      );
      //   while(filteredArr.length < 50){

      //     const newProduct = await requests.getItems()

      //   }

      // console.log(filteredArr, "фильтрованный");
      // console.log(response.data.result, "не фильтрованный");
      return filteredArr;
    } catch (err) {
      data.showToastMessage("Секундочку, идет загрузка...");
      throw new Error(console.log(err));
    }
  }
);

export const getItemsByFilter = createAsyncThunk(
  "getItemsReducer/getItemsByFilter",
  async (data) => {
    try {
      const res = await requests.getItemsByFilter(data.data);
      const response = await requests.getItems(res.data.result);
      const filteredArr = response.data.result.filter(
        (product, index, self) =>
          index === self.findIndex((t) => t.id === product.id)
      );
      // console.log(filteredArr, "фильтрованный");
      // console.log(response.data.result, "не фильтрованный");
      return filteredArr;
    } catch (err) {
      data.showToastMessage("Проблемы с интернетом! Попробуйте еще раз");
      throw new Error(console.log(err));
    }
  }
);

export const getNextPageItems = createAsyncThunk(
  "getItemsReducer/getNextPageItems",
  async (data) => {
    try {
      const res = await requests.getIds(data.data);
      const response = await requests.getItems(res.data.result);
      data.setTotalCount(data.data.params.offset);
      const filteredArr = response.data.result.filter(
        (product, index, self) =>
          index === self.findIndex((t) => t.id === product.id)
      );
      // console.log(filteredArr, "фильтрованный");
      // console.log(response.data.result, "не фильтрованный");
      return filteredArr;
    } catch (err) {
      data.showToastMessage("Ошибка! Попробуйте еще раз");
      throw new Error(console.log(err));
    }
  }
);

export const getPrevPageItems = createAsyncThunk(
  "getItemsReducer/getPrevPageItems",
  async (data) => {
    try {
      const res = await requests.getIds(data.data);
      const response = await requests.getItems(res.data.result);
      data.setTotalCount(data.data.params.offset);
      const filteredArr = response.data.result.filter(
        (product, index, self) =>
          index === self.findIndex((t) => t.id === product.id)
      );
      // console.log(filteredArr, "фильтрованный");
      // console.log(response.data.result, "не фильтрованный");
      return filteredArr;
    } catch (err) {
      data.showToastMessage("Ошибка! Попробуйте еще раз");
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
      })
      .addCase(getItemsByFilter.pending, (state) => {
        state.error = true;
      })
      .addCase(getItemsByFilter.fulfilled, (state, action) => {
        state.error = false;
        state.items = action.payload;
      })
      .addCase(getItemsByFilter.rejected, (state) => {
        state.error = false;
      });
  },
});

export default itemApiSlice.reducer;
