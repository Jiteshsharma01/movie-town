import MovieContainer from "../MovieContainer/MovieContainer";
import "./index.scss";

const MainContainer = () => {
  return (
    <div className="main-container flex flex-column">
      <MovieContainer />
    </div>
  );
};

export default MainContainer;
