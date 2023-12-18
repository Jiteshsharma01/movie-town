import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./index.scss";

const Body = () => {
  return (
    <div className="main-box flex flex-column">
      <Header />
      <div className="bg-dark2 text-white flex p-2 flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
