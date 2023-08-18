import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trusted-by/TrustedBy";
import Slider from "../../components/slider/Slider";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slider />
    </div>
  );
};
export default Home;
