import React from "react";
import { useLocation } from "react-router-dom";
import { IPrevBtnProps } from "../Types/Interface";
import "./PrevBtn.scss";

function PrevBtn({ goToPrevPage, handlePrevButton }: IPrevBtnProps) {
  const { pathname } = useLocation();
  return (
    <div
      onClick={pathname === "/start" ? handlePrevButton : goToPrevPage}
      className="subButtonWrapperSubDiv subButtonWrapperSubPrev"
    >
      <span>이전</span>
    </div>
  );
}

export default PrevBtn;
