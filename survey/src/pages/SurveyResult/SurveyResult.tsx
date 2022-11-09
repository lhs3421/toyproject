import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../../context/CreateContext";
import PrevBtn from "../../components/PrevBtn";
import NextBtn from "../../components/NextBtn";
import "./SurveyResult.scss";

function SurveyResult() {
  const { printData, setPrintData } = useContext(DataContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state]);

  const handlePrintData = () => {
    const map = printData.map((a) => Object.values(a));
    const entries = Object.fromEntries(map);
    console.log("printData", entries);
  };

  const goToPrevPage = () => {
    setPrintData([]);
    navigate(-1);
  };

  return (
    <div className="SurveyDone">
      <h1 className="surveyDoneTitle">설문 종료</h1>
      <div className="SurveyDoneWrapper">
        <h3 className="surveyDoneTitleName">{state}</h3>
        <span>평가 설문이 끝났습니다.</span>
      </div>
      <div className="subButtonWrapper">
        <PrevBtn goToPrevPage={goToPrevPage} />
        <NextBtn handlePrintData={handlePrintData} />
      </div>
    </div>
  );
}

export default SurveyResult;
