import React from "react";
import "./_custom-loader.css";

export interface PropsType {
  height: number;
  width: number;
}
const CustomLoader = (props: PropsType) => {
  const { height, width } = props;

  return (
    <div
      className="dot-spinner"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );
};

export default CustomLoader;
