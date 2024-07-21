import React from "react";
import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoader = ({ width, color,height,style }) => {
  return (
    <ThreeDots
      height={height || width}
      width={width}
      color={color}
      ariaLabel="three-dots-loading"
      radius="9"
      wrapperStyle={style || {}}
      wrapperClass=""
      visible={true}
    />
  );
};

ThreeDotsLoader.defaultProps = {
  width: 25,
  color: "#FFF",
};

export default ThreeDotsLoader;
