export interface ISurveys {
  id: number;
  title: string;
  questions: number[];
}
export interface IValue {
  name: string;
  surveyTitle: string;
}

export interface IQuestions {
  title: string;
  mode: number;
  answers: number[];
}

export interface INextBtnProps {
  handlePrintData?: () => void;
  handleNextButton?: () => void;
  selectAnswer?: boolean;
}

export interface IPrevBtnProps {
  handlePrevButton?: () => void;
  goToPrevPage?: () => void;
}

export interface IProgressBar {
  isProgressBar: boolean[];
}

export interface IPrintData {
  question: string;
  answer: string[];
}

export interface PrintDataState {
  printData: IPrintData[];
  setPrintData: React.Dispatch<React.SetStateAction<IPrintData[]>>;
}
