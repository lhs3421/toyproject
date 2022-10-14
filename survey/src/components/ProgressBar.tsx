import React from "react";
import { IProgressBar } from "../Types/Interface";
import "./ProgressBar.scss";

function ProgressBar({ isProgressBar }: IProgressBar) {
  return (
    <div className="progressBar">
      <span className="progressSquareOn"></span>
      <hr className={isProgressBar[0] ? "progressLineOn" : "progressLineOff"} />
      <hr className={isProgressBar[1] ? "progressLineOn" : "progressLineOff"} />
      <hr className={isProgressBar[2] ? "progressLineOn" : "progressLineOff"} />
      <span
        className={isProgressBar[2] ? "progressSquareOn" : "progressSquareOff"}
      ></span>
    </div>
  );
}

export default ProgressBar;
