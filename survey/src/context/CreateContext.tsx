import { createContext } from "react";
import { PrintDataState } from "../Types/Interface";

const finalData = {
  printData: [],
  setPrintData: () => {
    return;
  },
};

export const DataContext = createContext<PrintDataState>(finalData);
