import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// 처음은 100개 한번에 화면에 그려줌

// 라이브러리 사용하기 react-intersection-observer
// 이미 설치되있음!

// 1. 마운팅시 데이터 3개만 받아와서 그려주기
// 2. 스크롤이 바닥에 닿으면 3개 추가로 받아서 그려주기

const Wrapper = styled.div`
  height: 100%;
  background-color: #f5f6f8;
`;

const PaintName = styled.div`
  height: 200px;
  width: 100%;
  background-color: #a3cca3;
  border: 3px solid black;
`;

function InfiniteScroll() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://node-pagnation.herokuapp.com/users"
      );
      const {
        data: { users },
      } = response;
      setData(users);
    };
    getData();
  }, []);

  return (
    <Wrapper>
      {data.map((user) => {
        return <PaintName key={user.id}>{user.name}</PaintName>;
      })}
    </Wrapper>
  );
}
export default InfiniteScroll;
