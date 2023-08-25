import "./Featured.scss";

const Featured = () => {
  const peopleStyle = {
    position: "absolute",
    top: "0px",
    "z-index": "-5",
  };

  const peopleImag = {
    width: "100%",
  };

  return (
    <div className="featured">
      <div className="people" style={peopleStyle}>
        <img
          src="./src/assets/img/people/christina-2x.webp"
          alt=""
          style={peopleImag}
        />
      </div>
      <div className="container">
        <div className="header">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./src/assets/img/search.png" alt="" />
              <input type="text" placeholder="Search for any service..." />
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>Web Design</button>
            <button>AI Services</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Featured;
