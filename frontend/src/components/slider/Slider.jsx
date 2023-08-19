import CatCard from "../cat-card/CatCard";
import { useLayoutEffect, useRef, useState } from "react";
import { cards } from "../../data";
import "./Slider.scss";

const Slider = () => {
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);
  const [currentIDX, setCurrentIDX] = useState(0);

  const maxSlideNumber = Math.floor(width / 252);

  useLayoutEffect(() => {
    setWidth(ref.current.clientWidth);
    // setHeight(ref.current.clientHeight);

    function handleWindowResize() {
      setWidth(ref.current.clientWidth);
      // setHeight(ref.current.clientHeight);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const nextIdxHandler = () => {
    if (currentIDX + maxSlideNumber < cards.length) {
      setCurrentIDX(currentIDX + maxSlideNumber);
    }  else {
      setCurrentIDX(0);
    }
  };

  const prevIdxHandler = () => {
    if (currentIDX - maxSlideNumber >= 0) {
      setCurrentIDX(currentIDX - maxSlideNumber);
    } else if (currentIDX - 1 >= 0) {
      setCurrentIDX(currentIDX - 1);
    } else {
      setCurrentIDX(cards.length - maxSlideNumber);
    }

    console.log("prev >>>", currentIDX);
  };

  const slicedCards = cards.slice(currentIDX, maxSlideNumber + currentIDX);

  return (
    <div className="slider">
      <h2>Popular Services</h2>
      <div className="container">
        <button className="prev" onClick={prevIdxHandler}>
          Prev
        </button>
        <div className="slides" ref={ref}>
          {slicedCards?.map((card, i) => (
            <CatCard item={card} key={i} />
          ))}
        </div>
        <button className="next" onClick={nextIdxHandler}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Slider;
