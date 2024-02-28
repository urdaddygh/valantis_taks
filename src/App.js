import "./App.css";
import { Pagination } from "./components/pagination/Pagination";
import Items from "./components/items/Items";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./components/filter/Filter";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { getItems, getItemsByFilter } from "./redux/slices/itemsApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [keyWords, setKeyWords] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const delayedKeywords = useDebounce(keyWords, 1500);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  const showToastMessage = (data) => {
    toast.warn(data, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const searchByFilter = () => {
    if (optionValue === "" && keyWords !== "") {
      showToastMessage("Пожалуйста выберите категорию для фильтра");
    }else if(keyWords === ""){
      let data = {
        showToastMessage,
        data: { action: "get_ids", params: { offset: 0, limit: 50 } },
      };
      dispatch(getItems(data));
    } 
    else if (optionValue === "price") {
      let data = {
        showToastMessage,
        data: {
          action: "filter",
          params: { price: Number(keyWords), limit: 50 },
        },
      };
      dispatch(getItemsByFilter(data));
    } else if (optionValue === "brand") {
      let data = {
        showToastMessage,
        data: { action: "filter", params: { brand: keyWords, limit: 50 } },
      };
      dispatch(getItemsByFilter(data));
    } else if (optionValue === "product") {
      let data = {
        showToastMessage,
        data: { action: "filter", params: { product: keyWords, limit: 50 } },
      };
      dispatch(getItemsByFilter(data));
    }
  };

  useEffect(() => {
    searchByFilter();
  }, [delayedKeywords]);

  const handleChange = (selectedOption) => {
    setOptionValue(selectedOption.value);
  };

  return (
    <div className="container">
      <ToastContainer />
      <Filter
        keyWords={keyWords}
        setKeyWords={setKeyWords}
        handleChange={handleChange}
        onButtonClick={searchByFilter}
      />
      <div className="list">
        <p>Cписок товаров</p>
      </div>
      {/* из-за фильтрации дубликатов id на первой странице оказывается 49 товаров вместо 50  */}
      <Items />
      {items.length > 48 && items.length < 51 && <Pagination />}
    </div>
  );
}

export default App;
