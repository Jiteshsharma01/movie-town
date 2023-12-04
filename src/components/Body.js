import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Body = () => {
  return (
    <div className="flex flex-column">
      <Header />
      <div className="flex p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
