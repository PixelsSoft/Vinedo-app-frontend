import React from "react";
import { LineWave } from "react-loader-spinner";

const LineWaveLoader = ({ width, color }) => {
  return (
    <LineWave
      height={width}
      width={width}
      color={color}
      ariaLabel="line-wave-loading"
      radius="9"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  );
};

LineWaveLoader.defaultProps = {
  width: 25,
  color: "#FFF",
};

export default LineWaveLoader;
