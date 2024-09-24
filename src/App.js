import "./reset.css";
import "./App.css";
import "./media.css";
import Home from "./pages/Home";
import TabBar from "./components/TabBar";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Goods from "./pages/Goods";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Cart from "./pages/Cart";

import { useReducer, useState } from "react";
import goodsData from "./goodsData";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          id: action.payload.id,
          qty: action.payload.qty,
          checked: true,
        },
      ];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "TOGGLE_ITEM":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, checked: !item.checked }
          : item
      );
    case "INCREASE_ITEM_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    case "DECREASE_ITEM_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    case "SELECT_ALL_ITEM":
      return state.map((item) => ({ ...item, checked: true }));
    case "DESELECT_ALL_ITEM":
      return state.map((item) => ({ ...item, checked: false }));
    case "REMOVE_SELECTED_ITEM":
      return state.filter((item) => item.checked === false);
    case "ADD_EXISTING_ITEM":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: item.qty + action.payload.qty }
          : item
      );
    default:
      return state; // Default case to return the current state
  }
}

function App() {
  const [goods, setGoods] = useState(goodsData);

  const [cartState, cartDispatch] = useReducer(cartReducer, []);
  const location = useLocation();
  // 탭바를 숨기고 싶은 경로 목록
  const hiddenPaths = ["/Search", "/Details/:id", "/Cart"];
  // 현재 경로가 hiddenPaths에 있는지 확인
  const isTabBarVisible = !hiddenPaths.some((path) =>
    matchPath(path, location.pathname)
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home cartState={cartState} />} />
        <Route
          path="/Goods"
          element={<Goods goods={goods} cartState={cartState} />}
        />
        <Route
          path="/Details/:id"
          element={
            <Details
              goods={goods}
              cartState={cartState}
              cartDispatch={cartDispatch}
            />
          }
        />
        <Route path="/Search" element={<Search />} />
        <Route path="/MyPage" element={<MyPage cartState={cartState} />} />

        <Route
          path="/Cart"
          element={
            <Cart
              goods={goods}
              cartState={cartState}
              cartDispatch={cartDispatch}
            />
          }
        />
      </Routes>
      {isTabBarVisible && <TabBar />}
    </div>
  );
}

export default App;
