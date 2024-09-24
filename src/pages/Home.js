import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Home.scss";

import { Link } from "react-router-dom";

import { MdOutlineSearch } from "react-icons/md";
import CartButton from "../components/CartButton";

import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Home = ({ cartState }) => {
  return (
    <div className="home">
      <div className="mainHeader">
        <Link to="/">
          <h1 className="hidden">달콤</h1>
          <img
            src="images/dalcom-logo.svg"
            alt="달콤로고"
            className="mainLogo"
          ></img>
        </Link>
        <CartButton cartState={cartState} />
        <Link to="/Search" className="searchBtn">
          <span>달콤하고 신선한 상품들을 찾아보세요!</span>
          <MdOutlineSearch className="icon" />
        </Link>
      </div>
      <main className="main">
        <div className="swiperWrap">
          <Swiper
            className="swiper"
            // install Swiper modules
            modules={[Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ type: "fraction" }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
          >
            <SwiperSlide>
              <img src="https://runwithoz.github.io/react-project-img/banner1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://runwithoz.github.io/react-project-img/banner2.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>
      </main>
    </div>
  );
};

export default Home;
