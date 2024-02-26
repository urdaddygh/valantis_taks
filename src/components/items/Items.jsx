import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFields, getItems, getItemsByPrice } from "../../redux/slices/itemsApiSlice";
import s from "./Items.module.css";
import Skeleton from "../skeleton/Skeleton";
function Items() {
  const dispatch = useDispatch();
  const err = useSelector((state) => state.items.error);
  const items = useSelector((state) => state.items.items);
  // console.log(items);
  useEffect(() => {
    let data = { action: "get_ids", params: { offset:0, limit: 47 } };
    dispatch(getItems(data));
    dispatch(getFields())
    dispatch(getItemsByPrice())
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
                <b>id:</b> {el.id}
              </p>
              <p>
                <b>Название:</b> {el.product}
              </p>
              <p>
                <b>Цена:</b> {el.price}
              </p>
              <p>
                <b>Бренд:</b> {el.brand === null ? "отсуствует" : el.brand}
              </p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default Items;
