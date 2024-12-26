import MovieContainer from "../MovieContainer/MovieContainer";
import "./index.scss";

const MainContainer = () => {
  return (
    <div className="bg-dark2 text-white flex-auto overflow-y-scroll">
      <MovieContainer />
    </div>
  );
};

export default MainContainer;
