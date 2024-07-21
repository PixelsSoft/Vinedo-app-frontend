import React from "react";
import { Outlet } from "react-router-dom";
import ScrollRestore from "../components/ScrollRestore/ScrollRestore";
import "../styles/global.scss";

const Root = () => {
  return (
    <>
      <wc-toast theme="dark"></wc-toast>
      <div className="App w-full md:max-w-sm md:mx-auto ">
        <ScrollRestore />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
