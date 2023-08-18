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
    currentIDX < cards.length - maxSlideNumber
      ? setCurrentIDX(currentIDX + maxSlideNumber)
      : setCurrentIDX(0);
    console.log("prev >>>", currentIDX);
  };

  const prevIdxHandler = () => {
    currentIDX > 0
      ? setCurrentIDX(currentIDX - maxSlideNumber)
      : setCurrentIDX(cards.length - 1);
  };

  const slicedCards = cards.slice(currentIDX, maxSlideNumber + currentIDX);

  return (
    <div className="slider">
      <div className="prev" onClick={prevIdxHandler}>
        Prev
      </div>
      <div className="container" ref={ref}>
        {slicedCards?.map((card, i) => (
          <CatCard item={card} key={i} />
        ))}
      </div>
      <div className="next" onClick={nextIdxHandler}>
        Next
      </div>
    </div>
  );
};
export default Slider;
