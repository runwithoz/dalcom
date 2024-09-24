import "./CartButton.scss";

import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartButton = ({ cartState }) => {
  return (
    <div>
      <Link to="/Cart">
        <FiShoppingCart className="cartButton" />
        {cartState && cartState.length ? (
          <div className="cartItemQty">{cartState.length}</div>
        ) : null}
      </Link>
    </div>
  );
};

export default CartButton;
