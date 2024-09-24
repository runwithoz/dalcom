import "./MyPage.scss";

import { Link } from "react-router-dom";

import CartButton from "../components/CartButton";

const MyPage = ({ cartState }) => {
  return (
    <div className="myPage">
      <h2>마이페이지</h2>
      <CartButton cartState={cartState} />
      <div className="signInOutWrap">
        <p className="title">로그인 및 회원가입</p>
        <p className="subText">달콤과 함께 신선한 과일들을 즐겨보세요</p>
        <Link to="/" className="signInOutButton">
          로그인/회원가입
        </Link>
      </div>
      <Link to="/">Q&A 게시판</Link>
    </div>
  );
};

export default MyPage;
