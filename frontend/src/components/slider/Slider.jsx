import CatCard from "../cat-card/CatCard";
import { useLayoutEffect, useRef, useState } from "react";
import { cards } from "../../data";
import "./Slider.scss";

const Slider = () => {
  const ref = useRef(null);

  const [imgWidth, setImgWidth] = useState(0);
  const [containerWidth, setcontainerWidth] = useState(0);
  const [currentIDX, setCurrentIDX] = useState(0);

  // prevent overflow
  const number = Math.floor(containerWidth / imgWidth);
  const maxSlideNumber =
    number * imgWidth > containerWidth ? number - 1 : number;

  console.log("total", containerWidth, imgWidth);

  useLayoutEffect(() => {
    setcontainerWidth(ref.current.clientWidth);

    function handleWindowResize() {
      setcontainerWidth(ref.current.clientWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const nextIdxHandler = () => {
    if (currentIDX + maxSlideNumber < cards.length) {
      setCurrentIDX(currentIDX + maxSlideNumber);
    } else {
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
  };

  const getImageWidth = (width) => {
    setImgWidth(width);
  };

  const slicedCards = cards.slice(currentIDX, maxSlideNumber + currentIDX);

  console.log(">>>", imgWidth);

  return (
    <div className="slider" ref={ref}>
      <h2>Popular Services</h2>
      <div className="container">
        <div className="arrows">
          <button className="prev" onClick={prevIdxHandler}>
            Prev
          </button>
          <button className="next" onClick={nextIdxHandler}>
            Next
          </button>
        </div>
        <div className="slides">
          {slicedCards?.map((card, i) => (
            <CatCard item={card} key={i} getImageWidth={getImageWidth} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
