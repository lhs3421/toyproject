import React from "react";
import { useLocation } from "react-router-dom";
import { INextBtnProps } from "../Types/Interface";
import "./NextBtn.scss";

function NextBtn({
  handlePrintData,
  handleNextButton,
  selectAnswer,
}: INextBtnProps) {
  const { pathname } = useLocation();
  return (
    <div
      onClick={pathname === "/start" ? handleNextButton : handlePrintData}
      className={
        pathname === "/start"
          ? "subButtonWrapperSubDiv subButtonWrapperSubNextToggle"
          : "subButtonWrapperSubDiv subButtonWrapperSubNext"
      }
    >
      <span className={selectAnswer ? "OkSpan" : "NotOkaySpan"}>다음</span>
    </div>
  );
}

export default NextBtn;
