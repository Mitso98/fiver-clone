import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cards } from "../../data";
import CatCard from "../cat-card/CatCard";
import "./Slider.scss";

const WIDTH_PERCENT = 0.9;
const GAP = 40;

const Slider = () => {
  const imgWidthRef = useRef(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [currentIDX, setCurrentIDX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const number = Math.floor(window.innerWidth / imgWidth);
  const maxSliderNumber =
    number * imgWidth > windowWidth * WIDTH_PERCENT ? number - 1 : number;

  useEffect(() => {
    setImgWidth(imgWidthRef.current?.offsetWidth + GAP);
    setWindowWidth(window.innerWidth);
    console.log("useLayoutEffect");
    const handleWindowResize = () => {
      console.log("handleWindowResize");
      setImgWidth(imgWidthRef.current?.offsetWidth + GAP);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const nextIdxHandler = () => {
    setCurrentIDX((prevIdx) =>
      prevIdx + maxSliderNumber < cards.length ? prevIdx + maxSliderNumber : 0
    );
  };

  const prevIdxHandler = () => {
    setCurrentIDX((prevIdx) =>
      prevIdx - maxSliderNumber >= 0
        ? prevIdx - maxSliderNumber
        : cards.length - maxSliderNumber
    );
  };

  const slicedCards = cards.slice(
    currentIDX,
    currentIDX + Math.min(maxSliderNumber, cards.length - currentIDX)
  );

  let cardsToAdd = 0;
  if (slicedCards.length < maxSliderNumber && maxSliderNumber !== Infinity) {
    cardsToAdd = Math.min(maxSliderNumber - slicedCards.length, currentIDX);
    const additionalCards = cards.slice(currentIDX - cardsToAdd, currentIDX);
    slicedCards.unshift(...additionalCards);
  }

  console.log(cardsToAdd, currentIDX, imgWidth);

  const state = (i) => {
    if (
      i >= currentIDX - cardsToAdd &&
      i < currentIDX + Math.min(maxSliderNumber, cards.length - currentIDX)
    ) {
      return true;
    }
    return false;
  };

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
        <div className="slides" style={{ gap: GAP }}>
          {cards.map((card, i) => (
            <AnimatePresence key={i} mode="wait">
              <motion.div
                className="wrapper"
                ref={i === 0 && imgWidthRef ? imgWidthRef : null}
                initial={{
                  x: state(i) ? -200 : 0,
                }}
                animate={{
                  x: state(i) ? 0 : -200,
                }}
                style={{
                  display: state(i) ? "block" : "none",
                }}
              >
                <CatCard item={card} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
