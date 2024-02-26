import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Pagination.module.css";
import { arrow_left, arrow_right } from "../../Images";
import { getNextPageItems, getPrevPageItems } from "../../redux/slices/itemsApiSlice";

export const Pagination = () => {
  const err = useSelector((state) => state.items.error);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0)

  const paginationNext = () => {
    let newValue = totalCount + 50;
    setTotalCount(newValue)
    let data = {data:{action: "get_ids", params: { offset:newValue, limit: 50 }}} 
    dispatch(getNextPageItems({...data}));

  };
  const paginationPrev = () => {
    let newValue = totalCount - 50;
    setTotalCount(newValue)
    let data = {data:{action: "get_ids", params: { offset:newValue, limit: 50 }}} 
    dispatch(getPrevPageItems({...data}));
 
  };

  return (
    <div className={s.pagination}>
      <button
        className={s.vector_img}
        onClick={() => paginationPrev()}
      >
        <img src={arrow_left} alt="" />
      </button>
      {/* {count !== undefined?[...Array(totalPages)].map((_, index) => (
        <div
          key={index}
          className={page===index+1?s.pagination_box:s.pagination_unactive}
          onClick={() => dispatch(takeTwo(index + 1))}
        >
          {index + 1}
        </div>
      )):<></>} */}
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
