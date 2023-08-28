import CatCard from "../cat-card/CatCard";
import { useLayoutEffect, useState } from "react";
import { cards } from "../../data";
import "./Slider.scss";

const Slider = () => {
  // const ref = useRef(null);

  const [imgWidth, setImgWidth] = useState(0);
  const [currentIDX, setCurrentIDX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  // prevent overflow
  const number = Math.floor(window.innerWidth / imgWidth);
  const maxSlideNumber =
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

  // propagate up image width
  const getImageWidth = (width) => {
    setImgWidth(width);
  };

  const slicedCards = cards.slice(currentIDX, maxSlideNumber + currentIDX);
  let finalCards = slicedCards;
  if (slicedCards.length < maxSlideNumber && maxSlideNumber !== Infinity) {
    let slicedCardsLength = currentIDX;

    while (slicedCards.length < maxSlideNumber) {
      slicedCardsLength--;
      finalCards = [cards[slicedCardsLength], ...finalCards];
    }

    console.log("Done", slicedCards.length);
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
