import Header from "../Header/Header";
import MovieContainer from "../MovieContainer/MovieContainer";
import "./index.scss";

const MainContainer = () => {
  return (
    <div className="main-container flex flex-column">
      <Header />
      <div className="bg-dark2 text-white flex-auto">
        <MovieContainer />
      </div>
    </div>
  );
};

export default MainContainer;
