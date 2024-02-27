import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Pagination.module.css";
import { arrow_left, arrow_right } from "../../Images";
import {
  getNextPageItems,
  getPrevPageItems,
} from "../../redux/slices/itemsApiSlice";
import { toast } from "react-toastify";

export const Pagination = () => {
  const err = useSelector((state) => state.items.error);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);

  const showToastMessage = (data) => {
    toast.error(data, {
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

  const paginationNext = () => {
    let newValue = totalCount + 50;
    let data = {
      setTotalCount,
      showToastMessage,
      data: { action: "get_ids", params: { offset: newValue, limit: 50 } },
    };
    dispatch(getNextPageItems({ ...data }));
  };
  const paginationPrev = () => {
    let newValue = totalCount - 50;
    let data = {
      setTotalCount,
      showToastMessage,
      data: { action: "get_ids", params: { offset: newValue, limit: 50 } },
    };
    dispatch(getPrevPageItems({ ...data }));
  };

  return (
    <div className={s.pagination}>
      {totalCount !== 0 && (
        <button className={s.vector_img} onClick={() => paginationPrev()}>
          <img src={arrow_left} alt="" />
        </button>
      )}

      <button
        className={s.vector_img}
        onClick={() => paginationNext()}
        disabled={err}
      >
        <img src={arrow_right} alt="" />
      </button>
    </div>
  );
};
