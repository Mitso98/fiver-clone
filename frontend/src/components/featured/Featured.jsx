import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Featured.scss";

const Featured = () => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const heros = [
    {
      img: "./src/assets/img/people/christina-2x.jpg",
      icon: "./src/assets/img/people/christina-2x.png",
      name: "Christina",
      job: "Jewelry Shop Owner",
    },
    {
      img: "./src/assets/img/people/jenny-2x.jpg",
      icon: "./src/assets/img/people/jenny-2x.png",
      name: "Jenny",
      job: "Children's Voice Over",
    },
    {
      img: "./src/assets/img/people/colin-2x.jpg",
      icon: "./src/assets/img/people/colin-2x.png",
      name: "Colin",
      job: "Creative Director",
    },
    {
      img: "./src/assets/img/people/jordan-2x.jpg",
      icon: "./src/assets/img/people/jordan-2x.png",
      name: "Jordan",
      job: "Production Assistant",
    },
    {
      img: "./src/assets/img/people/scarlett-2x.jpg",
      icon: "./src/assets/img/people/scarlett-2x.png",
      name: "Scarlet",
      job: "Business Founder",
    },
  ];

  const imageHandler = () => {
    setCurrentImgIdx(
      currentImgIdx === heros.length - 1 ? 0 : currentImgIdx + 1
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(imageHandler, 6000);
    return () => clearTimeout(timeoutId);
  }, [currentImgIdx]);

  return (
    <div className="featured">
      <div className="people">
        <AnimatePresence>
          {heros.map((hero, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                className="container"
                key={idx + 1}
                initial={{
                  opacity: idx === currentImgIdx ? 0 : 1,
                  x: idx === currentImgIdx ? "150vw" : 0,
                  display: idx === currentImgIdx ? "none" : "flex",
                }}
                animate={{
                  opacity: idx === currentImgIdx ? 1 : 0,
                  x: idx === currentImgIdx ? 0 : "150vw",
                  display: idx === currentImgIdx ? "flex" : "none",
                }}
                transition={{ duration: 1 }}
              >
                <div className="hero-icon">
                  <img src={hero.icon} />
                </div>
                <div className="info">
                  <p>{hero.name}</p>
                  <p>{hero.job}</p>
                </div>
              </motion.div>
              <motion.img
                src={hero.img}
                initial={{ opacity: idx === currentImgIdx ? 0 : 1 }}
                animate={{ opacity: idx === currentImgIdx ? 1 : 0 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 1.5 }}
              />
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>

      <div className="container">
        <div className="header">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className="search">
            <input type="text" placeholder="Search for any service..." />
            <div className="submit-button-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentFill"
              >
                <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
              </svg>
            </div>
          </div>

          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
