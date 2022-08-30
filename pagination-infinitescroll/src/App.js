import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const Pagination = styled.div`
  background-color: blue;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5em;
`;

const Infinite = styled.div`
  background-color: green;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5em;
`;
function App() {
  return (
    <Wrapper>
      <Pagination>
        <Link to="/pagination">Pagination</Link>
      </Pagination>
      <Infinite>
        <Link to="/infinitescroll">Infinite Scroll</Link>
      </Infinite>
    </Wrapper>
  );
}

export default App;
