import React from "react";
import s from "./Filter.module.css";
import Select from "react-select";
import { search } from "../../Images";

function Filter({ keyWords, setKeyWords, handleChange, onButtonClick }) {
  const options = [
    { value: "price", label: "Цена" },
    { value: "brand", label: "Бренд" },
    { value: "product", label: "Название" },
  ];

  return (
    <header className={s.cont}>
      <div className={s.flex}>
        <input
          type="text"
          value={keyWords}
          onChange={(e) => setKeyWords(e.target.value)}
          placeholder="Поиск"
          className={s.input}
        />
        <button onClick={onButtonClick} className={s.btn} disabled={keyWords===""}>
          <img src={search} alt="" width="35px"/>
        </button>
       
      </div>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="фильтр"
        className={s.select}
      />
    </header>
  );
}

export default Filter;
