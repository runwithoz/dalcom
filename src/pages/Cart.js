import React from "react";
import "./Cart.scss";
import {
  MdCheckBox,
  MdOutlineClose,
  MdOutlineRemove,
  MdOutlineAdd,
  MdArrowBackIosNew,
} from "react-icons/md";
import cn from "classnames";
import { addComma } from "../utils";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ goods, cartState, cartDispatch }) => {
  const totalAmount = cartState
    .filter((item) => item.checked === true)
    .reduce((total, item) => {
      const itemData = goods[item.id - 1];
      return total + itemData.price * item.qty;
    }, 0);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="header">
        <button onClick={() => navigate(-1)}>
          <MdArrowBackIosNew />
        </button>
        <h2>장바구니</h2>
      </div>
      {cartState.length === 0 ? (
        <div className="cartEmpty">
          <p>장바구니에 담긴 상품이 없습니다.</p>
          <Link to="/Goods" className="goToShoppingBtn">
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <div className="cartMain">
          <div className="cartControls">
            {40000 - totalAmount > 0 ? (
              <span className="freeShippingInfo">
                <strong>{addComma(40000 - totalAmount)}</strong>원만 더 담으면
                무료배송!
              </span>
            ) : (
              <span className="freeShippingInfo">
                <strong>무료배송</strong> 가능!
              </span>
            )}
            <div className="freeShippingProgressBar">
              <div
                style={{
                  width: `${Math.min((totalAmount / 40000) * 100, 100)}%`,
                }}
              ></div>
            </div>

            <div className="selectionControls">
              <div className="itemSelectionStatus">
                {cartState.some((item) => item.checked !== true) ? (
                  <button
                    className="checkbox"
                    onClick={() => {
                      cartDispatch({ type: "SELECT_ALL_ITEM" });
                    }}
                  >
                    <MdCheckBox />
                  </button>
                ) : (
                  <button
                    className="checkbox checked"
                    onClick={() => {
                      cartDispatch({ type: "DESELECT_ALL_ITEM" });
                    }}
                  >
                    <MdCheckBox />
                  </button>
                )}
                <span>
                  전체{" "}
                  {cartState.filter((item) => item.checked === true).length}/
                  {cartState.length}
                </span>
              </div>
              <button
                className="deleteSelected"
                onClick={() => {
                  cartDispatch({ type: "REMOVE_SELECTED_ITEM" });
                }}
              >
                선택삭제
              </button>
            </div>
          </div>
          <div className="cartList">
            <ul>
              {cartState &&
                cartState.map((item, index) => {
                  const itemData = goods[item.id - 1];
                  return (
                    <li key={index}>
                      <button
                        className={cn("checkbox", { checked: item.checked })}
                        onClick={() =>
                          cartDispatch({
                            type: "TOGGLE_ITEM",
                            payload: { id: item.id },
                          })
                        }
                      >
                        <MdCheckBox />
                      </button>
                      <img src={itemData.img} alt="상품 썸네일" />
                      <div className="description">
                        <div className="itemTitle">{itemData.title}</div>
                        <div className="bottomContent">
                          <div className="countingArea">
                            <button
                              type="button"
                              onClick={() => {
                                cartDispatch({
                                  type: "DECREASE_ITEM_QUANTITY",
                                  payload: { id: item.id },
                                });
                              }}
                              className={cn({ colorGray: item.qty === 1 })}
                            >
                              <MdOutlineRemove />
                            </button>
                            <span>{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => {
                                cartDispatch({
                                  type: "INCREASE_ITEM_QUANTITY",
                                  payload: { id: item.id },
                                });
                              }}
                              className={cn({ colorGray: item.qty === 99 })}
                            >
                              <MdOutlineAdd />
                            </button>
                          </div>
                          <div className="itemTotalPrice">
                            {addComma(itemData.price * item.qty)}원
                          </div>
                        </div>
                      </div>
                      <button
                        className="itemDeleteBtn"
                        onClick={() => {
                          cartDispatch({
                            type: "REMOVE_ITEM",
                            payload: { id: item.id },
                          });
                        }}
                      >
                        <MdOutlineClose />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="cartSummary">
            <div class="totalProductPrice">
              <span>총 상품 금액</span>
              <span>{addComma(totalAmount)}원</span>
            </div>
            <div class="shippingFee">
              <span>배송비</span>
              <span>{totalAmount >= 40000 ? "무료배송" : "3,000원"}</span>
            </div>
            <div class="totalPayment">
              <span>예상 결제 금액</span>
              <span>
                {totalAmount >= 40000
                  ? addComma(totalAmount)
                  : addComma(totalAmount + 3000)}
                원
              </span>
            </div>
          </div>
          <div className="checkoutBtnWrap">
            {/* <Link to="/MyPage">
              <div className="checkoutBtn">주문하기</div>
            </Link> */}

            <Link to="/MyPage" className="checkoutBtn">
              주문하기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

//Array(1)0: {id: 2, qty: 1}length: 1[[Prototype]]: Array(0)
