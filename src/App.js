import "./App.css";
import { Pagination } from "./components/pagination/Pagination";
import Items from "./components/items/Items";
import { useDispatch, useSelector } from "react-redux";

function App() {

  return (
    <div className="container">
      <Items />
      <Pagination />
    </div>
  );
}

export default App;
