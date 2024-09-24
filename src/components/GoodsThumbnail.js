import "./GoodsThumbnail.scss";
import { addComma } from "../utils";
const GoodsThumbnail = ({ item }) => {
  return (
    <div className="goodsThumbnail">
      <img src={item.img} />
      <div className="detail">
        <p className="title">{item.title}</p>
        <p className="price">{addComma(item.price)}원</p>
      </div>
    </div>
  );
};

export default GoodsThumbnail;
