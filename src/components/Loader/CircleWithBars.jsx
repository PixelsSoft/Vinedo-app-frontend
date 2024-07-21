import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner';

const CircleWithBars = ({ width, color }) => {
  return (
    <CirclesWithBar
      height={width}
      width={width}
      color={color}
      outerCircleColor={color}
      innerCircleColor={color}
      barColor={color}
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

CircleWithBars.defaultProps = {
  width: 25,
  color: "#FFF",
};

export default CircleWithBars