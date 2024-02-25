import axios from "axios";

const fetchAPI = axios.create({
  baseURL: "https://api.valantis.store:41000/",
  headers: {
    "Content-type": "application/json",
    "X-Auth": `70e9e15f52c7209ab6b6f80b795aa4f2`,
  },
});

export const requests = {
  addProduct: () =>
    fetchAPI.post("", {
      action: "get_items",
      params: { ids: ["1789ecf3-f81c-4f49-ada2-83804dcc74b0"] },
    }),
};
