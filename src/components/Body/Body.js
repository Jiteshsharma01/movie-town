import { Outlet } from "react-router-dom";
import "./index.scss";
import Header from "../Header/Header";

const Body = () => {
  return (
    <div className="main-box bg-dark2 flex text-white w-full">
      <div className="main-container flex flex-column">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
