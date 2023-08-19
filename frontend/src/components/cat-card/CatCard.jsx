import { Link } from "react-router-dom";
import { useRef, useLayoutEffect } from "react";
import "./CatCard.scss";

const CatCard = ({ item, getImageWidth }) => {
  const ref = useRef(null);

  const getImageWidthHandler = () => {
    getImageWidth(ref.current.offsetWidth);
  };

  useLayoutEffect(() => {
    getImageWidthHandler();

    window.addEventListener("resize", getImageWidthHandler);

    return () => {
      window.removeEventListener("resize", getImageWidthHandler);
    };
  });
  return (
    <Link to="/gigs?cat=design">
      <div className="cat-card" ref={ref}>
        <img src={item.img} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
};
export default CatCard;
