import axios from "axios";
import { format } from "date-fns";
import md5 from "md5";

let currentDate = format(new Date(), "yyyyMMdd");
let md = md5(`Valantis_${currentDate}`);

const fetchAPI = axios.create({
  baseURL: "https://api.valantis.store:41000/",
  headers: {
    "Content-type": "application/json",
    "X-Auth": "cd0bfbcb48b87cbb908ce771120bb507",
  },
});

export const requests = {
  getIds: (data) => fetchAPI.post("", data),
  getFields:()=>fetchAPI.post("", {action: "get_fields", params: {field:"price"}}),
  getItemsByPrice:()=>fetchAPI.post("", {action: "filter", params: {price:17500}}),
  getItems: (data) =>
    fetchAPI.post("", { action: "get_items", params: { ids: [...data] } }),
};