import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  a{
    color: black;
    text-decoration: none
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <Router />
  </>
);
