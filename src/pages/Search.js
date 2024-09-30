import React from "react";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import CartButton from "../components/CartButton";

import { MdArrowBackIosNew, MdOutlineSearch } from "react-icons/md";

import { Link } from "react-router-dom";
import GoodsThumbnail from "../components/GoodsThumbnail";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Search = ({ cartState, goods }) => {
  const navigate = useNavigate();

  return (
    <div className="search">
      <div className="header">
        <button onClick={() => navigate(-1)}>
          <MdArrowBackIosNew />
        </button>
        <div className="searchInput">
          <input type="text" placeholder="상품을 검색해주세요."></input>
          <MdOutlineSearch className="icon" />
        </div>

        <div className="cartBtnWrap">
          <CartButton cartState={cartState} />
        </div>
      </div>
      <main>
        <div className="best-selling">
          <h3>인기상품</h3>
          <div className="goodsList">
            <Swiper
              className="swiper"
              // install Swiper modules
              modules={[Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={3}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              loop={false}
            >
              {goods.map((item, index) => (
                <SwiperSlide>
                  <Link to={`/Details/${item.id}`}>
                    <GoodsThumbnail item={item} key={index} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
