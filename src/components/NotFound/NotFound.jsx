import React from "react";
import notFound404 from "../../assets/404-computer.svg";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="scrollbar-hide w-full h-screen">
      <section className="bg-[#110e0f] flex items-center justify-center w-full h-full scrollbar-hide">
        <div className="px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <img
              className="mx-auto RV8RoaI_SlEMC5CEQ3ms _9OKVeTXzfSwD_NYO6_G"
              src={notFound404}
              alt="404 Not Found"
            />
            <h1 className="mb-4 text-2xl tracking-tight font-extrabold lg:text-2xl text-primary-600 dark:text-primary-500">
              404 Not Found
            </h1>
            <p className="mb-7 text-3xl tracking-tight font-bold text-gray-900 md:text-3xl dark:text-white">
              Something's missing.
            </p>
            <NavLink
              to={"/"}
              className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Back to Homepage
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
