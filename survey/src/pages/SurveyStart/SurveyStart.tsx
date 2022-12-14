import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LeftOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { ISurveys, IValue } from "../../Types/Interface";
import "./SurveyStart.scss";
import "antd/dist/antd.css";

function SurveyStart() {
  const [surveyId, setSurveyId] = useState<number>(0);
  const [surveys, setSurveys] = useState<ISurveys[]>([
    {
      id: 1,
      title: "",
      questions: [],
    },
  ]);
  const [values, setValues] = useState<IValue>({
    name: "",
    surveyTitle: "",
  });
  const [surveyTarget, setSurveyTarget] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("./data/surveys.json");
        const data = res.data;
        setSurveys(data.surveys);
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, []);

  useEffect(() => {
    const newArr = [...surveys];
    const defaultFalse = Array(newArr.length).fill(false);
    setIsChecked(defaultFalse);
  }, [surveys]);

  const enabled = values.name.length > 0 && values.surveyTitle.length > 0;

  const handleValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setValues({
      ...values,
      name: value,
    });
  };

  const handleButton = (TargetSurveyId: number, TargetSurveyTitle: string) => {
    const index = Number(TargetSurveyId - 1);
    setValues({
      ...values,
      surveyTitle: TargetSurveyTitle,
    });
    setSurveyTarget(index);
    const newArr = [...isChecked];
    if (!newArr[index]) {
      const arr = newArr.fill(false);
      arr[index] = true;
      setSurveyId(index);
    }
    setIsChecked(newArr);
  };

  const goToNextPage = (id: number) => {
    navigate("/start", { state: surveys[id] });
  };

  return (
    <section className="surveyStartWrapper">
      <div className="surveyStartHeader">
        <LeftOutlined className="surveyStartPrevIcon" />
        <h1 className="surveyStartTitle">?????? ??????</h1>
      </div>
      <div className="surveyStartInputWrapper">
        <Input
          className="surveyStartNameInput"
          placeholder="????????? ???????????????"
          allowClear
          value={values.name}
          onChange={handleValue}
          maxLength={20}
        />
      </div>
      <div className="surveyStartSurveyPickWrapper">
        <span className="surveyStartSurveyPickGuideText">
          ????????? ????????? ???????????????
        </span>
        <div className="surveyStartSurveyButtonWrapper">
          {surveys.map((survey, index) => {
            return (
              <Button
                className="surveyStartSurveyButton"
                key={survey.id}
                type={isChecked[index] ? "primary" : "default"}
                onClick={() => handleButton(survey.id, survey.title)}
              >
                {survey.title}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="surveyStartPickSurveyInfoWrapper">
        {values.name ? (
          <span className="surveyStartPrintNameWrapperSpan">
            <span className="surveyStartPrintName">{values.name}</span> ???
          </span>
        ) : (
          <span className="surveyStartWriteNameText">????????? ??????????????????</span>
        )}

        {values.surveyTitle ? (
          <span className="surveyStartPrintSurveyWrapperSpan">
            ???????????? ?????????
            <span className="surveyStartPrintSurvey">{values.surveyTitle}</span>
            ??????
          </span>
        ) : (
          <span className="surveyStartChooseSurveyText">
            ????????? ??????????????????
          </span>
        )}

        {values.surveyTitle.length > 0 ? (
          <span>
            ????????? ???
            <span className="surveyStartToTalQuestionNumber">
              {surveys[`${surveyTarget}`].questions.length} ??????
            </span>
            ?????????.
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="surveyStartSurveyStartBtnWrapper">
        <Button
          className="surveyStartSurveyStartBtn"
          type={enabled ? "primary" : "default"}
          disabled={!enabled}
          onClick={() => goToNextPage(surveyId)}
        >
          ?????? ??????
        </Button>
      </div>
    </section>
  );
}

export default SurveyStart;
