import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function Hsanswer() {
  const RENDERING_NUMBER = 12;
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(RENDERING_NUMBER);
  const [offSet, setoffSet] = useState(0);
  const [pageNumber, setPageNumber] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://node-pagnation.herokuapp.com/users`
      );

      const {
        data: { users },
      } = response;

      setData(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    setPageNumber((prev) => {
      return [
        ...prev,
        ...Array(Math.ceil(data.length / RENDERING_NUMBER))
          .fill()
          .map((v, i) => i + 1),
      ];
    });
  }, [data.length, RENDERING_NUMBER]);

  const onClick = (i) => {
    const offset = (i - 1) * RENDERING_NUMBER;
    setoffSet(offset);
    setLimit(offset + RENDERING_NUMBER);
  };

  return (
    <Wrapper>
      <Title>Pagination</Title>
      <GridWrapper>
        {data.slice(offSet, limit).map((value) => {
          return <h1 key={value.id}>{value.name}</h1>;
        })}
      </GridWrapper>
      <PageWrapper>
        {pageNumber.map((number, i) => {
          return (
            <Button key={number} onClick={() => onClick(i + 1)}>
              {number}
            </Button>
          );
        })}
      </PageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  background-color: #f5f6f8;
`;

const Title = styled.h1`
  font-size: 5em;
  font-weight: bold;
  color: black;
  text-align: center;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  place-items: center;
  height: 90vh;
  margin: 0 10%;
`;

const PageWrapper = styled.div`
  position: absolute;
  bottom: 1px;
  margin: 1em 20em;
`;

const Button = styled.button`
  width: 30px;
`;

export default Hsanswer;
