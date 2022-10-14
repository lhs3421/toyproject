import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SurveyStart from "./pages/SurveyStart/SurveyStart";
import SurveyResult from "./pages/SurveyResult/SurveyResult";
import SurveyContents from "./pages/SurveyContents/SurveyContents";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyStart />} />
        <Route path="start" element={<SurveyContents />} />
        <Route path="/done" element={<SurveyResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
