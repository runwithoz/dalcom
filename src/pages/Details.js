import React, { useState } from "react";
import "./Details.scss";
import { useParams, useNavigate } from "react-router-dom";
import CartButton from "../components/CartButton";
import HomeButton from "../components/HomeButton";
import { addComma } from "../utils";
import {
  MdOutlineRemove,
  MdOutlineAdd,
  MdArrowBackIosNew,
  MdCheck,
} from "react-icons/md";
import cn from "classnames";

const Details = ({ goods, cartState, cartDispatch }) => {
  const { id } = useParams();
  const itemIndex = id - 1;
  const { title, price, img } = goods[itemIndex];

  const [qty, setQty] = useState(1); //수량 관리

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="details">
      <div className="header">
        <button onClick={() => navigate(-1)}>
          <MdArrowBackIosNew />
        </button>
        <h2>{title}</h2>
        <HomeButton />
        <CartButton cartState={cartState} />
      </div>

      <div className="img">
        <img src={img}></img>
      </div>
      <div className="detail">
        <p className="title">{title}</p>
        <p className="price">
          {addComma(price)}
          <span>원</span>
        </p>
      </div>
      <div className="shoppingCartBtnWrap">
        <div className="shoppingCartBtn" onClick={handleAddToCartClick}>
          장바구니 담기
        </div>
        <div className={cn("itemAddedMsg", { active: showAlert })}>
          <MdCheck />
          장바구니에 상품이 담겼습니다.
        </div>
      </div>

      <div
        className={cn("cartOptionWrap", {
          active: isCartOpen,
        })}
      >
        <div className="bg-gray" onClick={handleCloseCart}></div>
        <div className="cartOption">
          <div className="summary">
            <img src={img} alt="상품 썸네일" />
            <div className="content">
              <span className="title">{title}</span>
              <span className="price">{addComma(price)}원</span>
            </div>
          </div>

          <div className="quantity">
            <span>수량</span>
            <div className="countingArea">
              <button
                type="button"
                onClick={() => {
                  if (qty === 1) {
                    return;
                  }
                  setQty(qty - 1);
                }}
                className={cn({ colorGray: qty === 1 })}
              >
                <MdOutlineRemove />
              </button>
              <span>{qty}</span>
              <button
                type="button"
                onClick={() => {
                  if (qty === 99) {
                    return;
                  }
                  setQty(qty + 1);
                }}
                className={cn({ colorGray: qty === 99 })}
              >
                <MdOutlineAdd />
              </button>
            </div>
          </div>
          <div className="totalPrice">
            <span>총 금액</span>
            <strong>{addComma(price * qty)}원</strong>
          </div>

          <div
            className="shoppingCartBtn"
            onClick={() => {
              if (cartState.some((item) => item.id === id)) {
                cartDispatch({
                  type: "ADD_EXISTING_ITEM",
                  payload: { id: id, qty: qty },
                });
                setTimeout(() => {
                  setShowAlert(true);
                  setTimeout(() => setShowAlert(false), 2000);
                }, 500);
              } else {
                cartDispatch({
                  type: "ADD_ITEM",
                  payload: { id: id, qty: qty },
                });

                setTimeout(() => {
                  setShowAlert(true);
                  setTimeout(() => setShowAlert(false), 2000);
                }, 500);
              }
              setIsCartOpen(false);
            }}
          >
            장바구니 담기
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
