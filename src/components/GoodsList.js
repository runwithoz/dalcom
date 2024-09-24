import "./GoodsList.scss";
import GoodsThumbnail from "./GoodsThumbnail";

import { Link } from "react-router-dom";

const GoodsList = ({ goods }) => {
  return (
    <div className="goodsList">
      {goods.map((item, index) => (
        <Link to={`/Details/${item.id}`}>
          <GoodsThumbnail item={item} key={index} />
        </Link>
      ))}
    </div>
  );
};

export default GoodsList;
