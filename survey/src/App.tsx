import React, { useState } from "react";
import Router from "./Router";
import { IPrintData } from "./Types/Interface";
import { DataContext } from "./context/CreateContext";

function App() {
  const [printData, setPrintData] = useState<IPrintData[]>([]);
  return (
    <DataContext.Provider value={{ printData, setPrintData }}>
      <Router />
    </DataContext.Provider>
  );
}

export default App;
