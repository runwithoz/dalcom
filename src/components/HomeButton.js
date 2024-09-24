import "./HomeButton.scss";

import { GoHome } from "react-icons/go";

import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <div>
      <Link to="/">
        <GoHome className="homeButton" />
      </Link>
    </div>
  );
};

export default HomeButton;
