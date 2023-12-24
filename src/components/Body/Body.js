import { Outlet } from "react-router-dom";
import "./index.scss";

const Body = () => {
  return (
    <div className="main-box bg-dark2 flex text-white w-full">
      <Outlet />
    </div>
  );
};

export default Body;
