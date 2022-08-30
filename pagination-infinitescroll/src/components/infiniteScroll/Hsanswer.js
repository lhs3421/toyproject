import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  background-color: #f5f6f8;
`;

const PaintName = styled.div`
  height: 200px;
  width: 100%;
  background-color: #a3cca3;
  border: 1px solid black;
`;

const Observer = styled.div`
  height: 1px;
`;

function InfiniteScroll() {
  const PAINT_CONTENT_NUMBER = 5;
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(PAINT_CONTENT_NUMBER);
  const [ref, inView] = useInView({});

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://node-pagnation.herokuapp.com/users?offset=0&limit=${pageNumber}`
      );
      const {
        data: { users },
      } = response;
      setData(users);
    };
    getData();
  }, [pageNumber]);

  useEffect(() => {
    if (inView) {
      setPageNumber((prevState) => prevState + PAINT_CONTENT_NUMBER);
    }
  }, [inView]);

  console.log(inView);
  return (
    <Wrapper>
      {data.map((user) => {
        return <PaintName key={user.id}>{user.name}</PaintName>;
      })}
      <Observer ref={ref} />
    </Wrapper>
  );
}
export default InfiniteScroll;
