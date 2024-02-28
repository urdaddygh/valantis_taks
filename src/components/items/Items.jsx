import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../redux/slices/itemsApiSlice";
import s from "./Items.module.css";
import Skeleton from "../skeleton/Skeleton";
import { toast } from "react-toastify";
function Items() {
  const dispatch = useDispatch();
  const err = useSelector((state) => state.items.error);
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
  
  useEffect(() => {
    let data = {
      showToastMessage,
      data: { action: "get_ids", params: { offset: 0, limit: 50 } },
    };
    dispatch(getItems(data));
  }, []);

  return (
    <>
      {err ? (
        <Skeleton count={50} />
      ) : (
        <section className={s.container}>
          {items.map((el, index) => (
            <div className={s.cont} key={index}>
              <p>
                <b>id:</b> {el?.id}
              </p>
              <p>
                <b>Название:</b> {el?.product}
              </p>
              <p>
                <b>Цена:</b> {el?.price}
              </p>
              <p>
                <b>Бренд:</b> {el?.brand === null ? "отсуствует" : el.brand}
              </p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default Items;
