import "./Goods.scss";

import CartButton from "../components/CartButton";
import GoodsList from "../components/GoodsList";

const Goods = ({ goods, cartState }) => {
  return (
    <div className="goods">
      <div className="header">
        <h2>
          상품목록
          <CartButton cartState={cartState} />
        </h2>
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};

export default Goods;
