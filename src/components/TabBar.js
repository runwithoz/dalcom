import "./TabBar.scss";

import {
  MdHomeFilled,
  MdMenu,
  MdOutlineSearch,
  MdAccountCircle,
} from "react-icons/md";

import { NavLink } from "react-router-dom";

const TabBar = () => {
  return (
    <div className="tabBar">
      <NavLink to="/" className="tab" activeClassName="active">
        <MdHomeFilled />
        <span>홈</span>
      </NavLink>
      <NavLink to="/Goods" className="tab" activeClassName="active">
        <MdMenu />
        <span>상품목록</span>
      </NavLink>
      <NavLink to="/Search" className="tab" activeClassName="active">
        <MdOutlineSearch />
        <span>검색</span>
      </NavLink>
      <NavLink to="/MyPage" className="tab" activeClassName="active">
        <MdAccountCircle />
        <span>마이페이지</span>
      </NavLink>
    </div>
  );
};

export default TabBar;
