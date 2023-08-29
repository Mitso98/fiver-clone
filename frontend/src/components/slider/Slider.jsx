import CatCard from "../cat-card/CatCard";
import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cards } from "../../data";
import "./Slider.scss";

const Slider = () => {
  // const ref = useRef(null);

  const [imgWidth, setImgWidth] = useState(0);
  const [currentIDX, setCurrentIDX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  // prevent overflow
  const number = Math.floor(window.innerWidth / imgWidth);
  const maxSliderNumber =
    number * imgWidth > windowWidth * 0.9 ? number - 1 : number;

  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);

    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const nextIdxHandler = () => {
    if (currentIDX + maxSliderNumber < cards.length) {
      setCurrentIDX(currentIDX + maxSliderNumber);
    } else {
      setCurrentIDX(0);
    }
  };

  const prevIdxHandler = () => {
    if (currentIDX - maxSliderNumber >= 0) {
      setCurrentIDX(currentIDX - maxSliderNumber);
      console.log("if");
    } else if (currentIDX === 0) {
      console.log("elseif");
      setCurrentIDX(cards.length - maxSliderNumber);
    } else {
      console.log("else");
      setCurrentIDX(0);
    }
  };

  // propagate up image width
  const getImageWidth = (width) => {
    setImgWidth(width);
  };

  const slicedCards = cards.slice(
    currentIDX,
    currentIDX + Math.min(maxSliderNumber, cards.length - currentIDX)
  );

  if (slicedCards.length < maxSliderNumber && maxSliderNumber !== Infinity) {
    const cardsToAdd = Math.min(
      maxSliderNumber - slicedCards.length,
      currentIDX
    );
    const additionalCards = cards.slice(currentIDX - cardsToAdd, currentIDX);
    slicedCards.unshift(...additionalCards);
  }


  return (
    <div className="slider">
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
