import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./CatCard.scss";

const CatCard = ({ item }) => {
  return (
    <Link to="/gigs?cat=design">
      <div className="cat-card">
        <img src={item.img} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
};
export default CatCard;
