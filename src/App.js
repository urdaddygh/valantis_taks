import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Pagination } from "./components/pagination/Pagination";
import { getItems } from "./redux/slices/productsApiSlice";
function App() {
  const dispatch = useDispatch();
  const err = useSelector((state) => state.items.error);
  console.log(err)
  return (
    <div className="App">
      <p>hello world</p>
      {err ? (
        <p>loading...</p>
      ) : (
        <button onClick={() => dispatch(getItems())}>жми</button>
      )}
      <Pagination />
    </div>
  );
}

export default App;
