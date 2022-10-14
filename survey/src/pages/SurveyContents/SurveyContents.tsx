import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../context/CreateContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { IQuestions } from "../../Types/Interface";
import ProgressBar from "../../components/ProgressBar";
import PrevBtn from "../../components/PrevBtn";
import NextBtn from "../../components/NextBtn";
import "./SurveyContents.scss";

function SurveyContents() {
  const { printData, setPrintData } = useContext(DataContext);
  const [questions, setQuestions] = useState<IQuestions[]>([
    {
      title: "",
      mode: 0,
      answers: [],
    },
  ]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [selectAnswer, setSelectAnswer] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean[]>([]);
  const [isProgressBar, setIsProgressBar] = useState<boolean[]>([]);
  const [finalDataAnswer, setFinalDataAnswer] = useState<string[]>([]);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(
          "http://localhost:3000/data/questions.json",
        );
        const data = res.data;
        const map = state.questions.map((a: number) => data.questions[a]);
        setQuestions(map);
      })();
    } catch (err) {
      console.log("Error", err);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get("http://localhost:3000/data/answers.json");
        const data = res.data;
        const map = questions[number].answers.map(
          (a: number) => data.answers[a],
        );
        setAnswers(map);
      })();
    } catch (err) {
      console.log("Error", err);
    }
  }, [questions, number]);

  useEffect(() => {
    const newArr = Array(answers.length).fill(false);
    setIsSelected(newArr);
  }, [answers]);

  useEffect(() => {
    const newArr = Array(3).fill(false);
    if (questions.length === 1) {
      newArr.fill(true);
      setIsProgressBar(newArr);
    } else {
      setIsProgressBar(newArr);
    }
  }, [questions]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNextButton = () => {
    if (!selectAnswer) return;

    if (selectAnswer) {
      setNumber((prev) => prev + 1);
      setSelectAnswer((prev) => !prev);
      if (number + 1 === questions.length) {
        navigate("/done", {
          state: state.title,
        });
      }
    }

    const newArr = [...isProgressBar];
    if ((number + 2) / questions.length >= 0.76) {
      newArr.fill(true);
      setIsProgressBar(newArr);
    } else if ((number + 2) / questions.length >= 0.51) {
      newArr[0] = true;
      newArr[1] = true;
      setIsProgressBar(newArr);
    } else if ((number + 2) / questions.length >= 0.26) {
      newArr[0] = true;
      setIsProgressBar(newArr);
    }

    setPrintData([
      ...printData,
      { question: questions[number].title, answer: finalDataAnswer },
    ]);
  };

  const handlePrevButton = () => {
    if (number === 0) return handleBack();
    if (number === 1) setPrintData([]);
    setNumber((prev) => prev - 1);
    setSelectAnswer(false);

    const newArr = [...isProgressBar];
    if (number / questions.length <= 0.25) {
      newArr[0] = false;
      setIsProgressBar(newArr);
    } else if (number / questions.length <= 0.5) {
      newArr[1] = false;
      if (questions.length === 3) newArr[0] = false;
      setIsProgressBar(newArr);
    } else if (number / questions.length <= 0.75) {
      newArr[2] = false;
      setIsProgressBar(newArr);
    }
  };

  const handleAnswerButtonSingle = (id: string) => {
    const index = Number(id);
    const newArr = [...isSelected];
    if (newArr[index]) {
      newArr[index] = false;
    } else {
      const arr = newArr.fill(false);
      arr[index] = true;
    }
    const some = newArr.some((a) => a === true);
    setIsSelected(newArr);
    setSelectAnswer(some);
    const answerArr: string[] = [];
    if (newArr[index]) answerArr.push(answers[index]);
    setFinalDataAnswer(answerArr);
  };

  const handleAnswerButtonDouble = (id: string) => {
    const index = Number(id);
    const newArr = [...isSelected];
    if (newArr[index]) {
      const some = newArr.some((a) => a === true);
      if (some) newArr.fill(false);
    } else {
      newArr[index] = true;
    }
    const some = newArr.some((a) => a === true);
    setIsSelected(newArr);
    setSelectAnswer(some);
    let answerArr = [...finalDataAnswer];
    if (!selectAnswer) {
      answerArr = [];
      answerArr.push(answers[index]);
    } else if (selectAnswer) {
      answerArr.push(answers[index]);
    }
    setFinalDataAnswer(answerArr);
  };

  return (
    <section className="SurveyContentsMain">
      <div className="SurveyContentsHomeIconWrapper">
        <HomeOutlined
          className="surveyContentsHomeIcon"
          style={{ color: "#1890ff", fontSize: "25px" }}
          onClick={handleBack}
        />
      </div>
      <div className="SurveyContentsTop">
        <h1 className="SurveyContentsTitle">{`${state.title}`}</h1>
      </div>
      <div className="progressWrapper">
        <ProgressBar isProgressBar={isProgressBar} />
        <div className="SurveyContentsQuestionNumber">
          <span className="SurveyContentsQuestionIngNumber">{`${
            number + 1
          }`}</span>
          <span className="SurveyContentsQuestionTotalNumber">/</span>
          <span className="SurveyContentsQuestionTotalNumber">
            {`${questions.length}`}
          </span>
        </div>
      </div>
      <div className="SurveyContentsWrapper">
        <span className="SurveyContentsQuestionInfo">
          {`${questions[number].title}`}
        </span>
        <div className="SurveyContentsAnswerWrapper">
          {answers.map((answer, index) => {
            return (
              <Button
                key={index}
                className="answerBtns"
                type={isSelected[index] ? "primary" : "default"}
                onClick={(e) => {
                  questions[number].mode
                    ? handleAnswerButtonDouble(e.currentTarget.id)
                    : handleAnswerButtonSingle(e.currentTarget.id);
                }}
                id={index + ""}
              >
                {answer}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="subButtonWrapper">
        <PrevBtn handlePrevButton={handlePrevButton} />
        <NextBtn
          handleNextButton={handleNextButton}
          selectAnswer={selectAnswer}
        />
      </div>
    </section>
  );
}

export default SurveyContents;
